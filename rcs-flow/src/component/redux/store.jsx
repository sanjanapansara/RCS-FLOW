import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import nodesReducer from "./reducer.button";

const persistConfig = {
  key: "nodes",
  storage,
};

const persistedReducer = persistReducer(persistConfig, nodesReducer);
export const store = configureStore({
  reducer:{
    nodes: persistedReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);










// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// const useStore = create(
//   persist(
//     (set, get) => ({
//       selectedNode: null,
//       nodes: [],
//       bearCount: 0,

//       // Increase the bear count (example action)
//       increase: () => set((state) => ({ bearCount: state.bearCount + 1 })),

//       // Set selected node
//       setSelectedNode: (node) => {
//         console.log("Setting selectedNode:", node);
//         set({ selectedNode: node });
//       },

//       // Update node label
//       updateNodeLabel: (nodeId, nodeVal) => {
//         const nodes = get().nodes.map((node) =>
//           node.id === nodeId
//             ? { ...node, data: { ...node.data, ...nodeVal } }
//             : node
//         );
//         set({ nodes });
//       },

//       // Add a new button to the selected node
//       addButton: () => {
//         const { selectedNode } = get();
//         if (selectedNode) {
//           // Ensure that buttons array is initialized
//           const buttons = selectedNode.data?.buttons ?? []; // Initialize if not present

//           if (buttons.length < 11) {
//             const newButton = {
//               id: buttons.length,
//               type: "quick",
//               title: "",
//               payload: "",
//             };
//             const updatedButtons = [...buttons, newButton];
//             get().updateNodeLabel(selectedNode.id, { buttons: updatedButtons });
//             console.log("Button added:", newButton);
//           } else {
//             console.warn("Cannot add more than 11 buttons");
//             message.warning("Cannot add more than 11 buttons");
//           }
//         } else {
//           console.warn("selectedNode is invalid:", selectedNode);
//         }
//       },

//       // Set nodes (useful for initializing or updating the entire nodes list)
//       setNodes: (nodes) => set({ nodes }),
//     }),
//     { name: "node-storage" }
//   )
// );

// export default useStore;

// create Store


