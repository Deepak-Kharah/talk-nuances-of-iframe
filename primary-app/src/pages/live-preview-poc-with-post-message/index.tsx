import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import { getUserWebsiteUrl } from "@/utils/getUserWebsiteUrl";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function LivePreviewWIthPostMessage() {
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
    const iframe = iframeRef.current;

    if (iframe) {
      setTimeout(() => {
        iframe.contentWindow?.postMessage(
          {
            type: "hash",
            payload: hash,
          },
          "*"
        );
      }, 200);
    }
  }, []);

  return (
    <PocLayout>
      <main className={pocStyles["poc-container"]}>
        <div>
          <h1 className={pocStyles["poc-title"]}>
            Live preview with Post message
          </h1>

          <p className={pocStyles["url-info"]}>Hash sent: {livePreviewHash}</p>
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
          src={getUserWebsiteUrl("user-page-with-post-message")}
        />

        <details className={pocStyles["poc-detail"]}>
          <summary>Explanation</summary>
          <div>
            <p>
              In this POC, we use the Post Message APIs to pass the hash to the
              iframe. Since this API works cross-origin, we fixed the error we
              got in the <Link href={pocs[2].link}>previous POC</Link>.
            </p>
          </div>
        </details>
      </main>
    </PocLayout>
  );
}
