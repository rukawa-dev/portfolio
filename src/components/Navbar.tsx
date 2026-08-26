import React, { useState, useEffect } from 'react';
import { Mail, Terminal } from 'lucide-react';

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

        {/* Action Button */}
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, 'contact')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#00bcd4] hover:bg-[#26c6da] text-black rounded-xl text-xs sm:text-sm font-bold transition-all hover:scale-105 shadow-[0_0_15px_rgba(0,188,212,0.3)] cursor-pointer"
        >
          <Mail size={15} />
          <span>Contact Me</span>
        </a>
      </div>
    </header>
  );
};

export default Navbar;
