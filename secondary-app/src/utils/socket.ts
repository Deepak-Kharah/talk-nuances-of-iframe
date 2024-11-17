import { io } from "socket.io-client";

export const socket =
  process.env.NODE_ENV === "development"
    ? io(process.env.NEXT_PUBLIC_SOCKET_URL)
    : null;
