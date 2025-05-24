import styles from "../styles/components/HabitCard.module.css";

interface HabitCardProp {
  title: string;
  color: string;
}

const daysLabels: string[] = ["M", "T", "W", "T", "F", "S", "S"];

export default function HabitCard({ title, color }: HabitCardProp) {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}
        style={{
          "--card-color": color
        } as React.CSSProperties}>
        <span className={styles.title}>{title}</span>
        <button className={styles.closeIcon}>x</button>
      </div>
      <div className={styles.content}>
        <p className={styles.description}>
          This is a sample description. Material Design emphasizes bold typography and clear hierarchy.
        </p>
        <div className={styles.checboxList}>
          {
            daysLabels.map((dayLabel, index) => {
              return (
                <label
                  key={index}
                  className={styles.checkbox}>
                  <span className={styles.checkboxLabel}>{dayLabel}</span>
                  <input type="checkbox" className={styles.checkboxInput} />
                  <span className={styles.checkboxCustom} style={{
                    "--card-color": color,
                  } as React.CSSProperties}></span>
                </label>
              )
            })
          }

        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressBar__track}>
            <div className={styles.progressBar__fill}
              style={{
                "--card-color": color,
              } as React.CSSProperties}
            ></div>
          </div>
          <span className={styles.progressBar__label}>65%</span>
        </div>
      </div>
    </div>
  );
}