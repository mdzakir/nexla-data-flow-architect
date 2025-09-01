import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HeroSection } from "../components/landing/HeroSection";
import { ExamplePrompts } from "../components/landing/ExamplePrompts";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { ThemeToggle } from "../components/ui/ThemeToggle";
import { useChatStore } from "../store/chatStore";
import { Send } from "lucide-react";

export const Landing: React.FC = () => {
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const { addMessage } = useChatStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      addMessage(input.trim(), "user");
      navigate("/chat");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      <HeroSection />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10">
        <form onSubmit={handleSubmit} className="mb-8 sm:mb-16">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 sm:p-8 border border-gray-200 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="e.g., Stream Shopify orders to Snowflake..."
                className="text-lg"
              />
              <Button
                type="submit"
                size="lg"
                icon={Send}
                disabled={!input.trim()}
              >
                Start
              </Button>
            </div>
          </div>
        </form>

        <ExamplePrompts />
      </div>
    </div>
  );
};
