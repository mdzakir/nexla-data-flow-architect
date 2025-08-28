import React from "react";
import { FlowNode as FlowNodeType } from "../../types/flow";
import { clsx } from "clsx";
import { Database, Zap, Target, Circle } from "lucide-react";

interface FlowNodeProps {
  node: FlowNodeType;
  isSelected: boolean;
  onClick: () => void;
}

export const FlowNode: React.FC<FlowNodeProps> = ({
  node,
  isSelected,
  onClick,
}) => {
  const getNodeIcon = () => {
    switch (node.type) {
      case "source":
        return Database;
      case "transform":
        return Zap;
      case "destination":
        return Target;
    }
  };

  const getNodeColor = () => {
    switch (node.type) {
      case "source":
        return "border-blue-500 bg-blue-50 dark:bg-blue-900/20";
      case "transform":
        return "border-purple-500 bg-purple-50 dark:bg-purple-900/20";
      case "destination":
        return "border-green-500 bg-green-50 dark:bg-green-900/20";
    }
  };

  const getStatusColor = () => {
    switch (node.status) {
      case "pending":
        return "text-orange-500";
      case "partial":
        return "text-blue-500";
      case "complete":
        return "text-green-500";
      case "error":
        return "text-red-500";
    }
  };

  const Icon = getNodeIcon();

  return (
    <div
      onClick={onClick}
      className={clsx(
        "relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 min-w-[160px]",
        getNodeColor(),
        isSelected
          ? "ring-2 ring-primary-500 ring-offset-2 shadow-lg"
          : "hover:shadow-md"
      )}
      style={{
        position: "absolute",
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <div className="flex items-center space-x-3">
        <Icon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
            {node.name}
          </h3>
          <div className="flex items-center space-x-1 mt-1">
            <Circle
              className={clsx("w-2 h-2 fill-current", getStatusColor())}
            />
            <span className={clsx("text-xs capitalize", getStatusColor())}>
              {node.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
