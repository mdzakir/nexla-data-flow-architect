import { BaseEntity } from "./common";

export interface Message extends BaseEntity {
  content: string;
  sender: "user" | "ai";
  isLoading?: boolean;
}

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  addMessage: (content: string, sender: "user" | "ai") => void;
  setLoading: (loading: boolean) => void;
  clearMessages: () => void;
}
