import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Award,
  Zap,
  Shuffle,
  Eye,
  Maximize2,
  X,
  Compass,
  Check
} from 'lucide-react';
import { ADAPTATION_ITEMS, AdaptationItem } from '../data/adaptationsData';
import { sound } from '../utils/audio';

// Fisher-Yates shuffle algorithm for uniform randomization
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface GameSorterProps {
  onCompleteGame: (starsWon: number) => void;
  onNavigateToNext: () => void;
  onDailyAction?: (actionType: 'structural' | 'behavioural' | 'sorter_correct') => void;
  dailyMissionText?: string;
}

export const GameSorter: React.FC<GameSorterProps> = ({
  onCompleteGame,
  onNavigateToNext,
  onDailyAction,
  dailyMissionText,
}) => {
  const [deck, setDeck] = useState<AdaptationItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'structural' | 'behavioural' | null>(null);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; explanation: string } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answersHistory, setAnswersHistory] = useState<{ item: AdaptationItem; isCorrect: boolean }[]>([]);
  const [inspectModalItem, setInspectModalItem] = useState<AdaptationItem | null>(null);
  const [isShufflingAnimation, setIsShufflingAnimation] = useState(false);

  // Initialize randomized deck using Fisher-Yates
  const startNewGame = (customDeckSize = 10) => {
    setIsShufflingAnimation(true);
    sound.playSwoosh();
    
    // Shuffle the full pool uniformly
    const shuffled = shuffleArray(ADAPTATION_ITEMS);
    const selectedDeck = customDeckSize >= ADAPTATION_ITEMS.length ? shuffled : shuffled.slice(0, customDeckSize);
    
    setTimeout(() => {
      setDeck(selectedDeck);
      setCurrentIndex(0);
      setScore(0);
      setStreak(0);
      setHighestStreak(0);
      setSelectedAnswer(null);
      setFeedback(null);
      setIsGameOver(false);
      setAnswersHistory([]);
      setIsShufflingAnimation(false);
    }, 200);
  };

  // Re-randomize / reshuffle remaining cards or full deck
  const handleReshuffleDeck = () => {
    setIsShufflingAnimation(true);
    sound.playSwoosh();
    setTimeout(() => {
      const reshuffled = shuffleArray(ADAPTATION_ITEMS).slice(0, Math.max(10, deck.length));
      setDeck(reshuffled);
      setCurrentIndex(0);
      setSelectedAnswer(null);
      setFeedback(null);
      setIsShufflingAnimation(false);
    }, 250);
  };

  // Skip and draw a new random card
  const handleDrawRandomCard = () => {
    if (feedback !== null || deck.length <= 1) return;
    sound.playSwoosh();
    // Pick another random index
    let nextIdx = Math.floor(Math.random() * deck.length);
    if (nextIdx === currentIndex) {
      nextIdx = (currentIndex + 1) % deck.length;
    }
    setCurrentIndex(nextIdx);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const currentItem = deck[currentIndex];

  const handleSelect = (choice: 'structural' | 'behavioural') => {
    if (!currentItem || feedback !== null) return;

    setSelectedAnswer(choice);
    const isCorrect = choice === currentItem.type;

    if (isCorrect) {
      sound.playCorrect();
      const points = 10 + streak * 2;
      setScore((prev) => prev + points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > highestStreak) setHighestStreak(newStreak);

      // Report action for Daily Mission
      if (onDailyAction) {
        onDailyAction(currentItem.type);
        onDailyAction('sorter_correct');
      }
    } else {
      sound.playIncorrect();
      setStreak(0);
    }

    setFeedback({
      isCorrect,
      explanation: currentItem.explanation,
    });

    setAnswersHistory((prev) => [...prev, { item: currentItem, isCorrect }]);
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIndex + 1 < deck.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setFeedback(null);
    } else {
      // Game finished
      setIsGameOver(true);
      const stars = Math.max(1, Math.round(score / 25));
      onCompleteGame(stars);
      sound.playFanfare();
    }
  };

  if (deck.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner and Score Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <span>Game 1: Classification Lab</span>
            <span aria-hidden="true">·</span>
            <span>LO 4.2, LO 4.3, LO 4.4</span>
            {dailyMissionText && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-extrabold flex items-center gap-1">
                  🎯 {dailyMissionText}
                </span>
              </>
            )}
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-0.5">
            Structural vs. Behavioural Sorter
          </h2>
          <p className="text-xs text-slate-600">
            Inspect each organism&apos;s photo and trait. Is it a{' '}
            <strong className="text-emerald-700">BODY PART</strong> or an{' '}
            <strong className="text-sky-700">ACTION</strong>?
          </p>
        </div>

        {/* Real-time Game HUD */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="px-3 py-1.5 bg-slate-100 rounded-lg text-slate-700 text-xs font-semibold flex items-center gap-1">
            <span>Card:</span>
            <span className="text-slate-900 font-bold tabular-nums">
              {currentIndex + 1}
            </span>
            <span>/ {deck.length}</span>
          </div>

          <button
            onClick={handleReshuffleDeck}
            title="Randomise and shuffle cards"
            className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs active:scale-95"
          >
            <Shuffle className={`w-3.5 h-3.5 ${isShufflingAnimation ? 'animate-spin' : ''}`} />
            <span>Randomise Cards</span>
          </button>

          <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums font-mono text-sm">{score}</span> pts
          </div>

          {streak > 1 && (
            <div className="px-3 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs font-extrabold flex items-center gap-1 animate-bounce">
              <Zap className="w-3.5 h-3.5 fill-rose-500" />
              <span>{streak}x Streak!</span>
            </div>
          )}
        </div>
      </div>

      {!isGameOver ? (
        <div className="space-y-6">
          {/* Main Inspection Card with smooth key transition */}
          <div
            key={currentItem.id}
            className={`bg-white rounded-3xl border-2 border-slate-200/90 shadow-md p-6 sm:p-8 relative overflow-hidden transition-all duration-300 ${
              isShufflingAnimation ? 'opacity-40 scale-98' : 'opacity-100 scale-100'
            }`}
          >
            {/* Top Bar with Random Card Badge and Habitat */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4 mb-6">
              <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-500">
                <span className="px-2.5 py-1 bg-slate-900 text-white rounded-md font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  {currentItem.organism}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded font-medium">
                  Habitat: {currentItem.habitat}
                </span>
                <span aria-hidden="true" className="text-slate-300">·</span>
                <span className="text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded font-semibold text-[11px] flex items-center gap-1">
                  <Shuffle className="w-3 h-3" />
                  Randomized #{currentIndex + 1}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-full">
                  {currentItem.tag}
                </span>
                {feedback === null && deck.length > 1 && (
                  <button
                    onClick={handleDrawRandomCard}
                    title="Skip to another random card in deck"
                    className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 hover:bg-slate-100 rounded-md transition-colors cursor-pointer flex items-center gap-1"
                  >
                    Skip Card ↷
                  </button>
                )}
              </div>
            </div>

            {/* Specimen Photo and Trait Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-4 items-center">
              {/* Authentic Animal Specimen Photo */}
              <div className="md:col-span-5 relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm aspect-4/3 max-h-[260px] bg-slate-900 group">
                <img
                  src={currentItem.image}
                  alt={`Authentic specimen photo of ${currentItem.organism} showing ${currentItem.traitName}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  onError={(e) => {
                    // Safety fallback
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                
                {/* Visual Label Banner */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent p-3 pt-6 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400 block">
                      Confirmed Specimen
                    </span>
                    <span className="text-white text-xs sm:text-sm font-extrabold truncate block">
                      {currentItem.organism}
                    </span>
                  </div>

                  <button
                    onClick={() => setInspectModalItem(currentItem)}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-xs text-white p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                    title="Inspect photo closely"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">Enlarge</span>
                  </button>
                </div>

                {/* Top Badge: Habitat Tag */}
                <div className="absolute top-2.5 left-2.5 bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[11px] font-semibold border border-white/10">
                  {currentItem.habitat}
                </div>
              </div>

              {/* Trait & Survival Information */}
              <div className="md:col-span-7 space-y-3">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400">
                    Adaptation Trait Under Inspection:
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                    &ldquo;{currentItem.traitName}&rdquo;
                  </h3>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80">
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                    {currentItem.description}
                  </p>
                </div>

                <div className="p-3 bg-emerald-50/70 border border-emerald-100 rounded-xl flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-200 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div className="text-xs sm:text-sm text-slate-700">
                    <strong className="text-emerald-900">How it helps survival: </strong>
                    <span>{currentItem.survivalPurpose}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Classification Decision Buttons */}
            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
              <p className="text-sm font-extrabold text-slate-900 mb-4">
                Classify this adaptation for the {currentItem.organism}:
              </p>

              {/* 2 Big Interactive Decision Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Structural Button */}
                <button
                  disabled={feedback !== null}
                  onClick={() => handleSelect('structural')}
                  className={`p-5 rounded-2xl border-2 font-bold transition-all text-left flex flex-col justify-between ${
                    feedback === null
                      ? 'border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/70 hover:border-emerald-500 text-emerald-950 cursor-pointer shadow-xs hover:shadow-md active:scale-98'
                      : currentItem.type === 'structural'
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-950 ring-3 ring-emerald-500/40'
                      : selectedAnswer === 'structural'
                      ? 'border-rose-300 bg-rose-50 text-rose-900 opacity-60'
                      : 'border-slate-200 bg-slate-50 text-slate-400 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-emerald-600 text-white rounded">
                      Type A
                    </span>
                    <span className="text-xs font-bold text-emerald-800">Physical Anatomy</span>
                  </div>
                  <span className="text-lg font-black text-emerald-950">Structural Adaptation</span>
                  <span className="text-xs text-emerald-800/90 font-medium mt-1">
                    A special <strong>physical body part</strong> the organism has (e.g. fur, beak, spines, feet).
                  </span>
                </button>

                {/* Behavioural Button */}
                <button
                  disabled={feedback !== null}
                  onClick={() => handleSelect('behavioural')}
                  className={`p-5 rounded-2xl border-2 font-bold transition-all text-left flex flex-col justify-between ${
                    feedback === null
                      ? 'border-sky-300 bg-sky-50/50 hover:bg-sky-100/70 hover:border-sky-500 text-sky-950 cursor-pointer shadow-xs hover:shadow-md active:scale-98'
                      : currentItem.type === 'behavioural'
                      ? 'border-sky-600 bg-sky-100 text-sky-950 ring-3 ring-sky-500/40'
                      : selectedAnswer === 'behavioural'
                      ? 'border-rose-300 bg-rose-50 text-rose-900 opacity-60'
                      : 'border-slate-200 bg-slate-50 text-slate-400 opacity-40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-sky-600 text-white rounded">
                      Type B
                    </span>
                    <span className="text-xs font-bold text-sky-800">Action / Activity</span>
                  </div>
                  <span className="text-lg font-black text-sky-950">Behavioural Adaptation</span>
                  <span className="text-xs text-sky-800/90 font-medium mt-1">
                    A special <strong>action or habit</strong> the organism does (e.g. migrating, hibernating, nocturnal).
                  </span>
                </button>
              </div>
            </div>

            {/* Instant Pedagogical Feedback Box */}
            {feedback && (
              <div
                className={`mt-6 p-5 sm:p-6 rounded-2xl border-2 transition-all ${
                  feedback.isCorrect
                    ? 'bg-emerald-50/90 border-emerald-400 text-emerald-950 shadow-sm'
                    : 'bg-amber-50/90 border-amber-400 text-amber-950 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3.5">
                  {feedback.isCorrect ? (
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                      <XCircle className="w-5 h-5" />
                    </div>
                  )}

                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-black text-base sm:text-lg">
                        {feedback.isCorrect
                          ? '🎉 Spot On! Brilliant Observation!'
                          : '💡 Good Effort! Let\'s Review:'}
                      </h4>
                      <span className="text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-white border border-slate-200 shadow-2xs">
                        Correct Answer: {currentItem.type.toUpperCase()}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                      {feedback.explanation}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                  <div className="text-xs text-slate-500 font-semibold">
                    Specimen: <strong className="text-slate-800">{currentItem.organism}</strong>
                  </div>

                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95"
                  >
                    <span>
                      {currentIndex + 1 < deck.length ? 'Next Random Card' : 'View Final Results'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Round Complete Summary & Specimen Gallery */
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 space-y-8 shadow-md">
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <Award className="w-9 h-9" />
            </div>

            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Sorter Lab Round Complete!
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Mastery Verification Achieved!
            </h3>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              You correctly categorized anatomical body structures and behavioral survival tactics across wildlife species.
            </p>
          </div>

          {/* Stats Breakdown */}
          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-semibold block">Total Score</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums">{score}</span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-semibold block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-600 tabular-nums">
                {Math.round((answersHistory.filter((a) => a.isCorrect).length / deck.length) * 100)}%
              </span>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-center">
              <span className="text-xs text-slate-500 font-semibold block">Top Streak</span>
              <span className="text-2xl font-black text-amber-600 tabular-nums">{highestStreak}</span>
            </div>
          </div>

          {/* Specimen Gallery: Review of animals categorized with their exact photos */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-600" />
                Specimens Examined In This Round ({answersHistory.length})
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Tap any card to review its adaptation
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {answersHistory.map(({ item, isCorrect }, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  onClick={() => setInspectModalItem(item)}
                  className="bg-slate-50 hover:bg-slate-100/80 p-2.5 rounded-xl border border-slate-200 flex items-center gap-3 transition-colors cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-slate-300 relative bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.organism}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-slate-900 truncate">
                        {item.organism}
                      </span>
                      {isCorrect ? (
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : (
                        <X className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {item.traitName}
                    </span>
                    <span className={`text-[10px] font-bold uppercase ${
                      item.type === 'structural' ? 'text-emerald-700' : 'text-sky-700'
                    }`}>
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={() => startNewGame(10)}
              className="px-5 py-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 border border-indigo-200 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Shuffle className="w-4 h-4" />
              Shuffle & Play New 10 Cards
            </button>
            <button
              onClick={() => startNewGame(16)}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Shuffle All 16 Species
            </button>
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToNext();
              }}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-extrabold text-sm flex items-center gap-2 shadow-sm transition-colors cursor-pointer"
            >
              Next: Game 2 (Habitat Detective)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Specimen Close-Up Modal */}
      {inspectModalItem && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setInspectModalItem(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-16/10 bg-slate-900">
              <img
                src={inspectModalItem.image}
                alt={inspectModalItem.organism}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setInspectModalItem(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white flex items-center justify-center cursor-pointer transition-colors"
                title="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-xs text-white px-3 py-1 rounded-lg text-xs font-bold">
                {inspectModalItem.habitat} Biome
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-emerald-700">
                  Confirmed Wildlife Specimen
                </span>
                <h3 className="text-2xl font-black text-slate-900">
                  {inspectModalItem.organism}
                </h3>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Featured Adaptation:
                </div>
                <div className="text-base font-bold text-slate-900">
                  &ldquo;{inspectModalItem.traitName}&rdquo;
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {inspectModalItem.description}
                </p>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-500 block">Adaptation Type:</span>
                  <span className={`text-sm font-black uppercase ${
                    inspectModalItem.type === 'structural' ? 'text-emerald-700' : 'text-sky-700'
                  }`}>
                    {inspectModalItem.type} Adaptation
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1 rounded-full border border-slate-200">
                  {inspectModalItem.survivalPurpose}
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setInspectModalItem(null)}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm transition-colors cursor-pointer"
                >
                  Back to Sorter Lab
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
