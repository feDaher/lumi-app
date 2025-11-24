import React, { createContext, useContext, useState, ReactNode } from "react";

interface Message {
  text: string;
  type: "success" | "error" | "warning" | "info";
}

interface MessageContextProps {
  message: Message | null;
  showMessage: (text: string, type: Message["type"]) => void;
  clearMessage: () => void;
}

const MessageContext = createContext<MessageContextProps>({
  message: null,
  showMessage: () => {},
  clearMessage: () => {},
});

export function MessageProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<Message | null>(null);

  function showMessage(text: string, type: Message["type"]) {
    setMessage({ text, type });
  }

  function clearMessage() {
    setMessage(null);
  }

  return (
    <MessageContext.Provider value={{ message, showMessage, clearMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessage() {
  return useContext(MessageContext);
}
