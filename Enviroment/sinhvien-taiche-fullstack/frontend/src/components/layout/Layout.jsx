import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Header />
      <main>{children}</main>
      <Footer />

      {/* Floating Scroll-to-Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-ecoGreen-600 to-ecoGreen-700 text-white shadow-lg shadow-ecoGreen-500/30 flex items-center justify-center transition-all duration-500 hover:shadow-ecoGreen-500/50 hover:scale-110 hover:-translate-y-1 group ${
          showScrollTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
        aria-label="Lên đầu trang"
      >
        <i className="fa-solid fa-arrow-up text-sm group-hover:-translate-y-0.5 transition-transform duration-200"></i>
        {/* Glow ring */}
        <span className="absolute inset-0 rounded-full bg-ecoGreen-400/20 animate-ping pointer-events-none" style={{ animationDuration: '3s' }}></span>
      </button>
    </div>
  );
}
