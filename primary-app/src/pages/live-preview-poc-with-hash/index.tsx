import Head from "next/head";
import { FormEvent, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

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
      <Head>
        <title>Main App | LP POC w/ Post message</title>
      </Head>

      <main>
        <h1>Live preview with Hash</h1>

        <h2>Send message</h2>
        <p>Hash sent: {livePreviewHash}</p>
        <form onSubmit={handleSubmit}>
          <input name="message" type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>

        <br />
        <iframe
          ref={iframeRef}
          src="/user-page-with-hash"
          width="600"
          height="400"
        />
      </main>
    </>
  );
}
