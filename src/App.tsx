/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ConceptGuide } from './components/ConceptGuide';
import { DailyMissionCard } from './components/DailyMissionCard';
import { GameSorter } from './components/GameSorter';
import { GameHabitatDetective } from './components/GameHabitatDetective';
import { GameBioCraft } from './components/GameBioCraft';
import { GameSpeedMaster } from './components/GameSpeedMaster';
import { MasteryReport } from './components/MasteryReport';
import {
  DailyMission,
  DailyMissionState,
  DAILY_MISSIONS,
  getMissionForDate,
  getTodayDateString,
} from './data/dailyMissions';
import { sound } from './utils/audio';

const STORAGE_KEY = 'adaptation_island_student_stats_v1';
const DAILY_STORAGE_KEY = 'adaptation_island_daily_mission_v1';

interface UserStats {
  sorterCompleted: number;
  detectiveCasesSolved: number;
  biocraftSimulations: number;
  speedHighScore: number;
  totalStars: number;
}

const DEFAULT_STATS: UserStats = {
  sorterCompleted: 0,
  detectiveCasesSolved: 0,
  biocraftSimulations: 0,
  speedHighScore: 0,
  totalStars: 0,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('explore');
  const [stats, setStats] = useState<UserStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return DEFAULT_STATS;
  });

  // Daily Mission State Initialization
  const todayDateStr = getTodayDateString();
  const defaultTodayMission = getMissionForDate();

  const [activeMission, setActiveMission] = useState<DailyMission>(defaultTodayMission);
  const [dailyState, setDailyState] = useState<DailyMissionState>(() => {
    try {
      const saved = localStorage.getItem(DAILY_STORAGE_KEY);
      if (saved) {
        const parsed: DailyMissionState = JSON.parse(saved);
        if (parsed.dateString === todayDateStr) {
          return parsed;
        } else {
          // Check if streak was maintained from yesterday
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = getTodayDateString(yesterday);

          let maintainedStreak = parsed.streakDays || 0;
          if (parsed.lastCompletedDate !== yesterdayStr && parsed.lastCompletedDate !== todayDateStr) {
            // Missed more than 1 day
            maintainedStreak = 0;
          }

          return {
            dateString: todayDateStr,
            missionId: defaultTodayMission.id,
            currentProgress: 0,
            target: defaultTodayMission.target,
            isCompleted: false,
            isClaimed: false,
            streakDays: maintainedStreak,
            lastCompletedDate: parsed.lastCompletedDate,
          };
        }
      }
    } catch {
      // ignore
    }

    return {
      dateString: todayDateStr,
      missionId: defaultTodayMission.id,
      currentProgress: 0,
      target: defaultTodayMission.target,
      isCompleted: false,
      isClaimed: false,
      streakDays: 0,
      lastCompletedDate: null,
    };
  });

  // Keep activeMission in sync with dailyState.missionId
  useEffect(() => {
    const found = DAILY_MISSIONS.find((m) => m.id === dailyState.missionId);
    if (found) {
      setActiveMission(found);
    }
  }, [dailyState.missionId]);

  // Persist stats
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  // Persist daily mission state
  useEffect(() => {
    try {
      localStorage.setItem(DAILY_STORAGE_KEY, JSON.stringify(dailyState));
    } catch {
      // ignore
    }
  }, [dailyState]);

  // Daily Action Handler
  const handleDailyAction = (actionType: string, extraValue?: number) => {
    if (dailyState.isCompleted) return;

    let shouldIncrement = false;
    let incrementAmount = 1;

    switch (activeMission.type) {
      case 'structural_count':
        if (actionType === 'structural') shouldIncrement = true;
        break;
      case 'behavioural_count':
        if (actionType === 'behavioural') shouldIncrement = true;
        break;
      case 'any_sorter_count':
        if (actionType === 'sorter_correct') shouldIncrement = true;
        break;
      case 'detective_cases':
        if (actionType === 'detective_case_solved') shouldIncrement = true;
        break;
      case 'biocraft_simulation':
        if (actionType === 'biocraft_simulation') shouldIncrement = true;
        break;
      case 'speedmaster_score':
        if (actionType === 'speedmaster_score' && typeof extraValue === 'number' && extraValue >= activeMission.target) {
          shouldIncrement = true;
          incrementAmount = activeMission.target;
        }
        break;
      default:
        break;
    }

    if (shouldIncrement) {
      setDailyState((prev) => {
        const nextProgress = Math.min(prev.target, prev.currentProgress + incrementAmount);
        const reachedTarget = nextProgress >= prev.target;

        if (reachedTarget && !prev.isCompleted) {
          sound.playFanfare();
          return {
            ...prev,
            currentProgress: nextProgress,
            isCompleted: true,
            streakDays: prev.streakDays + 1,
            lastCompletedDate: todayDateStr,
          };
        }

        return {
          ...prev,
          currentProgress: nextProgress,
        };
      });
    }
  };

  const handleClaimReward = () => {
    if (!dailyState.isCompleted || dailyState.isClaimed) return;

    sound.playFanfare();
    setStats((prev) => ({
      ...prev,
      totalStars: prev.totalStars + activeMission.rewardStars,
    }));
    setDailyState((prev) => ({
      ...prev,
      isClaimed: true,
    }));
  };

  const handleSelectSpecificMission = (missionId: string) => {
    const selected = DAILY_MISSIONS.find((m) => m.id === missionId);
    if (!selected) return;

    sound.playClick();
    setActiveMission(selected);
    setDailyState((prev) => ({
      ...prev,
      missionId: selected.id,
      currentProgress: 0,
      target: selected.target,
      isCompleted: false,
      isClaimed: false,
    }));
  };

  const handleSorterComplete = (starsWon: number) => {
    setStats((prev) => ({
      ...prev,
      sorterCompleted: prev.sorterCompleted + 1,
      totalStars: prev.totalStars + starsWon,
    }));
  };

  const handleDetectiveComplete = (starsWon: number) => {
    setStats((prev) => ({
      ...prev,
      detectiveCasesSolved: prev.detectiveCasesSolved + 1,
      totalStars: prev.totalStars + starsWon,
    }));
  };

  const handleBioCraftComplete = (starsWon: number) => {
    setStats((prev) => ({
      ...prev,
      biocraftSimulations: prev.biocraftSimulations + 1,
      totalStars: prev.totalStars + starsWon,
    }));
  };

  const handleSpeedQuizComplete = (finalScore: number, starsWon: number) => {
    setStats((prev) => ({
      ...prev,
      speedHighScore: Math.max(prev.speedHighScore, finalScore),
      totalStars: prev.totalStars + starsWon,
    }));
  };

  const handleResetStats = () => {
    setStats(DEFAULT_STATS);
    setDailyState({
      dateString: todayDateStr,
      missionId: defaultTodayMission.id,
      currentProgress: 0,
      target: defaultTodayMission.target,
      isCompleted: false,
      isClaimed: false,
      streakDays: 0,
      lastCompletedDate: null,
    });
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DAILY_STORAGE_KEY);
    sound.playSwoosh();
  };

  const dailyMissionSummary = `${activeMission.title} (${dailyState.currentProgress}/${dailyState.target})`;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-200 selection:text-emerald-950">
      {/* 3-Zone Clean Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        totalStars={stats.totalStars}
        dailyStreak={dailyState.streakDays}
        onOpenDailyMission={() => {
          setActiveTab('explore');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Main Learning Hub Stage */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {activeTab === 'explore' && (
          <div className="space-y-10">
            {/* Daily Mission Spotlight */}
            <DailyMissionCard
              mission={activeMission}
              missionState={dailyState}
              onClaimReward={handleClaimReward}
              onNavigateToGame={(gameId) => setActiveTab(gameId)}
              onSelectSpecificMission={handleSelectSpecificMission}
            />

            <Hero
              setActiveTab={setActiveTab}
              gameStats={stats}
            />

            <ConceptGuide onLaunchGame={(gameId) => setActiveTab(gameId)} />
          </div>
        )}

        {activeTab === 'sorter' && (
          <GameSorter
            onCompleteGame={handleSorterComplete}
            onNavigateToNext={() => setActiveTab('detective')}
            onDailyAction={handleDailyAction}
            dailyMissionText={activeMission.targetGame === 'sorter' ? dailyMissionSummary : undefined}
          />
        )}

        {activeTab === 'detective' && (
          <GameHabitatDetective
            onCompleteCase={handleDetectiveComplete}
            onNavigateToNext={() => setActiveTab('biocraft')}
            onDailyAction={handleDailyAction}
            dailyMissionText={activeMission.targetGame === 'detective' ? dailyMissionSummary : undefined}
          />
        )}

        {activeTab === 'biocraft' && (
          <GameBioCraft
            onCompleteSimulation={handleBioCraftComplete}
            onNavigateToNext={() => setActiveTab('speedmaster')}
            onDailyAction={handleDailyAction}
            dailyMissionText={activeMission.targetGame === 'biocraft' ? dailyMissionSummary : undefined}
          />
        )}

        {activeTab === 'speedmaster' && (
          <GameSpeedMaster
            onCompleteQuiz={handleSpeedQuizComplete}
            onViewMastery={() => setActiveTab('mastery')}
            onDailyAction={handleDailyAction}
            dailyMissionText={activeMission.targetGame === 'speedmaster' ? dailyMissionSummary : undefined}
          />
        )}

        {activeTab === 'mastery' && (
          <MasteryReport
            stats={stats}
            dailyStreak={dailyState.streakDays}
            onResetStats={handleResetStats}
            onNavigateToGame={(gameId) => setActiveTab(gameId)}
          />
        )}
      </main>

      {/* Clean Primary Science Curriculum Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">Adaptation Island</span>
            <span>·</span>
            <span>Primary Science Curriculum (Chapter 4: Adaptations)</span>
          </div>
          <div>
            <span>Structural Body Parts &amp; Behavioural Actions for Survival · Daily Missions Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
