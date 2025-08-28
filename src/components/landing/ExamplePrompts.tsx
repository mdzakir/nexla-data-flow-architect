import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/Button";
import { useChatStore } from "../../store/chatStore";
import { Database, Mail, CreditCard, Lightbulb } from "lucide-react";

const examples = [
  {
    icon: Database,
    text: "Connect Shopify to BigQuery",
    description: "Stream e-commerce data to your data warehouse",
  },
  {
    icon: Mail,
    text: "Sync Salesforce contacts to Mailchimp",
    description: "Keep your marketing lists up to date",
  },
  {
    icon: Database,
    text: "Get PostgreSQL users and send to a webhook",
    description: "Export user data to external services",
  },
  {
    icon: CreditCard,
    text: "Analyze Stripe payments in Google Sheets",
    description: "Track payment analytics in spreadsheets",
  },
];

export const ExamplePrompts: React.FC = () => {
  const navigate = useNavigate();
  const { addMessage } = useChatStore();

  const handleExampleClick = (text: string) => {
    addMessage(text, "user");
    navigate("/chat");
  };

  return (
    <div className="py-16">
      <div className="flex items-center justify-center mb-8">
        <Lightbulb className="w-5 h-5 text-yellow-500 mr-2" />
        <span className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          Or try one of these examples
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {examples.map((example, index) => (
          <button
            key={index}
            onClick={() => handleExampleClick(example.text)}
            className="group p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-lg transition-all duration-200 text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg group-hover:bg-yellow-200 dark:group-hover:bg-yellow-900/50 transition-colors">
                <example.icon className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                  {example.text}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {example.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
