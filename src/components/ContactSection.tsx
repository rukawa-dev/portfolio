import React, { useState, useRef } from 'react';
import { Mail, Check, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const email = 'dol2156phone@gmail.com';

  useGSAP(() => {
    if (!containerRef.current) return;

    gsap.from(containerRef.current, {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  }, { scope: containerRef });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }).catch(() => {
      window.location.href = `mailto:${email}`;
    });
  };

  return (
    <section id="contact" ref={containerRef} className="mt-4">
      <div className="relative bg-gradient-to-b from-[#121212] to-[#0a0a0a] border border-[#333333] hover:border-[#00bcd4]/60 rounded-2xl p-8 sm:p-10 text-center shadow-2xl transition-all duration-300 overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#00bcd4]/10 blur-3xl -z-0" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00bcd4]/10 border border-[#00bcd4]/30 text-[#00bcd4] text-xs font-mono mb-4">
            <Terminal size={13} />
            <span>$ ./contact_me.sh</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2.5 tracking-tight">
            Let's Build Something Great Together
          </h2>
          <p className="text-sm text-[#a0a0a0] max-w-lg mx-auto mb-8 leading-relaxed">
            새로운 프로젝트 협업 및 프론트엔드/퍼블리싱 포지션 제안을 환영합니다.<br className="hidden sm:inline" />
            이메일을 통해 편리하게 문의해 주세요.
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-4">
            <button
              type="button"
              onClick={handleCopyEmail}
              className={`inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 cursor-pointer shadow-lg hover:scale-105 ${
                copied
                  ? 'bg-[#27c93f] text-black shadow-[0_0_20px_rgba(39,201,63,0.4)]'
                  : 'bg-[#00bcd4] hover:bg-[#26c6da] text-black shadow-[0_0_20px_rgba(0,188,212,0.35)]'
              }`}
            >
              {copied ? <Check size={18} className="stroke-[3]" /> : <Mail size={18} />}
              <span>{copied ? '이메일 주소 복사 완료!' : `${email} (이메일 복사)`}</span>
            </button>

            <a
              href="https://github.com/rukawa-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#181818] hover:bg-[#222222] border border-[#333333] hover:border-[#a0a0a0] text-white font-bold text-sm rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#00bcd4]">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
                <path d="M9 18c-4.51 2-5-2-7-2"></path>
              </svg>
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
