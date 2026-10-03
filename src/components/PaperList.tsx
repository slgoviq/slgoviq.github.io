import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { Clock, BookOpen, ArrowRight, Search } from 'lucide-react';
import { currentLanguageStore, translations } from '../stores/i18nStore';

export interface PaperSummary {
  slug: string;
  title: string;
  language: string;
  durationMinutes: number;
  description?: string;
  category?: string;
  questionCount: number;
}

interface PaperListProps {
  papers: PaperSummary[];
}

export const PaperList: React.FC<PaperListProps> = ({ papers }) => {
  const currentLang = useStore(currentLanguageStore);
  const t = translations[currentLang] || translations.en;

  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | 'en' | 'si' | 'ta'>(currentLang);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedLanguageFilter(currentLang);
  }, [currentLang]);

  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesLang = selectedLanguageFilter === 'all' || paper.language === selectedLanguageFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (paper.description && paper.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (paper.category && paper.category.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesLang && matchesSearch;
    });
  }, [papers, selectedLanguageFilter, searchQuery]);

  const langBadges: Record<string, { label: string; color: string }> = {
    en: {
      label: 'English',
      color: 'bg-[#22396F]/10 text-[#22396F] border-[#22396F]/30 dark:bg-[#FCF1D0]/10 dark:text-[#FCF1D0] dark:border-[#FCF1D0]/30',
    },
    si: {
      label: 'සිංහල',
      color: 'bg-[#FCF1D0] text-[#010736] border-[#22396F]/20 dark:bg-[#22396F]/40 dark:text-[#FCF1D0] dark:border-[#22396F]',
    },
    ta: {
      label: 'தமிழ்',
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    },
  };

  return (
    <div className="space-y-6">
      {/* Search & Language Filters Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search input */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#22396F]/60 dark:text-[#FCF1D0]/60" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by keyword..."
            className="w-full rounded-xl border border-[#22396F]/20 bg-white pl-9 pr-4 py-2 text-xs sm:text-sm text-[#010736] placeholder:text-slate-400 shadow-sm transition-all focus:border-[#22396F] focus:outline-none focus:ring-2 focus:ring-[#22396F]/30 dark:border-[#22396F]/40 dark:bg-[#0D1C42] dark:text-[#FCF1D0] dark:placeholder:text-[#FCF1D0]/40"
          />
        </div>

        {/* Medium filter tabs */}
        <div className="inline-flex rounded-xl border border-[#22396F]/15 bg-white p-1 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42] self-start sm:self-auto">
          {[
            { id: 'all', label: t.allLanguages },
            { id: 'en', label: 'English' },
            { id: 'si', label: 'සිංහල' },
            { id: 'ta', label: 'தமிழ்' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedLanguageFilter(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                selectedLanguageFilter === tab.id
                  ? 'bg-[#22396F] text-[#FCF1D0] shadow-sm dark:bg-[#FCF1D0] dark:text-[#010736]'
                  : 'text-slate-600 hover:text-[#010736] dark:text-[#FCF1D0]/70 dark:hover:text-[#FCF1D0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Papers Grid */}
      {filteredPapers.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => {
            const badge = langBadges[paper.language] || langBadges.en;

            return (
              <div
                key={paper.slug}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#22396F]/15 bg-white p-5 shadow-sm transition-all hover:border-[#22396F]/50 hover:shadow-md dark:border-[#22396F]/30 dark:bg-[#0D1C42] dark:hover:border-[#FCF1D0]/50"
              >
                <div>
                  {/* Category & Language Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#22396F] dark:text-[#FCF1D0]/80 truncate max-w-[170px]">
                      {paper.category || 'General Intelligence'}
                    </span>
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-bold ${badge.color}`}
                    >
                      {badge.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold tracking-tight text-[#010736] transition-colors group-hover:text-[#22396F] dark:text-[#FCF1D0] dark:group-hover:text-white">
                    {paper.title}
                  </h3>

                  {/* Description */}
                  {paper.description && (
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate-600 dark:text-[#FCF1D0]/70">
                      {paper.description}
                    </p>
                  )}
                </div>

                {/* Card Footer: Metadata & Action */}
                <div className="mt-5 border-t border-slate-100 pt-3 dark:border-[#22396F]/20">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-[#FCF1D0]/70 mb-3">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <BookOpen className="h-3.5 w-3.5 text-[#22396F]/60 dark:text-[#FCF1D0]/60" />
                      {paper.questionCount} {t.questionsCount}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      <Clock className="h-3.5 w-3.5 text-[#22396F]/60 dark:text-[#FCF1D0]/60" />
                      {paper.durationMinutes} {t.durationMinutes}
                    </span>
                  </div>

                  <a
                    href={`/papers/${paper.slug}`}
                    className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#22396F] py-2.5 text-xs font-bold text-[#FCF1D0] shadow-sm transition-all hover:bg-[#0D1C42] focus:outline-none focus:ring-2 focus:ring-[#22396F] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
                  >
                    <span>{t.startExam}</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 p-12 text-center dark:border-slate-800">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            No examination papers match your filter criteria.
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperList;
