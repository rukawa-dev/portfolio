import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface TerminalProfileProps {
  totalProjectsCount?: number;
}

export const TerminalProfile: React.FC<TerminalProfileProps> = ({ totalProjectsCount = 145 }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const commandTextRef = useRef<HTMLSpanElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Stats counter refs
  const statProjectsRef = useRef<HTMLDivElement>(null);
  const statCareerRef = useRef<HTMLDivElement>(null);
  const statRateRef = useRef<HTMLDivElement>(null);
  const statCompRef = useRef<HTMLDivElement>(null);

  const [typedCommand, setTypedCommand] = useState('');
  const fullCommand = '$ cat profile.json';

  // Typing effect
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullCommand.length) {
        setTypedCommand(fullCommand.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  // GSAP Animations on Mount
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Terminal window popup
    tl.fromTo(
      containerRef.current,
      { y: 25, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', clearProps: 'transform,opacity' }
    );

    // Animate content items stagger
    if (contentRef.current) {
      const rows = contentRef.current.querySelectorAll('.meta-row');
      if (rows.length > 0) {
        tl.fromTo(
          rows,
          { x: -12, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.06, duration: 0.4, ease: 'power2.out', clearProps: 'transform,opacity' },
          '-=0.2'
        );
      }
    }

    // Number counters
    const counterObj = { projects: 0, career: 0, rate: 0, companies: 0 };

    gsap.to(counterObj, {
      projects: totalProjectsCount,
      career: 13,
      rate: 100,
      companies: 8,
      duration: 1.8,
      ease: 'power2.out',
      delay: 0.5,
      onUpdate: () => {
        if (statProjectsRef.current) {
          statProjectsRef.current.textContent = `${Math.floor(counterObj.projects)}+`;
        }
        if (statCareerRef.current) {
          statCareerRef.current.textContent = `${Math.floor(counterObj.career)}Y+`;
        }
        if (statRateRef.current) {
          statRateRef.current.textContent = `${Math.floor(counterObj.rate)}%`;
        }
        if (statCompRef.current) {
          statCompRef.current.textContent = `${Math.floor(counterObj.companies)}`;
        }
      },
    });

    // 3D Tilt interaction on mouse move
    const card = containerRef.current;
    const xTo = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2' });
    const yTo = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2' });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      xTo((x / (rect.width / 2)) * 6);
      yTo(-(y / (rect.height / 2)) * 6);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, { scope: containerRef, dependencies: [totalProjectsCount] });

  return (
    <div className="card-perspective">
      <div
        ref={containerRef}
        className="bg-[#121212] border border-[#333333] hover:border-[#00bcd4]/60 rounded-xl overflow-hidden shadow-2xl transition-colors duration-300"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Terminal Window Top Bar */}
        <div className="bg-[#1a1a1a] px-4 py-3 border-b border-[#333333] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56] hover:opacity-80 transition-opacity cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] hover:opacity-80 transition-opacity cursor-pointer" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f] hover:opacity-80 transition-opacity cursor-pointer" />
            <span className="text-xs text-[#a0a0a0] font-medium ml-2">developer.json</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#00bcd4] font-semibold bg-[#00bcd4]/10 px-2 py-0.5 rounded border border-[#00bcd4]/30">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00bcd4] animate-pulse"></span>
            ACTIVE
          </div>
        </div>

        {/* Terminal Window Content */}
        <div ref={contentRef} className="p-6">
          <div className="text-[#00bcd4] font-bold text-sm mb-3 flex items-center font-mono">
            <span ref={commandTextRef}>{typedCommand}</span>
            <span className="inline-block w-2 h-4 bg-[#00bcd4] ml-1 animate-cursor-blink" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-1 tracking-tight">
            근면성실아저씨
          </h1>
          <p className="text-[#00bcd4] text-xs font-semibold uppercase tracking-wider mb-5">
            Senior Web Publisher & Frontend Developer
          </p>

          {/* Key-Value Metadata List */}
          <div className="flex flex-col gap-2.5 text-[13px] mb-6 pb-5 border-b border-[#2a2a2a]">
            <div className="meta-row flex justify-between items-center py-1 px-2 rounded hover:bg-[#181818] transition-colors">
              <span className="text-[#a0a0a0]">Experience:</span>
              <span className="text-[#00bcd4] font-semibold">13.4 Years (2011~)</span>
            </div>
            <div className="meta-row flex justify-between items-center py-1 px-2 rounded hover:bg-[#181818] transition-colors">
              <span className="text-[#a0a0a0]">Role:</span>
              <span className="text-white font-semibold">UI/UX 수석연구원 / PL</span>
            </div>
            <div className="meta-row flex justify-between items-center py-1 px-2 rounded hover:bg-[#181818] transition-colors">
              <span className="text-[#a0a0a0]">Web Accessibility:</span>
              <span className="text-[#00bcd4] font-semibold">100% Compliant (WA)</span>
            </div>
            <div className="meta-row flex justify-between items-center py-1 px-2 rounded hover:bg-[#181818] transition-colors">
              <span className="text-[#a0a0a0]">AI Workflow:</span>
              <span className="text-white font-semibold">Antigravity / Gemini</span>
            </div>
          </div>

          {/* 2x2 Quick Stats Grid with Animated Counters */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#181818] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#00bcd4]/50 rounded-lg p-3.5 text-center transition-all duration-300 group">
              <div ref={statProjectsRef} className="text-2xl font-black text-[#00bcd4] mb-0.5 group-hover:scale-105 transition-transform">
                0+
              </div>
              <div className="text-[11px] text-[#a0a0a0] uppercase tracking-wider font-medium">Projects</div>
            </div>

            <div className="bg-[#181818] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#00bcd4]/50 rounded-lg p-3.5 text-center transition-all duration-300 group">
              <div ref={statCareerRef} className="text-2xl font-black text-[#00bcd4] mb-0.5 group-hover:scale-105 transition-transform">
                0Y+
              </div>
              <div className="text-[11px] text-[#a0a0a0] uppercase tracking-wider font-medium">Career</div>
            </div>

            <div className="bg-[#181818] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#00bcd4]/50 rounded-lg p-3.5 text-center transition-all duration-300 group">
              <div ref={statRateRef} className="text-2xl font-black text-[#00bcd4] mb-0.5 group-hover:scale-105 transition-transform">
                0%
              </div>
              <div className="text-[11px] text-[#a0a0a0] uppercase tracking-wider font-medium">Completion</div>
            </div>

            <div className="bg-[#181818] hover:bg-[#1f1f1f] border border-[#333333] hover:border-[#00bcd4]/50 rounded-lg p-3.5 text-center transition-all duration-300 group">
              <div ref={statCompRef} className="text-2xl font-black text-[#00bcd4] mb-0.5 group-hover:scale-105 transition-transform">
                0
              </div>
              <div className="text-[11px] text-[#a0a0a0] uppercase tracking-wider font-medium">Companies</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalProfile;
