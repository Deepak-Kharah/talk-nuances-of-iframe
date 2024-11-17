import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import Link from "next/link";
import { FormEvent, useRef } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function LivePreview() {
  // We had to use the state to avoid hydration mismatch error.
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    socket.emit(
      "chat message",
      JSON.stringify({
        message: data.get("message"),
      })
    );
    e.currentTarget.reset();
  }

  return (
    <PocLayout>
      <main className={pocStyles["poc-container"]}>
        <h1 className={pocStyles["poc-title"]}>Live preview with Socket</h1>

        <form className={pocStyles["message-form"]} onSubmit={handleSubmit}>
          <span>
            <label htmlFor="message" className={pocStyles["message-label"]}>
              Send message
            </label>
            <input
              className={pocStyles["message-input"]}
              name="message"
              type="text"
              placeholder="Type a message..."
            />
          </span>
          <button
            className={pocStyles["message-send-message-action"]}
            type="submit"
          >
            Send
          </button>
        </form>

        <iframe
          className={pocStyles["live-preview-window"]}
          ref={iframeRef}
          src="/user-page"
        />

        <details className={pocStyles["poc-detail"]}>
          <summary>Explanation</summary>
          <div>
            <p>
              This example is the most straightforward implementation of the
              live preview. It uses a socket to send the data between the parent
              and the iframe window.
            </p>
            <p>
              Since we are not using any channel ID to segregate the
              connections, when you open a new tab, the messages sent to one tab
              will be reflected in the iframes of the other window.
            </p>
            <p>
              We fixed this issue in the{" "}
              <Link href={pocs[1].link}>following POC</Link>.
            </p>
          </div>
        </details>
      </main>
    </PocLayout>
  );
}
