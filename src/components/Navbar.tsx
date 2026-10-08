import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Sparkles, Flame, Target } from 'lucide-react';
import { sound } from '../utils/audio';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalStars: number;
  dailyStreak: number;
  onOpenDailyMission?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  totalStars,
  dailyStreak,
  onOpenDailyMission,
}) => {
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    setIsMuted(sound.isMuted());
  }, []);

  const handleToggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const navItems = [
    { id: 'explore', label: 'Concept Guide' },
    { id: 'sorter', label: '1. Sorter Lab' },
    { id: 'detective', label: '2. Habitat Detective' },
    { id: 'biocraft', label: '3. BioCraft Simulator' },
    { id: 'speedmaster', label: '4. Speed Master' },
    { id: 'mastery', label: 'My Mastery' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => {
            sound.playClick();
            setActiveTab('explore');
          }}
          className="text-xl font-bold tracking-tight text-emerald-800 hover:text-emerald-700 transition-colors text-left flex items-center gap-2 cursor-pointer"
        >
          <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
            A
          </span>
          <span>Adaptation Island</span>
        </button>

        {/* Zone 2: Clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setActiveTab(item.id);
                }}
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border-b-2 border-emerald-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Daily Streak Indicator */}
          <button
            onClick={() => {
              sound.playClick();
              if (onOpenDailyMission) {
                onOpenDailyMission();
              } else {
                setActiveTab('explore');
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-orange-900 text-xs font-black shadow-2xs transition-colors cursor-pointer"
            title="Daily Mission Streak"
          >
            <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
            <span className="tabular-nums font-mono">{dailyStreak}</span>
            <span className="text-[11px] text-orange-700 hidden sm:inline">Streak</span>
          </button>

          {/* Star Tally */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="tabular-nums">{totalStars}</span>
            <span className="text-xs text-amber-700 font-medium hidden sm:inline">Stars</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            aria-label={isMuted ? 'Unmute audio effects' : 'Mute audio effects'}
            className="p-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
            title={isMuted ? 'Audio Muted' : 'Audio Active'}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-rose-500" /> : <Volume2 className="w-5 h-5 text-emerald-600" />}
          </button>
        </div>
      </div>

      {/* Mobile nav bar row for smaller screens */}
      <div className="lg:hidden flex items-center gap-1 px-3 py-2 bg-slate-100 overflow-x-auto border-t border-slate-200">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playClick();
                setActiveTab(item.id);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                isActive ? 'bg-emerald-700 text-white shadow-xs' : 'bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
