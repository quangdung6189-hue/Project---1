import { useState, useEffect } from 'react';
import { SITE_CONFIG, NAV_LINKS } from '../../utils/constants';

export default function Header() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass-panel shadow-lg shadow-ecoGreen-500/5'
          : 'bg-transparent'
      }`}
    >
      {/* Scan line effect */}
      <div className="scan-line-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-3 group">
              <div className="bg-ecoGreen-100/80 p-2.5 rounded-full flex items-center justify-center shadow-lg shadow-ecoGreen-500/10 group-hover:shadow-ecoGreen-500/20 transition-all duration-300">
                <i className="fa-solid fa-recycle text-ecoGreen-600 text-2xl animate-spin-slow"></i>
              </div>
              <div>
                <span className="text-xl font-bold bg-gradient-to-r from-ecoGreen-600 to-ecoBlue-600 bg-clip-text text-transparent">
                  {SITE_CONFIG.name}
                </span>
                <p className="text-[9px] text-gray-500 tracking-wider font-semibold uppercase leading-3">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-gray-600">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="nav-link hover:text-ecoGreen-600 transition-colors relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-ecoGreen-500 to-ecoBlue-500 group-hover:w-full transition-all duration-300"></span>
                </button>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <button
                onClick={() => scrollToSection('contact')}
                className="relative overflow-hidden bg-gradient-to-r from-ecoGreen-600 to-ecoGreen-700 hover:from-ecoGreen-700 hover:to-ecoGreen-800 text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-lg shadow-ecoGreen-500/20 hover:shadow-ecoGreen-500/35 transition-all duration-300 group"
              >
                <span className="relative z-10 flex items-center">
                  <i className="fa-solid fa-leaf mr-2 group-hover:rotate-12 transition-transform duration-300"></i>
                  Tham gia ngay
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-ecoGreen-400 to-ecoGreen-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="text-gray-600 hover:text-ecoGreen-600 focus:outline-none transition-colors p-2"
                aria-label="Toggle menu"
              >
                <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-[9px]' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block h-0.5 w-full bg-current rounded transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-[9px]' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isMobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="glass-panel border-t border-ecoGreen-100/50 px-4 sm:px-6 lg:px-8 py-4 space-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left font-semibold text-gray-600 hover:text-ecoGreen-600 py-2 px-3 rounded-xl hover:bg-ecoGreen-50/50 transition-all duration-200"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2">
              <button
                onClick={() => scrollToSection('contact')}
                className="w-full text-center bg-gradient-to-r from-ecoGreen-600 to-ecoGreen-700 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-ecoGreen-500/20 transition-all duration-300"
              >
                <i className="fa-solid fa-leaf mr-2"></i>Tham Gia Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

