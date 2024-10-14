import Head from "next/head";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

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
      <main>
        <h1>I am the Iframe</h1>
        <p>URL: {url}</p>
        <p>Hash received: {hash}</p>

        <h2>Messages</h2>
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
