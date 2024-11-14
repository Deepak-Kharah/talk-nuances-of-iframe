import { PocLayout } from "@/components/PocLayout/PocLayout";
import pocStyles from "../../styles/poc.module.css";
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
        </main>
      </PocLayout>
    </>
  );
}
