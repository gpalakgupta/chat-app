import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (conversation) => set({ selectedConversation: conversation }),
  messages: [],
  setMessages: (messages) => set({ messages }), // if you want to replace messages array
  // addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })) // to add a message
}));

export default useConversation;
