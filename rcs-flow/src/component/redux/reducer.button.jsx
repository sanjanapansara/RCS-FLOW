import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  nodes: [],
  richCardCarousels: []
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState,
  reducers: {
    setNodesState: (state, action) => {
      const newNode = action.payload;
      const nodeExists = state.nodes.some((node) => node.id === newNode.id);
      if (!nodeExists) {
        state.nodes.push(newNode);
      } else {
        state.nodes = [...state.nodes, newNode];
      }
    },
    setEmptyState: (state) => {
      state.nodes = [];
    },
    setUpdateNodeData: (state, action) => {
      const { selectedNode, value, key } = action.payload;
      console.log("123--->",action.payload);
      state.nodes = state.nodes.map((node) => {
        return node.id === selectedNode
          ? { ...node, data: { ...node.data, [key]: value } }
          : node;
      });
    },
    setRichCardNodeData: (state, action) => {
      const { selectedNode, value, key } = action.payload;
      console.log("456--->",action.payload);
      state.nodes = state.nodes.map((node) => {
        return node.id === selectedNode
          ? { ...node, data: { ...node.data, [key]: value } }
          : node;
      });
    },
    setRichCardNodeCarousleData: (state, action) => {
      const { selectedNode, value, key } = action.payload;
      console.log("Carousle--->",action.payload);
      console.log("state nodes2-->",state.nodes);

      const checked =  state.nodes = state.nodes.map((node) => {
         return node.id === selectedNode? { ...node, data: { ...node.data, [key]: value } }: node;
      });
       console.log("checked data",checked)
    },
    setDeleteNodeState: (state,action) => {
      state.nodes = state.nodes.filter((node) => node.id !== action.payload);
    },
  },
});

export const {
  setNodesState,
  setEmptyState,
  setUpdateNodeData,
  setDeleteNodeState,
  setRichCardNodeData,
  setRichCardNodeCarousleData,
} = nodesSlice.actions;
export default nodesSlice.reducer;
