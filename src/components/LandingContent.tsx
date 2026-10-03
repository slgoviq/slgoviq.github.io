import React, { useState, useMemo, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import {
  Timer,
  Zap,
  ShieldCheck,
  Languages,
  BookOpen,
  Clock,
  ArrowRight,
  Search,
  HelpCircle,
  ChevronDown,
  CheckCircle2,
} from 'lucide-react';
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

interface LandingContentProps {
  papers: PaperSummary[];
}

export const LandingContent: React.FC<LandingContentProps> = ({ papers }) => {
  const currentLang = useStore(currentLanguageStore);
  const t = translations[currentLang] || translations.en;

  // Medium filter: starts as 'all' so Googlebot indexes all 6 papers in static HTML
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<'all' | 'en' | 'si' | 'ta'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const isFirstRender = React.useRef(true);

  // Synchronize filter when user changes global language in Header (after initial load)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setSelectedLanguageFilter(currentLang);
  }, [currentLang]);

  // Filter papers
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

  const filterTabs: { id: 'all' | 'si' | 'en' | 'ta'; label: string }[] = [
    { id: 'all', label: t.filterAll },
    { id: 'si', label: 'සිංහල (Sinhala)' },
    { id: 'en', label: 'English' },
    { id: 'ta', label: 'தமிழ் (Tamil)' },
  ];

  return (
    <div className="space-y-16">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION (Dynamic Language Reactive & Custom Palette) */}
      {/* ========================================================================= */}
      <section className="text-center pt-2">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#22396F]/20 bg-[#FCF1D0] px-3.5 py-1 text-xs font-bold text-[#010736] shadow-sm dark:border-[#22396F] dark:bg-[#0D1C42] dark:text-[#FCF1D0] mb-5">
          <span className="h-2 w-2 rounded-full bg-[#22396F] dark:bg-[#FCF1D0] animate-pulse"></span>
          <span>{t.heroBadge}</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#010736] dark:text-[#FCF1D0] max-w-3xl mx-auto leading-tight">
          {t.heroTitle}{' '}
          <span className="text-[#22396F] underline decoration-[#FCF1D0] underline-offset-8 dark:text-[#FCF1D0] dark:decoration-[#22396F]">
            {t.heroTitleHighlight}
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 dark:text-[#FCF1D0]/80 leading-relaxed font-normal">
          {t.heroSubtitle}
        </p>

        {/* Quick Value Metrics */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-600 dark:text-[#FCF1D0]/80">
          <div className="flex items-center gap-1.5 font-medium">
            <Timer className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0]" />
            <span>{t.metricTimer}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Zap className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0]" />
            <span>{t.metricMethods}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <Languages className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0]" />
            <span>{t.metricLangs}</span>
          </div>
          <div className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0]" />
            <span>{t.metricFree}</span>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. PAPERS EXPLORER SECTION */}
      {/* ========================================================================= */}
      <section id="papers" className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#010736] dark:text-[#FCF1D0]">
            {t.papersHeading}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-[#FCF1D0]/70">
            {t.papersSubheading}
          </p>
        </div>

        {/* Filter Controls & Search */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#22396F]/60 dark:text-[#FCF1D0]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-[#22396F]/20 bg-white pl-9 pr-4 py-2.5 text-xs sm:text-sm text-[#010736] placeholder:text-slate-400 shadow-sm transition-all focus:border-[#22396F] focus:outline-none focus:ring-2 focus:ring-[#22396F]/30 dark:border-[#22396F]/40 dark:bg-[#0D1C42] dark:text-[#FCF1D0] dark:placeholder:text-[#FCF1D0]/40"
            />
          </div>

          {/* Medium Tabs */}
          <div className="inline-flex rounded-xl border border-[#22396F]/15 bg-white p-1 dark:border-[#22396F]/30 dark:bg-[#0D1C42] overflow-x-auto shadow-sm">
            {filterTabs.map((tab) => {
              const active = selectedLanguageFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedLanguageFilter(tab.id)}
                  type="button"
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold whitespace-nowrap transition-all ${
                    active
                      ? 'bg-[#22396F] text-[#FCF1D0] shadow-sm dark:bg-[#FCF1D0] dark:text-[#010736]'
                      : 'text-slate-600 hover:text-[#010736] dark:text-[#FCF1D0]/70 dark:hover:text-[#FCF1D0]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Papers Grid */}
        {filteredPapers.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
          <div className="rounded-2xl border border-dashed border-[#22396F]/30 p-12 text-center dark:border-[#22396F]/50">
            <p className="text-sm font-medium text-slate-500 dark:text-[#FCF1D0]/70">
              {t.noPapersFound}
            </p>
          </div>
        )}
      </section>

      {/* ========================================================================= */}
      {/* 3. VALUE PROPOSITIONS / FEATURES SECTION */}
      {/* ========================================================================= */}
      <section className="border-t border-[#22396F]/15 dark:border-[#22396F]/30 pt-12">
        <div className="grid gap-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#22396F]/15 bg-white p-5 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCF1D0] text-[#010736] shadow-sm dark:bg-[#010736] dark:text-[#FCF1D0] mb-3.5">
              <Timer className="h-5 w-5 text-[#22396F] dark:text-[#FCF1D0]" />
            </div>
            <h3 className="text-sm font-bold text-[#010736] dark:text-[#FCF1D0]">
              {t.feature1Title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-[#FCF1D0]/75 leading-relaxed">
              {t.feature1Desc}
            </p>
          </div>

          <div className="rounded-2xl border border-[#22396F]/15 bg-white p-5 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCF1D0] text-[#010736] shadow-sm dark:bg-[#010736] dark:text-[#FCF1D0] mb-3.5">
              <Zap className="h-5 w-5 text-[#22396F] dark:text-[#FCF1D0]" />
            </div>
            <h3 className="text-sm font-bold text-[#010736] dark:text-[#FCF1D0]">
              {t.feature2Title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-[#FCF1D0]/75 leading-relaxed">
              {t.feature2Desc}
            </p>
          </div>

          <div className="rounded-2xl border border-[#22396F]/15 bg-white p-5 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42]">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FCF1D0] text-[#010736] shadow-sm dark:bg-[#010736] dark:text-[#FCF1D0] mb-3.5">
              <Languages className="h-5 w-5 text-[#22396F] dark:text-[#FCF1D0]" />
            </div>
            <h3 className="text-sm font-bold text-[#010736] dark:text-[#FCF1D0]">
              {t.feature3Title}
            </h3>
            <p className="mt-1.5 text-xs text-slate-600 dark:text-[#FCF1D0]/75 leading-relaxed">
              {t.feature3Desc}
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. FREQUENTLY ASKED QUESTIONS (FAQ) INTERACTIVE ACCORDION */}
      {/* ========================================================================= */}
      <section className="border-t border-[#22396F]/15 dark:border-[#22396F]/30 pt-12 pb-4">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#22396F] dark:text-[#FCF1D0] mb-1">
              <HelpCircle className="h-4 w-4" />
              <span>Sri Lanka Gov Exam FAQ</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-[#010736] dark:text-[#FCF1D0]">
              {t.faqHeading}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#FCF1D0]/70">
              {t.faqSubheading}
            </p>
          </div>

          <div className="space-y-3">
            {t.faqList.map((item, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-[#22396F]/15 bg-white transition-all dark:border-[#22396F]/30 dark:bg-[#0D1C42] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between p-4 text-left text-sm font-bold text-[#010736] transition-colors hover:text-[#22396F] dark:text-[#FCF1D0] dark:hover:text-white"
                  >
                    <span className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0] shrink-0" />
                      {item.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ml-2 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#22396F]/10 px-4 py-3 text-xs sm:text-sm text-slate-700 dark:border-[#22396F]/20 dark:text-[#FCF1D0]/90 leading-relaxed bg-[#FCF1D0]/20 dark:bg-[#010736]/60">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingContent;
