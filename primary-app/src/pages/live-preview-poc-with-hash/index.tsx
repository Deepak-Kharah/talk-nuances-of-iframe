import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function LivePreview() {
  // We had to use the state to avoid hydration mismatch error.
  const [livePreviewHash, setLivePreviewHash] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    socket.emit(
      "chat message with hash",
      JSON.stringify({
        message: data.get("message"),
        hash: livePreviewHash,
      })
    );
    e.currentTarget.reset();
  }

  useEffect(() => {
    const hash = Math.random().toString();
    setLivePreviewHash(hash);

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        // @ts-expect-error - We're setting the hash property on the contentWindow object.
        iframeRef.current.contentWindow.hash = hash;
      }
    }, 200);
  }, []);

  return (
    <>
      <PocLayout>
        <main className={pocStyles["poc-container"]}>
          <div>
            <h1 className={pocStyles["poc-title"]}>Live preview with Hash</h1>

            <p className={pocStyles["url-info"]}>
              Hash sent: {livePreviewHash}
            </p>
          </div>

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
            src="/user-page-with-hash"
          />

          <details className={pocStyles["poc-detail"]}>
            <summary>Explanation</summary>
            <div>
              <p>
                In this POC, we used the channel ID to segregate all the socket
                connections to ensure the connection remains private. Unlike the{" "}
                <Link href={pocs[0].link}>previous POC</Link>, if you duplicate
                this tab and send the message, the message will not be visible
                to the other tabs.
              </p>
              <p>
                We are generating this hash on every session to ensure that the
                hash remains unique. In this example, we set the hash directly
                to the iframe&apos;s window object.
              </p>
              <p>
                We can perform this action as the same origin hosts both the
                parent and the iframes. The browser throws an error when we try
                to use this method on Windows with a different origin, as
                demonstrated in the{" "}
                <Link href={pocs[2].link}>following POC</Link>.
              </p>
            </div>
          </details>
        </main>
      </PocLayout>
    </>
  );
}
