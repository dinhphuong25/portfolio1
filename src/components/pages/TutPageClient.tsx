"use client";

import { useState, useEffect, useMemo } from "react";
import { tutorialsEn, tutorialsVi, getTutorialsByCategory, searchTutorials, tutorialCategoriesEn, tutorialCategoriesVi } from "@/data/tutorials";
import TutCard from "@/components/TutCard";
import Reveal from "@/components/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export default function TutPageClient() {
    const { language } = useLanguage();
    const isVi = language === 'vi';

    const tutorials = isVi ? tutorialsVi : tutorialsEn;
    const tutorialCategories = isVi ? tutorialCategoriesVi : tutorialCategoriesEn;
    const ALL_CATEGORY = isVi ? "Tất cả" : "All";

    const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
    const [searchQuery, setSearchQuery] = useState("");

    // Điều chỉnh filter "All" khi chuyển đổi ngôn ngữ
    useEffect(() => {
        if (activeCategory === "All" && isVi) setActiveCategory("Tất cả");
        if (activeCategory === "Tất cả" && !isVi) setActiveCategory("All");
    }, [isVi, activeCategory]);

    const hasTutorials = tutorials.length > 0;
    const hasActiveFilters = activeCategory !== ALL_CATEGORY || searchQuery.trim().length > 0;

    const filteredTutorials = useMemo(() => {
        let results = tutorials;

        if (activeCategory !== ALL_CATEGORY) {
            results = getTutorialsByCategory(activeCategory, language);
        }

        if (searchQuery.trim()) {
            const searchResults = searchTutorials(searchQuery, language);
            results = results.filter(tutorial =>
                searchResults.some(sr => sr.id === tutorial.id)
            );
        }

        return results;
    }, [activeCategory, searchQuery, tutorials, language, ALL_CATEGORY]);

    return (
        <>
            <div className="max-w-6xl mx-auto py-0 px-0 sm:py-4 sm:px-4 lg:py-6 lg:px-6 lg:pr-6">
                <div className="bg-white sm:rounded-2xl shadow-sm sm:border border-slate-200 p-5 sm:p-6 lg:p-8">
                    <Reveal direction="down" delay={100}>
                        <div className="mb-6 space-y-2">
                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                                {isVi ? 'Hướng Dẫn & Tài Liệu' : 'Tutorials & Guides'}
                            </h1>
                            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                                {isVi ? 'Học hỏi từ kinh nghiệm thực tiễn của tôi về hệ thống Logistics và Lập trình Web. Tất cả đều miễn phí.' : 'Learn from my experience in logistics and web development. Free tutorials, guides, and insights.'}
                            </p>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={150}>
                        <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {tutorialCategories.map((category, index) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98] ${activeCategory === category
                                            ? "bg-slate-900 text-white shadow-md"
                                            : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                                        }`}
                                    style={{ animationDelay: `${100 + index * 40}ms` }}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-64 flex-shrink-0">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg
                                    className="h-4 w-4 text-slate-400"
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
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={isVi ? 'Tìm kiếm...' : 'Search tutorials...'}
                                className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
                            />
                            </div>
                        </div>
                    </Reveal>

                    <Reveal direction="up" delay={200}>
                        <div className="mb-5 flex items-center gap-3">
                        <p className="text-xs sm:text-sm font-semibold text-slate-600">
                            <span className="text-slate-900">{filteredTutorials.length}</span> {isVi ? 'tài liệu' : (filteredTutorials.length === 1 ? "tutorial" : "tutorials")}
                        </p>
                            <div className="h-px bg-slate-200 flex-1"></div>
                        </div>
                    </Reveal>

                    {filteredTutorials.length > 0 ? (
                        <div key={`${activeCategory}-${searchQuery}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                            {filteredTutorials.map((tutorial, index) => (
                                <Reveal key={tutorial.id} direction="up" delay={250 + index * 50}>
                                    <TutCard tutorial={tutorial} />
                                </Reveal>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-12 text-center">
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 mb-1">{isVi ? 'Không tìm thấy hướng dẫn' : 'No tutorials found'}</h3>
                            <p className="text-sm text-slate-600 mb-6 max-w-xs mx-auto">
                                {isVi ? 'Chưa có nội dung nào phù hợp.' : 'No content available yet.'}
                            </p>
                            {hasTutorials && hasActiveFilters && (
                                <button
                                    onClick={() => {
                                        setActiveCategory(ALL_CATEGORY);
                                        setSearchQuery("");
                                    }}
                                    className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold rounded-lg hover:bg-slate-800 hover:shadow-md transition-all duration-200 active:scale-95"
                                >
                                    {isVi ? 'Xoá bộ lọc' : 'Clear filters'}
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
