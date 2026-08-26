import React, { useRef } from 'react';
import { Search, X, FolderKanban } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Project, CategoryFilter, SortOption } from '../types';
import ProjectCard from './ProjectCard';

interface ProjectsShowcaseProps {
  projectsList: Project[];
  totalCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeCategory: CategoryFilter;
  setActiveCategory: (cat: CategoryFilter) => void;
  sortOption: SortOption;
  setSortOption: (sort: SortOption) => void;
  onCardClick: (project: Project) => void;
  onResetFilters: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  projectsList,
  totalCount,
  searchQuery,
  setSearchQuery,
  activeCategory,
  setActiveCategory,
  sortOption,
  setSortOption,
  onCardClick,
  onResetFilters
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'framework', label: 'React / Vue' },
    { id: 'static', label: 'Static Web' },
    { id: 'public', label: 'Public Links' },
    { id: 'private', label: 'Confidential' },
  ];

  // Animate grid cards when list changes
  useGSAP(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.children;
    if (cards.length === 0) return;

    gsap.fromTo(
      cards,
      { opacity: 0, y: 15, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.03,
        duration: 0.35,
        ease: 'power2.out',
        overwrite: 'auto',
      }
    );
  }, { scope: gridRef, dependencies: [projectsList, activeCategory, sortOption] });

  return (
    <section id="projects" ref={containerRef}>
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-5 pb-3 border-b border-[#333333]">
        <FolderKanban size={18} className="text-[#00bcd4]" />
        <span className="text-[#00bcd4] text-sm font-semibold">// Portfolio Gallery</span>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">Projects Showcase</h2>
      </div>

      {/* Toolbar (Search, Filter, Sort) */}
      <div className="bg-[#121212] border border-[#333333] hover:border-[#00bcd4]/50 rounded-xl p-4 sm:p-5 flex flex-col gap-4 shadow-xl transition-colors duration-300">
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
          {/* Search Input Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a0a0a0]" size={16} />
            <input
              type="text"
              className="w-full bg-black border border-[#333333] focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] rounded-lg py-2.5 pl-9 pr-9 text-sm text-white placeholder:text-[#666666] outline-none transition-all"
              placeholder="프로젝트명, 고객사, 기술 스택 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoComplete="off"
            />
            {searchQuery && (
              <button
                type="button"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#a0a0a0] hover:text-white p-1 cursor-pointer transition-colors"
                onClick={() => setSearchQuery('')}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <select
            className="bg-black border border-[#333333] focus:border-[#00bcd4] focus:ring-1 focus:ring-[#00bcd4] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#e0e0e0] outline-none cursor-pointer transition-all"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="newest">최신순 (Newest)</option>
            <option value="oldest">오래된순 (Oldest)</option>
            <option value="name">가나다순 (Alphabetical)</option>
          </select>
        </div>

        {/* Filter Buttons Group & Counter */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#222222]">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#00bcd4] text-black font-bold shadow-[0_0_12px_rgba(0,188,212,0.4)] scale-105'
                      : 'bg-[#181818] hover:bg-[#252525] text-[#a0a0a0] hover:text-white border border-[#333333] hover:border-[#555]'
                  }`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-[#a0a0a0] ml-auto font-mono">
            Showing <span className="text-[#00bcd4] font-bold">{projectsList.length}</span> /{' '}
            <span className="text-[#00bcd4] font-bold">{totalCount}</span>
          </div>
        </div>
      </div>

      {/* Projects Grid with GSAP Stagger */}
      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {projectsList.length > 0 ? (
          projectsList.map((p, idx) => {
            const displayIndex = String(projectsList.length - idx).padStart(2, '0');
            return (
              <ProjectCard
                key={`${p.name}-${idx}`}
                project={p}
                displayIndex={displayIndex}
                onCardClick={onCardClick}
              />
            );
          })
        ) : (
          <div className="col-span-full py-16 px-5 text-center bg-[#121212] border border-[#333333] rounded-xl shadow-lg">
            <div className="text-base font-bold text-white mb-2">$ grep: no matching projects found</div>
            <div className="text-xs text-[#a0a0a0] mb-5">검색어나 필터 조건에 일치하는 프로젝트가 없습니다.</div>
            <button
              onClick={onResetFilters}
              className="px-5 py-2.5 bg-[#00bcd4] hover:bg-[#26c6da] text-black font-bold text-xs rounded-lg transition-all shadow-md hover:scale-105 cursor-pointer"
            >
              필터 초기화 (Reset Filters)
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
