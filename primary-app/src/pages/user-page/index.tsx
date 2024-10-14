import Head from "next/head";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.toString());
    socket.on("chat message", (msg) => {
      setMessages((prev) => {
        const newMessages = [...prev, msg];
        return newMessages;
      });
    });

    return () => {
      socket.off("chat message");
    };
  }, []);
  return (
    <>
      <Head>
        <title>User App • LP POC w/ sockets</title>
      </Head>
      <main>
        <h1>I am the Iframe</h1>
        <p>URL: {url}</p>

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
