interface PocContent {
  name: string;
  description: string;
  link: string;
}

export const pocs: PocContent[] = [
  {
    name: "Live preview with Socket",
    description:
      "The most basic implementation of Live preview. It lacked channel ID, so all users were seeing the same preview.",
    link: "/live-preview-poc",
  },
  {
    name: "Live preview with Hash",
    description:
      "Introduced the live preview hash as a channel ID to differentiate between different users. We are setting the hash directly on the iframe window object.",
    link: "/live-preview-poc-with-hash",
  },
  {
    name: "Security error due to different origin",
    description:
      "Since we were setting the hash directly on the iframe window object, we got an error when we worked with different origins. You should see an error in the console.",
    link: "/live-preview-poc-with-hash-and-different-origin-error",
  },
  {
    name: "Sending the hash using the Post Message API",
    description:
      "To avoid the different origin error, we used the Post Message API to send the hash to the iframe.",
    link: "/live-preview-poc-with-post-message",
  },
];
