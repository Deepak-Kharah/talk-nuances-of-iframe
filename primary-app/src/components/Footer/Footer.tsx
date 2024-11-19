import styles from "./Footer.module.css";

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <p>
        &copy; 2024-{currentYear}{" "}
        <a href="https://deepakkharah.com">Deepak Kharah</a>. All rights
        reserved.
      </p>
    </footer>
  );
}
