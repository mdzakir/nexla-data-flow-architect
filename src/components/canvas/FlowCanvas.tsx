import React from "react";
import { FlowNode } from "./FlowNode";
import { useCanvasStore } from "../../store/canvasStore";
import { Layers } from "lucide-react";

export const FlowCanvas: React.FC = () => {
  const { nodes, selectedNode, selectNode } = useCanvasStore();

  return (
    <div className="flex-1 relative bg-white dark:bg-gray-800 overflow-auto">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 20 0 L 0 0 0 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {nodes.length === 0 ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Layers className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              Your data flow will appear here
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
              Describe your integration in the chat to get started
            </p>
          </div>
        </div>
      ) : (
        <div className="relative min-h-full p-8">
          {nodes.map((node, index) => (
            <React.Fragment key={node.id}>
              <FlowNode
                node={node}
                isSelected={selectedNode === node.id}
                onClick={() => selectNode(node.id)}
              />

              {/* Connection Lines */}
              {index < nodes.length - 1 && (
                <svg
                  className="absolute pointer-events-none"
                  style={{
                    left: node.position.x + 160,
                    top: node.position.y + 32,
                    width: 140,
                    height: 4,
                  }}
                >
                  <defs>
                    <marker
                      id="arrowhead"
                      markerWidth="10"
                      markerHeight="7"
                      refX="10"
                      refY="3.5"
                      orient="auto"
                    >
                      <polygon
                        points="0 0, 10 3.5, 0 7"
                        fill="rgb(156 163 175)"
                      />
                    </marker>
                  </defs>
                  <line
                    x1="0"
                    y1="2"
                    x2="130"
                    y2="2"
                    stroke="rgb(156 163 175)"
                    strokeWidth="2"
                    markerEnd="url(#arrowhead)"
                  />
                </svg>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
