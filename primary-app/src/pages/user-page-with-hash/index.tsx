import Head from "next/head";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.toString());
    setTimeout(() => {
      // @ts-expect-error - We'll set this hash property on the window object.
      const livePreviewHash = window.hash as string;
      setHash(livePreviewHash);
    }, 300);
  }, []);

  useEffect(() => {
    socket.on(`chat message with hash ${hash}`, (msg) => {
      setMessages((prev) => {
        return [...prev, msg];
      });
    });

    return () => {
      socket.off(`chat message with hash ${hash}`);
    };
  }, [hash]);
  return (
    <>
      <Head>
        <title>User App • LP POC w/ sockets</title>
      </Head>
      <main className={pocStyles["poc-container"]}>
        <div>
          <h1 className={pocStyles["poc-title"]}>I am the Iframe</h1>
          <p className={pocStyles["url-info"]}>URL: {url}</p>
          <p className={pocStyles["url-info"]}>Hash received: {hash}</p>
        </div>

        <div>
          <h2 className={pocStyles["messages-title"]}>Messages</h2>
          <ul className={pocStyles.messages}>
            {messages.map((message, index) => (
              <li key={index}>{message}</li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}
