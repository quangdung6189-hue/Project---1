export default function VouchersSection() {
  const vouchers = [
    { icon: 'fa-mug-hot', title: 'Voucher Coffee', points: 200, badge: 'Hot', badgeColor: 'bg-rose-500', desc: 'Đổi ngay 1 ly cà phê tại canteen CMC', gradient: 'from-amber-500 to-orange-500' },
    { icon: 'fa-gift', title: 'Quà tái chế', points: 300, badge: 'Mới', badgeColor: 'bg-ecoGreen-600', desc: 'Sản phẩm thủ công từ vật liệu tái chế', gradient: 'from-ecoGreen-500 to-emerald-500' },
    { icon: 'fa-store', title: 'Shopee 50k', points: 400, badge: null, badgeColor: '', desc: 'Mã giảm giá 50.000đ trên Shopee', gradient: 'from-ecoBlue-500 to-sky-500' },
    { icon: 'fa-ticket', title: 'Voucher CGV', points: 500, badge: 'Premium', badgeColor: 'bg-purple-600', desc: '1 vé xem phim 2D tại rạp CGV', gradient: 'from-purple-500 to-indigo-500' },
  ];

  return (
    <section id="vouchers" className="py-24 relative overflow-hidden bg-gradient-to-b from-white via-ecoBlue-50/40 to-white border-b border-gray-100">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 text-ecoBlue-100/40 text-8xl animate-pulse pointer-events-none select-none">
        <i className="fa-solid fa-coins"></i>
      </div>
      <div className="absolute bottom-16 left-8 text-ecoGreen-100/30 text-7xl rotate-12 pointer-events-none select-none" style={{ animationDuration: '8s' }}>
        <i className="fa-solid fa-gift"></i>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ecoBlue-200/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoBlue-600 text-sm font-bold uppercase tracking-wider bg-ecoBlue-100/50 px-3 py-1 rounded-full">
            <i className="fa-solid fa-store mr-1.5"></i> Cửa hàng Eco
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Cửa Hàng Voucher & Quà Tặng</h2>
          <div className="h-1 w-20 bg-ecoBlue-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Đổi điểm thưởng tích lũy từ việc nộp rác sạch lấy voucher mua sắm và quà tặng hấp dẫn.
          </p>
        </div>

        {/* How it works - mini steps */}
        <div className="flex flex-wrap justify-center gap-6 mb-14">
          {[
            { step: '1', icon: 'fa-recycle', text: 'Thu gom rác sạch' },
            { step: '2', icon: 'fa-star', text: 'Tích điểm EcoValue' },
            { step: '3', icon: 'fa-gift', text: 'Đổi voucher yêu thích' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3 bg-white/80 backdrop-blur-sm border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
              <div className="bg-ecoBlue-100 text-ecoBlue-600 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shadow-inner">
                {item.step}
              </div>
              <div className="flex items-center gap-2">
                <i className={`fa-solid ${item.icon} text-ecoBlue-500 text-sm`}></i>
                <span className="text-sm font-semibold text-gray-700">{item.text}</span>
              </div>
              {i < 2 && <i className="fa-solid fa-chevron-right text-gray-300 text-xs ml-2 hidden sm:inline"></i>}
            </div>
          ))}
        </div>

        {/* Voucher Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {vouchers.map((v, i) => (
            <div key={i} className="group relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2">
              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${v.gradient}`}></div>

              {/* Badge */}
              {v.badge && (
                <div className="absolute top-5 right-4 z-10">
                  <span className={`${v.badgeColor} text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-md animate-pulse`}>
                    {v.badge}
                  </span>
                </div>
              )}

              <div className="p-6 text-center space-y-4">
                {/* Icon with animated background */}
                <div className="relative mx-auto w-20 h-20">
                  <div className={`absolute inset-0 bg-gradient-to-br ${v.gradient} rounded-2xl opacity-10 group-hover:opacity-20 group-hover:scale-110 transition-all duration-500`}></div>
                  <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center">
                    <i className={`fa-solid ${v.icon} text-3xl bg-gradient-to-br ${v.gradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}></i>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{v.title}</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed font-medium">{v.desc}</p>
                </div>

                {/* Points */}
                <div className="bg-gray-50 border border-gray-100 rounded-2xl py-3 px-4">
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-ecoBlue-600 to-ecoGreen-600 bg-clip-text text-transparent">
                    {v.points.toLocaleString()}
                  </span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wider ml-1">Points</span>
                </div>

                {/* Redeem button */}
                <button className={`w-full bg-gradient-to-r ${v.gradient} text-white font-bold py-2.5 rounded-xl text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-lg hover:shadow-xl`}>
                  <i className="fa-solid fa-cart-shopping mr-1.5"></i>Đổi ngay
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center space-y-3">
          <p className="text-sm text-gray-500 font-medium">
            <i className="fa-solid fa-info-circle mr-1.5 text-ecoBlue-500"></i>
            Đăng ký thành viên để bắt đầu tích lũy điểm Eco ngay hôm nay!
          </p>
          <a href="#contact" className="inline-flex items-center gap-2 bg-gradient-to-r from-ecoBlue-500 to-ecoGreen-500 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-ecoBlue-500/20 hover:shadow-ecoBlue-500/40 hover:-translate-y-0.5 transition-all duration-300 text-sm">
            <i className="fa-solid fa-user-plus"></i>
            Đăng ký tích điểm
          </a>
        </div>
      </div>
    </section>
  );
}
