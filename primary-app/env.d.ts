declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SECONDARY_APP_URL: string;
      NEXT_PUBLIC_SOCKET_URL: string;
    }
  }
}

export {};
