import styles from "../styles/pages/Dashboard.module.css";
import AddHabit from "../components/AddHabit";
import HabitCard from "../components/HabitCard";
import ResetHabits from "../components/ResetHabits";
import Modal from "../components/Modal";
import DeleteHabit from "../components/DeleteHabit";
import type { Habit } from "../Types/Habit";
import { ModeEnum } from "../enums/Mode.enum";
import { useEffect, useState } from "react";

import { habitService } from "../services/HabitService";

export default function Dashboard() {
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const habits = habitService.getHabits();
    setHabits(habits);
  }, []);

  const handleOnClickReset = () => {
    const habitsReseted = habits.map((habit) => {
      return { ...habit, completedDays: [], completed: false };
    });

    habitService.saveHabits(habitsReseted);
    const allHabits = habitService.getHabits();
    setHabits(allHabits);
  };

  const handleOnSubmitSave = (newHabit: Habit) => {
    const habits = habitService.getHabits();
    habits.push(newHabit);
    habitService.saveHabits(habits);
    const allHabits = habitService.getHabits();
    setHabits(allHabits);
  };

  const handleOnChangeDayToggle = (dayName: string, habit: Habit) => {
    const calculatedStateHabit: Habit = getHabitWithToggledDay(dayName, habit);
    habitService.updateHabit(calculatedStateHabit);
    const allHabits = habitService.getHabits();
    setHabits(allHabits);
  };

  const getHabitWithToggledDay = (dayName: string, habit: Habit): Habit => {
    const isDayCompleted = habit.completedDays.includes(dayName);

    let dayNames: string[];
    if (isDayCompleted) {
      dayNames = habit.completedDays.filter((d) => d !== dayName);
    } else {
      dayNames = [...habit.completedDays, dayName];
    }
    const completed: boolean = dayNames.length === 7 ? true : false;
    const updatedHabit: Habit = {
      ...habit,
      completedDays: dayNames,
      completed: completed,
    };
    return updatedHabit;
  };

  const handleOnSubmitEdit = (habitChanges: Habit) => {
    habitService.updateHabit(habitChanges);
    const habits = habitService.getHabits();
    setHabits(habits);
    setModalContent(null);
  };

  const handleOnClickEdit = (habit: Habit) => {
    const foundHabit = habits.find((h) => h.id === habit.id)!;
    showModalWithContent(
      <AddHabit
        mode={ModeEnum.EDIT}
        habitId={foundHabit.id}
        onSubmitSave={null}
        onSubmitEdit={handleOnSubmitEdit}
      />
    );
  };

  const handleOnClickCancel = () => {
    setModalContent(null);
  };

  const handleOnClickConfirm = (habit: Habit) => {
    const filteredHabits = habits.filter((h) => h.id !== habit.id);
    habitService.saveHabits(filteredHabits)
    const allHabits = habitService.getHabits();
    setHabits(allHabits);
    setModalContent(null);
  };

  const handleOnClickDelete = (habitToDelete: Habit) => {
    showModalWithContent(
      <DeleteHabit
        habit={habitToDelete}
        onClickCancel={handleOnClickCancel}
        onClickConfirm={handleOnClickConfirm}
      />
    );
  };

  const showModalWithContent = (content: React.ReactNode) => {
    setModalContent(content);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboard__header}>
        <ResetHabits onClickReset={handleOnClickReset} />
      </div>
      <div className={styles.dashboard__controls}>
        <AddHabit
          mode={ModeEnum.CREATE}
          habitId={null}
          onSubmitSave={handleOnSubmitSave}
          onSubmitEdit={null}
        />
      </div>
      <div className={styles.dashboard__content}>
        {habits.map((habit) => {
          return (
            <HabitCard
              key={habit.id}
              habit={habit}
              onChangeDayToggle={handleOnChangeDayToggle}
              onClickEdit={handleOnClickEdit}
              onClickDelete={handleOnClickDelete}
            />
          );
        })}
      </div>
      {modalContent && (
        <Modal onClose={() => setModalContent(null)}>{modalContent}</Modal>
      )}
    </div>
  );
}
