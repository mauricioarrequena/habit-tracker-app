import styles from "../styles/components/AddHabit.module.css";
import type { Habit } from "../Types/Habit";
import colors from "../data/Colors";
import { habitService } from "../services/habitService";
import { useState, useEffect, useRef } from "react";
import type { Color } from "../Types/Color";
import { ModeEnum } from "../enums/Mode.enum";

interface AddHabitProps {
  mode: ModeEnum;
  habitId: string;
  onSubmitSave: (newHabit: Habit) => void;
  onSubmitEdit: (newEditedHabit: Habit) => void;
}
export default function AddHabit({
  mode,
  habitId,
  onSubmitSave,
  onSubmitEdit,
}: AddHabitProps) {
  const [habitName, setHabitName] = useState<string>("");
  const [habitColor, setHabitColor] = useState<Color | null>(null);
  const [habitOnEdition, setHabitOnEdition] = useState<Habit | null>(null);
  const refs = {
    name: useRef<HTMLInputElement>(null),
    color: useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    if (mode === ModeEnum.EDIT) {
      const habit = habitService.getHabit(habitId!)!;
      setHabitOnEdition(habit);
      setHabitName(habit.name);
      const color = colors.find((c) => c.hex === habit.hexColor)!;
      setHabitColor(color);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameErrorMessage = refs.name.current!.nextElementSibling;
    if (!habitName) {
      nameErrorMessage?.classList.add(`${styles.errorMessageShown}`);
      return;
    }
    nameErrorMessage?.classList.remove(`${styles.errorMessageShown}`);
    const colorErrorMessage = refs.color.current!.nextElementSibling;
    if (!habitColor) {
      colorErrorMessage?.classList.add(`${styles.errorMessageShown}`);
      return;
    }
    colorErrorMessage?.classList.remove(`${styles.errorMessageShown}`);

    if (mode === ModeEnum.EDIT) {
      const updatedHabit: Habit = {
        id: habitOnEdition!.id,
        name: habitName,
        hexColor: habitColor.hex,
        completedDays: habitOnEdition!.completedDays,
        completed: habitOnEdition!.completed,
      };
      onSubmitEdit!(updatedHabit);
      return;
    }

    const newHabit: Habit = {
      id: crypto.randomUUID(),
      name: habitName.trim(),
      hexColor: habitColor.hex,
      completedDays: [],
      completed: false,
    };
    onSubmitSave(newHabit);
    setHabitName("");
    setHabitColor(null);
  };

  return (
    <div
      className={`${styles.card} ${
        mode === ModeEnum.EDIT ? styles.cardEditMode : ""
      }`}
    >
      <div className={styles["card__title"]}>
        <span>{mode === ModeEnum.EDIT ? "Edit Habit" : "Add New Habit"}</span>
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
                  habitColor === color ? styles["color__item--selected"] : ""
                }`}
                style={
                  {
                    "--background-color": color.hex,
                    "--selected-color": color.hex,
                  } as React.CSSProperties
                }
                onClick={() => setHabitColor(color)}
              />
            ))}
          </div>
          <span className={styles.errorMessage}>Select a color</span>
        </div>
        <div className={styles["card__action"]}>
          <button className={styles["button"]} type="submit">
            {mode === ModeEnum.EDIT ? "Edit Habit" : "Add Habit"}
          </button>
        </div>
      </form>
    </div>
  );
}
