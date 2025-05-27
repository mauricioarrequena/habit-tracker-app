import styles from "../styles/components/AddHabit.module.css";
import type { Habit } from "../Types/Habit";
import { useState, useEffect } from "react";

interface AddHabitProps {
  mode: string;
  onSubmitAddHabit: (newHabit: Habit) => void;
  habitToEditId: string;
  onSubmitEditHabit: (updatedHabit: Habit) => void;
}
export default function AddHabit({
  mode,
  onSubmitAddHabit,
  habitToEditId,
  onSubmitEditHabit,
}: AddHabitProps) {
  const [habitName, setHabitName] = useState<string>("");
  const [selectedColorId, setSelectedColorId] = useState<string>("");
  const [habitOnEdition, setHabitOnEdition] = useState<Habit>(null!);

  type Color = {
    id: string;
    name: string;
    hex: string;
  };

  const colors: Color[] = [
    { id: "1", name: "Red", hex: "#f44336" },
    { id: "2", name: "Purple", hex: "#9c27b0" },
    { id: "3", name: "Blue", hex: "#2196f3" },
    { id: "4", name: "Green", hex: "#4caf50" },
    { id: "5", name: "Orange", hex: "#ff9800" },
  ];

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
    if (mode === "edit") {
      const newEditedHabit: Habit = {
        id: habitOnEdition.id,
        name: habitName,
        color: foundColor.hex,
        completedDays: habitOnEdition.completedDays,
        completed: habitOnEdition.completed,
      };
      onSubmitEditHabit!(newEditedHabit);
      return;
    }

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      color: foundColor.hex,
      completedDays: [],
      completed: false,
    };
    onSubmitAddHabit!(newHabit);
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
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
          />
        </div>
        <div className={styles["card__color"]}>
          <span className={styles["color__label"]}>Choose a color</span>
          <div className={styles["color__list"]}>
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
