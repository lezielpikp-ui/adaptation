import React, { useState, useEffect } from 'react';
import { Zap, Timer, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Lightbulb, Sparkles } from 'lucide-react';
import { SPEED_QUESTIONS, SpeedQuestion } from '../data/adaptationsData';
import { sound } from '../utils/audio';

interface GameSpeedMasterProps {
  onCompleteQuiz: (score: number, starsWon: number) => void;
  onViewMastery: () => void;
  onDailyAction?: (actionType: 'speedmaster_score', scoreValue: number) => void;
  dailyMissionText?: string;
}

export const GameSpeedMaster: React.FC<GameSpeedMasterProps> = ({
  onCompleteQuiz,
  onViewMastery,
  onDailyAction,
  dailyMissionText,
}) => {
  const [questions, setQuestions] = useState<SpeedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timerMode, setTimerMode] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(15);
  const [isGameOver, setIsGameOver] = useState(false);
  const [answerLog, setAnswerLog] = useState<{ question: SpeedQuestion; userChoice: number; isCorrect: boolean }[]>([]);

  // Start / restart quiz
  const startQuiz = () => {
    const shuffled = [...SPEED_QUESTIONS].sort(() => 0.5 - Math.random());
    setQuestions(shuffled);
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setTimeLeft(15);
    setIsGameOver(false);
    setAnswerLog([]);
    sound.playSwoosh();
  };

  useEffect(() => {
    startQuiz();
  }, []);

  // Timer effect for Speed Challenge Mode
  useEffect(() => {
    if (!timerMode || isAnswered || isGameOver || questions.length === 0) return;

    if (timeLeft <= 0) {
      // Time expired
      handleAnswer(-1);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timerMode, timeLeft, isAnswered, isGameOver, questions.length]);

  const currentQ = questions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (isAnswered || !currentQ) return;

    setSelectedOption(optionIndex);
    setIsAnswered(true);

    const isCorrect = optionIndex === currentQ.correctIndex;

    if (isCorrect) {
      sound.playCorrect();
      const timeBonus = timerMode ? Math.max(1, timeLeft) : 5;
      const points = 10 + streak * 3 + timeBonus;
      setScore((prev) => prev + points);
      setStreak((prev) => prev + 1);
    } else {
      sound.playIncorrect();
      setStreak(0);
    }

    setAnswerLog((prev) => [...prev, { question: currentQ, userChoice: optionIndex, isCorrect }]);
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimeLeft(15);
    } else {
      // Quiz finished
      setIsGameOver(true);
      const stars = Math.max(1, Math.round(score / 30));
      onCompleteQuiz(score, stars);
      if (onDailyAction) {
        onDailyAction('speedmaster_score', score);
      }
      sound.playFanfare();
    }
  };

  if (questions.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner and Score Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800">
            <span>Game 4: Speed Master</span>
            <span aria-hidden="true">·</span>
            <span>All 7 Curriculum Objectives</span>
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
            Rapid Adaptation Gauntlet
          </h2>
          <p className="text-xs text-slate-600">
            Test your knowledge across structural parts, survival actions, and plant adaptations!
          </p>
        </div>

        {/* HUD Controls */}
        <div className="flex items-center gap-3">
          {/* Mode Switch */}
          <button
            onClick={() => {
              sound.playClick();
              setTimerMode(!timerMode);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
              timerMode
                ? 'bg-amber-100 text-amber-900 border border-amber-300'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{timerMode ? 'Speed Timer (15s)' : 'Relaxed Mode'}</span>
          </button>

          {/* Current Score */}
          <div className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs font-bold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums font-mono text-sm">{score}</span>
          </div>
        </div>
      </div>

      {!isGameOver ? (
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6">
          {/* Question Header & Meta */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 bg-amber-50 text-amber-800 rounded-md text-xs font-bold">
                {currentQ.category}
              </span>
              <span className="text-xs text-slate-500 hidden sm:inline">
                {currentQ.objective}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {timerMode && (
                <div
                  className={`text-xs font-bold px-2.5 py-1 rounded-md tabular-nums flex items-center gap-1 ${
                    timeLeft <= 5 ? 'bg-rose-100 text-rose-700 animate-pulse' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  <Timer className="w-3.5 h-3.5" />
                  <span>{timeLeft}s</span>
                </div>
              )}
              <span className="text-xs text-slate-500 font-semibold">
                Question <strong className="text-slate-900">{currentIndex + 1}</strong> of {questions.length}
              </span>
            </div>
          </div>

          {/* Question Prompt with Optional Reference Photo */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 my-2 items-center">
            {currentQ.image && (
              <div className="md:col-span-4 rounded-2xl overflow-hidden border border-slate-200 aspect-4/3 max-h-[180px] shadow-xs">
                <img
                  src={currentQ.image}
                  alt={currentQ.category}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className={currentQ.image ? 'md:col-span-8' : 'md:col-span-12'}>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>
          </div>

          {/* 3 Answer Option Cards */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectOpt = idx === currentQ.correctIndex;

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    !isAnswered
                      ? 'border-slate-200 hover:border-amber-400 bg-white hover:bg-amber-50/30 text-slate-800'
                      : isCorrectOpt
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-400'
                      : isSelected
                      ? 'border-rose-400 bg-rose-50 text-rose-950 opacity-80'
                      : 'border-slate-200 bg-slate-50 text-slate-400 opacity-40'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-sm sm:text-base font-semibold">{opt}</span>
                  </div>

                  {isAnswered && isCorrectOpt && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isAnswered && isSelected && !isCorrectOpt && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Instant Pedagogical Science Tip */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 space-y-2 animate-fadeIn">
              <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-amber-900">
                <Lightbulb className="w-4 h-4 text-amber-600" />
                <span>Primary Science Explanation:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {currentQ.scienceTip}
              </p>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  {currentIndex + 1 < questions.length ? 'Next Question' : 'View Diagnostic Results'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* End-of-Quiz Diagnostic Report */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto shadow-inner">
            <Award className="w-9 h-9" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full">
              Gauntlet Complete
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
              Diagnostic Assessment Report
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Here is how well you mastered Chapter 4: Adaptations objectives!
            </p>
          </div>

          {/* Score & Accuracy metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto py-2">
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold block">Total Score</span>
              <span className="text-2xl font-black text-slate-900 tabular-nums">{score}</span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-xs text-slate-500 font-semibold block">Accuracy</span>
              <span className="text-2xl font-black text-emerald-600 tabular-nums">
                {Math.round((answerLog.filter((a) => a.isCorrect).length / questions.length) * 100)}%
              </span>
            </div>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 col-span-2 sm:col-span-1">
              <span className="text-xs text-slate-500 font-semibold block">Questions Solved</span>
              <span className="text-2xl font-black text-amber-600 tabular-nums">
                {answerLog.filter((a) => a.isCorrect).length} / {questions.length}
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={startQuiz}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Retake Gauntlet
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onViewMastery();
              }}
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              View Full Mastery Report & Certificate
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
