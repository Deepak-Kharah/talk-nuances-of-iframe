import Link from "next/link";
import styles from "./Card.module.css";

interface CardProps {
  title: string;
  description: string;
  link: string;
  cta: string;
  internalLink?: boolean;
}

export function Card(props: CardProps) {
  return (
    <div className={styles.card}>
      <div className={styles["card-content"]}>
        <h3 className={styles["card-heading"]}>{props.title}</h3>
        <p className={styles["card-body"]}>{props.description}</p>
        {props.internalLink ? (
          <Link className={styles["card-cta"]} href={props.link}>
            {props.cta ?? "Learn More"}
          </Link>
        ) : (
          <a href={props.link} className={styles["card-cta"]}>
            {props.cta ?? "Learn More"}
          </a>
        )}
      </div>
    </div>
  );
}
