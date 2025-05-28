import type { Habit } from "../Types/Habit";

const KEY = "habits";
export const habitService = {
  saveHabits(habits: Habit[]) {
    localStorage.setItem(KEY, JSON.stringify(habits));
  },

  getHabit(id: string): Habit | null {
    const habitsItem = localStorage.getItem(KEY);
    if (!habitsItem) {
      return null;
    }
    const habits: Habit[] = JSON.parse(habitsItem);
    return habits.find((habit) => habit.id === id)!;
  },

  getHabits(): Habit[] {
    const habitsItem = localStorage.getItem(KEY);
    return habitsItem ? JSON.parse(habitsItem) : [];
  },

  updateHabit(habitChanges: Habit) {
    const habits = this.getHabits();
    const updatedHabits = habits.map((habit) =>
      habit.id === habitChanges.id ? habitChanges : habit
    );
    localStorage.setItem(KEY, JSON.stringify(updatedHabits));
  },
};
