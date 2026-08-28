import React, { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { careerData } from '../data/career';

gsap.registerPlugin(ScrollTrigger);

export const CareerTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;

    // Animate the vertical timeline line on scroll
    if (timelineLineRef.current) {
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          transformOrigin: 'top center',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 85%',
            scrub: 0.5,
          },
        }
      );
    }

    // Animate each timeline card on scroll
    const items = containerRef.current.querySelectorAll('.timeline-item');
    items.forEach((item) => {
      gsap.fromTo(
        item,
        { opacity: 0, x: 30, scale: 0.96 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <section id="career" ref={containerRef} className="relative">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6 pb-3 border-b border-[#333333]">
        <Briefcase size={18} className="text-[#00bcd4]" />
        <span className="text-[#00bcd4] text-sm font-semibold">// Work Experience</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Career Timeline</h2>
      </div>

      <div className="relative pl-8 sm:pl-10">
        {/* Background static line */}
        <div className="absolute left-4 sm:left-5 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-[#222222]" />

        {/* Animated glowing cyan line on scroll */}
        <div
          ref={timelineLineRef}
          className="absolute left-4 sm:left-5 top-4 bottom-4 w-[2px] -translate-x-1/2 bg-gradient-to-b from-[#00bcd4] via-[#26c6da] to-[#00bcd4] shadow-[0_0_8px_rgba(0,188,212,0.8)] z-10"
        />

        <div className="flex flex-col gap-6">
          {careerData.map((item, idx) => (
            <div key={`${item.company}-${idx}`} className="timeline-item relative group">
              {/* Timeline Node Icon */}
              <div className="absolute -left-4 sm:-left-5 -translate-x-1/2 top-5 z-20 w-6 h-6 rounded-full bg-[#121212] border-2 border-[#00bcd4] flex items-center justify-center shadow-[0_0_10px_rgba(0,188,212,0.4)] group-hover:scale-110 group-hover:bg-[#00bcd4] transition-all duration-300">
                <div className="w-2 h-2 rounded-full bg-[#00bcd4] group-hover:bg-black transition-colors" />
              </div>

              {/* Career Content Card */}
              <div className="bg-[#121212] hover:bg-[#181818] border border-[#333333] hover:border-[#00bcd4]/60 rounded-xl p-5 sm:p-6 transition-all duration-300 shadow-lg group-hover:-translate-y-0.5">
                <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2 mb-2">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00bcd4] transition-colors">
                      {item.company}
                    </h3>
                    <div className="text-xs sm:text-sm text-[#00bcd4] font-semibold flex items-center gap-1.5 mt-0.5">
                      <CheckCircle2 size={13} />
                      <span>{item.role}</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-1.5 text-xs text-[#a0a0a0] bg-[#1a1a1a] px-3 py-1 rounded-full border border-[#333333] whitespace-nowrap self-start font-mono">
                    <Calendar size={12} className="text-[#00bcd4]" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed mt-2.5">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareerTimeline;
