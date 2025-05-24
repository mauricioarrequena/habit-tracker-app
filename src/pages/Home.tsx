import styles from "../styles/pages/Home.module.css";
import HabitCard from "../components/HabitCard";

export default function Home() {
  return (
    <div className={styles.home}>
      <h1>Welcome to Habit Tracker</h1>
      <HabitCard></HabitCard>
      <HabitCard></HabitCard>
      <HabitCard></HabitCard>
      <HabitCard></HabitCard>
      <HabitCard></HabitCard>
      <HabitCard></HabitCard>
    </div>
  );
}