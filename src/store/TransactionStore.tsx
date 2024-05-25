import { create } from "zustand";

interface useTransactionStoreProps {
  timestamp: string;
  setTimestamp: (timestamp: string) => void;
}

export const useTransactionStore = create<useTransactionStoreProps>((set) => ({
  timestamp: "",
  setTimestamp: (timestamp: string) => set({ timestamp }),
}));
