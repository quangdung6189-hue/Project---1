export default function RoadmapSection() {
  const phases = [
    { num: '1', tag: 'Tháng 1 - Nghiên cứu', title: 'Nghiên cứu & Phân tích thực trạng', desc: 'Thực hiện các khảo sát trực quan hành vi xả rác và nhu cầu phân loại tại các khoa học, căn tin. Thống kê khối lượng rác thải hàng tuần.' },
    { num: '2', tag: 'Tháng 2 - Thiết kế', title: 'Thiết kế giải pháp & Bố trí trạm', desc: 'Sản xuất các mẫu thùng rác bắt mắt, dán nhãn decal phân loại trực quan. Bố trí thí điểm tại 3 điểm sảnh chính.' },
    { num: '3', tag: 'Tháng 3 & 4 - Hoạt động', title: 'Triển khai chiến dịch & Cuộc thi Xanh', desc: 'Kích hoạt đội ngũ đại sứ hướng dẫn tại trạm. Tổ chức cuộc thi sáng tạo sản phẩm tái chế nghệ thuật cấp trường.' },
    { num: '4', tag: 'Tháng 5 & 6 - Bàn giao', title: 'Kiểm thử, đánh giá & Bàn giao vận hành', desc: 'Đánh giá lượng rác thu gom, tổng kết hiệu quả. Bàn giao quy trình và phối hợp với Đoàn Thanh niên/Hội Sinh viên duy trì hoạt động.' },
  ];

  return (
    <section id="roadmap" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
            <i className="fa-solid fa-timeline mr-1.5"></i> Lộ trình & Tài chính
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Kế Hoạch Triển Khai & Gây Quỹ</h2>
          <div className="h-1 w-20 bg-ecoGreen-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Lộ trình rõ ràng qua 4 giai đoạn cùng chiến lược tài chính tự chủ vững vàng.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Timeline */}
          <div className="lg:col-span-7 space-y-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <i className="fa-solid fa-route text-ecoGreen-600 mr-3"></i>Timeline 4 Giai Đoạn
            </h3>
            <div className="relative border-l-2 border-ecoGreen-100 pl-6 ml-4 space-y-8">
              {phases.map((phase, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[35px] top-1.5 bg-ecoGreen-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shadow-md ring-4 ring-ecoGreen-100">
                    {phase.num}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-ecoGreen-600 bg-ecoGreen-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{phase.tag}</span>
                    <h4 className="text-lg font-bold text-gray-900 mt-1">{phase.title}</h4>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed font-medium">{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Plan */}
          <div className="lg:col-span-5 space-y-8 bg-gray-50 border border-gray-100 rounded-3xl p-6 sm:p-8">
            <h3 className="text-2xl font-bold text-gray-900 flex items-center">
              <i className="fa-solid fa-coins text-ecoGreen-600 mr-3"></i>Phương Án Tài Chính
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">
              Để tự chủ vận hành dự án, chúng tôi xây dựng dòng vốn thông minh kết hợp nỗ lực tự thân và sự ủng hộ từ cộng đồng.
            </p>

            <div className="space-y-6 pt-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-800 flex items-center">
                    <span className="w-3 h-3 bg-ecoGreen-500 rounded-full mr-2"></span>Gây quỹ bên lề (Bán sản phẩm)
                  </span>
                  <span className="font-extrabold text-ecoGreen-600 text-base">70%</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-ecoGreen-500 h-4 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <p className="text-xs text-gray-500 leading-normal pl-5 font-medium">
                  Tổ chức quầy hàng lưu niệm xanh, bán chậu cây tái chế và sản phẩm sáng tạo đạt giải.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-gray-800 flex items-center">
                    <span className="w-3 h-3 bg-ecoBlue-500 rounded-full mr-2"></span>Gọi vốn cộng đồng (Crowdfunding)
                  </span>
                  <span className="font-extrabold text-ecoBlue-600 text-base">30%</span>
                </div>
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div className="bg-ecoBlue-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-xs text-gray-500 leading-normal pl-5 font-medium">
                  Kêu gọi tài trợ từ giảng viên, doanh nghiệp đối tác và sinh viên toàn trường.
                </p>
              </div>
            </div>

            <div className="bg-white border border-ecoGreen-200 p-4 rounded-2xl flex items-start space-x-3 mt-6 shadow-sm">
              <div className="bg-ecoGreen-100 text-ecoGreen-600 p-2 rounded-xl mt-0.5">
                <i className="fa-solid fa-shield-halved text-sm"></i>
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-800 uppercase tracking-wider">Cam kết 6 tháng tối thiểu</h4>
                <p className="text-[11px] text-gray-500 leading-normal font-medium mt-0.5">
                  Đoàn Thanh niên và Hội Sinh viên cam kết hỗ trợ nhân lực và điều phối chiến dịch truyền thông lâu dài.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

