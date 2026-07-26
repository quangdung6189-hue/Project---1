export default function TeamSection() {
  const team = {
    mentor: {
      name: 'ThS. Hoàng Thu Phương',
      role: 'Giảng viên hướng dẫn',
      desc: 'Người thắp lửa ý tưởng sáng tạo, định hướng tư duy khởi nghiệp xã hội và đồng hành sát sao cùng nhóm trong suốt quá trình xây dựng đề án.',
      icon: 'fa-chalkboard-user',
    },
    members: [
      { name: 'Hoàng Mạnh Dũng', role: 'Trưởng nhóm', icon: 'fa-crown', bg: 'bg-ecoGreen-50 text-ecoGreen-600 border-ecoGreen-100', tagBg: 'bg-ecoGreen-50 text-ecoGreen-700', desc: 'Điều phối tổng thể, hoạch định tiến độ và kết nối đối tác.', tag: 'Điều phối & Đối tác', tagColor: 'text-ecoGreen-600' },
      { name: 'Đặng Quang Dũng', role: 'Kỹ thuật chính', icon: 'fa-laptop-code', bg: 'bg-ecoBlue-50 text-ecoBlue-600 border-ecoBlue-100', tagBg: 'bg-ecoBlue-50 text-ecoBlue-700', desc: 'Xây dựng hướng dẫn kỹ thuật phân loại và phát triển nền tảng số.', tag: 'Kỹ thuật & Vật liệu', tagColor: 'text-ecoBlue-600' },
      { name: 'Nguyễn Tùng Dương', role: 'Truyền thông thị giác', icon: 'fa-photo-film', bg: 'bg-purple-50 text-purple-600 border-purple-100', tagBg: 'bg-purple-50 text-purple-700', desc: 'Thiết kế poster, banner và dựng clip ngắn truyền thông.', tag: 'Thiết kế & Video', tagColor: 'text-purple-600' },
      { name: 'Lương Nguyễn Ánh Dương', role: 'Sáng tạo nội dung', icon: 'fa-pen-nib', bg: 'bg-amber-50 text-amber-600 border-amber-100', tagBg: 'bg-amber-50 text-amber-700', desc: 'Viết bài truyền thông, xây dựng kịch bản workshop.', tag: 'Viết bài & Nội dung', tagColor: 'text-amber-600' },
      { name: 'Nguyễn Như Quỳnh', role: 'Quản lý tài chính', icon: 'fa-wallet', bg: 'bg-rose-50 text-rose-600 border-rose-100', tagBg: 'bg-rose-50 text-rose-700', desc: 'Kiểm soát kinh phí, quản lý dòng tiền gây quỹ.', tag: 'Tài chính & Quỹ', tagColor: 'text-rose-600' },
      { name: 'Phạm Duy Anh', role: 'Quản lý hậu cần', icon: 'fa-truck-ramp-box', bg: 'bg-teal-50 text-teal-600 border-teal-100', tagBg: 'bg-teal-50 text-teal-700', desc: 'Giám sát trạm thu gom, điều phối tình nguyện viên.', tag: 'Hậu cần & Sự kiện', tagColor: 'text-teal-600' },
    ],
  };

  return (
    <section id="team" className="py-24 bg-ecoGreen-50/30 border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-ecoGreen-600 text-sm font-bold uppercase tracking-wider bg-ecoGreen-100/50 px-3 py-1 rounded-full">
            <i className="fa-solid fa-users-gear mr-1.5"></i> Nhân sự dự án
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Đội Ngũ Thực Hiện (Group 5)</h2>
          <div className="h-1 w-20 bg-ecoGreen-500 mx-auto rounded-full"></div>
          <p className="text-gray-600 text-lg leading-relaxed font-medium">
            Những gương mặt năng động, sáng tạo chịu trách nhiệm thiết kế, nghiên cứu và phát triển dự án.
          </p>
        </div>

        {/* Mentor */}
        <div className="max-w-md mx-auto mb-16 text-center">
          <div className="bg-white border border-ecoGreen-200 rounded-3xl p-6 shadow-md relative overflow-hidden group hover:shadow-lg transition-all">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-ecoGreen-500 to-ecoBlue-500"></div>
            <div className="w-24 h-24 bg-ecoGreen-100 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-ecoGreen-300 shadow-inner">
              <i className={`fa-solid ${team.mentor.icon} text-4xl text-ecoGreen-600`}></i>
            </div>
            <h3 className="text-xl font-bold text-gray-900">{team.mentor.name}</h3>
            <p className="text-xs text-ecoGreen-600 font-bold uppercase tracking-wider mb-3">{team.mentor.role}</p>
            <p className="text-sm text-gray-500 leading-relaxed font-medium">{team.mentor.desc}</p>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.members.map((member, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-3xl p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 shadow-sm flex flex-col justify-between">
              <div>
                <div className={`w-20 h-20 ${member.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 border shadow-sm`}>
                  <i className={`fa-solid ${member.icon} text-3xl`}></i>
                </div>
                <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                <span className={`inline-block ${member.tagBg} text-[11px] font-bold px-2.5 py-0.5 rounded-full mb-3 uppercase tracking-wide`}>
                  {member.role}
                </span>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{member.desc}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className={`text-xs ${member.tagColor} font-bold`}>
                  <i className="fa-solid fa-gears mr-1"></i> {member.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

