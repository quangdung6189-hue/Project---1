import { SITE_CONFIG, SOCIAL_LINKS } from '../../utils/constants';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-400 pt-20 pb-8 overflow-hidden">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-ecoGreen-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-ecoBlue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top row: Newsletter / CTA */}
        <div className="glass-panel-dark rounded-3xl p-8 mb-16 text-center max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-2">Cùng chung tay hành động xanh</h3>
          <p className="text-sm text-gray-400 mb-6">
            Đăng ký nhận bản tin và cập nhật những hoạt động mới nhất từ Group 5
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Email của bạn..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10 text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ecoGreen-500/50 focus:border-ecoGreen-500 transition-all"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-ecoGreen-600 to-ecoGreen-700 hover:from-ecoGreen-700 hover:to-ecoGreen-800 text-white font-bold rounded-xl text-sm transition-all duration-300 shadow-lg shadow-ecoGreen-500/20">
              <i className="fa-solid fa-paper-plane mr-2"></i>Đăng ký
            </button>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left: Brand + Description */}
          <div className="md:col-span-5 space-y-5 text-center md:text-left">
            <button onClick={scrollToTop} className="flex items-center space-x-3 group">
              <div className="bg-ecoGreen-950 border border-ecoGreen-800 p-2.5 rounded-xl flex items-center justify-center group-hover:border-ecoGreen-500 transition-all duration-300">
                <i className="fa-solid fa-recycle text-ecoGreen-500 text-xl animate-spin-slow"></i>
              </div>
              <div>
                <span className="text-lg font-bold text-white tracking-wide group-hover:text-ecoGreen-400 transition-colors">{SITE_CONFIG.name}</span>
                <p className="text-[9px] text-ecoGreen-500 tracking-wider font-semibold uppercase leading-3">{SITE_CONFIG.tagline}</p>
              </div>
            </button>
            <p className="text-sm leading-relaxed text-gray-400 max-w-md font-medium">
              Dự án xã hội vì môi trường xanh giảng đường. Kiến tạo thói quen tốt cho hôm nay và phát triển mô hình tuần hoàn vì tương lai CMC.
            </p>
            {/* Quick links */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-gray-500 font-medium">
              <a href="#hero" className="hover:text-ecoGreen-400 transition-colors">Trang chủ</a>
              <a href="#handbook" className="hover:text-ecoGreen-400 transition-colors">Cẩm nang</a>
              <a href="#vouchers" className="hover:text-ecoGreen-400 transition-colors">Cửa hàng</a>
              <a href="#team" className="hover:text-ecoGreen-400 transition-colors">Đội ngũ</a>
              <a href="#contact" className="hover:text-ecoGreen-400 transition-colors">Liên hệ</a>
            </div>
          </div>

          {/* Middle: Course Info */}
          <div className="md:col-span-3 text-center md:text-left space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Môn học</h4>
            <div className="space-y-2 text-sm">
              <p className="text-gray-300 font-medium">{SITE_CONFIG.subject}</p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <i className="fa-solid fa-chalkboard-user text-ecoGreen-500"></i>
                Giảng viên: {SITE_CONFIG.instructor}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <i className="fa-solid fa-users text-ecoBlue-500"></i>
                {SITE_CONFIG.group} - {SITE_CONFIG.class}
              </p>
              <p className="text-xs text-gray-500 flex items-center gap-2">
                <i className="fa-solid fa-location-dot text-amber-500"></i>
                {SITE_CONFIG.campus}
              </p>
            </div>
          </div>

          {/* Right: Social + Contact */}
          <div className="md:col-span-4 text-center md:text-right space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Kết nối</h4>
            <p className="text-xs text-gray-400">{SITE_CONFIG.university}</p>
            <div className="flex justify-center md:justify-end space-x-3 pt-1">
              {SOCIAL_LINKS.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-ecoGreen-600/20 border border-white/10 hover:border-ecoGreen-500/30 text-gray-400 hover:text-ecoGreen-400 flex items-center justify-center transition-all duration-300 text-base"
                  aria-label={link.label}
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
            {/* Contact info */}
            <div className="space-y-1 text-xs text-gray-500">
              <p><i className="fa-regular fa-envelope mr-1.5 text-ecoGreen-500"></i>svtaiche.cmc@gmail.com</p>
              <p><i className="fa-regular fa-clock mr-1.5 text-ecoBlue-500"></i>Phản hồi trong 24h</p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 border-t border-gray-800/80" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500 font-medium">
          <p>
            © 2026 {SITE_CONFIG.group} - {SITE_CONFIG.class} - {SITE_CONFIG.university}. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-ecoGreen-400 transition-colors group"
          >
            <span>Lên đầu trang</span>
            <span className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-ecoGreen-600/20 group-hover:border-ecoGreen-500/30 transition-all">
              <i className="fa-solid fa-arrow-up text-xs"></i>
            </span>
          </button>
        </div>

        <p className="mt-4 text-[10px] text-gray-600 text-center">
          Sản phẩm đồ án cuối khóa học của các chiến binh môi trường CMC.
        </p>
      </div>
    </footer>
  );
}

