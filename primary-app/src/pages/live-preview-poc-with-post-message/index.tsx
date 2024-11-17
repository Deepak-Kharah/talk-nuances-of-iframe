import { PocLayout } from "@/components/PocLayout/PocLayout";
import { pocs } from "@/content/pocs";
import { advancedBroadcastMessage } from "@/utils/advanced-broadcast-message";
import { getUserWebsiteUrl } from "@/utils/getUserWebsiteUrl";
import Link from "next/link";
import { FormEvent, useEffect, useRef, useState } from "react";
import pocStyles from "../../styles/poc.module.css";
import { socket } from "@/utils/socket";

export default function LivePreviewWIthPostMessage() {
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
    const hash = Math.random().toString();
    setLivePreviewHash(hash);
    const iframe = iframeRef.current;

    if (iframe) {
      // We have used the setTimeout to simulate some underline process.
      setTimeout(() => {
        // * This is the line that makes the magic happen.
        // * We are sending the hash to the iframe using the postMessage API.
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
