export default function HeroSection() {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-ecoGreen-50 via-ecoGreen-100/30 to-white pt-16 pb-28 md:pt-24 md:pb-36">
      {/* Floating Eco Elements */}
      <div className="absolute top-12 left-10 text-ecoGreen-200/50 text-7xl animate-bounce" style={{ animationDuration: '6s' }}>
        <i className="fa-solid fa-leaf"></i>
      </div>
      <div className="absolute top-1/2 right-12 text-ecoBlue-200/50 text-6xl animate-pulse">
        <i className="fa-solid fa-seedling"></i>
      </div>
      <div className="absolute bottom-20 left-1/4 text-ecoGreen-200/40 text-5xl rotate-45">
        <i className="fa-solid fa-earth-asia"></i>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Content */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center space-x-2 bg-ecoGreen-100/80 border border-ecoGreen-200 text-ecoGreen-800 rounded-full py-1.5 px-4 text-xs sm:text-sm font-semibold shadow-sm">
              <span className="bg-ecoGreen-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full mr-1">CMC UNIVERSITY</span>
              <span>Môn học: Kỹ Năng Mềm & Tư Duy Khởi Nghiệp</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Sinh Viên Tái Chế – <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-ecoGreen-600 via-ecoGreen-500 to-ecoBlue-500 bg-clip-text text-transparent">Hành Động Xanh</span> <br />
              Vì Tương Lai
            </h1>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Dự án xã hội hướng tới xây dựng mô hình phân loại và tái chế rác thải bền vững tại khuôn viên trường học, phát huy vai trò chủ động của cộng đồng sinh viên.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <a href="#solution" className="w-full sm:w-auto bg-ecoGreen-600 hover:bg-ecoGreen-700 text-white px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-ecoGreen-500/20 hover:shadow-ecoGreen-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                Khám phá mô hình <i className="fa-solid fa-arrow-right ml-2"></i>
              </a>
              <a href="#contact" className="w-full sm:w-auto bg-white hover:bg-gray-50 text-ecoGreen-700 border border-ecoGreen-200 px-8 py-4 rounded-full text-base font-bold shadow-md hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center">
                Tham gia cùng chúng tôi <i className="fa-solid fa-users ml-2 text-ecoGreen-500"></i>
              </a>
            </div>

            <div className="pt-8 border-t border-gray-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Lớp học</span>
                  <span className="text-base font-bold text-gray-800">Lớp N04</span>
                </div>
                <div className="border-x border-gray-200 px-4">
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Nhóm</span>
                  <span className="text-base font-bold text-gray-800">Group 5</span>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Địa điểm</span>
                  <span className="text-base font-bold text-gray-800">CMC Uni</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-[420px] lg:max-w-none">
              <div className="absolute -inset-2 bg-gradient-to-r from-ecoGreen-400 to-ecoBlue-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
              
              <div className="relative bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-3">
                    <div className="bg-ecoGreen-100 text-ecoGreen-600 p-2 rounded-xl">
                      <i className="fa-solid fa-chart-line text-lg"></i>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Mục tiêu Xanh 2026</h3>
                      <p className="text-xs text-ecoGreen-600 font-semibold">Đo lường mức độ ảnh hưởng</p>
                    </div>
                  </div>
                  <span className="bg-ecoBlue-50 text-ecoBlue-600 text-[10px] font-bold px-2 py-1 rounded-md uppercase">Đang triển khai</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Rác thải nhựa được phân loại</span>
                      <span className="text-ecoGreen-600">85% Mục tiêu</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-ecoGreen-500 h-2.5 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Thu gom giấy văn phòng & carton</span>
                      <span className="text-ecoBlue-500">92% Mục tiêu</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-ecoBlue-500 h-2.5 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs font-bold text-gray-700 mb-1.5">
                      <span>Nhận thức sinh viên gia tăng</span>
                      <span className="text-amber-500 font-bold">100% Cam kết</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-ecoGreen-50 to-ecoBlue-50 border border-ecoGreen-100 rounded-2xl p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="bg-white rounded-full p-2 shadow-sm text-ecoGreen-600 text-lg">
                      <i className="fa-solid fa-gift"></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-semibold leading-3">Tích lũy điểm xanh</p>
                      <h4 className="text-sm font-bold text-gray-800">Đổi quà tái chế độc đáo</h4>
                    </div>
                  </div>
                  <span className="bg-ecoGreen-600 text-white rounded-lg px-2.5 py-1 text-xs font-bold shadow-sm">Hot</span>
                </div>

                <div className="text-center text-xs text-gray-400 italic">
                  "Nhỏ bé nhưng kiên trì, từng vỏ chai đều có một tương lai mới."
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="custom-shape-divider-bottom-1689230000">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V120H0C51.16,113.62,112.55,94.39,172,78,231.42,61.61,291.4,62.8,321.39,56.44Z" className="shape-fill"></path>
        </svg>
      </div>
    </section>
  );
}

