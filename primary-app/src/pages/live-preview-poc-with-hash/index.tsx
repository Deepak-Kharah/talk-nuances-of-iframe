import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import { advancedBroadcastMessage } from "@/utils/advanced-broadcast-message";
import { socket } from "@/utils/socket";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import pocStyles from "../../styles/poc.module.css";

export default function LivePreview() {
  // We had to use the state to avoid hydration mismatch error.
  const [livePreviewHash, setLivePreviewHash] = useState<string>("");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // ! If you are here to understand the code, look at the if block only.
    if (process.env.NODE_ENV === "development") {
      socket?.emit(
        "chat message with hash",
        JSON.stringify({
          message: data.get("message"),
          hash: livePreviewHash,
        })
      );
    } else {
      // ! The code below is for the hosted version. You can ignore this code.
      // ! This code is used to simulate the behaviour to avoid spamming the server.
      advancedBroadcastMessage.send("chat-message-with-hash", {
        hash: livePreviewHash,
        message: data.get("message"),
      });
    }
    e.currentTarget.reset();
  }

  useEffect(() => {
    // * We are generating a random hash to ensure that the hash remains unique.
    // * This helps in segregating the connections.
    const hash = Math.random().toString();
    setLivePreviewHash(hash);

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        // * Here we are setting the hash directly. It only works when the parent and the iframe have the same origin.
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
