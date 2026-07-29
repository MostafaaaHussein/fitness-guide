export type ProfileId = "bedo" | "julia";

export type Locale = "ar" | "en" | "ru";

export interface ExerciseOption {
  name: string;
  slug: string;
}

export interface WorkoutExercise {
  id: string;
  muscle: string;
  region?: string;
  options: ExerciseOption[];
  sets: number;
  reps: string;
  notes?: string;
}

export interface WorkoutDay {
  day: number;
  focus: string;
  exercises: WorkoutExercise[];
}

export interface WorkoutPlan {
  profile: string;
  days: WorkoutDay[];
}

export interface AccessoryExercise {
  id: string;
  muscle: string;
  options: ExerciseOption[];
  sets: number;
  reps: string;
  placement: string;
}

export interface AccessoriesPlan {
  exercises: AccessoryExercise[];
}

export interface Meal {
  id: string;
  name: string;
  ingredients: string;
  grams?: string;
  alternatives: string[];
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface NutritionDay {
  day: string;
  meals: Meal[];
}

export interface SubstitutionGroup {
  source: string;
  alternatives?: string[];
  amount?: string;
}

export interface NutritionPlan {
  profile: string;
  phase: string;
  goals: {
    calories: number | string;
    protein: number;
    carbs: number;
    fat: number;
    water: string;
    training?: string;
  };
  notes?: string[];
  days: NutritionDay[];
  substitutions: {
    protein: SubstitutionGroup[];
    carbs?: SubstitutionGroup[];
    fats: SubstitutionGroup[];
    snackNuts?: SubstitutionGroup[];
    preWorkoutFruit?: SubstitutionGroup[];
    preWorkoutCarbs?: SubstitutionGroup[];
  };
}

export interface NotesData {
  defaultNotes: string;
}

export interface SetLog {
  weight: string;
  reps: string;
  completed: boolean;
}

export interface ExerciseProgress {
  selectedOptionIndex: number;
  sets: SetLog[];
}

export interface DayWorkoutProgress {
  exercises: Record<string, ExerciseProgress>;
  cardioCompleted: boolean;
  date: string;
}

export interface DayMealProgress {
  meals: Record<string, boolean>;
  date: string;
}

export interface WaterProgress {
  ml: number;
  date: string;
}

export const PROFILES: Record<
  ProfileId,
  { id: ProfileId; name: string; theme: "blue" | "pink"; accent: string }
> = {
  bedo: {
    id: "bedo",
    name: "Bedo",
    theme: "blue",
    accent: "oklch(0.55 0.18 250)",
  },
  julia: {
    id: "julia",
    name: "Julia",
    theme: "pink",
    accent: "oklch(0.62 0.2 350)",
  },
};

export const WEEKDAYS = [
  "Saturday",
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
] as const;

export const WATER_GOAL_ML: Record<ProfileId, number> = {
  bedo: 3500,
  julia: 3000,
};
