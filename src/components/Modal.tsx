import styles from "../styles/components/Modal.module.css";

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  }

export default function Modal({ onClose, children  }: ModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
}
