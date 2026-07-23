import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const wasteOptions = [
  'Chai nhựa',
  'Giấy in / Carton',
  'Lon nhôm',
  'Chai thủy tinh',
  'Thiết bị điện tử hỏng',
  'Rác tái chế khác'
];

const locationOptions = [
  'Căn tin trường',
  'Sảnh chính tòa A',
  'Giảng đường chính',
  'Văn phòng Đoàn',
  'Ký túc xá',
  'Khác'
];

function Toast({ message, type }) {
  return (
    <div className={`max-w-sm w-full rounded-2xl px-4 py-3 shadow-xl text-sm font-medium text-white border ${type === 'success' ? 'bg-emerald-600 border-emerald-700' : type === 'error' ? 'bg-rose-600 border-rose-700' : 'bg-slate-700 border-slate-800'}`}>
      {message}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('pickup');
  const [toast, setToast] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    wasteType: wasteOptions[0],
    weight: '',
    location: locationOptions[0],
    customLocation: '',
    note: '',
    agree: false,
    volunteerType: 'Đăng ký làm Đại sứ Tình nguyện viên xanh'
  });

  useEffect(() => {
    if (!toast) return;
    const timeout = setTimeout(() => setToast(null), 4500);
    return () => clearTimeout(timeout);
  }, [toast]);

  const collectionLocation = useMemo(() => (formState.location === 'Khác' ? formState.customLocation : formState.location), [formState.location, formState.customLocation]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const adminNotify = async (message) => {
    if (!DISCORD_WEBHOOK_URL || DISCORD_WEBHOOK_URL.includes('YOUR_DISCORD_WEBHOOK_URL')) {
      console.log('Admin webhook not configured.');
      return;
    }

    try {
      await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: message })
      });
    } catch (error) {
      console.warn('Error sending admin webhook:', error);
    }
  };

  const saveSchedule = async (payload) => {
    const { data, error } = await supabase.from('collection_schedules').insert([payload]);
    if (error) throw error;
    return data;
  };

  const handlePickupSubmit = async (event) => {
    event.preventDefault();
    if (!formState.name || !formState.phone || !formState.email || !formState.weight || !collectionLocation || !formState.agree) {
      showToast('Vui lòng hoàn thành tất cả các trường bắt buộc.', 'error');
      return;
    }

    const payload = {
      submission_type: 'pickup',
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      waste_type: formState.wasteType,
      estimated_weight_kg: parseFloat(formState.weight),
      collection_location: collectionLocation,
      note: formState.note,
      eco_points: 50,
      created_at: new Date().toISOString()
    };

    try {
      showToast('Đang lưu yêu cầu đặt lịch...', 'info');
      await saveSchedule(payload);
      await adminNotify(`Có lịch thu gom mới từ sinh viên ${formState.name} tại ${collectionLocation}!`);
      showToast('Đặt lịch thành công! Bạn được cộng +50 điểm Eco.', 'success');
      setFormState((state) => ({ ...state, name: '', phone: '', email: '', weight: '', note: '', agree: false, customLocation: '' }));
      setActiveTab('pickup');
    } catch (error) {
      showToast('Không thể gửi yêu cầu. Vui lòng thử lại.', 'error');
      console.error(error);
    }
  };

  const handleVolunteerSubmit = async (event) => {
    event.preventDefault();
    if (!formState.name || !formState.email || !formState.phone || !formState.note || !formState.agree) {
      showToast('Vui lòng hoàn thành tất cả các trường đăng ký thành viên.', 'error');
      return;
    }

    const payload = {
      submission_type: 'volunteer',
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      waste_type: formState.volunteerType,
      estimated_weight_kg: null,
      collection_location: null,
      note: formState.note,
      eco_points: 0,
      created_at: new Date().toISOString()
    };

    try {
      showToast('Đang gửi đăng ký thành viên...', 'info');
      await saveSchedule(payload);
      await adminNotify(`Có đăng ký thành viên mới từ ${formState.name}. Email: ${formState.email}`);
      showToast('Đăng ký thành công! Chúng tôi sẽ liên hệ bạn sớm.', 'success');
      setFormState((state) => ({ ...state, name: '', phone: '', email: '', note: '', agree: false }));
      setActiveTab('volunteer');
    } catch (error) {
      showToast('Không thể gửi đăng ký. Vui lòng thử lại.', 'error');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-ecoGreen-50 to-white text-slate-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <section className="rounded-[2rem] bg-white/95 p-8 shadow-2xl ring-1 ring-slate-200">
          <header className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.24em] text-ecoGreen-600 font-semibold">Sinh viên tái chế | EcoValue</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              Đặt lịch thu gom rác tái chế
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Gửi yêu cầu thu gom tại khuôn viên và nhận ngay 50 điểm Eco. Dữ liệu sẽ lưu vào Supabase realtime, đồng thời gửi thông báo quản trị ngay khi có lịch mới.
            </p>
          </header>

          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <button type="button" onClick={() => setActiveTab('pickup')} className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${activeTab === 'pickup' ? 'border-ecoGreen-600 bg-ecoGreen-100 text-ecoGreen-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}>
                Đặt lịch thu gom
              </button>
              <button type="button" onClick={() => setActiveTab('volunteer')} className={`rounded-2xl border px-4 py-3 text-sm font-semibold transition ${activeTab === 'volunteer' ? 'border-ecoGreen-600 bg-ecoGreen-100 text-ecoGreen-900' : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-100'}`}>
                Đăng ký thành viên
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            <section className="rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-200">
              {activeTab === 'pickup' ? (
                <form className="space-y-6" onSubmit={handlePickupSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Họ và tên người gửi*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="text" value={formState.name} onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nguyễn Văn A" />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Số điện thoại*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="tel" value={formState.phone} onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))} placeholder="098 765 4321" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Email / Liên hệ*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="email" value={formState.email} onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))} placeholder="user@cmc.edu.vn" />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Loại rác thải*
                      <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" value={formState.wasteType} onChange={(e) => setFormState((prev) => ({ ...prev, wasteType: e.target.value }))}>
                        {wasteOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Khối lượng ước tính (kg)*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="number" step="0.1" min="0.1" value={formState.weight} onChange={(e) => setFormState((prev) => ({ ...prev, weight: e.target.value }))} placeholder="2.5" />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Địa điểm thu gom*
                      <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" value={formState.location} onChange={(e) => setFormState((prev) => ({ ...prev, location: e.target.value }))}>
                        {locationOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  {formState.location === 'Khác' ? (
                    <label className="block text-sm font-semibold text-slate-700">
                      Vui lòng ghi rõ địa điểm thu gom
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="text" value={formState.customLocation} onChange={(e) => setFormState((prev) => ({ ...prev, customLocation: e.target.value }))} placeholder="Ví dụ: Hành lang tòa B" />
                    </label>
                  ) : null}

                  <label className="block text-sm font-semibold text-slate-700">
                    Ghi chú thu gom
                    <textarea className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" rows="3" value={formState.note} onChange={(e) => setFormState((prev) => ({ ...prev, note: e.target.value }))} placeholder="Ví dụ: Rác gói trong túi, thu gom giờ giải lao tiết 2..."></textarea>
                  </label>

                  <div className="flex items-start gap-3">
                    <input id="agree-pickup" type="checkbox" className="mt-2 h-4 w-4 rounded border-slate-300 text-ecoGreen-600 focus:ring-ecoGreen-500" checked={formState.agree} onChange={(e) => setFormState((prev) => ({ ...prev, agree: e.target.checked }))} />
                    <label htmlFor="agree-pickup" className="text-sm leading-6 text-slate-600">
                      Tôi cam kết thông tin cung cấp chính xác và rác đã được phân loại cơ bản.
                    </label>
                  </div>

                  <button type="submit" className="w-full rounded-2xl bg-ecoGreen-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-ecoGreen-700">
                    Xác nhận đặt lịch
                  </button>
                </form>
              ) : (
                <form className="space-y-6" onSubmit={handleVolunteerSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Họ và tên*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="text" value={formState.name} onChange={(e) => setFormState((prev) => ({ ...prev, name: e.target.value }))} placeholder="Nguyễn Văn A" />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Email*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="email" value={formState.email} onChange={(e) => setFormState((prev) => ({ ...prev, email: e.target.value }))} placeholder="user@cmc.edu.vn" />
                    </label>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm font-semibold text-slate-700">
                      Số điện thoại*
                      <input className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" type="tel" value={formState.phone} onChange={(e) => setFormState((prev) => ({ ...prev, phone: e.target.value }))} placeholder="098 765 4321" />
                    </label>
                    <label className="block text-sm font-semibold text-slate-700">
                      Hình thức đăng ký*
                      <select className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" value={formState.volunteerType} onChange={(e) => setFormState((prev) => ({ ...prev, volunteerType: e.target.value }))}>
                        <option value="Đăng ký làm Đại sứ Tình nguyện viên xanh">Đăng ký làm Đại sứ Tình nguyện viên xanh</option>
                        <option value="Đồng hành gây quỹ/Tài trợ dự án">Đồng hành gây quỹ/Tài trợ dự án</option>
                        <option value="Sáng kiến xanh đóng góp khác">Sáng kiến xanh đóng góp khác</option>
                      </select>
                    </label>
                  </div>

                  <label className="block text-sm font-semibold text-slate-700">
                    Lời nhắn gửi nhóm*
                    <textarea className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-ecoGreen-500 focus:ring-2 focus:ring-ecoGreen-100" rows="4" value={formState.note} onChange={(e) => setFormState((prev) => ({ ...prev, note: e.target.value }))} placeholder="Chia sẻ mong muốn của bạn cùng Group 5..."></textarea>
                  </label>

                  <div className="flex items-start gap-3">
                    <input id="agree-volunteer" type="checkbox" className="mt-2 h-4 w-4 rounded border-slate-300 text-ecoGreen-600 focus:ring-ecoGreen-500" checked={formState.agree} onChange={(e) => setFormState((prev) => ({ ...prev, agree: e.target.checked }))} />
                    <label htmlFor="agree-volunteer" className="text-sm leading-6 text-slate-600">
                      Tôi cam kết cung cấp thông tin chính xác và sẵn sàng tham gia hành trình xanh.
                    </label>
                  </div>

                  <button type="submit" className="w-full rounded-2xl bg-ecoGreen-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-ecoGreen-700">
                    Gửi đăng ký thành viên
                  </button>
                </form>
              )}
            </section>

            <aside className="rounded-[2rem] bg-gradient-to-br from-ecoGreen-600 via-ecoBlue-600 to-slate-900 p-8 text-white shadow-2xl ring-1 ring-slate-900/10">
              <div className="space-y-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-emerald-200">Thông tin nhanh</p>
                  <h2 className="mt-3 text-3xl font-extrabold tracking-tight">Tính năng chính</h2>
                </div>
                <ul className="space-y-4 text-sm leading-7 text-slate-100">
                  <li>✅ Thu thập yêu cầu đặt lịch thu gom rác tái chế.</li>
                  <li>✅ Lưu dữ liệu vào bảng <strong>collection_schedules</strong> trên Supabase.</li>
                  <li>✅ Toast thông báo UX mượt mà sau khi gửi thành công.</li>
                  <li>✅ Gửi cảnh báo quản trị real-time qua Discord Webhook.</li>
                </ul>
                <div className="rounded-3xl bg-white/10 p-5 ring-1 ring-white/20">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-emerald-200">Hướng dẫn cấu hình</p>
                  <div className="mt-4 space-y-3 text-sm leading-6 text-slate-100/90">
                    <p>1. Tạo project trên Supabase.</p>
                    <p>2. Tạo bảng <strong>collection_schedules</strong> với cột:</p>
                    <ul className="list-disc pl-5 text-slate-100/90">
                      <li>submission_type (text)</li>
                      <li>name (text)</li>
                      <li>phone (text)</li>
                      <li>email (text)</li>
                      <li>waste_type (text)</li>
                      <li>estimated_weight_kg (numeric)</li>
                      <li>collection_location (text)</li>
                      <li>note (text)</li>
                      <li>eco_points (numeric)</li>
                      <li>created_at (timestamp)</li>
                    </ul>
                    <p>3. Dán API key vào file <code>.env</code> hoặc Vercel Environment Variables.</p>
                    <p>4. Tạo Discord Webhook và dán vào <code>VITE_DISCORD_WEBHOOK_URL</code>.</p>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-3xl border border-slate-200 bg-emerald-50 px-5 py-4 text-sm text-slate-700">
              <p className="font-semibold">Ghi chú:</p>
              <p>Supabase dùng API public key để lưu; dùng row-level security trong bảng để bảo vệ nếu deploy thực tế.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 px-5 py-4 text-sm text-slate-700">
              <p className="font-semibold">Link thật sự:</p>
              <p>Upload repo lên GitHub & deploy trước Vercel để nhận URL <code>.vercel.app</code>.</p>
            </div>
          </div>
        </section>
      </main>
      {toast ? (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast message={toast.message} type={toast.type} />
        </div>
      ) : null}
    </div>
  );
}

export default App;
