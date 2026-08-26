import React, { useRef } from 'react';
import { Code2, Layers, Bot, Sparkles } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export const SkillsCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current.querySelectorAll('.skill-category'), {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.4,
    });

    gsap.from(cardRef.current.querySelectorAll('.skill-pill'), {
      scale: 0.85,
      opacity: 0,
      stagger: 0.03,
      duration: 0.4,
      ease: 'back.out(1.7)',
      delay: 0.6,
    });
  }, { scope: cardRef });

  return (
    <div
      ref={cardRef}
      className="bg-[#121212] border border-[#333333] hover:border-[#00bcd4]/60 rounded-xl p-6 shadow-xl transition-colors duration-300"
      id="skills"
    >
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#2a2a2a]">
        <div className="flex items-center gap-2 text-white font-bold text-base">
          <Sparkles size={16} className="text-[#00bcd4] animate-pulse" />
          <span>Tech Stack & Competencies</span>
        </div>
        <span className="text-[10px] text-[#00bcd4] bg-[#00bcd4]/10 border border-[#00bcd4]/30 px-2 py-0.5 rounded">
          CORE
        </span>
      </div>

      {/* Category 1 */}
      <div className="skill-category mb-5">
        <div className="text-xs font-bold text-[#00bcd4] mb-2.5 flex items-center gap-2 uppercase tracking-wider">
          <Code2 size={15} />
          <span>Publishing & Markup (100%)</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['HTML5', 'CSS3 / SCSS', 'JavaScript (ES6+)', 'Tailwind CSS', '웹접근성(WA)', '반응형 웹', 'jQuery'].map((skill, i) => (
            <span
              key={skill}
              className={`skill-pill px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-default hover:scale-105 hover:-translate-y-0.5 ${
                i < 5
                  ? 'bg-[#00bcd4]/10 border border-[#00bcd4]/40 text-[#00bcd4] hover:bg-[#00bcd4]/25 hover:shadow-[0_0_12px_rgba(0,188,212,0.3)]'
                  : 'bg-[#1a1a1a] border border-[#333333] text-[#e0e0e0] hover:border-[#a0a0a0]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Category 2 */}
      <div className="skill-category mb-5">
        <div className="text-xs font-bold text-[#00bcd4] mb-2.5 flex items-center gap-2 uppercase tracking-wider">
          <Layers size={15} />
          <span>Frameworks & Frontend</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['React.js', 'Vue.js', 'Next.js', 'Nuxt.js', 'Node.js', 'PHP'].map((skill, i) => (
            <span
              key={skill}
              className={`skill-pill px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-default hover:scale-105 hover:-translate-y-0.5 ${
                i < 2
                  ? 'bg-[#00bcd4]/10 border border-[#00bcd4]/40 text-[#00bcd4] hover:bg-[#00bcd4]/25 hover:shadow-[0_0_12px_rgba(0,188,212,0.3)]'
                  : 'bg-[#1a1a1a] border border-[#333333] text-[#e0e0e0] hover:border-[#a0a0a0]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Category 3 */}
      <div className="skill-category">
        <div className="text-xs font-bold text-[#00bcd4] mb-2.5 flex items-center gap-2 uppercase tracking-wider">
          <Bot size={15} />
          <span>AI Tools & Productivity</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['Antigravity IDE', 'Gemini / AI Agent', 'Figma / Framer', 'Git / GitHub'].map((skill, i) => (
            <span
              key={skill}
              className={`skill-pill px-3 py-1 rounded-md text-xs font-semibold transition-all duration-200 cursor-default hover:scale-105 hover:-translate-y-0.5 ${
                i < 2
                  ? 'bg-[#00bcd4]/10 border border-[#00bcd4]/40 text-[#00bcd4] hover:bg-[#00bcd4]/25 hover:shadow-[0_0_12px_rgba(0,188,212,0.3)]'
                  : 'bg-[#1a1a1a] border border-[#333333] text-[#e0e0e0] hover:border-[#a0a0a0]'
              }`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsCard;
