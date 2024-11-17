import { socket } from "@/utils/socket";
import Head from "next/head";
import { useCallback, useEffect, useState } from "react";
import pocStyles from "../../styles/poc.module.css";

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  const handleIncomingMessage = useCallback(
    function handleIncomingMessage(
      event: MessageEvent<
        | {
            type: "hash";
            payload: string;
          }
        // ! For the hosted version, we are simulating the behaviour to avoid spamming the server.
        // ! You can ignore this code, if you are here just to understand the code.
        | {
            type: "message";
            payload: {
              hash: string;
              message: string;
            };
          }
      >
    ) {
      if (event.data.type === "hash") {
        setHash(event.data.payload);
      }

      // ! For the hosted version, we are simulating the behaviour to avoid spamming the server.
      // ! You can ignore this code, if you are here just to understand the code.
      if (event.data.type === "message") {
        const { message } = event.data.payload;
        if (event.data.payload.hash === hash) {
          setMessages((prev) => {
            return [...prev, message];
          });
        }
      }
    },
    [hash]
  );

  useEffect(() => {
    window.addEventListener("message", handleIncomingMessage);
    setUrl(window.location.toString());

    return () => {
      window.removeEventListener("message", handleIncomingMessage);
    };
  }, [handleIncomingMessage]);

  useEffect(() => {
    socket?.on(`chat message with hash ${hash}`, (msg) => {
      setMessages((prev) => {
        return [...prev, msg];
      });
    });

    return () => {
      socket?.off(`chat message with hash ${hash}`);
    };
  }, [hash]);
  return (
    <>
      <Head>
        <title>User App • LP POC w/ Post message</title>
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
