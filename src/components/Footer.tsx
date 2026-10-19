import React from 'react';
import { useStore } from '@nanostores/react';
import { Coffee } from 'lucide-react';
import { currentLanguageStore, translations } from '../stores/i18nStore';

export const Footer: React.FC = () => {
  const currentLang = useStore(currentLanguageStore);
  const t = translations[currentLang] || translations.en;

  return (
    <footer className="border-t border-[#22396F]/15 bg-white py-8 text-center text-xs text-[#010736]/80 transition-colors dark:border-[#0D1C42] dark:bg-[#010736] dark:text-[#FCF1D0]/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#010736] dark:text-[#FCF1D0]">{t.appName}</span>
          <span>•</span>
          <span>{t.footerPlatform}</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="/" className="hover:text-[#22396F] dark:hover:text-[#FCF1D0] transition-colors font-medium">
            {t.papersNav}
          </a>
          <span>•</span>
          <a
            href="https://ko-fi.com/kishara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#22396F] hover:underline dark:text-[#FCF1D0] transition-colors"
          >
            <Coffee className="h-3.5 w-3.5 text-amber-500 shrink-0" />
            <span>{t.supportDeveloper}</span>
          </a>
          <span>•</span>
          <span>© {new Date().getFullYear()} SLGovIQ</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
