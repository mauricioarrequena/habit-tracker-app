import styles from "../styles/components/AddHabit.module.css";
import type { Habit } from "../Types/Habit";
import colors from "../data/Colors";
import { useState, useEffect, useRef } from "react";
interface AddHabitProps {
  mode: string;
  onSubmitSave: (newHabit: Habit) => void;
  habitToEditId: string;
  onSubmitEdit: (newEditedHabit: Habit) => void;
}
export default function AddHabit({
  mode,
  onSubmitSave,
  habitToEditId,
  onSubmitEdit,
}: AddHabitProps) {
  const [habitName, setHabitName] = useState<string>("");
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [habitOnEdition, setHabitOnEdition] = useState<Habit>(null!);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    color: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (mode === "edit") {
      const foudnHabit = getHabitById(habitToEditId!)!;
      setHabitOnEdition(foudnHabit);
      setHabitName(foudnHabit.name);
      const foundColor = colors.find((c) => c.hex === foudnHabit.color)!;
      setSelectedColorId(foundColor.id);
    }
  }, []);

  const getHabitById = (id: string) => {
    const storedHabits = localStorage.getItem("habits");
    if (!storedHabits) {
      return null;
    }
    const habits: Habit[] = JSON.parse(storedHabits);
    return habits.find((habit) => habit.id === id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const foundColor = colors.find((color) => color.id === selectedColorId)!;

    const nameErrorMessage = refs.name.current!.nextElementSibling;
    if (!habitName) {
      nameErrorMessage?.classList.add(`${styles.errorMessageShown}`);
      return;
    }
    nameErrorMessage?.classList.remove(`${styles.errorMessageShown}`);

    const colorErrorMessage = refs.color.current!.nextElementSibling;
    if (!selectedColorId) {
      colorErrorMessage?.classList.add(`${styles.errorMessageShown}`);
      return;
    }
    colorErrorMessage?.classList.remove(`${styles.errorMessageShown}`);

    if (mode === "edit") {
      const newEditedHabit: Habit = {
        id: habitOnEdition.id,
        name: habitName,
        color: foundColor.hex,
        completedDays: habitOnEdition.completedDays,
        completed: habitOnEdition.completed,
      };
      onSubmitEdit!(newEditedHabit);
      return;
    }

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      color: foundColor.hex,
      completedDays: [],
      completed: false,
    };
    onSubmitSave!(newHabit);
    setHabitName("");
    setSelectedColorId("");
  };

  return (
    <div
      className={`${styles.card} ${mode === "edit" ? styles.cardEditMode : ""}`}
    >
      <div className={styles["card__title"]}>
        <span>{mode === "edit" ? "Edit Habit" : "Add New Habit"}</span>
      </div>
      <form className={styles["card__form"]} onSubmit={handleSubmit}>
        <div className={styles["card__input"]}>
          <input
            className={styles["input__field"]}
            type="text"
            placeholder="Enter habit name"
            ref={refs.name}
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
          <span className={styles.errorMessage}>Enter a name </span>
        </div>
        <div className={styles["card__color"]}>
          <span className={styles["color__label"]}>Choose a color</span>
          <div className={styles["color__list"]} ref={refs.color}>
            {colors.map((color) => (
              <span
                key={color.id}
                className={`${styles["color__item"]} ${
                  selectedColorId === color.id
                    ? styles["color__item--selected"]
                    : ""
                }`}
                style={
                  {
                    "--background-color": color.hex,
                    "--selected-color": color.hex,
                  } as React.CSSProperties
                }
                onClick={() => setSelectedColorId(color.id)}
              />
            ))}
          </div>
          <span className={styles.errorMessage}>Select a color</span>
        </div>
        <div className={styles["card__action"]}>
          <button className={styles["button"]} type="submit">
            {mode === "edit" ? "Edit Habit" : "Add Habit"}
          </button>
        </div>
      </form>
    </div>
  );
}
