"use client";
// ============================================================================
// SHARED USER PROFILE — one source of truth for every interactive tool.
// The AI-prompt generator reads this to build the copy-paste planning string.
// ============================================================================
import React, { createContext, useContext, useMemo, useState } from "react";
import { type Sex } from "./calc";

export interface Profile {
  sex: Sex;
  age: number;
  heightCm: number;
  weightKg: number;
  activityId: string;
  goalId: string;
  diet: "omnivore" | "eggetarian" | "vegetarian" | "vegan";
  lactoseFree: boolean;
  meals: number;
  budgetSensitive: boolean;
  allergies: string;
}

const DEFAULT_PROFILE: Profile = {
  sex: "male",
  age: 28,
  heightCm: 172,
  weightKg: 72,
  activityId: "moderate",
  goalId: "muscle",
  diet: "omnivore",
  lactoseFree: false,
  meals: 4,
  budgetSensitive: true,
  allergies: "",
};

interface Ctx {
  profile: Profile;
  set: <K extends keyof Profile>(key: K, value: Profile[K]) => void;
  reset: () => void;
}

const ProfileContext = createContext<Ctx | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);
  const value = useMemo<Ctx>(
    () => ({
      profile,
      set: (key, val) => setProfile((p) => ({ ...p, [key]: val })),
      reset: () => setProfile(DEFAULT_PROFILE),
    }),
    [profile]
  );
  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile(): Ctx {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfile must be used within ProfileProvider");
  return ctx;
}
