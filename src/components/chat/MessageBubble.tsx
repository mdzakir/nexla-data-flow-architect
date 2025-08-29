import React from "react";
import {type Message } from "../../types/chat";
import { Bot, User } from "lucide-react";
import { clsx } from "clsx";

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={clsx("flex mb-6", isUser ? "justify-end" : "justify-start")}
    >
      <div
        className={clsx(
          "flex max-w-[80%]",
          isUser ? "flex-row-reverse" : "flex-row"
        )}
      >
        <div className={clsx("flex-shrink-0", isUser ? "ml-3" : "mr-3")}>
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex items-center justify-center",
              isUser
                ? "bg-primary-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
            )}
          >
            {isUser ? (
              <User className="w-4 h-4" />
            ) : (
              <Bot className="w-4 h-4" />
            )}
          </div>
        </div>

        <div
          className={clsx(
            "px-4 py-3 rounded-2xl shadow-sm",
            isUser
              ? "bg-primary-600 text-white rounded-br-lg"
              : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-lg border border-gray-200 dark:border-gray-700"
          )}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap">
            {message.content}
          </p>
          {message.isLoading && (
            <div className="flex space-x-1 mt-2">
              <div className="w-2 h-2 bg-current rounded-full animate-pulse" />
              <div
                className="w-2 h-2 bg-current rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              />
              <div
                className="w-2 h-2 bg-current rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
