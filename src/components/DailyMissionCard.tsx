import React from 'react';
import { Target, Flame, Sparkles, CheckCircle2, ArrowRight, Lightbulb, Calendar, Gift, Trophy } from 'lucide-react';
import { DailyMission, DailyMissionState, DAILY_MISSIONS } from '../data/dailyMissions';
import { sound } from '../utils/audio';

interface DailyMissionCardProps {
  mission: DailyMission;
  missionState: DailyMissionState;
  onClaimReward: () => void;
  onNavigateToGame: (gameId: string) => void;
  onSelectSpecificMission?: (missionId: string) => void;
}

export const DailyMissionCard: React.FC<DailyMissionCardProps> = ({
  mission,
  missionState,
  onClaimReward,
  onNavigateToGame,
  onSelectSpecificMission,
}) => {
  const percent = Math.min(100, Math.round((missionState.currentProgress / missionState.target) * 100));
  const isDone = missionState.isCompleted;
  const isClaimed = missionState.isClaimed;

  const todayDisplay = new Date().toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-500/30 relative overflow-hidden space-y-6">
      {/* Decorative subtle ambient backdrop ring */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header: Date, Streak, Objective */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <Calendar className="w-4 h-4 text-emerald-400" />
          <span>Today&apos;s Learning Mission</span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="text-slate-300 font-medium capitalize">{todayDisplay}</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Daily Streak Indicator */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/20 border border-amber-500/40 rounded-full text-amber-300 text-xs font-black shadow-xs">
            <Flame className="w-3.5 h-3.5 fill-amber-400 text-amber-300 animate-pulse" />
            <span>{missionState.streakDays} Day{missionState.streakDays === 1 ? '' : 's'} Streak</span>
          </div>

          {/* Objective Code Tag */}
          <span className="text-xs font-mono font-bold px-2.5 py-1 bg-white/10 rounded-full text-slate-200 border border-white/10">
            {mission.objectiveCode}
          </span>
        </div>
      </div>

      {/* Main Mission Focus */}
      <div className="space-y-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
              <Target className="w-6 h-6 text-emerald-400 shrink-0" />
              <span>{mission.title}</span>
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-1 leading-relaxed max-w-2xl">
              {mission.description}
            </p>
          </div>

          {/* Reward Box */}
          <div className="hidden sm:flex flex-col items-center justify-center bg-white/10 border border-white/15 px-4 py-3 rounded-2xl shrink-0 text-center">
            <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider">Mission Bounty</span>
            <div className="text-xl font-black text-amber-400 flex items-center gap-1 mt-0.5">
              <Sparkles className="w-4 h-4 fill-amber-400" />
              <span>+{mission.rewardStars} Stars</span>
            </div>
          </div>
        </div>

        {/* Science Tip Pill */}
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-xs sm:text-sm text-slate-200 flex items-start gap-2">
          <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
          <div>
            <strong className="text-amber-300">Curriculum Objective: </strong>
            <span>{mission.objectiveDescription} </span>
            <span className="text-slate-400 italic">({mission.scienceTip})</span>
          </div>
        </div>
      </div>

      {/* Progress Bar & Status */}
      <div className="space-y-2 bg-black/30 p-4 rounded-2xl border border-white/10">
        <div className="flex items-center justify-between text-xs font-bold">
          <span className="text-slate-300 uppercase tracking-wider">Daily Progress</span>
          <span className="tabular-nums font-mono text-emerald-400 text-sm">
            {missionState.currentProgress} / {missionState.target} ({percent}%)
          </span>
        </div>

        <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden border border-white/10">
          <div
            className={`h-full transition-all duration-500 ease-out rounded-full ${
              isDone ? 'bg-emerald-400' : 'bg-gradient-to-r from-emerald-500 to-teal-400'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div className="text-xs text-slate-400">
          {isClaimed ? (
            <span className="text-emerald-300 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Mission cleared &amp; stars credited! Come back tomorrow for a new objective.
            </span>
          ) : isDone ? (
            <span className="text-amber-300 font-semibold flex items-center gap-1">
              <Trophy className="w-4 h-4 text-amber-400" />
              Objective complete! Claim your reward below!
            </span>
          ) : (
            <span>
              Target activity: <strong className="text-white font-bold">{mission.gameLabel}</strong>.
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isDone ? (
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToGame(mission.targetGame);
              }}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              Play {mission.gameLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : !isClaimed ? (
            <button
              onClick={onClaimReward}
              className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm flex items-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer animate-pulse"
            >
              <Gift className="w-4 h-4 fill-slate-950" />
              Claim +{mission.rewardStars} Stars Reward!
            </button>
          ) : (
            <button
              onClick={() => {
                sound.playClick();
                onNavigateToGame(mission.targetGame);
              }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors"
            >
              Practice {mission.gameLabel} Again
            </button>
          )}

          {/* Teacher / Quick Switcher Dropdown (to test any mission) */}
          {onSelectSpecificMission && (
            <select
              value={mission.id}
              onChange={(e) => onSelectSpecificMission(e.target.value)}
              className="px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 cursor-pointer hidden md:inline-block"
              title="Practice any daily mission objective"
            >
              {DAILY_MISSIONS.map((m) => (
                <option key={m.id} value={m.id} className="bg-slate-900 text-white">
                  Mission: {m.title}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
};
