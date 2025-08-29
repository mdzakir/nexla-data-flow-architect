import type {FlowNode} from "../types/flow";

const sourceKeywords = [
  "shopify",
  "salesforce",
  "postgresql",
  "mysql",
  "stripe",
  "api",
];
const transformKeywords = [
  "transform",
  "process",
  "clean",
  "filter",
  "aggregate",
];
const destinationKeywords = [
  "bigquery",
  "snowflake",
  "webhook",
  "sheets",
  "mailchimp",
];

export const parseFlowFromMessage = (
  message: string
): Omit<FlowNode, "id" | "createdAt" | "updatedAt">[] => {
  const words = message.toLowerCase().split(/\s+/);
  const nodes: Omit<FlowNode, "id" | "createdAt" | "updatedAt">[] = [];

  // Find source
  const sourceMatch = words.find((word) =>
    sourceKeywords.some((keyword) => word.includes(keyword))
  );
  if (sourceMatch) {
    nodes.push({
      type: "source",
      name: capitalizeFirst(sourceMatch),
      status: "pending",
      position: { x: 50, y: 100 },
      properties: { platform: sourceMatch },
      connections: [],
    });
  }

  // Add transform node if keywords found or if it's a complex flow
  const hasTransform = words.some((word) =>
    transformKeywords.some((keyword) => word.includes(keyword))
  );
  if (hasTransform || nodes.length > 0) {
    nodes.push({
      type: "transform",
      name: "Data Processing",
      status: "pending",
      position: { x: 300, y: 100 },
      properties: { operations: ["clean", "validate"] },
      connections: [],
    });
  }

  // Find destination
  const destMatch = words.find((word) =>
    destinationKeywords.some((keyword) => word.includes(keyword))
  );
  if (destMatch) {
    nodes.push({
      type: "destination",
      name: capitalizeFirst(destMatch),
      status: "pending",
      position: { x: 550, y: 100 },
      properties: { platform: destMatch },
      connections: [],
    });
  }

  return nodes;
};

const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const simulateAIResponse = (): string => {
  const responses = [
    "Great! Let's set up a data flow to connect Shopify to BigQuery. I'll need some details to configure this properly.",
    "Perfect! I can help you sync Salesforce contacts to Mailchimp. What specific contact fields would you like to sync?",
    "Excellent choice! Setting up PostgreSQL to webhook integration. Could you provide the webhook URL and authentication details?",
    "I'll help you analyze Stripe payments in Google Sheets. Which payment metrics are most important to you?",
  ];

  return responses[Math.floor(Math.random() * responses.length)];
};
