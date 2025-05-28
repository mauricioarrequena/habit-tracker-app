import type { Habit } from "../Types/Habit";

const KEY = "habits";
export const habitService = {
  getHabit(id: string): Habit | null {
    const habitsItem = localStorage.getItem(KEY);
    if (!habitsItem) {
      return null;
    }
    const habits: Habit[] = JSON.parse(habitsItem);
    return habits.find((habit) => habit.id === id)!;
  },
};
