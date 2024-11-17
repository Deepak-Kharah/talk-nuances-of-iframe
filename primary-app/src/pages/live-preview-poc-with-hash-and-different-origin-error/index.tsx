import { getUserWebsiteUrl } from "@/utils/getUserWebsiteUrl";
import { FormEvent, useEffect, useRef, useState } from "react";
import pocStyles from "../../styles/poc.module.css";

import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import Link from "next/link";
import { io } from "socket.io-client";
import { advancedBroadcastMessage } from "@/utils/advanced-broadcast-message";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function LivePreview() {
  // We had to use the state to avoid hydration mismatch error.
  const [livePreviewHash, setLivePreviewHash] = useState<string>("");

  const iframeRef = useRef<HTMLIFrameElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // ! If you are here to understand the code, look at the if block only.
    if (process.env.NODE_ENV === "development") {
      socket.emit(
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
    const hash = Math.random().toString();
    setLivePreviewHash(hash);

    setTimeout(() => {
      if (iframeRef.current?.contentWindow) {
        // * This is the problematic line. It only works when the parent and the iframe have the same origin.
        // * You can check the error in the browser's console.
        // * If you remove this line, the error will disappear. However, the hash will not be passed to the iframe.
        iframeRef.current.contentWindow.hash = hash;
      }
    }, 200);
  }, []);

  return (
    <PocLayout>
      <main className={pocStyles["poc-container"]}>
        <div>
          <h1 className={pocStyles["poc-title"]}>
            Live preview with Hash with different origin
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
          src={getUserWebsiteUrl("user-page")}
        />

        <details className={pocStyles["poc-detail"]}>
          <summary>Explanation</summary>
          <div>
            <p>
              In this POC, we pass the hash to the iframe by setting it in the
              window object (Why are we doing that? Read the explanation of the{" "}
              <Link href={pocs[1].link}>previous POC</Link>). This method is a
              security risk and is not allowed when the parent and iframes are
              hosted on different origins. You can check the error in the
              browser&apos;s console.
            </p>
            <p>
              Hence, we found an alternative to setting the values to the window
              object, demonstrated in the{" "}
              <Link href={pocs[3].link}>following POC</Link>.
            </p>
          </div>
        </details>
      </main>
    </PocLayout>
  );
}
