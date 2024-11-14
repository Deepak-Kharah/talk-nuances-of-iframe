interface AdditionalResourceContent {
  title: string;
  description: string;
  link: string;
  cta: string;
}

export const additionalResources: AdditionalResourceContent[] = [
  {
    title: "History of Embedding Technologies",
    description:
      "Learn about the history of embedding technologies and how they evolved over time.",
    link: "https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Other_embedding_technologies#a_short_history_of_embedding",
    cta: "Learn More",
  },
  {
    title: "Iframe",
    description:
      "Learn about Iframe and how to use it in your web applications.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe",
    cta: "Learn More",
  },
  {
    title: "Intersection Observer v2",
    description:
      "Intersection Observer v2 adds the capability to not only observe intersections per se, but to also detect if the intersecting element was visible at the time of intersection.",
    link: "https://web.dev/articles/intersectionobserver-v2",
    cta: "Read the article",
  },
  {
    title: "Intersection Observer coverage",
    description: "Which browsers support Intersection Observer?",
    link: "https://caniuse.com/intersectionobserver-v2",
    cta: "Check the support",
  },
  {
    title: "Intersection Observer Demo",
    description: "A demo to show how Intersection Observer works.",
    link: "https://io-v2.glitch.me/",
    cta: "View Demo",
  },
  {
    title: "X-Frame-Options",
    description: "Learn about the X-Frame-Options header and how it works.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options",
    cta: "Learn More",
  },
  {
    title: "Frame ancestors",
    description:
      "Learn about the frame-ancestors directive in Content Security Policy.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/frame-ancestors",
    cta: "Learn More",
  },
  {
    title: "Same Origin Policy",
    description:
      "Learn about the Same Origin Policy and how it affects the web.",
    link: "https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy",
    cta: "Learn More",
  },
  {
    title: "Cross-Origin Resource Sharing (CORS)",
    description: "Learn about Cross-Origin Resource Sharing and how it works.",
    link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS",
    cta: "Learn More",
  },
  {
    title: "Post Message",
    description:
      "Learn about Post Message and how to use it to communicate between iframes.",
    link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage",
    cta: "Learn More",
  },
  {
    title: "Source code",
    description: "View the source code for this project on GitHub.",
    link: "https://github.com/deepak-kharah/talk-nuances-of-iframe",
    cta: "View Source",
  },
];
