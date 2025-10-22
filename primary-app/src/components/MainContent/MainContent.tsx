import { additionalResources } from "@/content/additionalResources";
import { Card } from "../Card/Card";
import styles from "./MainContent.module.css";
import { pocs } from "@/content/pocs";
import classNames from "classnames";

export function MainContent() {
  return (
    <main className={classNames(styles["main-section"], "container")}>
      <section>
        <h2>The Talk is available on YouTube</h2>

        <iframe
          src="https://www.youtube.com/embed/PPgJ7Q4kAa8?si=Vkd0PbqV_XdyvnZ9"
          title="Nuances of Iframe available on YouTube"
          className={styles["youtube-video-frame"]}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </section>
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
              internalLink
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
          <Card
            title="PowerPoint"
            description="PowerPoint presentation is one of the most powerful tool I love using to present my ideas. Her's the link to my presentation."
            link="https://drive.google.com/file/d/1cT0lpwiJGKHNHpOx7ffMCgZGkx4Xtys2/view?usp=sharing/"
            cta="View Presentation"
          />
        </div>
      </section>
    </main>
  );
}
