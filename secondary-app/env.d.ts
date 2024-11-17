declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SOCKET_URL: string;
      NEXT_PUBLIC_PRIMARY_APP_URL: string;
    }
  }
}

export {};
