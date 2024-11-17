import { PocLayout } from "@/components/PocLayout/PocLayout";
import { getUserWebsiteUrl } from "@/utils/getUserWebsiteUrl";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import pocStyles from "../../styles/poc.module.css";

export default function LivePreview() {
  // We had to use the state to avoid hydration mismatch error.
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const currentPage = router.query.pageIdx
    ? parseInt(router.query.pageIdx as string)
    : 0;
  const [newFrames, setNewFrames] = useState(0);

  function historyAction(action: "back" | "forward") {
    if (iframeRef.current?.contentWindow) {
      iframeRef.current.contentWindow.postMessage(
        {
          type: "history",
          payload: action,
        },
        process.env.NEXT_PUBLIC_SECONDARY_APP_URL
      );
    }
  }

  function addNewIframe() {
    setNewFrames((prev) => prev + 1);
  }

  return (
    <>
      <Head>
        <title>History Demonstration - Page {currentPage}</title>
      </Head>
      <PocLayout>
        <main className={pocStyles["poc-container"]}>
          <h1 className={pocStyles["poc-title"]}>History APIs with Iframe</h1>
          <p className={pocStyles["url-info"]}>
            You are currently in page: {currentPage}
          </p>

          <div>
            <Link href={`/history/${currentPage + 1}`}>Go to Next page</Link>
          </div>
          <div className={pocStyles["button-group"]}>
            <button
              className={pocStyles["message-send-message-action"]}
              onClick={() => historyAction("back")}
            >
              Back
            </button>
            <button
              className={pocStyles["message-send-message-action"]}
              onClick={() => historyAction("forward")}
            >
              Forward
            </button>
          </div>
          <div>
            <button
              className={pocStyles["message-send-message-action"]}
              onClick={addNewIframe}
            >
              Add new Iframe
            </button>
          </div>

          <div id="iframes" className={pocStyles["iframes"]}>
            <iframe
              className={pocStyles["live-preview-window"]}
              ref={iframeRef}
              src={getUserWebsiteUrl("history/0/")}
            />

            {newFrames > 0 &&
              Array.from({ length: newFrames }).map((_, idx) => (
                <iframe
                  key={idx}
                  className={pocStyles["live-preview-window"]}
                  src={getUserWebsiteUrl("history/0/")}
                />
              ))}
          </div>

          <details className={pocStyles["poc-detail"]}>
            <summary>Explanation</summary>
            <div>
              <p>
                The window and the iframe share the same history object. When
                you navigate through the history, the iframe will also navigate
                irrespective of where you called the history API.
              </p>
              <p>
                When a new ifrmame is added, it lacks the history entry till the
                point it was added. Hence, if you navigate multiple step
                together, the newer iframe will not update the history.
              </p>
            </div>
          </details>
        </main>
      </PocLayout>
    </>
  );
}
