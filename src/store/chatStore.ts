import { create } from "zustand";
import { ChatState, Message } from "../types/chat";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isLoading: false,

  addMessage: (content: string, sender: "user" | "ai") => {
    const message: Message = {
      id: crypto.randomUUID(),
      content,
      sender,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, message],
    }));
  },

  setLoading: (loading: boolean) => set({ isLoading: loading }),

  clearMessages: () => set({ messages: [] }),
}));
