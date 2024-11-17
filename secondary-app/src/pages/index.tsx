import pocStyles from "../styles/poc.module.css";

export default function Home() {
  return (
    <main className={pocStyles["poc-container"]}>
      <h1>Nuances of Iframe - Companion App</h1>
      <div>
        <p>
          This is the secondary app. It is a standalone app that is meant to be
          rendered in an iframe in the primary app.
        </p>
        <p>
          You are not meant to see this page directly. Please go to the primary
          app to see this page in an iframe.
        </p>
        <p>
          Visit the{" "}
          <a href={process.env.NEXT_PUBLIC_PRIMARY_APP_URL}>Primary app</a>
        </p>
      </div>
    </main>
  );
}
