import styles from "./Card.module.css";

interface CardProps {
  title: string;
  description: string;
  link: string;
  cta: string;
}

export function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        <h3 className={styles["card-heading"]}>{props.title}</h3>
        <p className={styles["card-body"]}>{props.description}</p>
        <a href={props.link} className={styles["card-cta"]}>
          {props.cta ?? "Learn More"}
        </a>
      </div>
    </div>
  );
}
