import React, { useState } from 'react';
import { Search, ShieldAlert, CheckCircle2, XCircle, ArrowRight, Award, Compass, RefreshCw } from 'lucide-react';
import { DETECTIVE_CASES, HabitatDetectiveCase } from '../data/adaptationsData';
import { sound } from '../utils/audio';

interface GameHabitatDetectiveProps {
  onCompleteCase: (starsWon: number) => void;
  onNavigateToNext: () => void;
  onDailyAction?: (actionType: 'detective_case_solved' | 'structural' | 'behavioural') => void;
  dailyMissionText?: string;
}

export const GameHabitatDetective: React.FC<GameHabitatDetectiveProps> = ({
  onCompleteCase,
  onNavigateToNext,
  onDailyAction,
  dailyMissionText,
}) => {
  const [activeCaseIndex, setActiveCaseIndex] = useState(0);
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [selectedClassification, setSelectedClassification] = useState<'structural' | 'behavioural' | null>(null);
  const [solvedCases, setSolvedCases] = useState<string[]>([]);
  const [caseSubmitted, setCaseSubmitted] = useState(false);
  const [isCorrectAdaptation, setIsCorrectAdaptation] = useState(false);
  const [isCorrectType, setIsCorrectType] = useState(false);

  const currentCase = DETECTIVE_CASES[activeCaseIndex];

  const handleSelectCase = (index: number) => {
    sound.playClick();
    setActiveCaseIndex(index);
    setSelectedChoiceId(null);
    setSelectedClassification(null);
    setCaseSubmitted(false);
    setIsCorrectAdaptation(false);
    setIsCorrectType(false);
  };

  const handleSubmitInvestigation = () => {
    if (!selectedChoiceId || !selectedClassification) return;

    const chosenOption = currentCase.adaptationChoices.find((c) => c.id === selectedChoiceId);
    const correctAdaptation = chosenOption?.isCorrect ?? false;
    const correctType = selectedClassification === currentCase.correctType;

    setIsCorrectAdaptation(correctAdaptation);
    setIsCorrectType(correctType);
    setCaseSubmitted(true);

    if (correctAdaptation && correctType) {
      sound.playFanfare();
      if (!solvedCases.includes(currentCase.id)) {
        setSolvedCases((prev) => [...prev, currentCase.id]);
        onCompleteCase(3); // 3 stars per case solved
        if (onDailyAction) {
          onDailyAction('detective_case_solved');
          onDailyAction(currentCase.correctType);
        }
      }
    } else {
      sound.playIncorrect();
    }
  };

  const handleNextCase = () => {
    sound.playClick();
    if (activeCaseIndex + 1 < DETECTIVE_CASES.length) {
      handleSelectCase(activeCaseIndex + 1);
    } else {
      onNavigateToNext();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-800">
            <span>Game 2: Habitat Detective</span>
            <span aria-hidden="true">·</span>
            <span>LO 4.1, LO 4.5, LO 4.6, LO 4.7</span>
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
            Match the Survival Need
          </h2>
          <p className="text-xs text-slate-600">
            Every environment poses unique threats. Inspect the crime scene and discover which adaptation saves the organism!
          </p>
        </div>

        {/* Progress & Case selector */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="px-3.5 py-1.5 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-xs font-bold flex items-center justify-between sm:justify-start gap-2">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-sky-600" />
              <span>Solved:</span>
            </span>
            <span className="font-extrabold text-sky-950 bg-white px-2 py-0.5 rounded-md border border-sky-200">
              {solvedCases.length} / {DETECTIVE_CASES.length}
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
            {DETECTIVE_CASES.map((c, idx) => {
              const isSolved = solvedCases.includes(c.id);
              const isSelected = idx === activeCaseIndex;
              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectCase(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-sky-600 text-white shadow-xs ring-2 ring-sky-300'
                      : isSolved
                      ? 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  title={`${c.organism} (${c.habitatName})`}
                >
                  {isSolved && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100 shrink-0" />}
                  <span>Case {idx + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* All 10 cases solved celebration banner */}
      {solvedCases.length === DETECTIVE_CASES.length && (
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-2xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center shrink-0 text-2xl">
              🏆
            </div>
            <div>
              <h4 className="font-black text-base sm:text-lg">Chief Habitat Detective Mastery!</h4>
              <p className="text-xs text-emerald-100">
                You have cracked all {DETECTIVE_CASES.length} adaptation crime files across desert, polar, rainforest, deep sea, mountain, and wetland biomes!
              </p>
            </div>
          </div>
          <button
            onClick={onNavigateToNext}
            className="px-4 py-2 bg-white text-emerald-900 rounded-xl font-bold text-xs sm:text-sm hover:bg-emerald-50 transition-colors shrink-0 shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Proceed to BioCraft</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Main Detective Case File */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Biome Photo & Incident Brief */}
        <div className="lg:col-span-5 relative flex flex-col justify-between min-h-[300px] lg:min-h-full">
          <img
            src={currentCase.biomeImage}
            alt={currentCase.habitatName}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent p-6 text-white flex flex-col justify-end space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider bg-rose-600 text-white px-2.5 py-0.5 rounded">
                Incident Report
              </span>
              <span className="text-xs text-slate-300">{currentCase.habitatName}</span>
            </div>

            <div className="flex items-center gap-3">
              {currentCase.organismPhoto && (
                <div className="w-14 h-14 rounded-xl overflow-hidden border-2 border-white/50 shrink-0 shadow-md bg-slate-900">
                  <img
                    src={currentCase.organismPhoto}
                    alt={currentCase.organism}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <span className="text-xs font-semibold text-sky-300 block">Organism under threat:</span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{currentCase.organism}</h3>
              </div>
            </div>

            <div className="p-3.5 bg-black/50 backdrop-blur-md rounded-xl border border-white/20 space-y-1">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                {currentCase.threatHeadline}
              </h4>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentCase.threatDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right Detective Investigation Console */}
        <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Step 1: Pick Adaptation */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Step 1: Which adaptation solves this survival challenge?
              </label>

              <div className="space-y-2.5">
                {currentCase.adaptationChoices.map((choice) => {
                  const isSelected = selectedChoiceId === choice.id;
                  return (
                    <button
                      key={choice.id}
                      disabled={caseSubmitted}
                      onClick={() => {
                        sound.playClick();
                        setSelectedChoiceId(choice.id);
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-600 bg-sky-50 text-sky-950 shadow-xs'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                      }`}
                    >
                      <p className="text-sm font-semibold leading-snug">{choice.text}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Classify Structural vs Behavioural */}
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Step 2: Is this adaptation Structural (Body Part) or Behavioural (Action)?
              </label>

              <div className="grid grid-cols-2 gap-3">
                <button
                  disabled={caseSubmitted}
                  onClick={() => {
                    sound.playClick();
                    setSelectedClassification('structural');
                  }}
                  className={`p-3 rounded-xl border-2 text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedClassification === 'structural'
                      ? 'border-emerald-600 bg-emerald-100 text-emerald-950 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block font-black">Structural</span>
                  <span className="text-[11px] font-normal text-slate-500">Special Body Part</span>
                </button>

                <button
                  disabled={caseSubmitted}
                  onClick={() => {
                    sound.playClick();
                    setSelectedClassification('behavioural');
                  }}
                  className={`p-3 rounded-xl border-2 text-center font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                    selectedClassification === 'behavioural'
                      ? 'border-sky-600 bg-sky-100 text-sky-950 shadow-xs'
                      : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <span className="block font-black">Behavioural</span>
                  <span className="text-[11px] font-normal text-slate-500">Action or Habit</span>
                </button>
              </div>
            </div>
          </div>

          {/* Submit / Verification Feedback */}
          {!caseSubmitted ? (
            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                disabled={!selectedChoiceId || !selectedClassification}
                onClick={handleSubmitInvestigation}
                className="px-6 py-3 bg-sky-600 hover:bg-sky-500 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                <Search className="w-4 h-4" />
                Submit Detective Solution
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-4 border-t border-slate-100 animate-fadeIn">
              {isCorrectAdaptation && isCorrectType ? (
                /* Both Correct */
                <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-2xl text-emerald-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm sm:text-base">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Case Solved! Survival Confirmed! 🎉</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    {currentCase.survivalOutcome}
                  </p>
                  <div className="text-xs bg-white/80 p-2.5 rounded-lg border border-emerald-200 text-emerald-900 font-medium">
                    <strong>Science Fact:</strong> {currentCase.adaptationChoices.find((c) => c.isCorrect)?.explanation}
                  </div>
                </div>
              ) : (
                /* Partial or Incorrect */
                <div className="p-4 bg-amber-50 border border-amber-300 rounded-2xl text-amber-950 space-y-2">
                  <div className="flex items-center gap-2 font-extrabold text-sm">
                    <XCircle className="w-5 h-5 text-amber-600" />
                    <span>Review Your Clues!</span>
                  </div>
                  <ul className="text-xs text-slate-700 space-y-1 list-disc list-inside">
                    {!isCorrectAdaptation && (
                      <li>Check the adaptation choice: does it specifically match the environment threat?</li>
                    )}
                    {!isCorrectType && (
                      <li>
                        Check your classification: The correct type is <strong>{currentCase.correctType}</strong> because it is a {currentCase.correctType === 'structural' ? 'physical body part' : 'behavioural action'}!
                      </li>
                    )}
                  </ul>
                  <button
                    onClick={() => setCaseSubmitted(false)}
                    className="mt-2 text-xs font-bold text-amber-900 underline hover:text-amber-700"
                  >
                    Try This Case Again
                  </button>
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => handleSelectCase(activeCaseIndex)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900 flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Reset Case
                </button>

                <button
                  onClick={handleNextCase}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {activeCaseIndex + 1 < DETECTIVE_CASES.length ? 'Next Case File' : 'Next Game: BioCraft Simulator'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
