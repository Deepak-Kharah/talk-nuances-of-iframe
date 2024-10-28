import styles from "./HeroBanner.module.css";
import classNames from "classnames";

export function HeroBanner() {
  return (
    <header className={classNames(styles["hero-banner"])}>
      <section>
        <div className={styles["hero-banner-content"]}>
          <p className={styles.intro}>The companion site for the talk</p>
          <h1>
            Nuances of Iframe:{" "}
            <span>Lessons from Contentstack Live Preview</span>
          </h1>
          <p className={styles.subtitle}>
            Presented at React India 2024 - Remote Edition
          </p>
        </div>
      </section>
    </header>
  );
}
