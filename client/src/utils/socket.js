import { io } from "socket.io-client";
import { isLoggedIn } from "./auth";
import { BASE_URL } from "../config";

export let socket;

export const initiateSocketConnection = () => {
  const user = isLoggedIn();

  socket = io(BASE_URL);
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};
