import type {BaseEntity, Status} from "./common";

export type NodeType = "source" | "transform" | "destination";

export interface FlowNode extends BaseEntity {
  type: NodeType;
  name: string;
  status: Status;
  position: { x: number; y: number };
  properties: Record<string, any>;
  connections: string[];
}

export interface FlowState {
  nodes: FlowNode[];
  selectedNode: string | null;
  addNode: (node: Omit<FlowNode, "id" | "createdAt" | "updatedAt">) => void;
  updateNode: (id: string, updates: Partial<FlowNode>) => void;
  selectNode: (id: string | null) => void;
  clearNodes: () => void;
}
