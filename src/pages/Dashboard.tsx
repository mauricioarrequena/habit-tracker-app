import styles from "../styles/pages/Dashboard.module.css";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/HabitCard";
import ResetHabits from "../components/ResetHabits";
import Modal from "../components/Modal";
import type { Habit } from "../Types/Habit";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [shownModal, setShownModal] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState<Habit>(null!);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const getHabits = () => {
      setHabits(JSON.parse(localStorage.getItem("habits") || "[]"));
    };

    getHabits();
  }, []);

  const handleOnSubmitEditForAddHabit = (habitToSubmit: Habit) => {
    const updatedHabits = habits.map((habit) =>
      habit.id === habitToSubmit.id ? habitToSubmit : habit
    );
    localStorage.setItem("habits", JSON.stringify(updatedHabits));
    setHabits(updatedHabits);
    setShownModal(false);
  };

  const handleEditHabitCardForHabitCard = (selectedHabit: Habit) => {
    const foundHabit = habits.find((habit) => habit.id === selectedHabit.id)!;
    setSelectedHabit(foundHabit);
    setShownModal(true);
  };

  const handleOnAddHabitForAddHabit = (newHabit: Habit) => {
    const savedHabits: Habit[] = JSON.parse(
      localStorage.getItem("habits") || "[]"
    );
    savedHabits.push(newHabit);
    localStorage.setItem("habits", JSON.stringify(savedHabits));
    setHabits(savedHabits);
  };

  const handleOnToggleDayForHabitCard = (habitId: string, day: string) => {
    const updatedHabits = habits.map((habit) => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDays.includes(day);
        const updatedDays = isCompleted
          ? habit.completedDays.filter((d) => d !== day)
          : [...habit.completedDays, day];
        return { ...habit, completedDays: updatedDays };
      }
      return habit;
    });

    const checkedCompletedHabit = updatedHabits.map((habit) => {
      if (habit.completedDays.length === 7) {
        return { ...habit, completed: true };
      }
      return { ...habit, completed: false };
    });

    localStorage.setItem("habits", JSON.stringify(checkedCompletedHabit));
    setHabits(checkedCompletedHabit);
  };

  const handleOnClickResetForResetHabits = () => {
    const resetHabits = habits.map((habit) => {
      return { ...habit, completedDays: [], completed: false };
    });

    localStorage.setItem("habits", JSON.stringify(resetHabits));
    setHabits(resetHabits);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <ResetHabits onClickReset={handleOnClickResetForResetHabits} />
      </div>
      <div className={styles.dashboard__controls}>
        <AddHabit mode="add" onAddHabit={handleOnAddHabitForAddHabit} />
      </div>
      <div className={styles.dashboard__content}>
        {habits.map((habit) => {
          return (
            <HabitCard
              key={habit.id}
              habit={habit}
              onToggleDay={(day) =>
                handleOnToggleDayForHabitCard(habit.id, day)
              }
              onEditHabitCard={handleEditHabitCardForHabitCard}
            />
          );
        })}
      </div>
      {shownModal && (
        <Modal onClose={() => setShownModal(false)}>
          <AddHabit
            mode="edit"
            habitToEditId={selectedHabit.id}
            onSubmitEditHabit={handleOnSubmitEditForAddHabit}
          />
        </Modal>
      )}
    </div>
  );
}
