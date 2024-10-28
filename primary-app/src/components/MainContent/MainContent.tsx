import { additionalResources } from "@/content/additionalResources";
import { Card } from "../Card/Card";
import styles from "./MainContent.module.css";
import { pocs } from "@/content/pocs";
import classNames from "classnames";

export function MainContent() {
  return (
    <main className={classNames(styles["main-section"])}>
      <section>
        <h2>Proofs of Concept (POCs)</h2>

        <p className={styles.note}>
          <em>
            The POCs hosted here simulates the behaviour to prevent spam. You
            can get the{" "}
            <a href="https://github.com/deepak-kharah/talk-nuances-of-iframe">
              source code
            </a>{" "}
            and run it locally to experience the actual working.
          </em>
        </p>
        <div className={styles.cards}>
          {pocs.map((poc) => (
            <Card
              key={poc.name}
              title={poc.name}
              description={poc.description}
              link={poc.link}
              cta="View POC"
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Additional Resources</h2>
        <div className={styles.cards}>
          {additionalResources.map((resource) => (
            <Card
              key={resource.title}
              title={resource.title}
              description={resource.description}
              link={resource.link}
              cta={resource.cta}
            />
          ))}
        </div>
      </section>

      <section>
        <h2>Tools used for the presentation</h2>

        <div className={styles.cards}>
          <Card
            title="Excalidraw"
            description="Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them."
            link="https://excalidraw.com/"
            cta="Visit website"
          />
        </div>
      </section>
    </main>
  );
}
