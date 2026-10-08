import React, { useState } from 'react';
import { Sparkles, Compass, CheckCircle2, ArrowRight, Zap, ShieldCheck } from 'lucide-react';
import {
  heroImage,
  photoPolarBear,
  photoDuck,
  photoCamel,
  photoChameleon,
} from '../data/adaptationsData';
import { sound } from '../utils/audio';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  gameStats: {
    sorterCompleted: number;
    detectiveCasesSolved: number;
    biocraftSimulations: number;
    speedHighScore: number;
  };
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab, gameStats }) => {
  const [quickTestAnswer, setQuickTestAnswer] = useState<'structural' | 'behavioural' | null>(null);

  const handleQuickTest = (answer: 'structural' | 'behavioural') => {
    setQuickTestAnswer(answer);
    if (answer === 'structural') {
      sound.playCorrect();
    } else {
      sound.playIncorrect();
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner Container */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 bg-slate-900 text-white">
        {/* Background Image with Measured Contrast Scrim */}
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Animal adaptations across desert, arctic, rainforest and ocean habitats"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover opacity-35 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/50" />
        </div>

        {/* Content Overlay */}
        <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            Primary Science Curriculum · Chapter 4
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Adaptations: Nature&apos;s Survival Superpowers
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
            In the wild, conditions are tough! Freezing ice, blistering deserts, deep oceans, and sneaky predators.
            To stay alive, every organism has <strong className="text-emerald-400 font-bold">adaptations</strong>—special characteristics that help it survive in its natural habitat.
          </p>

          {/* Golden Rule Flashcard for Primary Students */}
          <div className="p-4 sm:p-5 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 max-w-2xl">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-2 flex items-center gap-1.5">
              <Zap className="w-4 h-4 fill-amber-300" />
              The Golden Rule of Adaptations:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-500/30">
                <span className="font-bold text-emerald-300 block mb-1">1. Structural Adaptation</span>
                <p className="text-slate-300 text-xs leading-normal">
                  A special <strong>body part</strong> or physical feature the organism has (e.g. camel eyelashes, duck webbed feet, cactus spines).
                </p>
              </div>
              <div className="p-3 bg-sky-950/60 rounded-lg border border-sky-500/30">
                <span className="font-bold text-sky-300 block mb-1">2. Behavioural Adaptation</span>
                <p className="text-slate-300 text-xs leading-normal">
                  A special <strong>action or habit</strong> the organism does to survive (e.g. birds migrating south, penguins huddling, bears hibernating).
                </p>
              </div>
            </div>
          </div>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('sorter');
              }}
              className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2 group text-sm cursor-pointer"
            >
              Play Game 1: Sorter Lab
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => {
                sound.playClick();
                setActiveTab('explore');
              }}
              className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold rounded-xl border border-slate-700 transition-colors text-sm cursor-pointer"
            >
              Explore Mini-Textbook Guide
            </button>
          </div>
        </div>
      </div>

      {/* Mini Interactive Try-Me Sandbox: "The 3-Second Golden Test" with Photo */}
      <div className="p-6 bg-amber-50/70 border border-amber-200/80 rounded-2xl shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-16 sm:w-24 sm:h-20 rounded-xl overflow-hidden border border-amber-300 shrink-0 shadow-xs">
              <img
                src={photoPolarBear}
                alt="Polar Bear"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="text-base font-bold text-amber-950 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                Quick Check: Can you spot the difference?
              </h3>
              <p className="text-xs sm:text-sm text-amber-900/80 mt-1">
                Question: <em>&quot;A Polar Bear has a 10cm thick layer of fat (blubber) under its skin.&quot;</em>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleQuickTest('structural')}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                quickTestAnswer === 'structural'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
            >
              Structural (Body Part)
            </button>
            <button
              onClick={() => handleQuickTest('behavioural')}
              className={`px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                quickTestAnswer === 'behavioural'
                  ? 'bg-rose-600 text-white shadow-xs'
                  : 'bg-white border border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
            >
              Behavioural (Action)
            </button>
          </div>
        </div>

        {quickTestAnswer && (
          <div
            className={`p-3 rounded-xl text-xs sm:text-sm font-medium flex items-start gap-2.5 ${
              quickTestAnswer === 'structural'
                ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}
          >
            <CheckCircle2
              className={`w-5 h-5 shrink-0 mt-0.5 ${
                quickTestAnswer === 'structural' ? 'text-emerald-700' : 'text-rose-700'
              }`}
            />
            <div>
              {quickTestAnswer === 'structural' ? (
                <span>
                  <strong>Correct! 🎉</strong> Blubber is a physical body part/tissue inside the bear&apos;s skin that insulates it against Arctic freezing temperatures!
                </span>
              ) : (
                <span>
                  <strong>Not quite!</strong> Blubber is a physical body tissue, not an action or behaviour. Since it is part of the body, it is <strong>Structural</strong>!
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* 4 Mastery Games Hub Cards with Visual Photography Banners */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              The 4 Mastery Games
            </h2>
            <p className="text-sm text-slate-600">
              Master every Chapter 4 objective through hands-on gameplay and earn your official Science License!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Game 1: Sorter Lab */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all group">
            <div>
              {/* Photo Banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src={photoDuck}
                  alt="Mallard duck swimming with webbed feet"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-emerald-700/80 px-2 py-0.5 rounded">
                    Game 1
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-slate-900">Sorter Lab</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Sort animals and plants into <strong>Structural</strong> (Body Parts) vs <strong>Behavioural</strong> (Actions).
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  <span>Objective: LO 4.2, LO 4.3, LO 4.4</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-xs font-semibold text-emerald-700">
                {gameStats.sorterCompleted > 0 ? `${gameStats.sorterCompleted} Completed` : 'Not Started'}
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('sorter');
                }}
                className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Launch
              </button>
            </div>
          </div>

          {/* Game 2: Habitat Detective */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-sky-400 hover:shadow-md transition-all group">
            <div>
              {/* Photo Banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src={photoCamel}
                  alt="Dromedary Camel in desert dunes"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-sky-700/80 px-2 py-0.5 rounded">
                    Game 2
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-slate-900">Habitat Detective</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Investigate environmental threats in the Desert, Arctic, Jungle &amp; Ocean and find the winning adaptation!
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  <span>Objective: LO 4.1, LO 4.7</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-xs font-semibold text-sky-700">
                {gameStats.detectiveCasesSolved}/4 Solved
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('detective');
                }}
                className="px-3 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Launch
              </button>
            </div>
          </div>

          {/* Game 3: BioCraft Simulator */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-violet-400 hover:shadow-md transition-all group">
            <div>
              {/* Photo Banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src={photoChameleon}
                  alt="Rainforest Chameleon on branch"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-violet-700/80 px-2 py-0.5 rounded">
                    Game 3
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-slate-900">BioCraft Simulator</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Engineer custom creatures by mixing structural parts and survival behaviours to withstand extreme biomes.
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  <span>Objective: LO 4.3, LO 4.4, LO 4.7</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-xs font-semibold text-violet-700">
                {gameStats.biocraftSimulations} Simulations
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('biocraft');
                }}
                className="px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Launch
              </button>
            </div>
          </div>

          {/* Game 4: Speed Master */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all group">
            <div>
              {/* Photo Banner */}
              <div className="relative h-36 w-full overflow-hidden bg-slate-900">
                <img
                  src={photoPolarBear}
                  alt="Polar Bear on Arctic Ice"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider bg-amber-700/80 px-2 py-0.5 rounded">
                    Game 4
                  </span>
                </div>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-slate-900">Speed Master</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  High-energy 10-question gauntlet testing quick classification, plant adaptations, and survival reasons.
                </p>
                <div className="text-xs text-slate-500 pt-1">
                  <span>Objective: All 7 Objectives Diagnostic</span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between mt-3">
              <span className="text-xs font-semibold text-amber-700">
                Best: {gameStats.speedHighScore} pts
              </span>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('speedmaster');
                }}
                className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Launch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

