import { io } from "socket.io-client";

let socket;

export const connectSocket = (token) => {
  // socket.io needs the base url, not /api
  const API_URL = import.meta.env.VITE_API_URL || "";
  const SOCKET_URL = API_URL.replace("/api", "");

  socket = io(SOCKET_URL, {
    auth: { token },
    withCredentials: true,
  });

  return socket;
};

export const getSocket = () => socket;