import Layout from './components/layout/Layout';
import HeroSection from './components/sections/HeroSection';
import ProblemSection from './components/sections/ProblemSection';
import SolutionSection from './components/sections/SolutionSection';
import HandbookSection from './components/sections/HandbookSection';
import VouchersSection from './components/sections/VouchersSection';
import B2BSection from './components/sections/B2BSection';
import RoadmapSection from './components/sections/RoadmapSection';
import TeamSection from './components/sections/TeamSection';
import ContactSection from './components/sections/ContactSection';
import WasteSortingGame from './components/game/WasteSortingGame';

function App() {
  return (
    <Layout>
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <HandbookSection />
      <VouchersSection />
      <B2BSection />
      <section id="game" className="py-24 bg-gradient-to-b from-white via-emerald-50/30 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-8 right-12 text-emerald-100/40 text-7xl pointer-events-none select-none animate-bounce" style={{ animationDuration: '5s' }}>
          <i className="fa-solid fa-gamepad"></i>
        </div>
        <div className="absolute bottom-16 left-8 text-ecoGreen-100/30 text-6xl rotate-12 pointer-events-none select-none">
          <i className="fa-solid fa-trash-can"></i>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <span className="text-emerald-600 text-sm font-bold uppercase tracking-wider bg-emerald-100/50 px-3 py-1 rounded-full">
              <i className="fa-solid fa-gamepad mr-1.5"></i> Mini Game
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Thử Tài Phân Loại Rác</h2>
            <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
            <p className="text-gray-600 text-lg leading-relaxed font-medium">
              Kiểm tra kiến thức phân loại rác thải của bạn qua mini game thú vị và tích lũy điểm thưởng!
            </p>
          </div>

          <WasteSortingGame />
        </div>
      </section>
      <RoadmapSection />
      <TeamSection />
      <ContactSection />
    </Layout>
  );
}

export default App;

