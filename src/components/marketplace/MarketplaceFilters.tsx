/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import CategoryPill from './CategoryPill';
import SortDropdown from './SortDropdown';
import { Search } from 'lucide-react';

interface MarketplaceFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
  sortBy: 'featured' | 'newest' | 'licensed' | 'trending';
  onSortSelect: (way: 'featured' | 'newest' | 'licensed' | 'trending') => void;
}

export default function MarketplaceFilters({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategorySelect,
  sortBy,
  onSortSelect
}: MarketplaceFiltersProps) {
  const categories = [
    'All Categories',
    'Art',
    'Photography',
    '3D',
    'Video',
    'Music'
  ];

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 select-none" id="marketplace-filters-panel">
      {/* Categories Horizontal stack */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1 md:pb-0 scroll-smooth flex-1">
        {categories.map((cat) => (
          <CategoryPill
            key={cat}
            label={cat}
            isActive={activeCategory === cat}
            onClick={() => onCategorySelect(cat)}
          />
        ))}
      </div>

      {/* Right control box: Search input + Sorting selector */}
      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="relative flex-1 md:w-56">
          <span className="absolute left-3 top-[11px] text-[#555E6B]">
            <Search className="w-3.5 h-3.5" />
          </span>
          <input
            type="text"
            placeholder="Search verified items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#10131A] border border-[#262B36] rounded-xl pl-9 pr-3.5 py-1.5 h-9 text-xs text-white placeholder-[#555E6B] focus:outline-none focus:border-[#C7FF4D]/60 transition-all font-sans text-left"
          />
        </div>

        <SortDropdown sortBy={sortBy} onSelect={onSortSelect} />
      </div>
    </div>
  );
}
