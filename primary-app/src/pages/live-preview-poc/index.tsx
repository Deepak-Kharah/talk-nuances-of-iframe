import Head from "next/head";
import { FormEvent, useRef } from "react";
import { io } from "socket.io-client";

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
    <>
      <Head>
        <title>Main App | LP POC w/ sockets</title>
      </Head>

      <main>
        <h1>Live preview with Socket</h1>

        <h2>Send message</h2>
        <form onSubmit={handleSubmit}>
          <input name="message" type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>

        <br />
        <iframe ref={iframeRef} src="/user-page" width="600" height="400" />
      </main>
    </>
  );
}
