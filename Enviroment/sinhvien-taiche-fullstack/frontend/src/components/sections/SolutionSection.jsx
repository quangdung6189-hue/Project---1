export default function SolutionSection() {
  return (
    <section id="solution" className="py-24 bg-ecoGreen-50/50 border-y border-ecoGreen-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
            <i className="fa-solid fa-wand-magic-sparkles mr-1.5"></i> Dự án của chúng tôi
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Giải Pháp & Tính Độc Đáo</h2>
          <div className="h-1 w-20 bg-ecoGreen-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Mô hình cốt lõi của chúng tôi là thành lập một hệ thống trạm thu gom phân loại rác và kết nối quy trình tái chế sản phẩm nghệ thuật bán lấy quỹ hoạt động lâu dài.
          </p>
        </div>

        {/* Core Concept Card */}
        <div className="bg-white border border-ecoGreen-100 rounded-3xl p-8 lg:p-12 shadow-md mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="bg-ecoGreen-100 text-ecoGreen-600 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mx-auto lg:mx-0 shadow-inner">
                <i className="fa-solid fa-cubes-stacked"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Mô hình cốt lõi</h3>
              <p className="text-gray-500 font-semibold text-xs uppercase tracking-wide">Trạm Thu Gom Xanh Bền Vững</p>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">
                Hệ thống thu gom, phân loại và hỗ trợ tái chế rác thải hoạt động thường xuyên trong khuôn viên trường học.
              </p>
            </div>
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Bố trí thông minh', desc: 'Đặt các trạm phân loại tại vị trí đắc địa: canteen, cổng ra vào, sảnh chính.', color: 'text-ecoGreen-500' },
                { num: '2', title: 'Đại sứ xanh', desc: 'Tình nguyện viên hướng dẫn phân loại trực quan cho sinh viên tại trạm thu gom.', color: 'text-ecoBlue-500' },
                { num: '3', title: 'Khép kín chu kỳ', desc: 'Rác tái chế chuyển hóa trực tiếp thành đồ lưu niệm, chậu cây nghệ thuật.', color: 'text-amber-500' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center shadow-sm mx-auto mb-4 text-lg font-bold">
                    <span className={item.color}>{item.num}</span>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3 Pillars */}
        <h3 className="text-2xl font-bold text-gray-900 text-center mb-10">3 Trụ Cột Hành Động</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {[
            {
              icon: 'fa-graduation-cap',
              bg: 'bg-emerald-50 text-emerald-600',
              title: 'Giáo dục & Tuyên truyền',
              desc: 'Tổ chức định kỳ các buổi workshop chia sẻ kỹ năng tái chế và các chiến dịch truyền thông trực tuyến hấp dẫn.',
              tag: 'Workshop 2 tuần/lần',
              tagColor: 'text-emerald-600',
            },
            {
              icon: 'fa-palette',
              bg: 'bg-purple-50 text-purple-600',
              title: 'Nghệ thuật sáng tạo',
              desc: 'Khuyến khích sinh viên tự thiết kế và biến các vật liệu phế thải thành tác phẩm nghệ thuật độc đáo.',
              tag: 'Tái chế nghệ thuật 100%',
              tagColor: 'text-purple-600',
            },
            {
              icon: 'fa-globe',
              bg: 'bg-sky-50 text-sky-600',
              title: 'Công nghệ & Gây quỹ',
              desc: 'Số hóa quy trình tích điểm đổi quà thông qua mạng xã hội, bán đấu giá sản phẩm tái chế.',
              tag: 'Kinh tế tuần hoàn bền vững',
              tagColor: 'text-sky-600',
            },
          ].map((pillar, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm flex flex-col justify-between">
              <div className="space-y-4">
                <div className={`${pillar.bg} w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-inner`}>
                  <i className={`fa-solid ${pillar.icon}`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{pillar.title}</h4>
                <p className="text-gray-600 text-sm leading-relaxed font-medium">{pillar.desc}</p>
              </div>
              <div className={`mt-6 pt-4 border-t border-gray-100 flex items-center text-xs font-bold ${pillar.tagColor}`}>
                <i className="fa-solid fa-circle-check mr-1.5"></i>{pillar.tag}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

