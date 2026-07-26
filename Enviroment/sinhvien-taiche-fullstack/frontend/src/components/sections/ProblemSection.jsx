export default function ProblemSection() {
  return (
    <section id="problem" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
            <i className="fa-solid fa-triangle-exclamation mr-1.5"></i> Vấn đề nghiêm trọng
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Thực Trạng Rác Thải Tại Giảng Đường</h2>
          <div className="h-1 w-20 bg-ecoGreen-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Khuôn viên trường đại học năng động nhưng đang đối mặt với bài toán nan giải về rác thải nhựa và giấy dùng một lần từ sự tiện lợi hàng ngày.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          
          {/* Left: Problem Statistics */}
          <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-rose-100 text-rose-600 p-3 rounded-2xl">
                  <i className="fa-solid fa-dumpster-fire text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">1. Lượng rác thải ngày càng tăng</h3>
                  <p className="text-sm text-rose-700 font-semibold">Tăng nhanh tại giảng đường và căn tin</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Mỗi ngày, hàng ngàn ly nhựa, hộp xốp, chai nước và giấy nháp bị thải ra giảng đường, thư viện và nhà ăn. Hệ thống thu gom hiện tại chỉ dồn chung tất cả rác vào một túi nylon đen mà không hề được phân loại.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white border border-rose-100 p-4 rounded-2xl shadow-sm text-center">
                  <span className="block text-3xl font-extrabold text-rose-600">80%</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Rác có thể tái chế bị chôn lấp</span>
                </div>
                <div className="bg-white border border-rose-100 p-4 rounded-2xl shadow-sm text-center">
                  <span className="block text-3xl font-extrabold text-rose-600">500+</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Ly nhựa xả ra mỗi ngày</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-rose-100 flex items-center space-x-3 text-rose-700 text-sm font-semibold">
              <i className="fa-solid fa-circle-exclamation text-rose-500"></i>
              <span>Thùng rác công cộng hiện tại không phân loại rác thải.</span>
            </div>
          </div>

          {/* Right: Awareness Card */}
          <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-8 lg:p-10 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="bg-amber-100 text-amber-600 p-3 rounded-2xl">
                  <i className="fa-solid fa-brain text-2xl"></i>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">2. Ý thức và thói quen phân loại</h3>
                  <p className="text-sm text-amber-700 font-semibold">Sinh viên thiếu thói quen và hướng dẫn</p>
                </div>
              </div>
              <p className="text-gray-600 leading-relaxed font-medium">
                Sinh viên tuy có nhận thức tốt về việc bảo vệ môi trường, nhưng lại cực kỳ lúng túng trong hành động thực tế. Lý do chính là thiếu hệ thống thùng rác phân chia rõ rệt cùng các biển chỉ dẫn trực quan.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-white border border-amber-100 p-4 rounded-2xl shadow-sm text-center">
                  <span className="block text-3xl font-extrabold text-amber-600">75%</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Sinh viên phân loại sai cách</span>
                </div>
                <div className="bg-white border border-amber-100 p-4 rounded-2xl shadow-sm text-center">
                  <span className="block text-3xl font-extrabold text-amber-600">90%</span>
                  <span className="text-xs text-gray-500 font-bold uppercase tracking-wide">Mong muốn có trạm tái chế xanh</span>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-amber-100 flex items-center space-x-3 text-amber-700 text-sm font-semibold">
              <i className="fa-solid fa-lightbulb text-amber-500"></i>
              <span>Thói quen nhỏ của mỗi sinh viên sẽ kiến tạo đại dương xanh.</span>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 bg-gradient-to-r from-rose-500 to-ecoGreen-600 rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h4 className="text-xl font-bold mb-2">Hành trình thay đổi bắt đầu từ hôm nay</h4>
              <p className="text-sm text-white/90 font-medium">Chúng ta sẽ cùng biến đổi thói quen vứt rác tùy tiện thành một chu trình tái chế tuần hoàn khép kín.</p>
            </div>
            <div className="flex justify-start md:justify-end">
              <a href="#solution" className="bg-white text-ecoGreen-700 hover:bg-gray-100 px-6 py-3 rounded-full font-bold text-sm shadow-md transition-all">
                Xem giải pháp sáng tạo <i className="fa-solid fa-angles-down ml-1.5"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

