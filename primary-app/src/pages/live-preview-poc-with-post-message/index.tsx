import { getUserWebsiteUrl } from "@/utils/getUserWebsiteUrl";
import Head from "next/head";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

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

    // iframeRef.current?.contentWindow?.postMessage(
    //   {
    //     type: "change",
    //     // Even though we can send the data directly. Instead,
    //     // we'll send it to the server and iframe will fetch the
    //     // data from the server. This is to simulate the scenario.
    //     payload: data.get("message"),
    //   },
    //   "*"
    // );
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
    <>
      <Head>
        <title>Main App | LP POC w/ Post message</title>
      </Head>

      <main>
        <h1>Live preview with Post message</h1>

        <h2>Send message</h2>
        <p>Hash sent: {livePreviewHash}</p>
        <form onSubmit={handleSubmit}>
          <input name="message" type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>

        <br />
        <iframe
          ref={iframeRef}
          src={getUserWebsiteUrl("user-page-with-post-message")}
          width="600"
          height="400"
        />
      </main>
    </>
  );
}
