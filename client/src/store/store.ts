import { create } from "zustand";
import { io, Socket } from "socket.io-client";
interface SocketStore {
  socket: Socket | null;
  setSocket: (socket: Socket) => void;
}

export type State = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const useTapStore = create<State>((set) => ({
  selectedTab: "soccer",
  setSelectedTab: (tab: string) => set({ selectedTab: tab }),
}));


export const useSocketStore = create<SocketStore>((set) => ({
  socket: null,
  setSocket: (socket: Socket) => set({ socket }),
}));