import { create } from "zustand";

export type State = {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
};

export const useStore = create<State>((set) => ({
  selectedTab: "home",
  setSelectedTab: (tab: string) => set({ selectedTab: tab }),
}));
