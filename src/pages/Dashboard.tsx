import styles from "../styles/pages/Dashboard.module.css";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/HabitCard";
import type { Habit } from "../Types/Habit";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getHabits = () => {
      setHabits(JSON.parse(localStorage.getItem("habits") || "[]"));
    }

    getHabits();
  }, []);

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <span>dashboard header</span>
      </div>
      <div className={styles.dashboard__controls}>
        <AddHabit />
      </div>
      <div className={styles.dashboard__content}>
        {
          habits.map((habit) => {
            return (
              HabitCard({ title: habit.name })
            )
          })
        }
      </div>
    </div>
  )
}