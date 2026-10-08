import React, { useState } from 'react';
import { Award, CheckCircle2, Star, Sparkles, Printer, RotateCcw, ArrowRight, ShieldCheck, Download } from 'lucide-react';
import { SYLLABUS_OBJECTIVES } from '../data/adaptationsData';
import { sound } from '../utils/audio';

interface MasteryReportProps {
  stats: {
    sorterCompleted: number;
    detectiveCasesSolved: number;
    biocraftSimulations: number;
    speedHighScore: number;
    totalStars: number;
  };
  dailyStreak: number;
  onResetStats: () => void;
  onNavigateToGame: (gameId: string) => void;
}

export const MasteryReport: React.FC<MasteryReportProps> = ({
  stats,
  dailyStreak,
  onResetStats,
  onNavigateToGame,
}) => {
  const [studentName, setStudentName] = useState('Alex');
  const [showCertificate, setShowCertificate] = useState(false);

  // Check objective masteries based on game stats
  const isObjMastered = (objId: string) => {
    switch (objId) {
      case 'obj-1':
        return stats.detectiveCasesSolved >= 1 || stats.biocraftSimulations >= 1;
      case 'obj-2':
        return stats.sorterCompleted >= 1 || stats.speedHighScore >= 20;
      case 'obj-3':
        return stats.sorterCompleted >= 1 || stats.biocraftSimulations >= 1;
      case 'obj-4':
        return stats.sorterCompleted >= 1 || stats.biocraftSimulations >= 1;
      case 'obj-5':
        return stats.sorterCompleted >= 1 || stats.detectiveCasesSolved >= 2;
      case 'obj-6':
        return stats.sorterCompleted >= 1 || stats.detectiveCasesSolved >= 2;
      case 'obj-7':
        return stats.detectiveCasesSolved >= 2 || stats.biocraftSimulations >= 1;
      default:
        return false;
    }
  };

  const masteredCount = SYLLABUS_OBJECTIVES.filter((o) => isObjMastered(o.id)).length;
  const isAllMastered = masteredCount === SYLLABUS_OBJECTIVES.length;

  const handlePrint = () => {
    sound.playClick();
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>Mastery Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>Chapter 4 Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            Primary Science Curriculum Mastery
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time verification of all 7 syllabus learning objectives for Primary 3-6 Science.
          </p>
        </div>

        {/* Global Progress Dial */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold uppercase block">Mastered</span>
            <span className="text-3xl font-black text-emerald-600 tabular-nums">
              {masteredCount} / {SYLLABUS_OBJECTIVES.length}
            </span>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div className="text-center">
            <span className="text-xs text-slate-500 font-bold uppercase block">Total Stars</span>
            <span className="text-3xl font-black text-amber-500 tabular-nums flex items-center justify-center gap-1">
              <Sparkles className="w-5 h-5 fill-amber-400" />
              {stats.totalStars}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Mastery Badges Deck */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-3">Earned Mastery Badges</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {/* Badge 1 */}
          <div
            className={`p-4 rounded-2xl border text-center transition-all ${
              stats.sorterCompleted > 0
                ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 mx-auto flex items-center justify-center font-black mb-2">
              🌿
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm">Sorter Specialist</h4>
            <p className="text-[11px] text-slate-500 mt-1">Differentiated structural vs behavioural traits</p>
          </div>

          {/* Badge 2 */}
          <div
            className={`p-4 rounded-2xl border text-center transition-all ${
              stats.detectiveCasesSolved > 0
                ? 'bg-sky-50 border-sky-300 text-sky-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-sky-200 text-sky-800 mx-auto flex items-center justify-center font-black mb-2">
              🔍
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm">Habitat Sleuth</h4>
            <p className="text-[11px] text-slate-500 mt-1">Matched survival traits to extreme environments</p>
          </div>

          {/* Badge 3 */}
          <div
            className={`p-4 rounded-2xl border text-center transition-all ${
              stats.biocraftSimulations > 0
                ? 'bg-violet-50 border-violet-300 text-violet-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-violet-200 text-violet-800 mx-auto flex items-center justify-center font-black mb-2">
              🧬
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm">Bio-Engineer</h4>
            <p className="text-[11px] text-slate-500 mt-1">Engineered organisms to survive environmental hazards</p>
          </div>

          {/* Badge 4 */}
          <div
            className={`p-4 rounded-2xl border text-center transition-all ${
              stats.speedHighScore > 0
                ? 'bg-amber-50 border-amber-300 text-amber-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-800 mx-auto flex items-center justify-center font-black mb-2">
              ⚡
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm">Speed Master</h4>
            <p className="text-[11px] text-slate-500 mt-1">High score: {stats.speedHighScore} pts in rapid gauntlet</p>
          </div>

          {/* Badge 5: Daily Scholar */}
          <div
            className={`p-4 rounded-2xl border text-center transition-all ${
              dailyStreak > 0
                ? 'bg-orange-50 border-orange-300 text-orange-950 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
            }`}
          >
            <div className="w-10 h-10 rounded-full bg-orange-200 text-orange-800 mx-auto flex items-center justify-center font-black mb-2">
              🔥
            </div>
            <h4 className="font-extrabold text-xs sm:text-sm">Daily Scholar</h4>
            <p className="text-[11px] text-slate-500 mt-1">
              {dailyStreak > 0 ? `${dailyStreak}-Day learning streak achieved!` : 'Complete today\'s mission to activate!'}
            </p>
          </div>
        </div>
      </div>

      {/* 7 Objectives Detailed Checklist */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-extrabold text-lg text-slate-900">
            Chapter 4 - Adaptations: Official Syllabus Objectives
          </h3>
          <span className="text-xs text-slate-500">Curriculum Diagnostic Matrix</span>
        </div>

        <div className="space-y-3">
          {SYLLABUS_OBJECTIVES.map((obj) => {
            const mastered = isObjMastered(obj.id);
            return (
              <div
                key={obj.id}
                className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  mastered
                    ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                    : 'bg-slate-50 border-slate-200/80 text-slate-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {mastered ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-100 shrink-0" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-300 shrink-0" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold px-1.5 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                        {obj.code}
                      </span>
                      <h4 className="font-bold text-sm text-slate-900">{obj.title}</h4>
                    </div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      {obj.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <span
                    className={`text-xs font-bold px-2.5 py-1 rounded-md ${
                      mastered
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {mastered ? 'Mastered ★' : 'In Progress'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate Generator */}
      <div className="bg-gradient-to-br from-slate-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Official Student Recognition
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Adaptations Mastery Certificate
            </h3>
            <p className="text-xs text-slate-300">
              Personalize and print your achievement certificate for school, teachers, or parents!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="Enter student name"
              className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
            <button
              onClick={() => {
                sound.playClick();
                setShowCertificate(!showCertificate);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm whitespace-nowrap transition-colors cursor-pointer"
            >
              {showCertificate ? 'Hide Preview' : 'Generate Certificate'}
            </button>
          </div>
        </div>

        {/* Certificate Preview Card */}
        {showCertificate && (
          <div
            id="certificate-print-area"
            className="p-8 sm:p-12 bg-white text-slate-900 rounded-3xl border-8 border-double border-amber-600/60 shadow-2xl space-y-6 text-center animate-fadeIn relative overflow-hidden"
          >
            {/* Watermark badge */}
            <div className="text-center space-y-2">
              <span className="text-xs font-black tracking-widest uppercase text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Primary Science Honors
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-wide text-slate-900 uppercase">
                Certificate of Mastery
              </h2>
              <p className="text-xs text-slate-500 uppercase tracking-widest">
                Chapter 4: Adaptations & Habitat Survival
              </p>
            </div>

            <div className="py-4 space-y-2">
              <p className="text-xs text-slate-500 italic">This certifies that primary scientist</p>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-emerald-800 underline decoration-amber-400 decoration-wavy">
                {studentName || 'Young Scientist'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mt-2 leading-relaxed">
                has successfully differentiated between <strong>Structural Adaptations</strong> (special body parts) and <strong>Behavioural Adaptations</strong> (special actions), and demonstrated scientific mastery across Desert, Arctic, Rainforest, and Ocean environments.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-b border-amber-200 py-3 text-xs">
              <div>
                <span className="text-slate-400 block font-semibold">Objectives Cleared</span>
                <span className="font-black text-slate-900 text-base">{masteredCount} / 7</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Stars Earned</span>
                <span className="font-black text-amber-600 text-base">{stats.totalStars} ★</span>
              </div>
              <div>
                <span className="text-slate-400 block font-semibold">Certification Date</span>
                <span className="font-black text-slate-900 text-base">
                  {new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-400">
              <span className="italic">Adaptation Island Science Board</span>
              <span className="font-mono">ID: {Math.random().toString(36).substring(2, 9).toUpperCase()}</span>
            </div>

            <div className="pt-4 flex justify-center">
              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print or Save as PDF
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reset stats footer button */}
      <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
        <span>Mastery data is stored in your current browser session.</span>
        <button
          onClick={() => {
            if (window.confirm('Reset all progress and stars to 0?')) {
              onResetStats();
            }
          }}
          className="text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset Progress
        </button>
      </div>
    </div>
  );
};
