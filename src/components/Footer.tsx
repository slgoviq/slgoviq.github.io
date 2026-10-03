import React from 'react';
import { useStore } from '@nanostores/react';
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
        <div className="flex items-center gap-4">
          <a href="/" className="hover:text-[#22396F] dark:hover:text-[#FCF1D0] transition-colors font-medium">
            {t.papersNav}
          </a>
          <span>•</span>
          <span>English • සිංහල • தமிழ்</span>
          <span>•</span>
          <span>© {new Date().getFullYear()} SLGovIQ</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
