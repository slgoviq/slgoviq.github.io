import React, { useState, useEffect, useRef } from 'react';
import { useStore } from '@nanostores/react';
import { Sun, Moon, Globe, ChevronDown, Check, GraduationCap } from 'lucide-react';
import { themeStore, toggleTheme, initTheme } from '../stores/themeStore';
import { currentLanguageStore, setLanguage, initLanguage, translations, type Language } from '../stores/i18nStore';

interface HeaderProps {
  currentPath?: string;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/' }) => {
  const currentLang = useStore(currentLanguageStore);
  const currentTheme = useStore(themeStore);
  const [mounted, setMounted] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const t = translations[currentLang] || translations.en;

  useEffect(() => {
    setMounted(true);
    initTheme();
    initLanguage();

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLangDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languageOptions: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'si', label: 'Sinhala', native: 'සිංහල' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#22396F]/15 bg-white/95 backdrop-blur-md transition-colors duration-200 dark:border-[#0D1C42] dark:bg-[#010736]/95">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        {/* Brand Logo & Tag */}
        <a
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#22396F] rounded-lg"
          aria-label="SLGovIQ Home"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#010736] text-[#FCF1D0] shadow-sm transition-transform group-hover:scale-105 dark:bg-[#FCF1D0] dark:text-[#010736]">
            <GraduationCap className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold tracking-tight text-[#010736] dark:text-[#FCF1D0] font-sans">
                {t.appName}
              </span>
              <span className="rounded bg-[#FCF1D0] px-1.5 py-0.5 text-[10px] font-bold text-[#010736] border border-[#22396F]/20 dark:bg-[#0D1C42] dark:text-[#FCF1D0] dark:border-[#22396F]/50">
                PRO
              </span>
            </div>
            <span className="hidden sm:inline text-[11px] font-medium text-slate-500 dark:text-[#FCF1D0]/70">
              {t.appBadge}
            </span>
          </div>
        </a>

        {/* Right Controls: Navigation, Language Selector, Theme Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Back to papers button if not on home */}
          {currentPath !== '/' && (
            <a
              href="/"
              className="hidden sm:inline-flex items-center text-xs font-medium text-slate-600 hover:text-[#010736] dark:text-[#FCF1D0]/80 dark:hover:text-[#FCF1D0] transition-colors mr-1"
            >
              {t.backToPapers}
            </a>
          )}

          {/* Language Selector Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#22396F]/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#010736] shadow-sm transition-all hover:bg-slate-50 hover:border-[#22396F]/40 focus:outline-none focus:ring-2 focus:ring-[#22396F] dark:border-[#22396F]/30 dark:bg-[#0D1C42] dark:text-[#FCF1D0] dark:hover:bg-[#142555]"
              aria-haspopup="listbox"
              aria-expanded={langDropdownOpen}
              aria-label={t.selectLanguage}
            >
              <Globe className="h-3.5 w-3.5 text-[#22396F] dark:text-[#FCF1D0]/80" />
              <span className="uppercase font-bold tracking-wide">
                {currentLang}
              </span>
              <ChevronDown className="h-3 w-3 text-slate-400 dark:text-[#FCF1D0]/60 transition-transform duration-150" />
            </button>

            {langDropdownOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-lg border border-[#22396F]/20 bg-white py-1 shadow-lg ring-1 ring-black/5 transition-all dark:border-[#22396F]/40 dark:bg-[#0D1C42] z-50">
                {languageOptions.map((opt) => (
                  <button
                    key={opt.code}
                    type="button"
                    onClick={() => {
                      setLanguage(opt.code);
                      setLangDropdownOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                      currentLang === opt.code
                        ? 'bg-[#FCF1D0] font-bold text-[#010736] dark:bg-[#22396F] dark:text-[#FCF1D0]'
                        : 'text-slate-700 hover:bg-slate-50 dark:text-[#FCF1D0]/80 dark:hover:bg-[#010736]/60'
                    }`}
                  >
                    <span>{opt.native}</span>
                    {currentLang === opt.code && (
                      <Check className="h-3.5 w-3.5 text-[#010736] dark:text-[#FCF1D0]" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#22396F]/20 bg-white text-[#010736] shadow-sm transition-all hover:bg-slate-50 hover:border-[#22396F]/40 focus:outline-none focus:ring-2 focus:ring-[#22396F] dark:border-[#22396F]/30 dark:bg-[#0D1C42] dark:text-[#FCF1D0] dark:hover:bg-[#142555]"
            aria-label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {mounted ? (
              currentTheme === 'dark' ? (
                <Sun className="h-4 w-4 text-[#FCF1D0] transition-transform hover:rotate-45" />
              ) : (
                <Moon className="h-4 w-4 text-[#010736] transition-transform hover:-rotate-12" />
              )
            ) : (
              <span className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
