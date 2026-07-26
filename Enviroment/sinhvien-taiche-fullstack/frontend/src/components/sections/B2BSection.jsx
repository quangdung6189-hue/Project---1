export default function B2BSection() {
  const partners = [
    { icon: 'fa-truck', title: 'Đơn vị thu gom', desc: 'Kết nối trực tiếp nguồn rác sạch đã phân loại từ khuôn viên CMC.', color: 'text-ecoGreen-500', bg: 'bg-ecoGreen-50 border-ecoGreen-100', iconBg: 'bg-ecoGreen-100 text-ecoGreen-600' },
    { icon: 'fa-industry', title: 'Nhà máy tái chế', desc: 'Cung cấp nguyên liệu chất lượng cho quy trình tái chế công nghiệp.', color: 'text-ecoBlue-500', bg: 'bg-ecoBlue-50 border-ecoBlue-100', iconBg: 'bg-ecoBlue-100 text-ecoBlue-600' },
    { icon: 'fa-building', title: 'Nhà tài trợ', desc: 'Đồng hành gây quỹ, tài trợ hiện vật và phát triển bền vững.', color: 'text-amber-500', bg: 'bg-amber-50 border-amber-100', iconBg: 'bg-amber-100 text-amber-600' },
  ];

  const stats = [
    { num: '10+', label: 'Đối tác tiềm năng', icon: 'fa-handshake' },
    { num: '2T', label: 'Rác tái chế/tháng', icon: 'fa-recycle' },
    { num: '100%', label: 'Rác sạch phân loại', icon: 'fa-check-circle' },
  ];

  return (
    <section id="b2b" className="py-24 relative overflow-hidden bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white">
      {/* Blueprint grid background */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(34, 197, 94, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.3) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Gradient orbs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-ecoGreen-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-ecoBlue-500/8 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating elements */}
      <div className="absolute top-12 left-10 text-ecoGreen-500/10 text-8xl pointer-events-none select-none">
        <i className="fa-solid fa-handshake"></i>
      </div>
      <div className="absolute bottom-12 right-10 text-ecoBlue-500/10 text-7xl pointer-events-none select-none">
        <i className="fa-solid fa-industry"></i>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoGreen-400 text-sm font-bold uppercase tracking-wider bg-ecoGreen-900/50 border border-ecoGreen-800/50 px-3 py-1 rounded-full inline-block">
            <i className="fa-solid fa-handshake mr-1.5"></i> Đối tác chiến lược
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Cổng Đối Tác B2B</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-ecoGreen-500 to-ecoBlue-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 text-lg leading-relaxed font-medium">
            Nơi đăng ký dành cho <strong className="text-white">Đơn vị thu gom</strong> và <strong className="text-white">Nhà máy tái chế</strong>. 
            Kết nối trực tiếp nguồn rác sạch từ CMC.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Partner Types */}
          <div className="lg:col-span-7 space-y-6">
            {partners.map((partner, i) => (
              <div key={i} className="group glass-panel-dark rounded-2xl p-6 flex items-start gap-5 transition-all duration-300 hover:border-ecoGreen-500/30 hover:shadow-lg hover:shadow-ecoGreen-500/5">
                <div className={`${partner.iconBg} w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <i className={`fa-solid ${partner.icon}`}></i>
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-bold text-white mb-1">{partner.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed font-medium">{partner.desc}</p>
                </div>
                <div className="hidden sm:flex items-center justify-center">
                  <i className="fa-solid fa-arrow-right text-gray-600 group-hover:text-ecoGreen-400 group-hover:translate-x-1 transition-all duration-300"></i>
                </div>
              </div>
            ))}

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center hover:bg-white/10 transition-all duration-300">
                  <i className={`fa-solid ${stat.icon} text-ecoGreen-400 text-lg mb-2`}></i>
                  <div className="text-2xl font-extrabold text-white">{stat.num}</div>
                  <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: CTA Card */}
          <div className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-ecoGreen-500 to-ecoBlue-500 rounded-3xl blur-lg opacity-20 animate-pulse"></div>
              <div className="relative glass-panel-dark rounded-3xl p-8 space-y-6 border border-ecoGreen-800/30">
                <div className="text-center space-y-3">
                  <div className="bg-ecoGreen-900/50 border border-ecoGreen-700/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto">
                    <i className="fa-solid fa-rocket text-3xl text-ecoGreen-400"></i>
                  </div>
                  <h3 className="text-xl font-bold text-white">Trở thành đối tác xanh</h3>
                  <p className="text-sm text-gray-400 font-medium leading-relaxed">
                    Tham gia mạng lưới đối tác của SV Tái Chế để cùng xây dựng chuỗi cung ứng tái chế bền vững.
                  </p>
                </div>

                <div className="space-y-3">
                  {['Tiếp cận nguồn rác sạch phân loại', 'Hỗ trợ branding & truyền thông', 'Báo cáo dữ liệu minh bạch'].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm">
                      <span className="bg-ecoGreen-600/20 text-ecoGreen-400 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-check text-xs"></i>
                      </span>
                      <span className="text-gray-300 font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>

                <a href="#contact" className="block w-full text-center bg-gradient-to-r from-ecoGreen-600 to-ecoGreen-700 hover:from-ecoGreen-700 hover:to-ecoGreen-800 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-ecoGreen-500/20 hover:shadow-ecoGreen-500/40 hover:-translate-y-0.5">
                  <i className="fa-solid fa-pen-to-square mr-2"></i>
                  Đăng ký đối tác ngay
                </a>

                <p className="text-center text-[11px] text-gray-500 font-medium">
                  <i className="fa-solid fa-shield-halved mr-1 text-ecoGreen-500"></i>
                  Thông tin được bảo mật tuyệt đối
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
