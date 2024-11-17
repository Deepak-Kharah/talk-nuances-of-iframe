import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";
import { advancedBroadcastMessage } from "@/utils/advanced-broadcast-message";

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

    // ! For the hosted version, we are simulating the behaviour to avoid spamming the server.
    // ! You can ignore this code, if you are here just to understand the code.
    const changeMessageEvent = advancedBroadcastMessage.on<string>(
      "chat-message",
      (message) => {
        setMessages((prev) => {
          const newMessages = [...prev, message.data];
          return newMessages;
        });
      }
    );
    // ! End of the simulation code.

    return () => {
      socket.off("chat message");
      changeMessageEvent.unregister();
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
