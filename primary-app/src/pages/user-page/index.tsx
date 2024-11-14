import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";

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
    <main className={pocStyles["poc-container"]}>
      <div>
        <h1 className={pocStyles["poc-title"]}>I am the Iframe</h1>
        <p className={pocStyles["url-info"]}>URL: {url}</p>
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
  );
}
