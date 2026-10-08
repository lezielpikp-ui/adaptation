// Daily Mission System for Primary Science: Chapter 4 - Adaptations

export interface DailyMission {
  id: string;
  title: string;
  description: string;
  objectiveCode: string;
  objectiveDescription: string;
  type: 'structural_count' | 'behavioural_count' | 'any_sorter_count' | 'detective_cases' | 'biocraft_simulation' | 'speedmaster_score';
  target: number;
  targetGame: 'sorter' | 'detective' | 'biocraft' | 'speedmaster';
  gameLabel: string;
  rewardStars: number;
  scienceTip: string;
}

export const DAILY_MISSIONS: DailyMission[] = [
  {
    id: 'mission-structural-3',
    title: 'Master 3 Structural Adaptations',
    description: 'Correctly identify 3 physical body parts (structural traits) that help organisms survive.',
    objectiveCode: 'LO 4.3 & LO 4.5',
    objectiveDescription: 'Structural adaptations are special body parts an organism has to survive.',
    type: 'structural_count',
    target: 3,
    targetGame: 'sorter',
    gameLabel: 'Sorter Lab',
    rewardStars: 5,
    scienceTip: 'Remember: If it is a physical part on the body (blubber, webbed feet, spines), it is Structural!'
  },
  {
    id: 'mission-behavioural-3',
    title: 'Spot 3 Behavioural Survival Actions',
    description: 'Correctly identify 3 special actions or habits (behavioural traits) that help organisms survive.',
    objectiveCode: 'LO 4.4 & LO 4.6',
    objectiveDescription: 'Behavioural adaptations are special ways an organism behaves to survive.',
    type: 'behavioural_count',
    target: 3,
    targetGame: 'sorter',
    gameLabel: 'Sorter Lab',
    rewardStars: 5,
    scienceTip: 'Remember: If it is an action or habit the organism does (migrating, huddling, playing dead), it is Behavioural!'
  },
  {
    id: 'mission-detective-2',
    title: 'Habitat Sleuth: Solve 2 Crime Files',
    description: 'Investigate environmental hazards and match the exact survival adaptation for 2 organisms.',
    objectiveCode: 'LO 4.1 & LO 4.7',
    objectiveDescription: 'Adaptations are special features that help organisms survive in specific natural habitats.',
    type: 'detective_cases',
    target: 2,
    targetGame: 'detective',
    gameLabel: 'Habitat Detective',
    rewardStars: 6,
    scienceTip: 'Every habitat has unique challenges—extreme cold, blinding sand, or darkness requires specialized traits!'
  },
  {
    id: 'mission-biocraft-1',
    title: 'Bio-Engineer 1 Extreme Survivor',
    description: 'Design a creature with 2 structural and 2 behavioural traits that passes all 3 environmental hazards.',
    objectiveCode: 'LO 4.3, 4.4 & 4.7',
    objectiveDescription: 'Combining physical parts and survival behaviours enables survival under harsh conditions.',
    type: 'biocraft_simulation',
    target: 1,
    targetGame: 'biocraft',
    gameLabel: 'BioCraft Simulator',
    rewardStars: 5,
    scienceTip: 'Match your creature\'s body covering and activity rhythm to the specific temperature and moisture of the biome.'
  },
  {
    id: 'mission-speedmaster-40',
    title: 'Gauntlet Champion: Score 40+ Points',
    description: 'Complete the Speed Master challenge and demonstrate high accuracy across all Chapter 4 objectives.',
    objectiveCode: 'All 7 Objectives',
    objectiveDescription: 'Comprehensive rapid diagnostic across adaptations syllabus.',
    type: 'speedmaster_score',
    target: 40,
    targetGame: 'speedmaster',
    gameLabel: 'Speed Master',
    rewardStars: 6,
    scienceTip: 'Read carefully: ask yourself if each question describes a physical body part or an action!'
  },
  {
    id: 'mission-sorter-5',
    title: 'Classification Ace: Sort 5 Adaptations',
    description: 'Successfully classify 5 organisms into structural or behavioural adaptations in the Sorter Lab.',
    objectiveCode: 'LO 4.2',
    objectiveDescription: 'Differentiate between structural and behavioural adaptations.',
    type: 'any_sorter_count',
    target: 5,
    targetGame: 'sorter',
    gameLabel: 'Sorter Lab',
    rewardStars: 5,
    scienceTip: 'Keep your streak going! High streaks earn bonus points and show deep conceptual understanding.'
  }
];

export interface DailyMissionState {
  dateString: string; // 'YYYY-MM-DD'
  missionId: string;
  currentProgress: number;
  target: number;
  isCompleted: boolean;
  isClaimed: boolean;
  streakDays: number;
  lastCompletedDate: string | null;
}

// Get the deterministic mission for a given calendar date
export function getMissionForDate(date: Date = new Date()): DailyMission {
  // Use day of year + year as stable seed
  const startOfYear = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - startOfYear.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const missionIndex = Math.abs(dayOfYear) % DAILY_MISSIONS.length;
  return DAILY_MISSIONS[missionIndex];
}

export function getTodayDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
