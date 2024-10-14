import Head from "next/head";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  function handleIncomingMessage(
    event: MessageEvent<{
      type: string;
      payload: string;
    }>
  ) {
    if (event.data.type === "hash") {
      console.log("Hash received", event.data.payload);
      setHash(event.data.payload);
    }
    //  else if (event.data.type === "change") {
    //   // This statment will confuse you as if we are sending the data
    //   // directly, what's the point of sending hash. This is just for
    //   // demonstration purposes. Normally, you will run the function
    //   // that will fetch the data from the server and update the UI.
    //   setMessages((prev) => [...prev, event.data.payload]);
    // }
  }

  useEffect(() => {
    window.addEventListener("message", handleIncomingMessage);
    setUrl(window.location.toString());
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
        <title>User App • LP POC w/ Post message</title>
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
