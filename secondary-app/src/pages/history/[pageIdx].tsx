import { useRouter } from "next/router";
import { useRouter as useNavigationRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import pocStyles from "../../styles/poc.module.css";
import Link from "next/link";

export default function Home() {
  const [url, setUrl] = useState<string>("");
  const router = useRouter();
  const navigationRouter = useNavigationRouter();
  const currentPage = router.query.pageIdx
    ? parseInt(router.query.pageIdx as string)
    : 0;

  const handleIncomingMessage = useCallback(
    function handleIncomingMessage(
      event: MessageEvent<{
        type: "history";
        payload: "back" | "forward";
      }>
    ) {
      if (event.data.type === "history") {
        if (event.data.payload === "back") {
          navigationRouter.back();
        } else {
          navigationRouter.forward();
        }
      }
    },
    [navigationRouter]
  );

  useEffect(() => {
    setUrl(window.location.toString());

    window.addEventListener("message", handleIncomingMessage);

    return () => {
      window.removeEventListener("message", handleIncomingMessage);
    };
  }, [handleIncomingMessage]);

  return (
    <>
      <main className={pocStyles["poc-container"]}>
        <div>
          <h1 className={pocStyles["poc-title"]}>I am the Iframe</h1>
          <p className={pocStyles["url-info"]}>URL: {url}</p>
          <p className={pocStyles["url-info"]}>
            You are currently in page: {currentPage}
          </p>
        </div>
        <div>
          <Link href={`/history/${currentPage + 1}`}>Go to Next page</Link>
        </div>
      </main>
    </>
  );
}
