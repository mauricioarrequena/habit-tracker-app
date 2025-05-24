import styles from "../styles/components/HabitCard.module.css";

export default function HabitCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <span className={styles.title}>Habit title</span>
        <button className={styles.closeIcon}>x</button>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>
          This is a sample description. Material Design emphasizes bold typography and clear hierarchy.
        </p>
        <div className={styles.checboxList}>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>M</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>T</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>W</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>T</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>F</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>S</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
          <label className={styles.checkbox}>
            <span className={styles.checkboxLabel}>S</span>
            <input type="checkbox" className={styles.checkboxInput} />
            <span className={styles.checkboxCustom}></span>
          </label>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressBar__track}>
            <div className={styles.progressBar__fill} style={{ width: '65%' }}></div>
          </div>
          <span className={styles.progressBar__label}>65%</span>
        </div>
      </div>
    </div>
  );
}