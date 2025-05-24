import { useState } from "react";
import styles from "../styles/components/AddHabit.module.css";
import type { Habit } from "../Types/Habit";

interface AddHabitProps {
  onAddHabit: (newHabit: Habit) => void;  
}

export default function AddHabit({ onAddHabit}: AddHabitProps) {
  const [habitName, setHabitName] = useState<string>("");
  const [selectedColorId, setSelectedColorId] = useState<string>("");

  type Color = {
    id: string,
    name: string,
    hex: string,
  };

  const colors: Color[] = [
    { id: "1", name: "Red", hex: "#f44336" },
    { id: "2", name: "Purple", hex: "#9c27b0" },
    { id: "3", name: "Blue", hex: "#2196f3" },
    { id: "4", name: "Green", hex: "#4caf50" },
    { id: "5", name: "Orange", hex: "#ff9800" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedColor = colors.find(color => color.id === selectedColorId)!;
    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName,
      color: selectedColor?.hex,
    };
    onAddHabit(newHabit);

    setHabitName("");
    setSelectedColorId("");
  }


  return (
    <div className={styles.card}>
      <div className={styles["card__title"]}>
        <span>Add New Habit</span>
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
            {colors.map((color) => {
              return (
                <span
                  key={color.id}
                  className={`${styles["color__item"]} ${selectedColorId === color.id ? styles["color__item--selected"] : ""}`}
                  style={{
                    "--background-color": color.hex,
                    "--selected-color": color.hex,
                  } as React.CSSProperties}
                  onClick={() => setSelectedColorId(color.id)}
                />
              );
            })}
          </div>
        </div>

        <div className={styles["card__action"]}>
          <button className={styles["button"]} type="submit">+ Add a Habit</button>
        </div>
      </form>
    </div>
  );
}
