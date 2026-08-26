import React, { useState, useMemo, useRef, useEffect } from 'react';
import gsap from 'gsap';
import Navbar from './components/Navbar';
import TerminalProfile from './components/TerminalProfile';
import SkillsCard from './components/SkillsCard';
import ProjectsShowcase from './components/ProjectsShowcase';
import CareerTimeline from './components/CareerTimeline';
import ContactSection from './components/ContactSection';
import DetailModal from './components/DetailModal';
import { projectsData } from './data/projects';
import { Project, CategoryFilter, SortOption } from './types';

export const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const glowOrbRef = useRef<HTMLDivElement>(null);

  // Smooth ambient mouse glow follower
  useEffect(() => {
    if (!glowOrbRef.current) return;
    const orb = glowOrbRef.current;

    const xTo = gsap.quickTo(orb, 'x', { duration: 0.8, ease: 'power2.out' });
    const yTo = gsap.quickTo(orb, 'y', { duration: 0.8, ease: 'power2.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const processedProjects = useMemo(() => {
    return projectsData
      .filter((p) => {
        const tech = (p.tech || '').toLowerCase();
        const hasValidLink = p.link && p.link.startsWith('http');

        if (activeCategory === 'framework' && !tech.includes('react') && !tech.includes('vue')) return false;
        if (activeCategory === 'static' && (tech.includes('react') || tech.includes('vue'))) return false;
        if (activeCategory === 'public' && !hasValidLink) return false;
        if (activeCategory === 'private' && hasValidLink) return false;

        if (searchQuery) {
          const q = searchQuery.toLowerCase();
          const nameMatch = (p.name || '').toLowerCase().includes(q);
          const clientMatch = (p.client || '').toLowerCase().includes(q);
          const techMatch = (p.tech || '').toLowerCase().includes(q);
          if (!nameMatch && !clientMatch && !techMatch) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOption === 'name') {
          return (a.name || '').localeCompare(b.name || '', 'ko');
        } else if (sortOption === 'oldest') {
          return (a.start || '').localeCompare(b.start || '');
        } else {
          return (b.start || '').localeCompare(a.start || '');
        }
      });
  }, [searchQuery, activeCategory, sortOption]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setSortOption('newest');
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#e0e0e0] font-mono relative selection:bg-[#00bcd4] selection:text-black">
      {/* Interactive Cursor Ambient Glow */}
      <div
        ref={glowOrbRef}
        className="pointer-events-none fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#00bcd4]/8 rounded-full blur-[100px] -z-0"
      />

      {/* Cyber Grid Background */}
      <div className="terminal-grid-bg" />

      {/* Fixed Top Header Navbar */}
      <Navbar />

      {/* Main Container with Top Padding for Fixed Header */}
      <div className="relative z-10 max-w-[1280px] mx-auto px-4 sm:px-6 pt-24 pb-12 sm:pt-28 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 sm:gap-10 items-start">
          {/* Left Sticky Sidebar */}
          <aside className="lg:sticky lg:top-24 flex flex-col gap-6" id="about">
            <TerminalProfile totalProjectsCount={projectsData.length} />
            <SkillsCard />
          </aside>

          {/* Right Main Content Column */}
          <main className="flex flex-col gap-10 sm:gap-12 min-w-0">
            <ProjectsShowcase
              projectsList={processedProjects}
              totalCount={projectsData.length}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              sortOption={sortOption}
              setSortOption={setSortOption}
              onCardClick={(project) => setSelectedProject(project)}
              onResetFilters={handleResetFilters}
            />

            <CareerTimeline />

            <ContactSection />
          </main>
        </div>
      </div>

      {/* Quick View Detail Modal */}
      <DetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#222222] py-8 text-center text-xs text-[#888888]">
        <p>&copy; 2026 근면성실아저씨. Built with React 19, TypeScript, Tailwind CSS & GSAP Animations.</p>
      </footer>
    </div>
  );
};

export default App;
