import React, { useRef, useEffect } from 'react';
import { X, ExternalLink, Building, Calendar, Award } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Project } from '../types';

interface DetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ project, onClose }) => {
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // GSAP Entry Animation
  useGSAP(() => {
    if (!project || !modalBoxRef.current || !backdropRef.current) return;

    gsap.fromTo(
      backdropRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    );

    gsap.fromTo(
      modalBoxRef.current,
      { opacity: 0, scale: 0.92, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: 'back.out(1.5)' }
    );
  }, { dependencies: [project] });

  if (!project) return null;

  const getTechBadgeClass = (techStr: string) => {
    const t = (techStr || '').toLowerCase();
    if (t.includes('react')) return 'border-[#00bcd4]/50 text-[#00bcd4] bg-[#00bcd4]/15';
    if (t.includes('vue')) return 'border-[#27c93f]/50 text-[#27c93f] bg-[#27c93f]/15';
    if (t.includes('actionscript')) return 'border-[#ffbd2e]/50 text-[#ffbd2e] bg-[#ffbd2e]/15';
    return 'border-[#a0a0a0]/30 text-[#e0e0e0] bg-[#1a1a1a]';
  };

  const getTechLabel = (techStr: string) => {
    const t = (techStr || '').toLowerCase();
    if (t.includes('react')) return 'React.js';
    if (t.includes('vue')) return 'Vue.js';
    if (t.includes('actionscript')) return 'ActionScript 3.0';
    return 'Static Web';
  };

  const hasLink = project.link && project.link.startsWith('http');

  const handleCloseAnimation = () => {
    if (!modalBoxRef.current || !backdropRef.current) {
      onClose();
      return;
    }

    gsap.to(modalBoxRef.current, {
      opacity: 0,
      scale: 0.92,
      y: 15,
      duration: 0.2,
      ease: 'power2.in',
    });

    gsap.to(backdropRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: onClose,
    });
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseAnimation();
      }}
    >
      <div
        ref={modalBoxRef}
        className="bg-[#121212] border border-[#00bcd4] rounded-2xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_0_50px_rgba(0,188,212,0.25)] overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-[#00bcd4]/15 blur-2xl -z-0" />

        <button
          className="absolute top-4 right-4 bg-[#1a1a1a] hover:bg-[#2a2a2a] border border-[#333333] hover:border-[#a0a0a0] text-[#a0a0a0] hover:text-white w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shadow-md"
          onClick={handleCloseAnimation}
        >
          <X size={17} />
        </button>

        <div className={`text-[11px] font-bold uppercase px-3 py-1 rounded-full border inline-block mb-3.5 ${getTechBadgeClass(project.tech)}`}>
          {getTechLabel(project.tech)}
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 pr-8 leading-snug">
          {project.name}
        </h3>

        <div className="grid grid-cols-2 gap-3.5 mb-7">
          <div className="bg-black/70 border border-[#2a2a2a] p-3.5 rounded-xl">
            <div className="text-[11px] text-[#a0a0a0] uppercase flex items-center gap-1.5 mb-1">
              <Building size={12} className="text-[#00bcd4]" />
              <span>Client</span>
            </div>
            <div className="text-sm font-semibold text-white truncate">{project.client || '-'}</div>
          </div>

          <div className="bg-black/70 border border-[#2a2a2a] p-3.5 rounded-xl">
            <div className="text-[11px] text-[#a0a0a0] uppercase flex items-center gap-1.5 mb-1">
              <Award size={12} className="text-[#00bcd4]" />
              <span>기여도</span>
            </div>
            <div className="text-sm font-semibold text-white">{project.role || '100%'}</div>
          </div>

          <div className="bg-black/70 border border-[#2a2a2a] p-3.5 rounded-xl">
            <div className="text-[11px] text-[#a0a0a0] uppercase flex items-center gap-1.5 mb-1">
              <Calendar size={12} className="text-[#00bcd4]" />
              <span>Start Date</span>
            </div>
            <div className="text-sm font-semibold text-white">{project.start || '-'}</div>
          </div>

          <div className="bg-black/70 border border-[#2a2a2a] p-3.5 rounded-xl">
            <div className="text-[11px] text-[#a0a0a0] uppercase flex items-center gap-1.5 mb-1">
              <Calendar size={12} className="text-[#00bcd4]" />
              <span>End Date</span>
            </div>
            <div className="text-sm font-semibold text-white">{project.end || '-'}</div>
          </div>
        </div>

        {hasLink ? (
          <div>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3.5 bg-[#00bcd4] hover:bg-[#26c6da] text-black font-bold text-sm rounded-xl transition-all shadow-[0_0_20px_rgba(0,188,212,0.35)] hover:scale-[1.02]"
            >
              <span>Visit Live Website</span>
              <ExternalLink size={16} />
            </a>
          </div>
        ) : (
          <div className="text-center py-3 bg-[#181818] border border-[#333333] rounded-xl text-xs text-[#888888] font-mono">
            비공개 또는 내부 인트라넷 프로젝트입니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailModal;
