"use client";

import { useState, useEffect, useCallback } from "react";
import { PROJECT_TAGS, ProjectTag } from "@/data/projects";

interface ProjectFiltersProps {
    selectedTags: ProjectTag[];
    onTagsChange: (tags: ProjectTag[]) => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export default function ProjectFilters({
    selectedTags,
    onTagsChange,
    searchQuery,
    onSearchChange,
}: ProjectFiltersProps) {
    const [localSearch, setLocalSearch] = useState(searchQuery);
    const [isFocused, setIsFocused] = useState(false);

    // Debounced search
    useEffect(() => {
        const timer = setTimeout(() => {
            onSearchChange(localSearch);
        }, 300);
        return () => clearTimeout(timer);
    }, [localSearch, onSearchChange]);

    const toggleTag = useCallback(
        (tag: ProjectTag) => {
            if (selectedTags.includes(tag)) {
                onTagsChange(selectedTags.filter((t) => t !== tag));
            } else {
                onTagsChange([...selectedTags, tag]);
            }
        },
        [selectedTags, onTagsChange]
    );

    const clearFilters = useCallback(() => {
        onTagsChange([]);
        setLocalSearch("");
        onSearchChange("");
    }, [onTagsChange, onSearchChange]);

    const hasFilters = selectedTags.length > 0 || searchQuery.length > 0;

    return (
        <div className="space-y-8 animate-fade-in-up">
            {/* Search input */}
            <div className={`relative max-w-2xl mx-auto transition-all duration-300 transform ${isFocused ? 'scale-[1.02]' : ''}`}>
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    <svg
                        className={`w-5 h-5 transition-colors duration-300 ${isFocused ? 'text-indigo-500' : 'text-slate-400'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </div>
                <input
                    type="text"
                    value={localSearch}
                    onChange={(e) => setLocalSearch(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search projects..."
                    className="w-full pl-12 pr-12 py-4 bg-white/50 backdrop-blur-md border border-slate-200/60 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 shadow-sm hover:shadow-md transition-all text-slate-700 placeholder-slate-400"
                    aria-label="Search projects"
                />
                {localSearch && (
                    <button
                        onClick={() => {
                            setLocalSearch("");
                            onSearchChange("");
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all duration-200"
                        aria-label="Clear search"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>

            {/* Tag filters */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex flex-wrap justify-center gap-3">
                    {PROJECT_TAGS.map((tag) => {
                        const isSelected = selectedTags.includes(tag);
                        return (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-5 py-2.5 text-sm font-medium rounded-2xl transition-all duration-300 border ${isSelected
                                    ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                                    : "bg-white/60 border-slate-200 text-slate-600 hover:border-indigo-200 hover:bg-white hover:text-indigo-600 hover:shadow-sm backdrop-blur-sm"
                                    }`}
                                aria-pressed={isSelected}
                            >
                                {tag}
                            </button>
                        );
                    })}
                </div>

                {/* Clear filters button (below tags) */}
                <div className={`transition-all duration-300 overflow-hidden ${hasFilters ? 'max-h-12 opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'}`}>
                    <button
                        onClick={clearFilters}
                        className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-500 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-full transition-all duration-200"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-red-400 transition-colors"></span>
                        Clear all filters
                    </button>
                </div>
            </div>
        </div>
    );
}
