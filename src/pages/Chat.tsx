import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { MessageBubble } from "../components/chat/MessageBubble";
import { ChatInput } from "../components/chat/ChatInput";
import { FlowCanvas } from "../components/canvas/FlowCanvas";
import { PropertiesPanel } from "../components/canvas/PropertiesPanel";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useChatStore } from "../store/chatStore";
import { useCanvasStore } from "../store/canvasStore";
// import { parseFlowFromMessage, simulateAIResponse } from "../utils/flowParser";
import { ArrowLeft, GitBranch } from "lucide-react";
import { parseFlowFromMessage, simulateAIResponse } from "../hooks/flowParser";

export const Chat: React.FC = () => {
  const { messages, isLoading, addMessage, setLoading } = useChatStore();
  const { selectedNode, nodes, addNode } = useCanvasStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    setLoading(true);

    // Parse flow from message and add nodes
    const flowNodes = parseFlowFromMessage(message);
    flowNodes.forEach((node) => addNode(node));

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = simulateAIResponse(message);
      addMessage(aiResponse, "ai");
      setLoading(false);
    }, 1500);
  };

  const selectedNodeData = selectedNode
    ? nodes.find((n) => n.id === selectedNode) || null
    : null;

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <div className="flex items-center space-x-3">
              <GitBranch className="w-6 h-6 text-primary-600" />
              <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Data Flow Builder
              </h1>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Panel */}
        <div className="w-1/2 flex flex-col border-r border-gray-200 dark:border-gray-700">
          <div className="flex-1 overflow-y-auto p-6">
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-gray-500 dark:text-gray-400 text-center">
                  Start by describing your data integration needs...
                </p>
              </div>
            ) : (
              <div>
                {messages.map((message) => (
                  <MessageBubble key={message.id} message={message} />
                ))}
                {isLoading && (
                  <MessageBubble
                    message={{
                      id: "loading",
                      content: "Analyzing your data flow...",
                      sender: "ai",
                      isLoading: true,
                      createdAt: new Date(),
                      updatedAt: new Date(),
                    }}
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 p-6">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>

        {/* Canvas Panel */}
        <div className="flex-1 flex">
          <FlowCanvas />
          <PropertiesPanel
            node={selectedNodeData}
            onClose={() => useCanvasStore.getState().selectNode(null)}
          />
        </div>
      </div>
    </div>
  );
};
