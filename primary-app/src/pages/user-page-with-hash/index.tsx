import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import pocStyles from "../../styles/poc.module.css";
import { advancedBroadcastMessage } from "@/utils/advanced-broadcast-message";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL);

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [url, setUrl] = useState<string>("");
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    setUrl(window.location.toString());
    setTimeout(() => {
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

    // ! For the hosted version, we are simulating the behaviour to avoid spamming the server.
    // ! You can ignore this code, if you are here just to understand the code.
    const changeMessageEvent = advancedBroadcastMessage.on<{
      hash: string;
      message: string;
    }>("chat-message-with-hash", ({ data }) => {
      if (data.hash === hash) {
        setMessages((prev) => {
          return [...prev, data.message];
        });
      }
    });
    // ! End of the simulation code.

    return () => {
      socket.off(`chat message with hash ${hash}`);
      changeMessageEvent.unregister();
    };
  }, [hash]);
  return (
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
  );
}
