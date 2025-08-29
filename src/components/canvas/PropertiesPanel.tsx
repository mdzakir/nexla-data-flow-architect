import React from "react";
import {type FlowNode } from "../../types/flow";
import { X, Database, Zap, Target } from "lucide-react";
import { Button } from "../ui/Button";

interface PropertiesPanelProps {
  node: FlowNode | null;
  onClose: () => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  node,
  onClose,
}) => {
  if (!node) return null;

  const getIcon = () => {
    switch (node.type) {
      case "source":
        return Database;
      case "transform":
        return Zap;
      case "destination":
        return Target;
    }
  };

  const Icon = getIcon();

  return (
    <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {node.name}
          </h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose} icon={X} />
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 capitalize">
            {node.type}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-sm text-gray-900 dark:text-gray-100 capitalize">
            {node.status}
          </div>
        </div>

        {Object.keys(node.properties).length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Configuration
            </label>
            <div className="space-y-2">
              {Object.entries(node.properties).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between items-center py-2 px-3 bg-gray-100 dark:bg-gray-700 rounded-lg"
                >
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-400 capitalize">
                    {key.replace(/([A-Z])/g, " $1")}:
                  </span>
                  <span className="text-sm text-gray-900 dark:text-gray-100">
                    {typeof value === "string" ? value : JSON.stringify(value)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
