import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  Award,
  RotateCcw,
  AlertTriangle,
  Droplet,
  Thermometer,
  ArrowRight,
  Wand2,
  RefreshCw,
  Send,
  Eye,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { BIOCRAFT_BIOMES } from '../data/adaptationsData';
import { sound } from '../utils/audio';

interface GameBioCraftProps {
  onCompleteSimulation: (starsWon: number) => void;
  onNavigateToNext: () => void;
  onDailyAction?: (actionType: 'biocraft_simulation') => void;
  dailyMissionText?: string;
}

interface GeneratedVisual {
  type: 'raster' | 'svg' | 'fallback';
  imageUrl?: string;
  svg?: string;
  fieldNote?: string;
}

export const GameBioCraft: React.FC<GameBioCraftProps> = ({
  onCompleteSimulation,
  onNavigateToNext,
  onDailyAction,
  dailyMissionText,
}) => {
  const [selectedBiomeIndex, setSelectedBiomeIndex] = useState(0);
  const [creatureName, setCreatureName] = useState('Adaptasaurus');

  // Selected trait IDs
  const [coveringId, setCoveringId] = useState<string>('');
  const [limbsId, setLimbsId] = useState<string>('');
  const [rhythmId, setRhythmId] = useState<string>('');
  const [reactionId, setReactionId] = useState<string>('');

  // AI Visual Generation states
  const [isGeneratingVisual, setIsGeneratingVisual] = useState(false);
  const [visualResult, setVisualResult] = useState<GeneratedVisual | null>(null);
  const [customPrompt, setCustomPrompt] = useState('');
  const [visualError, setVisualError] = useState<string | null>(null);

  // Simulation states
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState<number>(0);
  const [simResults, setSimResults] = useState<{
    totalScore: number;
    passed: boolean;
    structuralFeedback: string[];
    behaviouralFeedback: string[];
  } | null>(null);

  const biome = BIOCRAFT_BIOMES[selectedBiomeIndex];

  // Set default traits when biome changes
  const handleSelectBiome = (index: number) => {
    sound.playClick();
    setSelectedBiomeIndex(index);
    setCoveringId('');
    setLimbsId('');
    setRhythmId('');
    setReactionId('');
    setSimResults(null);
    setIsSimulating(false);
    setSimStep(0);
    setVisualResult(null);
    setVisualError(null);
  };

  const isFormComplete = coveringId && limbsId && rhythmId && reactionId;

  const chosenCovering = biome.structuralOptions[0].options.find((o) => o.id === coveringId);
  const chosenLimbs = biome.structuralOptions[1].options.find((o) => o.id === limbsId);
  const chosenRhythm = biome.behaviouralOptions[0].options.find((o) => o.id === rhythmId);
  const chosenReaction = biome.behaviouralOptions[1].options.find((o) => o.id === reactionId);

  // AI Visual Generator
  const handleGenerateAiVisual = async (userExtraPrompt?: string) => {
    setIsGeneratingVisual(true);
    setVisualError(null);
    sound.playSwoosh();

    try {
      const response = await fetch('/api/generate-creature-visual', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          creatureName: creatureName || 'BioCraft Creature',
          biomeName: biome.name,
          covering: chosenCovering?.name || 'Adapted covering',
          limbs: chosenLimbs?.name || 'Adapted limbs',
          rhythm: chosenRhythm?.name || 'Survival activity',
          reaction: chosenReaction?.name || 'Survival defense',
          customPrompt: userExtraPrompt || customPrompt,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      setVisualResult(data);
      sound.playFanfare();
    } catch {
      // Fallback: Generate a high quality client-side vector illustration
      setVisualResult({
        type: 'svg',
        svg: generateClientProceduralSvg(
          creatureName,
          biome.id,
          chosenCovering?.name || '',
          chosenLimbs?.name || ''
        ),
        fieldNote: `Field Biologist Observation: ${creatureName} has adapted its structural covering and limbs to thrive in the ${biome.name}!`,
      });
      sound.playCorrect();
    } finally {
      setIsGeneratingVisual(false);
    }
  };

  const handleStartSimulation = () => {
    if (!isFormComplete) return;
    setIsSimulating(true);
    setSimStep(1);
    sound.playSwoosh();

    // Trigger visual generation in parallel if not already generated
    if (!visualResult) {
      handleGenerateAiVisual();
    }

    // Step-by-step hazard test sequence
    setTimeout(() => {
      setSimStep(2);
      sound.playClick();
    }, 1200);

    setTimeout(() => {
      setSimStep(3);
      sound.playClick();
    }, 2400);

    setTimeout(() => {
      const total =
        (chosenCovering?.scoreInBiome || 0) +
        (chosenLimbs?.scoreInBiome || 0) +
        (chosenRhythm?.scoreInBiome || 0) +
        (chosenReaction?.scoreInBiome || 0);

      const structuralFb = [chosenCovering?.feedback || '', chosenLimbs?.feedback || ''];
      const behaviouralFb = [chosenRhythm?.feedback || '', chosenReaction?.feedback || ''];

      const passed = total >= 70;

      setSimResults({
        totalScore: total,
        passed,
        structuralFeedback: structuralFb,
        behaviouralFeedback: behaviouralFb,
      });

      setIsSimulating(false);
      if (passed) {
        sound.playFanfare();
        onCompleteSimulation(5);
        if (onDailyAction) {
          onDailyAction('biocraft_simulation');
        }
      } else {
        sound.playIncorrect();
      }
    }, 3600);
  };

  const handleReset = () => {
    sound.playClick();
    setSimResults(null);
    setIsSimulating(false);
    setSimStep(0);
    setVisualResult(null);
    setVisualError(null);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-violet-800">
            <span>Game 3: BioCraft Engineering</span>
            <span aria-hidden="true">·</span>
            <span>LO 4.3, LO 4.4, LO 4.7</span>
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
            Organism Survival Simulator &amp; AI Visualizer
          </h2>
          <p className="text-xs text-slate-600">
            Engineer an organism with 2 Structural Parts + 2 Behaviours, and generate its custom AI visual!
          </p>
        </div>

        {/* Biome Mission Selectors */}
        <div className="flex items-center gap-2">
          {BIOCRAFT_BIOMES.map((b, idx) => {
            const isSelected = idx === selectedBiomeIndex;
            return (
              <button
                key={b.id}
                onClick={() => handleSelectBiome(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-violet-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {b.name.split(' ')[1] || b.name}
              </button>
            );
          })}
        </div>
      </div>

      {!simResults && !isSimulating ? (
        /* Crafting Workshop Interface */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
          {/* Target Biome Environment Brief */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-900 to-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-violet-300">Target Biome Mission</span>
              <h3 className="text-xl sm:text-2xl font-extrabold">{biome.name}</h3>
              <p className="text-xs text-slate-300">{biome.climateTitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="px-3 py-1.5 bg-white/10 rounded-lg text-xs font-medium text-slate-200">
                Avg Temp: <strong className="text-white">{biome.temperature}</strong>
              </div>
            </div>
          </div>

          {/* Creature Name Input */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 whitespace-nowrap">
              Name Your Organism:
            </label>
            <input
              type="text"
              value={creatureName}
              onChange={(e) => setCreatureName(e.target.value)}
              maxLength={24}
              placeholder="e.g. Dune Glider, Polar Paw, Leafhopper"
              className="px-4 py-2 border border-slate-300 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500 max-w-sm"
            />
          </div>

          {/* Part 1: Structural Adaptations (Body Parts) */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded">
                  Category 1: Structural Adaptations
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Choose 2 Physical Body Parts (What it HAS)
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 1: Body Covering */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase">1. Body Covering</span>
                <div className="space-y-2">
                  {biome.structuralOptions[0].options.map((opt) => {
                    const isSelected = coveringId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          setCoveringId(opt.id);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500 text-emerald-950'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{opt.name}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{opt.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 2: Limbs & Extremities */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase">2. Limbs & Extremities</span>
                <div className="space-y-2">
                  {biome.structuralOptions[1].options.map((opt) => {
                    const isSelected = limbsId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          setLimbsId(opt.id);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500 text-emerald-950'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{opt.name}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{opt.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Part 2: Behavioural Adaptations (Actions) */}
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded">
                  Category 2: Behavioural Adaptations
                </span>
                <h4 className="text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Choose 2 Survival Behaviours (What it DOES)
                </h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Option 3: Activity Rhythm */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase">3. Activity Rhythm</span>
                <div className="space-y-2">
                  {biome.behaviouralOptions[0].options.map((opt) => {
                    const isSelected = rhythmId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          setRhythmId(opt.id);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500 text-sky-950'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{opt.name}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{opt.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Option 4: Survival Reaction */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 uppercase">4. Survival Reaction</span>
                <div className="space-y-2">
                  {biome.behaviouralOptions[1].options.map((opt) => {
                    const isSelected = reactionId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => {
                          sound.playClick();
                          setReactionId(opt.id);
                        }}
                        className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'border-sky-600 bg-sky-50/80 ring-2 ring-sky-500 text-sky-950'
                            : 'border-slate-200 bg-white hover:border-slate-300 text-slate-800'
                        }`}
                      >
                        <p className="text-xs sm:text-sm font-bold">{opt.name}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{opt.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* AI Visualizer Preview Deck inside workshop */}
          {isFormComplete && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Wand2 className="w-4 h-4 text-violet-600" />
                    AI Creature Visualizer (Text-to-Visual Generation)
                  </h4>
                  <p className="text-xs text-slate-500">
                    Use AI to illustrate your organism with its selected body coverings and limbs.
                  </p>
                </div>

                <button
                  disabled={isGeneratingVisual}
                  onClick={() => handleGenerateAiVisual()}
                  className="px-4 py-2 bg-violet-600 hover:bg-violet-700 disabled:bg-slate-300 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                >
                  {isGeneratingVisual ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Generating Visual...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{visualResult ? 'Re-Generate Visual' : 'Generate AI Visual'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Prompt customization bar */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Optional prompt tweak: e.g. 'Make it look friendly with golden glowing eyes'"
                  className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-400"
                />
                <button
                  disabled={isGeneratingVisual}
                  onClick={() => handleGenerateAiVisual(customPrompt)}
                  className="px-3 py-2 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Apply Prompt"
                >
                  <Send className="w-3 h-3" />
                  <span className="hidden sm:inline">Apply</span>
                </button>
              </div>

              {/* Visual Display Box */}
              {visualResult && (
                <div className="mt-4 p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                    <span>Generated Subject: {creatureName}</span>
                    <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      Adapted for {biome.name}
                    </span>
                  </div>

                  <div className="rounded-xl overflow-hidden border border-slate-100 flex items-center justify-center bg-slate-900 max-h-[360px]">
                    {visualResult.type === 'raster' && visualResult.imageUrl ? (
                      <img
                        src={visualResult.imageUrl}
                        alt={`AI generated visualization of ${creatureName}`}
                        className="w-full h-auto max-h-[360px] object-contain"
                      />
                    ) : visualResult.svg ? (
                      <div
                        className="w-full flex items-center justify-center p-2"
                        dangerouslySetInnerHTML={{ __html: visualResult.svg }}
                      />
                    ) : null}
                  </div>

                  {visualResult.fieldNote && (
                    <div className="p-3 bg-violet-50 text-violet-950 rounded-lg text-xs leading-relaxed border border-violet-100">
                      <strong>AI Field Biologist Log:</strong> {visualResult.fieldNote}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Launch Simulator Button */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs text-slate-500 font-medium">
              {!isFormComplete ? 'Select all 4 traits to enable simulation' : 'Ready to test your creature!'}
            </span>

            <button
              disabled={!isFormComplete}
              onClick={handleStartSimulation}
              className="px-6 py-3 bg-violet-700 hover:bg-violet-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-extrabold rounded-xl text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white" />
              Run Survival Simulation
            </button>
          </div>
        </div>
      ) : isSimulating ? (
        /* Live Simulation In-Progress Screen */
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 text-center space-y-8 shadow-xl">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400 bg-violet-950/60 border border-violet-800/40 px-3 py-1 rounded-full">
              Simulation In Progress
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Testing {creatureName}&apos;s Adaptations...
            </h3>
            <p className="text-xs text-slate-300">Subject placed into {biome.name}</p>
          </div>

          {/* 3 Simulation Hazards Visualizer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div
              className={`p-4 rounded-2xl border transition-all ${
                simStep >= 1
                  ? 'bg-amber-950/40 border-amber-500/80 text-amber-200 scale-102'
                  : 'bg-slate-800 border-slate-700 text-slate-500 opacity-40'
              }`}
            >
              <Thermometer className="w-6 h-6 mx-auto mb-2 text-amber-400" />
              <h5 className="font-bold text-xs uppercase">1. Climate Hazard</h5>
              <p className="text-[11px] mt-1 text-slate-300">Extreme temperatures & elements</p>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-all ${
                simStep >= 2
                  ? 'bg-sky-950/40 border-sky-500/80 text-sky-200 scale-102'
                  : 'bg-slate-800 border-slate-700 text-slate-500 opacity-40'
              }`}
            >
              <Droplet className="w-6 h-6 mx-auto mb-2 text-sky-400" />
              <h5 className="font-bold text-xs uppercase">2. Scarcity Hazard</h5>
              <p className="text-[11px] mt-1 text-slate-300">Water and nutrition survival</p>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-all ${
                simStep >= 3
                  ? 'bg-rose-950/40 border-rose-500/80 text-rose-200 scale-102'
                  : 'bg-slate-800 border-slate-700 text-slate-500 opacity-40'
              }`}
            >
              <AlertTriangle className="w-6 h-6 mx-auto mb-2 text-rose-400" />
              <h5 className="font-bold text-xs uppercase">3. Predator Hazard</h5>
              <p className="text-[11px] mt-1 text-slate-300">Escape and camouflage testing</p>
            </div>
          </div>

          <div className="w-full max-w-md mx-auto bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
            <div
              className="bg-violet-500 h-full transition-all duration-700 ease-out"
              style={{ width: `${(simStep / 3) * 100}%` }}
            />
          </div>
        </div>
      ) : (
        /* Results Report & Survival License Screen */
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
            <div>
              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  simResults?.passed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {simResults?.passed ? 'Survival Verified! 🎉' : 'Survival Failed'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                {creatureName} in the {biome.name}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-xs font-bold text-slate-500 uppercase">Survival Score</span>
              <p
                className={`text-3xl font-black tabular-nums ${
                  simResults?.passed ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {simResults?.totalScore} / 100
              </p>
            </div>
          </div>

          {/* AI Visual Showcase Card */}
          <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-4 shadow-lg border border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
                  AI Creature Visual &amp; Field Record
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">
                  Visual Appearance of {creatureName}
                </h4>
              </div>

              <div className="flex items-center gap-2">
                <button
                  disabled={isGeneratingVisual}
                  onClick={() => handleGenerateAiVisual()}
                  className="px-3 py-1.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isGeneratingVisual ? 'Generating...' : 'Redraw with AI'}</span>
                </button>
              </div>
            </div>

            {/* Prompt edit in result view */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Edit prompt: e.g. 'Add glowing sunset lighting and snow particles'"
                className="flex-1 px-3 py-1.5 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-400"
              />
              <button
                disabled={isGeneratingVisual}
                onClick={() => handleGenerateAiVisual(customPrompt)}
                className="px-3 py-1.5 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
              >
                Update Image
              </button>
            </div>

            {/* Generated Visual Canvas */}
            <div className="rounded-xl overflow-hidden border border-white/10 flex items-center justify-center bg-black/60 min-h-[220px]">
              {isGeneratingVisual ? (
                <div className="p-10 text-center space-y-2">
                  <RefreshCw className="w-8 h-8 text-violet-400 animate-spin mx-auto" />
                  <p className="text-xs text-slate-300">Rendering adapted organism visualization...</p>
                </div>
              ) : visualResult?.type === 'raster' && visualResult.imageUrl ? (
                <img
                  src={visualResult.imageUrl}
                  alt={creatureName}
                  className="w-full h-auto max-h-[380px] object-contain"
                />
              ) : visualResult?.svg ? (
                <div
                  className="w-full flex items-center justify-center p-3"
                  dangerouslySetInnerHTML={{ __html: visualResult.svg }}
                />
              ) : (
                <div className="p-8 text-center space-y-3">
                  <p className="text-xs text-slate-400">Click below to generate the AI visual of your creature.</p>
                  <button
                    onClick={() => handleGenerateAiVisual()}
                    className="px-4 py-2 bg-violet-600 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 mx-auto cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Generate AI Visual Now
                  </button>
                </div>
              )}
            </div>

            {visualResult?.fieldNote && (
              <p className="text-xs text-slate-300 italic bg-white/5 p-3 rounded-xl border border-white/10">
                🌿 {visualResult.fieldNote}
              </p>
            )}
          </div>

          {/* Detailed Primary Science Pedagogical Feedback */}
          <div className="space-y-4">
            <h4 className="font-bold text-sm text-slate-900 uppercase tracking-wider">
              Scientific Trait Evaluation:
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Structural Review */}
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold uppercase text-emerald-900 block">
                  Structural Adaptations (Body Parts):
                </span>
                {simResults?.structuralFeedback.map((fb, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    • {fb}
                  </p>
                ))}
              </div>

              {/* Behavioural Review */}
              <div className="p-4 bg-sky-50/60 border border-sky-200 rounded-2xl space-y-2">
                <span className="text-xs font-bold uppercase text-sky-900 block">
                  Behavioural Adaptations (Actions &amp; Habits):
                </span>
                {simResults?.behaviouralFeedback.map((fb, idx) => (
                  <p key={idx} className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                    • {fb}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Official Adaptation License Badge if passed */}
          {simResults?.passed && (
            <div className="p-5 bg-gradient-to-r from-amber-50 to-emerald-50 border border-amber-300 rounded-2xl flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-amber-400 text-slate-900 flex items-center justify-center font-black text-xl shadow-xs shrink-0">
                  <Award className="w-7 h-7" />
                </div>
                <div>
                  <h5 className="font-extrabold text-sm sm:text-base text-slate-900">
                    Official Adaptive Biome License Awarded!
                  </h5>
                  <p className="text-xs text-slate-600">
                    {creatureName} has demonstrated all structural and behavioural adaptations needed to thrive in {biome.name}.
                  </p>
                </div>
              </div>
              <span className="text-xs font-black uppercase tracking-wider bg-white px-3 py-1.5 rounded-lg border border-amber-200 text-amber-900 shrink-0">
                +5 Stars
              </span>
            </div>
          )}

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Re-Engineer This Organism
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onNavigateToNext();
              }}
              className="px-6 py-2.5 bg-violet-700 hover:bg-violet-600 text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              Play Game 4: Speed Master
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Procedural SVG fallback generator ensuring guaranteed zero-broken-image display
function generateClientProceduralSvg(
  name: string,
  biomeId: string,
  covering: string,
  limbs: string
): string {
  const isDesert = biomeId === 'desert';
  const isArctic = biomeId === 'arctic';
  const isRainforest = biomeId === 'rainforest';

  const skyColor = isDesert ? '#fde047' : isArctic ? '#bae6fd' : '#86efac';
  const groundColor = isDesert ? '#f59e0b' : isArctic ? '#e0f2fe' : '#15803d';
  const creatureColor = isDesert ? '#d97706' : isArctic ? '#f8fafc' : '#10b981';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 360" width="100%" height="260" class="rounded-xl">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${skyColor}" stop-opacity="0.8"/>
        <stop offset="60%" stop-color="${groundColor}" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#0f172a" stop-opacity="0.95"/>
      </linearGradient>
      <filter id="glow">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    
    <rect width="600" height="360" fill="url(#bgGrad)"/>
    
    <!-- Habitat Terrain Elements -->
    ${
      isDesert
        ? `<ellipse cx="300" cy="300" rx="280" ry="80" fill="#d97706" opacity="0.6"/>
           <circle cx="500" cy="70" r="35" fill="#fef08a" opacity="0.9"/>`
        : isArctic
        ? `<polygon points="50,280 200,160 320,280" fill="#f1f5f9" opacity="0.8"/>
           <polygon points="260,280 420,140 550,280" fill="#e2e8f0" opacity="0.9"/>`
        : `<path d="M 0,220 Q 150,150 300,220 T 600,220 L 600,360 L 0,360 Z" fill="#166534" opacity="0.7"/>
           <circle cx="100" cy="60" r="40" fill="#fef08a" opacity="0.5"/>`
    }

    <!-- The Creature -->
    <g transform="translate(180, 110)">
      <!-- Shadow -->
      <ellipse cx="120" cy="160" rx="90" ry="18" fill="#000000" opacity="0.35"/>
      <!-- Limbs / Feet -->
      <rect x="50" y="110" width="22" height="45" rx="10" fill="${creatureColor}" stroke="#1e293b" stroke-width="2"/>
      <rect x="160" y="110" width="22" height="45" rx="10" fill="${creatureColor}" stroke="#1e293b" stroke-width="2"/>
      <!-- Body -->
      <ellipse cx="120" cy="90" rx="75" ry="50" fill="${creatureColor}" stroke="#0f172a" stroke-width="3"/>
      <!-- Head -->
      <circle cx="190" cy="55" r="38" fill="${creatureColor}" stroke="#0f172a" stroke-width="3"/>
      <!-- Eye -->
      <circle cx="205" cy="50" r="8" fill="#0f172a"/>
      <circle cx="207" cy="48" r="2.5" fill="#ffffff"/>
      <!-- Snout / Beak -->
      <polygon points="225,55 245,62 225,68" fill="#f59e0b" stroke="#0f172a" stroke-width="2"/>
      <!-- Ear / Crest -->
      <polygon points="175,25 185,5 195,25" fill="${creatureColor}" stroke="#0f172a" stroke-width="2"/>
      <!-- Label -->
      <text x="120" y="200" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="14" fill="#ffffff" filter="url(#glow)">${name}</text>
    </g>
  </svg>`;
}
