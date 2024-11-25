import { createSlice } from "@reduxjs/toolkit";
// import { v4 as uuidv4 } from "uuid";

// create an inital state

// const defaultNodePosition = {
//   x: 250, // or any X coordinate
//   y: 250, // or any Y coordinate
// };
// const newId = uuidv4();


const initialState = {
  nodes: [],
};

export const nodesSlice = createSlice({
  name: "nodes",
  initialState: initialState,
  reducers: {
    setNodesState: (state, action) => {
      const newNode = action.payload;

      // Check if the node already exists in the state
      const nodeExists = state.nodes.some((node) => node.id === newNode.id); // Assuming each node has a unique 'id'
      if (!nodeExists) {
        state.nodes.push(newNode); // Add the new node only if it doesn't exist
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
      console.log("Carousle--->",action);
      state.nodes = state.nodes.map((node) => {
        return node.id === selectedNode
          ? { ...node, data: { ...node.data, [key]: value } }
          : node;
      });
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
