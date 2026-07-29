import type { ProfileId } from "./types";
import type {
  AccessoriesPlan,
  NotesData,
  NutritionPlan,
  WorkoutPlan,
} from "./types";

import bedoNutrition from "@/data/bedo/nutrition.json";
import bedoWorkout from "@/data/bedo/workout.json";
import bedoAccessories from "@/data/bedo/accessories.json";
import bedoNotes from "@/data/bedo/notes.json";
import juliaNutrition from "@/data/julia/nutrition.json";
import juliaWorkout from "@/data/julia/workout.json";
import juliaAccessories from "@/data/julia/accessories.json";
import juliaNotes from "@/data/julia/notes.json";

const nutrition: Record<ProfileId, NutritionPlan> = {
  bedo: bedoNutrition as NutritionPlan,
  julia: juliaNutrition as NutritionPlan,
};

const workouts: Record<ProfileId, WorkoutPlan> = {
  bedo: bedoWorkout as WorkoutPlan,
  julia: juliaWorkout as WorkoutPlan,
};

const accessories: Record<ProfileId, AccessoriesPlan> = {
  bedo: bedoAccessories as AccessoriesPlan,
  julia: juliaAccessories as AccessoriesPlan,
};

const notes: Record<ProfileId, NotesData> = {
  bedo: bedoNotes as NotesData,
  julia: juliaNotes as NotesData,
};

export function getNutrition(profile: ProfileId) {
  return nutrition[profile];
}

export function getWorkout(profile: ProfileId) {
  return workouts[profile];
}

export function getAccessories(profile: ProfileId) {
  return accessories[profile];
}

export function getNotes(profile: ProfileId) {
  return notes[profile];
}

export function isValidProfile(value: string): value is ProfileId {
  return value === "bedo" || value === "julia";
}
