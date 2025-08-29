import { create } from "zustand";
import type {FlowState, FlowNode} from "../types/flow";

export const useCanvasStore = create<FlowState>((set) => ({
  nodes: [],
  selectedNode: null,

  addNode: (nodeData) => {
    const node: FlowNode = {
      ...nodeData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    set((state) => ({
      nodes: [...state.nodes, node],
    }));
  },

  updateNode: (id: string, updates: Partial<FlowNode>) => {
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, ...updates, updatedAt: new Date() } : node
      ),
    }));
  },

  selectNode: (id: string | null) => set({ selectedNode: id }),

  clearNodes: () => set({ nodes: [], selectedNode: null }),
}));
