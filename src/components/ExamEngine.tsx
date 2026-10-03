import React, { useState, useEffect, useMemo } from 'react';
import { useStore } from '@nanostores/react';
import {
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Flag,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Zap,
  X,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { FormattedText } from './FormattedText';
import { currentLanguageStore, translations } from '../stores/i18nStore';
import type { Question } from '../content/config';

export interface ExamPaperProps {
  title: string;
  language: string;
  durationMinutes: number;
  description?: string;
  category?: string;
  questions: Question[];
}

interface ExamEngineProps {
  paper: ExamPaperProps;
  slug?: string;
}

export const ExamEngine: React.FC<ExamEngineProps> = ({ paper, slug = 'paper' }) => {
  const currentLang = useStore(currentLanguageStore);
  const t = translations[currentLang] || translations.en;

  const storageKey = useMemo(() => `slgoviq_exam_${slug}`, [slug]);

  // Total questions
  const totalQuestions = paper.questions.length;
  const totalDurationSeconds = (paper.durationMinutes || 60) * 60;

  // State
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState<number>(totalDurationSeconds);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [timeTaken, setTimeTaken] = useState<number>(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'correct' | 'incorrect' | 'unanswered'>('all');
  const [mounted, setMounted] = useState<boolean>(false);

  // Restore saved progress if available (handles accidental refresh)
  useEffect(() => {
    setMounted(true);
    try {
      const saved = sessionStorage.getItem(storageKey);
      if (saved) {
        const data = JSON.parse(saved);
        if (data && !data.isSubmitted) {
          if (data.selectedAnswers) setSelectedAnswers(data.selectedAnswers);
          if (data.flaggedQuestions) setFlaggedQuestions(data.flaggedQuestions);
          if (typeof data.timeRemaining === 'number' && data.timeRemaining > 0) {
            setTimeRemaining(Math.min(data.timeRemaining, totalDurationSeconds));
          }
          if (typeof data.currentIndex === 'number') {
            setCurrentIndex(Math.min(data.currentIndex, totalQuestions - 1));
          }
        }
      }
    } catch {
      // Ignore storage read errors
    }
  }, [storageKey, totalQuestions]);

  // Persist progress to sessionStorage during test
  useEffect(() => {
    if (!mounted || isSubmitted) return;
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          selectedAnswers,
          flaggedQuestions,
          timeRemaining,
          currentIndex,
          isSubmitted: false,
        })
      );
    } catch {
      // Ignore storage write errors
    }
  }, [selectedAnswers, flaggedQuestions, timeRemaining, currentIndex, isSubmitted, mounted, storageKey]);

  // Handle browser reload/navigate away warning
  useEffect(() => {
    if (isSubmitted) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = t.leaveWarning;
      return t.leaveWarning;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isSubmitted, t.leaveWarning]);

  // Countdown Timer
  useEffect(() => {
    if (isSubmitted) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Submit Logic
  const handleSubmitExam = () => {
    setIsConfirmOpen(false);
    const elapsed = totalDurationSeconds - Math.max(timeRemaining, 0);
    setTimeTaken(elapsed);
    setIsSubmitted(true);

    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }

    // Trigger celebratory confetti on good score
    setTimeout(() => {
      let correctCount = 0;
      paper.questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });
      const ratio = correctCount / totalQuestions;
      if (ratio >= 0.75) {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#0ea5e9', '#22c55e', '#eab308', '#6366f1'],
        });
      }
    }, 150);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retake Paper
  const handleRetake = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setTimeRemaining(totalDurationSeconds);
    setTimeTaken(0);
    setCurrentIndex(0);
    setIsSubmitted(false);
    setActiveFilter('all');
    try {
      sessionStorage.removeItem(storageKey);
    } catch {
      // Ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Option selection
  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleClearSelection = (questionIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[questionIdx];
      return copy;
    });
  };

  const handleToggleFlag = (questionIdx: number) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionIdx]: !prev[questionIdx],
    }));
  };

  // Stats
  const answeredCount = Object.keys(selectedAnswers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;

  const scoreStats = useMemo(() => {
    let correct = 0;
    let incorrect = 0;
    let unans = 0;

    paper.questions.forEach((q, idx) => {
      const userChoice = selectedAnswers[idx];
      if (userChoice === undefined) {
        unans++;
      } else if (userChoice === q.correctIndex) {
        correct++;
      } else {
        incorrect++;
      }
    });

    const percentage = Math.round((correct / totalQuestions) * 100);
    return { correct, incorrect, unans, percentage };
  }, [paper.questions, selectedAnswers, totalQuestions]);

  const currentQ = paper.questions[currentIndex];
  const isUrgent =
    totalDurationSeconds > 300
      ? timeRemaining < 300 && timeRemaining > 0
      : timeRemaining <= 60 && timeRemaining > 0;

  // Filtered review list
  const filteredQuestions = useMemo(() => {
    return paper.questions
      .map((q, idx) => ({ ...q, originalIndex: idx }))
      .filter((q) => {
        const userChoice = selectedAnswers[q.originalIndex];
        if (activeFilter === 'correct') return userChoice === q.correctIndex;
        if (activeFilter === 'incorrect') return userChoice !== undefined && userChoice !== q.correctIndex;
        if (activeFilter === 'unanswered') return userChoice === undefined;
        return true;
      });
  }, [paper.questions, selectedAnswers, activeFilter]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 sm:py-8 font-sans">
      {/* ========================================================================= */}
      {/* 1. EXAM RUNNING VIEW */}
      {/* ========================================================================= */}
      {!isSubmitted && (
        <div className="space-y-6">
          {/* Header Bar: Paper Title, Strict Timer, and Progress */}
          <div className="rounded-xl border border-[#22396F]/15 bg-white p-4 shadow-sm transition-colors dark:border-[#22396F]/30 dark:bg-[#0D1C42] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <span className="inline-block rounded bg-[#FCF1D0] px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-[#010736] border border-[#22396F]/20 dark:bg-[#010736] dark:text-[#FCF1D0] dark:border-[#22396F]/40 mb-1.5">
                  {paper.category || 'Examination'}
                </span>
                <h1 className="text-lg sm:text-xl font-bold tracking-tight text-[#010736] dark:text-[#FCF1D0]">
                  {paper.title}
                </h1>
              </div>

              {/* Countdown Timer Badge */}
              <div
                className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2 transition-colors ${
                  isUrgent
                    ? 'border-rose-300 bg-rose-50 text-rose-700 animate-pulse dark:border-rose-900 dark:bg-rose-950/50 dark:text-rose-300'
                    : 'border-[#22396F]/20 bg-slate-50 text-[#010736] dark:border-[#22396F]/30 dark:bg-[#010736] dark:text-[#FCF1D0]'
                }`}
                aria-live="polite"
              >
                <Clock className={`h-4 w-4 ${isUrgent ? 'text-rose-600 dark:text-rose-400' : 'text-[#22396F] dark:text-[#FCF1D0]'}`} />
                <div className="flex flex-col">
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 dark:text-[#FCF1D0]/70">
                    {t.timeRemaining}
                  </span>
                  <span className="font-mono text-lg font-bold tracking-tight">
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>
            </div>

            {isUrgent && (
              <div className="mt-3 flex items-center gap-2 rounded-md bg-rose-100 px-3 py-1.5 text-xs font-medium text-rose-800 dark:bg-rose-950/80 dark:text-rose-300">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {totalDurationSeconds <= 300
                    ? currentLang === 'si'
                      ? 'අවවාදයයි: අවසන් මිනිත්තුව ක්‍රියාත්මකයි!'
                      : currentLang === 'ta'
                      ? 'எச்சரிக்கை: இறுதி ஒரு நிமிடம் எஞ்சியுள்ளது!'
                      : 'Warning: Under 1 minute remaining!'
                    : t.timerWarning}
                </span>
              </div>
            )}

            {/* Top Quick Status Bar */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs text-slate-600 dark:border-[#22396F]/20 dark:text-[#FCF1D0]/70">
              <div className="flex items-center gap-3">
                <span className="font-medium">
                  {t.answeredCount}: <strong className="text-[#010736] dark:text-[#FCF1D0]">{answeredCount}</strong> / {totalQuestions}
                </span>
                <span className="text-slate-300 dark:text-[#22396F]">•</span>
                <span>
                  {t.flaggedCount}: <strong className="text-amber-600 dark:text-amber-400">{flaggedCount}</strong>
                </span>
              </div>

              <button
                type="button"
                onClick={() => setIsConfirmOpen(true)}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#22396F] px-3.5 py-1.5 text-xs font-bold text-[#FCF1D0] shadow transition-colors hover:bg-[#0D1C42] focus:outline-none focus:ring-2 focus:ring-[#22396F] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
              >
                {t.submitExam}
              </button>
            </div>
          </div>

          {/* Question Navigator Grid (Numbered Pills) */}
          <div className="rounded-xl border border-[#22396F]/15 bg-white p-3.5 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42]">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#FCF1D0]/70">
                {t.allPapers} ({totalQuestions})
              </span>
              <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-[#FCF1D0]/70">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#22396F] dark:bg-[#FCF1D0]" />
                  {t.answeredCount}
                </span>
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-amber-500" />
                  {t.flaggedCount}
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {paper.questions.map((_, idx) => {
                const isCurrent = idx === currentIndex;
                const isAnswered = selectedAnswers[idx] !== undefined;
                const isFlagged = flaggedQuestions[idx];

                let btnStyles = 'border-[#22396F]/20 bg-white text-slate-700 hover:bg-slate-50 dark:border-[#22396F]/30 dark:bg-[#010736] dark:text-[#FCF1D0]/70';
                if (isAnswered) {
                  btnStyles = 'border-[#22396F] bg-[#22396F] text-[#FCF1D0] dark:border-[#FCF1D0] dark:bg-[#FCF1D0] dark:text-[#010736] font-bold';
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`relative flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium transition-all ${btnStyles} ${
                      isCurrent ? 'ring-2 ring-[#22396F] ring-offset-1 dark:ring-[#FCF1D0] dark:ring-offset-[#0D1C42] font-bold scale-105' : ''
                    }`}
                    aria-label={`Jump to Question ${idx + 1}`}
                  >
                    {idx + 1}
                    {isFlagged && (
                      <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-amber-500 ring-2 ring-white dark:ring-[#0D1C42]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Card */}
          {currentQ && (
            <div className="rounded-xl border border-[#22396F]/15 bg-white p-5 shadow-sm transition-colors dark:border-[#22396F]/30 dark:bg-[#0D1C42] sm:p-6">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-[#22396F]/20">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#FCF1D0]/70">
                  {t.question} {currentIndex + 1} {t.of} {totalQuestions}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleToggleFlag(currentIndex)}
                    className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium transition-colors ${
                      flaggedQuestions[currentIndex]
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        : 'text-slate-500 hover:bg-slate-100 dark:text-[#FCF1D0]/70 dark:hover:bg-[#142555]'
                    }`}
                  >
                    <Flag className={`h-3.5 w-3.5 ${flaggedQuestions[currentIndex] ? 'fill-amber-500 text-amber-500' : ''}`} />
                    <span>{flaggedQuestions[currentIndex] ? t.unflagQuestion : t.flagQuestion}</span>
                  </button>

                  {selectedAnswers[currentIndex] !== undefined && (
                    <button
                      type="button"
                      onClick={() => handleClearSelection(currentIndex)}
                      className="rounded-md px-2 py-1 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-rose-600 dark:text-[#FCF1D0]/60 dark:hover:bg-[#142555] dark:hover:text-rose-400 transition-colors"
                    >
                      {t.clearSelection}
                    </button>
                  )}
                </div>
              </div>

              {/* Question Prompt */}
              <div className="my-5">
                <FormattedText
                  content={currentQ.question}
                  className="text-base sm:text-lg font-normal leading-relaxed text-[#010736] dark:text-[#FCF1D0]"
                />
              </div>

              {/* Multiple Choice Options */}
              <div className="space-y-2.5">
                {currentQ.options.map((option, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  const optionLabel = String.fromCharCode(65 + optIdx); // A, B, C, D

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(currentIndex, optIdx)}
                      className={`group flex w-full items-start gap-3.5 rounded-xl border p-3.5 text-left text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#22396F] dark:focus:ring-[#FCF1D0] ${
                        isSelected
                          ? 'border-[#22396F] bg-[#FCF1D0]/30 text-[#010736] ring-1 ring-[#22396F] dark:border-[#FCF1D0] dark:bg-[#22396F]/35 dark:text-[#FCF1D0] dark:ring-[#FCF1D0] font-semibold'
                          : 'border-[#22396F]/15 bg-white text-slate-700 hover:border-[#22396F]/40 hover:bg-slate-50/70 dark:border-[#22396F]/30 dark:bg-[#010736]/60 dark:text-[#FCF1D0]/80 dark:hover:border-[#FCF1D0]/40 dark:hover:bg-[#010736]'
                      }`}
                    >
                      {/* Option Pill */}
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold transition-colors ${
                          isSelected
                            ? 'bg-[#22396F] text-[#FCF1D0] dark:bg-[#FCF1D0] dark:text-[#010736]'
                            : 'bg-slate-100 text-slate-600 group-hover:bg-[#FCF1D0]/60 dark:bg-[#0D1C42] dark:text-[#FCF1D0]/70 dark:group-hover:bg-[#22396F]/40'
                        }`}
                      >
                        {optionLabel}
                      </span>
                      <span className="flex-1 leading-normal pt-0.5">{option}</span>
                    </button>
                  );
                })}
              </div>

              {/* Navigation Actions (Prev / Next) */}
              <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-[#22396F]/20">
                <button
                  type="button"
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#22396F]/20 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-[#22396F]/30 dark:bg-[#010736] dark:text-[#FCF1D0] dark:hover:bg-[#142555]"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  {t.previous}
                </button>

                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#22396F] px-4 py-2 text-xs font-bold text-[#FCF1D0] shadow transition-all hover:bg-[#0D1C42] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
                  >
                    {t.next}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsConfirmOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#22396F] px-4 py-2 text-xs font-bold text-[#FCF1D0] shadow transition-all hover:bg-[#0D1C42] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
                  >
                    {t.submitExam}
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. CONFIRM SUBMISSION MODAL */}
      {/* ========================================================================= */}
      {isConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#010736]/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#22396F]/20 bg-white p-6 shadow-2xl transition-all dark:border-[#22396F]/40 dark:bg-[#0D1C42]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#22396F]/20">
              <h3 className="text-base font-bold text-[#010736] dark:text-[#FCF1D0]">
                {t.confirmSubmitTitle}
              </h3>
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-[#142555] dark:hover:text-[#FCF1D0]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="py-4 text-sm text-slate-600 dark:text-[#FCF1D0]/80">
              <p>
                {t.confirmSubmitMessage
                  .replace('{answered}', answeredCount.toString())
                  .replace('{total}', totalQuestions.toString())}
              </p>

              {unansweredCount > 0 && (
                <div className="mt-3 rounded-lg bg-[#FCF1D0]/60 p-3 text-xs font-medium text-[#010736] border border-[#22396F]/20 dark:bg-[#010736]/70 dark:border-[#22396F]/40 dark:text-[#FCF1D0]">
                  <p>
                    ⚠️ {unansweredCount} {t.unansweredCount.toLowerCase()} {t.questionsCount.toLowerCase()} remain. Unanswered questions will receive 0 marks.
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsConfirmOpen(false)}
                className="rounded-lg border border-[#22396F]/20 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-[#22396F]/30 dark:bg-[#010736] dark:text-[#FCF1D0] dark:hover:bg-[#142555]"
              >
                {t.cancel}
              </button>
              <button
                type="button"
                onClick={handleSubmitExam}
                className="rounded-lg bg-[#22396F] px-4 py-2 text-xs font-bold text-[#FCF1D0] shadow hover:bg-[#0D1C42] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
              >
                {t.confirmSubmitButton}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. RESULTS DASHBOARD & SPEED SOLUTIONS */}
      {/* ========================================================================= */}
      {isSubmitted && (
        <div className="space-y-6">
          {/* Top Results Overview Card */}
          <div className="rounded-2xl border border-[#22396F]/15 bg-white p-6 shadow-sm dark:border-[#22396F]/30 dark:bg-[#0D1C42] sm:p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#FCF1D0] dark:bg-[#010736] shadow-sm">
                <Sparkles className="h-6 w-6 text-[#22396F] dark:text-[#FCF1D0]" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[#010736] dark:text-[#FCF1D0]">
                {t.resultsTitle}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-slate-500 dark:text-[#FCF1D0]/70">
                {paper.title}
              </p>

              {/* Status Badge */}
              <div className="mt-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                    scoreStats.percentage >= 75
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : scoreStats.percentage >= 50
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  {scoreStats.percentage >= 75
                    ? t.statusDistinction
                    : scoreStats.percentage >= 50
                    ? t.statusMerit
                    : t.statusPractice}
                </span>
              </div>
            </div>

            {/* Metric Tiles Grid */}
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-xl border border-[#22396F]/15 bg-slate-50/80 p-3.5 text-center dark:border-[#22396F]/30 dark:bg-[#010736]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#22396F] dark:text-[#FCF1D0]/80">
                  {t.yourScore}
                </span>
                <div className="mt-1 text-2xl font-extrabold text-[#010736] dark:text-[#FCF1D0]">
                  {scoreStats.correct} <span className="text-sm font-normal text-slate-400">/ {totalQuestions}</span>
                </div>
              </div>

              <div className="rounded-xl border border-[#22396F]/15 bg-slate-50/80 p-3.5 text-center dark:border-[#22396F]/30 dark:bg-[#010736]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#22396F] dark:text-[#FCF1D0]/80">
                  {t.accuracy}
                </span>
                <div className="mt-1 text-2xl font-extrabold text-[#010736] dark:text-[#FCF1D0]">
                  {scoreStats.percentage}%
                </div>
              </div>

              <div className="rounded-xl border border-[#22396F]/15 bg-slate-50/80 p-3.5 text-center dark:border-[#22396F]/30 dark:bg-[#010736]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#22396F] dark:text-[#FCF1D0]/80">
                  {t.timeTaken}
                </span>
                <div className="mt-1 font-mono text-xl font-bold text-[#010736] dark:text-[#FCF1D0] pt-1">
                  {formatTime(timeTaken)}
                </div>
              </div>

              <div className="rounded-xl border border-[#22396F]/15 bg-slate-50/80 p-3.5 text-center dark:border-[#22396F]/30 dark:bg-[#010736]/60">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#22396F] dark:text-[#FCF1D0]/80">
                  {t.unansweredCount}
                </span>
                <div className="mt-1 text-2xl font-extrabold text-[#010736] dark:text-[#FCF1D0]">
                  {scoreStats.unans}
                </div>
              </div>
            </div>

            {/* Retake and Navigation Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 border-t border-slate-100 pt-5 dark:border-[#22396F]/20">
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#22396F] px-4 py-2 text-xs font-bold text-[#FCF1D0] shadow transition-colors hover:bg-[#0D1C42] dark:bg-[#FCF1D0] dark:text-[#010736] dark:hover:bg-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {t.retakeExam}
              </button>

              <a
                href="/"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#22396F]/20 bg-white px-4 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-[#22396F]/30 dark:bg-[#010736] dark:text-[#FCF1D0] dark:hover:bg-[#142555]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                {t.backToPapers}
              </a>
            </div>
          </div>

          {/* Filter Bar for Question Review */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#010736] dark:text-[#FCF1D0]">
              {t.allPapers} ({filteredQuestions.length})
            </h3>

            <div className="inline-flex rounded-lg border border-[#22396F]/15 bg-white p-1 text-xs font-medium dark:border-[#22396F]/30 dark:bg-[#0D1C42]">
              {(['all', 'correct', 'incorrect', 'unanswered'] as const).map((mode) => {
                const labelMap = {
                  all: t.filterAll,
                  correct: t.filterCorrect,
                  incorrect: t.filterIncorrect,
                  unanswered: t.filterUnanswered,
                };
                const isActive = activeFilter === mode;
                return (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setActiveFilter(mode)}
                    className={`rounded-md px-2.5 py-1 transition-colors ${
                      isActive
                        ? 'bg-[#22396F] text-[#FCF1D0] dark:bg-[#FCF1D0] dark:text-[#010736] font-bold'
                        : 'text-slate-600 hover:text-[#010736] dark:text-[#FCF1D0]/70 dark:hover:text-[#FCF1D0]'
                    }`}
                  >
                    {labelMap[mode]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detailed Question Review List */}
          <div className="space-y-4">
            {filteredQuestions.map((q) => {
              const qIndex = q.originalIndex;
              const userChoice = selectedAnswers[qIndex];
              const isCorrect = userChoice === q.correctIndex;
              const isUnanswered = userChoice === undefined;

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-[#22396F]/15 bg-white p-5 shadow-sm transition-colors dark:border-[#22396F]/30 dark:bg-[#0D1C42] sm:p-6"
                >
                  {/* Status header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-[#22396F]/20">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-[#FCF1D0]/70">
                      {t.question} {qIndex + 1}
                    </span>

                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t.filterCorrect}
                      </span>
                    ) : isUnanswered ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#FCF1D0] px-2 py-0.5 text-xs font-bold text-[#010736] dark:bg-[#010736] dark:text-[#FCF1D0]">
                        <HelpCircle className="h-3.5 w-3.5" />
                        {t.unanswered}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                        <XCircle className="h-3.5 w-3.5" />
                        {t.filterIncorrect}
                      </span>
                    )}
                  </div>

                  {/* Question Text */}
                  <div className="my-4">
                    <FormattedText
                      content={q.question}
                      className="text-sm sm:text-base font-normal leading-relaxed text-[#010736] dark:text-[#FCF1D0]"
                    />
                  </div>

                  {/* Options Evaluation */}
                  <div className="space-y-2">
                    {q.options.map((option, optIdx) => {
                      const isOptionCorrect = optIdx === q.correctIndex;
                      const isOptionUserChoice = userChoice === optIdx;
                      const optionLabel = String.fromCharCode(65 + optIdx);

                      let containerStyle = 'border-slate-200 bg-white text-slate-700 dark:border-[#22396F]/20 dark:bg-[#010736]/60 dark:text-[#FCF1D0]/80 opacity-80';
                      let pillStyle = 'bg-slate-100 text-slate-600 dark:bg-[#0D1C42] dark:text-[#FCF1D0]/70';

                      if (isOptionCorrect) {
                        containerStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-500 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-100 dark:ring-emerald-600 font-medium opacity-100';
                        pillStyle = 'bg-emerald-600 text-white dark:bg-emerald-500 dark:text-emerald-950';
                      } else if (isOptionUserChoice && !isCorrect) {
                        containerStyle = 'border-rose-500 bg-rose-50/70 text-rose-950 ring-1 ring-rose-500 dark:border-rose-600 dark:bg-rose-950/40 dark:text-rose-100 dark:ring-rose-600 font-medium opacity-100';
                        pillStyle = 'bg-rose-600 text-white dark:bg-rose-500 dark:text-rose-950';
                      }

                      return (
                        <div
                          key={optIdx}
                          className={`flex items-start justify-between gap-3 rounded-lg border p-3 text-xs sm:text-sm transition-all ${containerStyle}`}
                        >
                          <div className="flex items-start gap-3 flex-1">
                            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded text-xs font-bold ${pillStyle}`}>
                              {optionLabel}
                            </span>
                            <span className="leading-snug pt-0.5">{option}</span>
                          </div>

                          <div className="shrink-0 flex items-center gap-1.5 text-xs font-semibold">
                            {isOptionCorrect && (
                              <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-300">
                                <CheckCircle2 className="h-4 w-4" />
                                <span className="hidden sm:inline">{t.correctAnswer}</span>
                              </span>
                            )}
                            {isOptionUserChoice && !isCorrect && (
                              <span className="inline-flex items-center gap-1 text-rose-700 dark:text-rose-300">
                                <XCircle className="h-4 w-4" />
                                <span className="hidden sm:inline">{t.yourAnswer}</span>
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Short Method / Speed Trick Callout */}
                  {q.shortMethod && (
                    <div className="mt-4 rounded-xl border border-[#22396F]/20 bg-[#FCF1D0]/50 p-4 transition-colors dark:border-[#22396F]/40 dark:bg-[#010736]/70">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#010736] dark:text-[#FCF1D0] mb-1.5">
                        <Zap className="h-4 w-4 text-[#22396F] dark:text-[#FCF1D0]" />
                        <span>{t.shortMethodTitle}</span>
                      </div>
                      <FormattedText
                        content={q.shortMethod}
                        className="text-xs sm:text-sm leading-relaxed text-[#010736]/90 dark:text-[#FCF1D0]/95"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamEngine;
