import styles from "../styles/pages/Dashboard.module.css";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/HabitCard";
import ResetHabits from "../components/ResetHabits";
import Modal from "../components/Modal";
import type { Habit } from "../Types/Habit";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [shownModal, setShownModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>(null!); // or whole habit object
  const [habits, setHabits] = useState<Habit[]>([]);


  const handleEditHabit = () => {
    setSelectedHabit(selectedHabit); 
    setShownModal(true);
  };


  useEffect(() => {
    const getHabits = () => {
      setHabits(JSON.parse(localStorage.getItem("habits") || "[]"));
    }

    getHabits();
  }, []);

  const addHabit = (newHabit: Habit) => {
    const savedHabits: Habit[] = JSON.parse(localStorage.getItem("habits") || "[]");
    savedHabits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(savedHabits));
    setHabits(savedHabits);
  }

  const toggleHabitDay = (habitId: string, day: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(day);
        const updatedDays = isCompleted ? habit.completedDays.filter((d) => d !== day) : [...habit.completedDays, day];
        return { ...habit, completedDays: updatedDays };
      }
      return habit;
    });

    const checkedCompletedHabit = updatedHabits.map((habit) => {
      if (habit.completedDays.length === 7) {
        return { ...habit, completed: true }
      }
      return { ...habit, completed: false };
    });

    localStorage.setItem("habits", JSON.stringify(checkedCompletedHabit));
    setHabits(checkedCompletedHabit);
  }

  const selectHabit = (habitId: string) => {
    const storedHabits = localStorage.getItem("habits");
    if (!storedHabits) return null;
    try {
      const habits: Habit[] = JSON.parse(storedHabits);
      const foundHabit = habits.find((habit) => habit.id === habitId)!;
      setSelectedHabit(foundHabit);

    } catch (error) {
      console.error("Error parsing habits from localStorage:", error);
      return null;
    }

  }

  const resetHabitDays = () => {
    const resetHabits = habits.map((habit) => {
      return { ...habit, completedDays: [], completed: false }
    })

    localStorage.setItem("habits", JSON.stringify(resetHabits));
    setHabits(resetHabits);
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <ResetHabits onClickReset={resetHabitDays} />
      </div>
      <div className={styles.dashboard__controls}>
        <AddHabit mode="add" onAddHabit={addHabit} />
      </div>
      <div className={styles.dashboard__content}>
        {
          habits.map((habit) => {
            return <HabitCard
              key={habit.id}
              title={habit.name}
              color={habit.color}
              completedDays={habit.completedDays}
              onToggleDay={(day) => toggleHabitDay(habit.id, day)}
              completed={habit.completed}
              onEdit={() => handleEditHabit()}
            />
          })
        }
      </div>
      {shownModal && (
        <Modal onClose={() => setShownModal(false)}>
          <AddHabit
            mode="edit"
            habitToEditId={habits[0].id}
            onUpdateHabit={() => { }}
          />
        </Modal>
      )}
    </div>
  )
}