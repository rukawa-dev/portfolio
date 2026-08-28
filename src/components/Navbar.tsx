import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elem = document.getElementById(id);
    if (elem) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = elem.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-[#333333] py-3 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
          : 'bg-black/60 backdrop-blur-md border-b border-[#222222]/80 py-4'
      }`}
    >
      <div className="max-w-[1280px] mx-auto flex justify-between items-center">
        {/* Brand Terminal Path */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2 text-white font-bold text-sm sm:text-base hover:opacity-90 transition-opacity group"
        >
          <div className="w-7 h-7 rounded-lg bg-[#00bcd4]/15 border border-[#00bcd4]/40 flex items-center justify-center text-[#00bcd4] group-hover:scale-105 transition-transform">
            <Terminal size={15} />
          </div>
          <span className="font-mono">
            <span className="text-[#00bcd4] font-extrabold mr-1">$</span>
            <span className="text-white group-hover:text-[#00bcd4] transition-colors">~/근면성실아저씨</span>
          </span>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {[
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'career', label: 'Career' },
            { id: 'contact', label: 'Contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => scrollToSection(e, item.id)}
              className="text-[#a0a0a0] hover:text-[#00bcd4] text-xs font-semibold uppercase tracking-wider transition-colors duration-200"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Button: GitHub Link */}
        <a
          href="https://github.com/rukawa-dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00bcd4] hover:bg-[#26c6da] text-black rounded-xl text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,188,212,0.3)] cursor-pointer"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
            <path d="M9 18c-4.51 2-5-2-7-2"></path>
          </svg>
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
