/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

interface SortDropdownProps {
  sortBy: 'featured' | 'newest' | 'licensed' | 'trending';
  onSelect: (option: 'featured' | 'newest' | 'licensed' | 'trending') => void;
}

export default function SortDropdown({ sortBy, onSelect }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const getLabel = () => {
    switch (sortBy) {
      case 'featured': return 'Featured';
      case 'newest': return 'Newest';
      case 'licensed': return 'Most Licensed';
      case 'trending': return 'Trending';
    }
  };

  const options = [
    { id: 'featured', label: 'Featured' },
    { id: 'newest', label: 'Newest' },
    { id: 'licensed', label: 'Most Licensed' },
    { id: 'trending', label: 'Trending' }
  ] as const;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative shrink-0 text-left font-manrope font-semibold" ref={containerRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3.5 bg-[#10131A] border border-[#262B36] rounded-xl text-xs text-[#98A2B3] hover:text-[#F5F7FA] flex items-center gap-2 transition-all cursor-pointer"
      >
        <SlidersHorizontal className="w-3.5 h-3.5 text-[#555E6B]" />
        <span>Sort by: {getLabel()}</span>
        <ChevronDown className={`w-3 h-3 text-[#555E6B] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-44 bg-[#10131A] border border-[#262B36] rounded-xl shadow-2xl overflow-hidden py-1 z-50">
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-xs transition-colors hover:bg-[#161A22] ${
                sortBy === option.id ? 'text-[#C7FF4D]' : 'text-[#98A2B3] hover:text-white'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
