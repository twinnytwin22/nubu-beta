import { create } from "zustand";

export const useContactButtonStore = create((set: any) => ({
  isOpen: false,
  setOpen: (isOpen: any) => set({ isOpen }),
}));
