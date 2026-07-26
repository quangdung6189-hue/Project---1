import { useState, useCallback } from 'react';
import { SITE_CONFIG } from '../../utils/constants';
import SuccessModal from '../ui/SuccessModal';

export default function ContactSection() {
  const [activeTab, setActiveTab] = useState('pickup');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [modalVerificationCode, setModalVerificationCode] = useState('');
  const [modalVerificationEmail, setModalVerificationEmail] = useState('');

  // GPS states
  const [gpsLoading, setGpsLoading] = useState(false);
  const [gpsAddress, setGpsAddress] = useState('');
  const [gpsError, setGpsError] = useState('');
  const [gpsCoords, setGpsCoords] = useState(null);

  // Pickup form state
  const [pickupForm, setPickupForm] = useState({
    name: '', phone: '', email: '', wasteType: '', weight: '', location: 'Căn tin trường', customLocation: '', note: '', agree: false,
  });

  // Volunteer form state
  const [volForm, setVolForm] = useState({
    name: '', email: '', phone: '', type: 'volunteer', message: '', agree: false,
  });

  // Generate 6-digit verification code
  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // ========================================
  // GPS: Get current location + reverse geocode
  // ========================================
  const getCurrentLocation = useCallback(async () => {
    if (!navigator.geolocation) {
      setGpsError('Trình duyệt của bạn không hỗ trợ định vị GPS.');
      return;
    }

    setGpsLoading(true);
    setGpsError('');
    setGpsAddress('');
    setGpsCoords(null);

    try {
      // Step 1: Get GPS coordinates
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000,
        });
      });

      const { latitude, longitude, accuracy } = position.coords;
      setGpsCoords({ lat: latitude, lng: longitude, accuracy: Math.round(accuracy) });

      // Step 2: Reverse geocode with Nominatim (OpenStreetMap - free, no API key)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1&accept-language=vi`
      );

      if (!response.ok) throw new Error('Không thể lấy địa chỉ từ tọa độ.');

      const data = await response.json();
      
      // Build a clean Vietnamese address
      const addr = data.address || {};
      const parts = [
        addr.house_number,
        addr.road,
        addr.suburb || addr.neighbourhood,
        addr.city_district || addr.county,
        addr.city || addr.town || addr.state,
      ].filter(Boolean);
      
      const cleanAddress = parts.length > 0 ? parts.join(', ') : data.display_name;

      setGpsAddress(cleanAddress);
      setPickupForm(prev => ({
        ...prev,
        location: 'gps',
        customLocation: cleanAddress,
      }));
    } catch (error) {
      let errorMsg = 'Không thể xác định vị trí. Vui lòng thử lại.';
      if (error.code === 1) {
        errorMsg = 'Bạn đã từ chối quyền truy cập vị trí. Hãy cho phép trong cài đặt trình duyệt rồi thử lại.';
      } else if (error.code === 2) {
        errorMsg = 'Không thể xác định vị trí hiện tại. Vui lòng kiểm tra GPS/WiFi.';
      } else if (error.code === 3) {
        errorMsg = 'Quá thời gian chờ định vị. Vui lòng thử lại.';
      }
      setGpsError(errorMsg);
    } finally {
      setGpsLoading(false);
    }
  }, []);

  // ========================================
  // Email Verification (Demo mode)
  // In production: call backend API to send real email via Nodemailer/SendGrid
  // ========================================
  const sendVerificationEmail = async (email, name, code) => {
    // Production code:
    // return await apiClient.post('/api/email/send-verification', { email, name, code });
    
    // Demo mode: simulate sending with delay
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`📧 [DEMO] Email xác thực gửi đến: ${email}`);
        console.log(`🔐 Mã xác thực: ${code}`);
        console.log(`👤 Người đăng ký: ${name}`);
        resolve({ success: true });
      }, 800);
    });
  };

  // ========================================
  // Form Submissions
  // ========================================
  const handlePickupSubmit = async (e) => {
    e.preventDefault();
    if (!pickupForm.name || !pickupForm.phone || !pickupForm.email || !pickupForm.weight || !pickupForm.agree) return;

    const code = generateVerificationCode();
    await sendVerificationEmail(pickupForm.email, pickupForm.name, code);

    const locationText = pickupForm.location === 'gps'
      ? pickupForm.customLocation
      : pickupForm.location === 'custom'
      ? pickupForm.customLocation
      : pickupForm.location;

    setModalTitle('Đặt lịch thành công!');
    setModalMessage(
      `Bạn được cộng +50 điểm Eco.\n📍 Địa điểm: ${locationText}\n\nChúng tôi sẽ xác nhận thời gian thu gom và liên hệ sớm.`
    );
    setModalVerificationCode(code);
    setModalVerificationEmail(pickupForm.email);
    setIsModalOpen(true);
    setPickupForm({ name: '', phone: '', email: '', wasteType: '', weight: '', location: 'Căn tin trường', customLocation: '', note: '', agree: false });
    setGpsAddress('');
    setGpsCoords(null);
    setGpsError('');
  };

  const handleVolunteerSubmit = async (e) => {
    e.preventDefault();
    if (!volForm.name || !volForm.email || !volForm.phone || !volForm.message || !volForm.agree) return;

    const code = generateVerificationCode();
    await sendVerificationEmail(volForm.email, volForm.name, code);

    setModalTitle('Đăng ký thành công!');
    setModalMessage(`Cảm ơn ${volForm.name} đã đăng ký thành viên.\nChúng tôi sẽ liên hệ bạn trong vòng 24h.`);
    setModalVerificationCode(code);
    setModalVerificationEmail(volForm.email);
    setIsModalOpen(true);
    setVolForm({ name: '', email: '', phone: '', type: 'volunteer', message: '', agree: false });
  };

  const handleResendEmail = async () => {
    if (modalVerificationEmail) {
      const newCode = generateVerificationCode();
      await sendVerificationEmail(modalVerificationEmail, '', newCode);
      setModalVerificationCode(newCode);
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalVerificationCode('');
    setModalVerificationEmail('');
  };

  return (
    <>
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute -left-16 bottom-0 text-ecoGreen-100/30 text-[200px] select-none pointer-events-none">
          <i className="fa-solid fa-recycle animate-spin-slow"></i>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Risk Management + Contact Info */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
                  <i className="fa-solid fa-circle-nodes mr-1.5"></i> Dự phòng & Liên kết
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Quản Trị Rủi Ro & Đăng Ký</h2>
                <div className="h-1 w-20 bg-ecoGreen-500 rounded-full"></div>
              </div>

              {/* Risk Matrix */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center">
                  <i className="fa-solid fa-shield-virus text-ecoGreen-600 mr-2.5"></i>Ma Trận Rủi Ro & Giải Pháp
                </h3>
                <div className="overflow-x-auto rounded-2xl border border-gray-100 shadow-sm">
                  <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th scope="col" className="px-6 py-4 font-bold">Rủi ro tiềm ẩn</th>
                        <th scope="col" className="px-6 py-4 font-bold text-center">Mức độ</th>
                        <th scope="col" className="px-6 py-4 font-bold">Phương án giải quyết</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white">
                      {[
                        { risk: 'Rủi ro Tài chính', sub: 'Không đủ kinh phí ban đầu', level: 'Vừa', levelBg: 'bg-amber-50 text-amber-700', solution: 'Tận dụng vật liệu phế thải tự chế tạo trạm thí điểm; báo cáo thu chi minh bạch; xin ngân sách Đoàn trường.' },
                        { risk: 'Rủi ro Nhân sự', sub: 'Thành viên nản chí/bận học', level: 'Cao', levelBg: 'bg-rose-50 text-rose-700', solution: 'Họp mặt định kỳ; phân bổ công việc linh hoạt; xây dựng hệ thống phần thưởng khuyến khích.' },
                        { risk: 'Rủi ro Thời gian', sub: 'Trễ hạn chế tạo lắp đặt', level: 'Thấp', levelBg: 'bg-emerald-50 text-emerald-700', solution: 'Lập kế hoạch dự phòng đệm 1 tuần; thiết lập mốc bàn giao trung gian.' },
                      ].map((item, i) => (
                        <tr key={i}>
                          <td className="px-6 py-4 font-bold text-gray-900">
                            {item.risk}
                            <p className="text-[10px] font-medium text-gray-400">{item.sub}</p>
                          </td>
                          <td className="px-6 py-4 text-center">
                            <span className={`${item.levelBg} text-[10px] font-bold px-2 py-0.5 rounded-full`}>{item.level}</span>
                          </td>
                          <td className="px-6 py-4 text-xs text-gray-600 leading-relaxed font-medium">{item.solution}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-gray-50 border border-gray-100 rounded-3xl p-6">
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <i className="fa-solid fa-location-dot text-ecoGreen-600 mr-2"></i>Trụ sở liên lạc
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Văn phòng Đoàn Thanh niên - {SITE_CONFIG.university}<br />
                    {SITE_CONFIG.address}
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-bold text-gray-900 flex items-center">
                    <i className="fa-solid fa-envelope text-ecoGreen-600 mr-2"></i>Hòm thư điện tử
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed font-medium">
                    Email: <a href={`mailto:${SITE_CONFIG.email}`} className="text-ecoGreen-600 hover:underline">{SITE_CONFIG.email}</a><br />
                    Hotline: {SITE_CONFIG.phone}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Forms */}
            <div className="lg:col-span-5 bg-gradient-to-b from-ecoGreen-50 to-white border border-ecoGreen-200/60 rounded-3xl p-6 sm:p-8 shadow-xl">
              {/* Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button onClick={() => setActiveTab('pickup')} className={`w-1/2 pb-3 text-sm font-bold flex items-center justify-center transition-all duration-300 ${activeTab === 'pickup' ? 'text-ecoGreen-600 border-b-2 border-ecoGreen-500' : 'text-gray-400 border-b-2 border-transparent hover:text-gray-600'}`}>
                  <i className="fa-solid fa-calendar-plus mr-2"></i>Đặt lịch thu gom
                </button>
                <button onClick={() => setActiveTab('volunteer')} className={`w-1/2 pb-3 text-sm font-bold flex items-center justify-center transition-all duration-300 ${activeTab === 'volunteer' ? 'text-ecoGreen-600 border-b-2 border-ecoGreen-500' : 'text-gray-400 border-b-2 border-transparent hover:text-gray-600'}`}>
                  <i className="fa-solid fa-user-plus mr-2"></i>Đăng ký thành viên
                </button>
              </div>

              {/* ===================== PICKUP FORM ===================== */}
              {activeTab === 'pickup' && (
                <form onSubmit={handlePickupSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 font-medium pb-2 border-b border-gray-100">
                    Đặt lịch nhanh để Group 5 thu gom tận nơi, tích luỹ điểm <strong className="text-ecoGreen-600">EcoValue</strong> đổi quà xanh!
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Họ và tên *</label>
                    <input required type="text" value={pickupForm.name} onChange={(e) => setPickupForm({ ...pickupForm, name: e.target.value })} placeholder="Nguyễn Văn A" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Số điện thoại *</label>
                      <input required type="tel" value={pickupForm.phone} onChange={(e) => setPickupForm({ ...pickupForm, phone: e.target.value })} placeholder="0987654321" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email *</label>
                      <input required type="email" value={pickupForm.email} onChange={(e) => setPickupForm({ ...pickupForm, email: e.target.value })} placeholder="user@cmc.edu.vn" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Loại rác *</label>
                      <select value={pickupForm.wasteType} onChange={(e) => setPickupForm({ ...pickupForm, wasteType: e.target.value })} className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500">
                        <option value="">Chọn loại rác</option>
                        <option value="Chai nhựa">Chai nhựa / Chai PET</option>
                        <option value="Giấy in / Carton">Giấy in / Giấy vở / Carton</option>
                        <option value="Lon nhôm">Lon nhôm / Vỏ lon kim loại</option>
                        <option value="Chai thủy tinh">Chai / Lọ thủy tinh</option>
                        <option value="Thiết bị điện tử">Thiết bị điện tử hỏng</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Khối lượng (kg) *</label>
                      <input required type="number" step="0.1" min="0.1" value={pickupForm.weight} onChange={(e) => setPickupForm({ ...pickupForm, weight: e.target.value })} placeholder="2.5" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                    </div>
                  </div>

                  {/* ===== LOCATION WITH GPS ===== */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">
                      <i className="fa-solid fa-location-dot mr-1 text-ecoGreen-500"></i>Địa điểm *
                    </label>
                    <select 
                      value={pickupForm.location} 
                      onChange={(e) => {
                        setPickupForm({ ...pickupForm, location: e.target.value, customLocation: '' });
                        setGpsAddress('');
                        setGpsError('');
                        setGpsCoords(null);
                      }} 
                      className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500"
                    >
                      <option value="Căn tin trường">Căn tin trường</option>
                      <option value="Sảnh chính tòa A">Sảnh chính tòa A</option>
                      <option value="Giảng đường chính">Giảng đường chính</option>
                      <option value="Văn phòng Đoàn">Văn phòng Đoàn trường</option>
                      <option value="Ký túc xá">Ký túc xá</option>
                      <option value="gps">📍 Vị trí GPS hiện tại</option>
                      <option value="custom">✏️ Nhập địa chỉ khác</option>
                    </select>

                    {/* GPS Button */}
                    {pickupForm.location === 'gps' && (
                      <div className="mt-3 space-y-3">
                        <button
                          type="button"
                          onClick={getCurrentLocation}
                          disabled={gpsLoading}
                          className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                            gpsLoading
                              ? 'bg-gray-100 text-gray-400 cursor-wait'
                              : 'bg-gradient-to-r from-ecoBlue-500 to-ecoGreen-500 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5'
                          }`}
                        >
                          {gpsLoading ? (
                            <>
                              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>Đang xác định vị trí...</span>
                            </>
                          ) : (
                            <>
                              <i className="fa-solid fa-location-crosshairs"></i>
                              <span>Lấy vị trí hiện tại của tôi</span>
                            </>
                          )}
                        </button>

                        {/* GPS Success: Show address */}
                        {gpsAddress && (
                          <div className="bg-ecoGreen-50 border border-ecoGreen-200 rounded-xl p-3.5 animate-fade-in">
                            <div className="flex items-start gap-2.5">
                              <div className="bg-ecoGreen-100 text-ecoGreen-600 p-1.5 rounded-lg flex-shrink-0 mt-0.5">
                                <i className="fa-solid fa-map-pin text-xs"></i>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] text-ecoGreen-700 font-bold uppercase tracking-wider mb-1">Vị trí đã xác định</p>
                                <p className="text-sm text-gray-800 font-semibold leading-snug break-words">{gpsAddress}</p>
                                {gpsCoords && (
                                  <p className="text-[10px] text-gray-400 mt-1.5 font-mono">
                                    <i className="fa-solid fa-satellite mr-1"></i>
                                    {gpsCoords.lat.toFixed(6)}, {gpsCoords.lng.toFixed(6)} 
                                    <span className="ml-2">±{gpsCoords.accuracy}m</span>
                                  </p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={getCurrentLocation}
                                className="text-ecoGreen-500 hover:text-ecoGreen-700 p-1 transition-colors flex-shrink-0"
                                title="Lấy lại vị trí"
                              >
                                <i className="fa-solid fa-rotate-right text-xs"></i>
                              </button>
                            </div>
                          </div>
                        )}

                        {/* GPS Error */}
                        {gpsError && (
                          <div className="bg-rose-50 border border-rose-200 rounded-xl p-3 flex items-start gap-2.5 animate-fade-in">
                            <i className="fa-solid fa-circle-exclamation text-rose-500 mt-0.5"></i>
                            <div>
                              <p className="text-xs text-rose-700 font-semibold leading-relaxed">{gpsError}</p>
                              <button
                                type="button"
                                onClick={getCurrentLocation}
                                className="text-xs text-rose-600 font-bold underline underline-offset-2 mt-1 hover:text-rose-800 transition-colors"
                              >
                                <i className="fa-solid fa-rotate-right mr-1"></i>Thử lại
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Custom location input */}
                    {pickupForm.location === 'custom' && (
                      <div className="mt-3">
                        <input
                          type="text"
                          value={pickupForm.customLocation}
                          onChange={(e) => setPickupForm({ ...pickupForm, customLocation: e.target.value })}
                          placeholder="Nhập địa chỉ cụ thể của bạn..."
                          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Ghi chú</label>
                    <textarea rows="2" value={pickupForm.note} onChange={(e) => setPickupForm({ ...pickupForm, note: e.target.value })} placeholder="Thời gian thuận tiện..." className="w-full border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500"></textarea>
                  </div>

                  {/* Email verification notice */}
                  <div className="bg-ecoBlue-50 border border-ecoBlue-100 rounded-xl p-3 flex items-start gap-2.5">
                    <i className="fa-solid fa-envelope-circle-check text-ecoBlue-500 mt-0.5 text-sm"></i>
                    <p className="text-[11px] text-ecoBlue-700 leading-relaxed font-medium">
                      Sau khi đặt lịch, một <strong>email xác thực</strong> sẽ được gửi đến địa chỉ email của bạn để xác nhận đăng ký.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <input required type="checkbox" checked={pickupForm.agree} onChange={(e) => setPickupForm({ ...pickupForm, agree: e.target.checked })} className="mt-1 rounded text-ecoGreen-600 focus:ring-ecoGreen-500 h-4 w-4 border-gray-300" />
                    <label className="ml-2 text-[11px] text-gray-500 leading-normal font-medium">Tôi cam kết rác đã được phân loại cơ bản.</label>
                  </div>
                  <button type="submit" className="w-full bg-ecoGreen-600 hover:bg-ecoGreen-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-lg shadow-ecoGreen-500/20 transition-all duration-200 flex items-center justify-center">
                    <i className="fa-solid fa-circle-check mr-2 animate-pulse"></i> Xác Nhận Đặt Lịch
                  </button>
                </form>
              )}

              {/* ===================== VOLUNTEER FORM ===================== */}
              {activeTab === 'volunteer' && (
                <form onSubmit={handleVolunteerSubmit} className="space-y-4">
                  <p className="text-xs text-gray-500 font-medium pb-2 border-b border-gray-100">
                    Trở thành đại sứ xanh cùng Group 5 lan toả lối sống xanh CMC!
                  </p>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Họ và tên *</label>
                    <input required type="text" value={volForm.name} onChange={(e) => setVolForm({ ...volForm, name: e.target.value })} placeholder="Nguyễn Văn A" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email *</label>
                      <input required type="email" value={volForm.email} onChange={(e) => setVolForm({ ...volForm, email: e.target.value })} placeholder="user@cmc.edu.vn" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Số điện thoại *</label>
                      <input required type="tel" value={volForm.phone} onChange={(e) => setVolForm({ ...volForm, phone: e.target.value })} placeholder="0912345678" className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Hình thức đóng góp *</label>
                    <select value={volForm.type} onChange={(e) => setVolForm({ ...volForm, type: e.target.value })} className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500">
                      <option value="volunteer">Đại sứ Tình nguyện viên xanh</option>
                      <option value="sponsor">Đồng hành gây quỹ / Tài trợ</option>
                      <option value="other">Sáng kiến xanh khác</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Lời nhắn *</label>
                    <textarea required rows="3" value={volForm.message} onChange={(e) => setVolForm({ ...volForm, message: e.target.value })} placeholder="Chia sẻ mong muốn của bạn..." className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-ecoGreen-500"></textarea>
                  </div>

                  {/* Email verification notice */}
                  <div className="bg-ecoBlue-50 border border-ecoBlue-100 rounded-xl p-3 flex items-start gap-2.5">
                    <i className="fa-solid fa-envelope-circle-check text-ecoBlue-500 mt-0.5 text-sm"></i>
                    <p className="text-[11px] text-ecoBlue-700 leading-relaxed font-medium">
                      Sau khi đăng ký, một <strong>email xác thực</strong> sẽ được gửi để xác nhận tài khoản thành viên của bạn.
                    </p>
                  </div>

                  <div className="flex items-start">
                    <input required type="checkbox" checked={volForm.agree} onChange={(e) => setVolForm({ ...volForm, agree: e.target.checked })} className="mt-1 rounded text-ecoGreen-600 focus:ring-ecoGreen-500 h-4 w-4 border-gray-300" />
                    <label className="ml-2 text-[11px] text-gray-500 leading-normal font-medium">Tôi cam kết cung cấp thông tin chính xác.</label>
                  </div>
                  <button type="submit" className="w-full bg-ecoGreen-600 hover:bg-ecoGreen-700 text-white font-bold py-3 px-6 rounded-xl text-sm shadow-lg shadow-ecoGreen-500/20 transition-all duration-200 flex items-center justify-center">
                    Gửi Đăng Ký <i className="fa-solid fa-paper-plane ml-2"></i>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <SuccessModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
        verificationCode={modalVerificationCode}
        verificationEmail={modalVerificationEmail}
        onResendEmail={handleResendEmail}
      />
    </>
  );
}
