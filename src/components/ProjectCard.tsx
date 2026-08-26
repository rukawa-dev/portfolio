import React, { useRef, useState } from 'react';
import { ExternalLink, Lock, Building, Calendar, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  displayIndex: string;
  onCardClick: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, displayIndex, onCardClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = -((y - centerY) / centerY) * 5;
    const rotateY = ((x - centerX) / centerX) * 5;

    gsap.to(cardRef.current, {
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
    });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  return (
    <div className="card-perspective">
      <div
        ref={cardRef}
        onClick={() => onCardClick(project)}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative bg-[#121212] hover:bg-[#181818] border border-[#333333] hover:border-[#00bcd4] rounded-xl p-5 flex flex-col justify-between transition-colors duration-200 cursor-pointer group shadow-lg overflow-hidden h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Mouse Spotlight Glow */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px rounded-xl opacity-100 transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 188, 212, 0.12), transparent 70%)`,
            }}
          />
        )}

        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3.5">
            <span className={`text-[11px] font-bold uppercase px-2.5 py-0.5 rounded-full border ${getTechBadgeClass(project.tech)}`}>
              {getTechLabel(project.tech)}
            </span>
            <span className="text-xs text-[#666666] font-mono font-bold group-hover:text-[#00bcd4] transition-colors">
              #{displayIndex}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-bold text-white mb-3 leading-snug group-hover:text-[#00bcd4] transition-colors flex items-start justify-between gap-2">
            <span>{project.name}</span>
            <ArrowUpRight size={16} className="text-[#666666] group-hover:text-[#00bcd4] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-0.5" />
          </h3>

          <div className="flex flex-col gap-1.5 text-xs text-[#a0a0a0] mb-4">
            <div className="flex items-center gap-2">
              <Building size={13} className="text-[#00bcd4] shrink-0" />
              <span className="truncate font-medium">{project.client || 'Client'}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={13} className="text-[#00bcd4] shrink-0" />
              <span>{project.start || '-'} ~ {project.end || '-'}</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-3.5 border-t border-[#262626] flex items-center justify-between text-xs">
          <span className="text-[#888888] font-mono">기여도: {project.role || '100%'}</span>
          {hasLink ? (
            <span className="inline-flex items-center gap-1 text-[#00bcd4] font-semibold">
              Live Demo <ExternalLink size={13} />
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[#666666]">
              <Lock size={12} /> Confidential
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
