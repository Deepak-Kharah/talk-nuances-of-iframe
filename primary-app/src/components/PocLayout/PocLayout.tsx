import Link from "next/link";
import { Footer } from "../Footer/Footer";
import styles from "./PocLayout.module.css";

interface PocLayoutProps {
  children: React.ReactNode;
}

export function PocLayout(props: PocLayoutProps) {
  return (
    <div className={styles["poc-layout"]}>
      <header className={styles["poc-layout-header"]}>
        <div className={styles["poc-layout-header__container"]}>
          <p className={styles["poc-layout-header__title"]}>
            <Link href="/">Nuances of Iframe</Link>
          </p>
        </div>
      </header>
      {props.children}
      <Footer />
    </div>
  );
}
