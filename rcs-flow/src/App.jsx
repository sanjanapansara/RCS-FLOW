/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
import React, { useRef, useCallback, useState } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  NodeToolbar,
  Position,
  getIncomers,
  useReactFlow,
  getOutgoers,
  getConnectedEdges,
  reconnectEdge,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import Sidebar from "./component/sidebar/Sidebar";
import { DnDProvider, useDnD } from "./component/sidebar/DnDContext";
import {
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  FlagOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { Dropdown, message, Popconfirm, Space, Typography } from "antd";
import TextNode from "./component/nodes/TextNode";
import TextNodeSidebar from "./component/sidebar/TextNodeSidebar";
import ButtonNodeSidebar from "./component/sidebar/ButtonNodeSidebar";
import ButtonNode from "./component/nodes/ButtonNode";
import { v4 as uuidv4 } from "uuid";
import RichcardNode from "./component/nodes/RichcardNode";
import RichcardNodeSidebar from "./component/sidebar/RichcardNodeSidebar";
import RichcardCarouselNode from "./component/nodes/RichcardCarouselNode";
import RichCardCarouselSidebar from "./component/sidebar/RichCardCarouselSidebar";
import MediaNode from "./component/nodes/MediaNode";
import MediaSidebar from "./component/sidebar/MediaSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteNodeState,
  setNodesState,
  setUpdateNodeData,
} from "./component/redux/reducer.button";

let id = 0;
const initialNodes = [
  // {
  //   id: "0",
  //   type: "button",
  //   data: {
  //     label: "Text with Button",
  //     isInitial: true,
  //     id: "0",
  //   },
  //   position: { x: 0, y: 50 },
  // },
];

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const dispatch = useDispatch();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [setReactFlowInstance] = useState(null);
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);
  const nodeData = useSelector((state) => state.nodes.nodes);

  const alldata = nodeData.find((item) => item?.id === selectedNode);

  const updateNodeData = (nodeId, newData) => {
    setNodes(
      (nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? { ...node, data: { ...node.data, ...newData } }
            : node
        )
      //     ? { ...node, data: { ...node.data, ...newData } }
    );
  };

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // const onDrop = useCallback(
  //   (event) => {
  //     event.preventDefault();
  //     if (!type) return;
  //     const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
  //     if (
  //       event.clientX < reactFlowBounds.left ||
  //       event.clientX > reactFlowBounds.right ||
  //       event.clientY < reactFlowBounds.top ||
  //       event.clientY > reactFlowBounds.bottom
  //     ) {
  //       return;
  //     }
  //     const position = screenToFlowPosition({
  //       x: event.clientX - reactFlowBounds.left,
  //       y: event.clientY - reactFlowBounds.top,
  //     });
  //     const newId = uuidv4();

  //     const newNode = {
  //       id: newId,
  //       type,
  //       position,
  //       data: { id: newId, label: `${type} node`, isStartNode: false },
  //     };
  //     setNodes((nds) => nds.concat(newNode));
  //     dispatch(setNodesState(newNode));
  //   },
  //   [screenToFlowPosition, setNodes, type]
  // );

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      if (!type) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      if (
        event.clientX < reactFlowBounds.left ||
        event.clientX > reactFlowBounds.right ||
        event.clientY < reactFlowBounds.top ||
        event.clientY > reactFlowBounds.bottom
      ) {
        return;
      }

      const position = screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newId = uuidv4();
      const newNode = {
        id: newId,
        type,
        position,
        data: { id: newId, label: `${type} node`, isStartNode: false },
      };

      setNodes((nds) => {
        console.log("Existing Nodes in State:", nds);
        console.log("Existing Node Data:", nodeData);

        const isFirstNode = nds.length === 0;
        console.log("Is First Node:", isFirstNode);

        const updatedNode = {
          ...newNode,
          data: { ...newNode.data, isStartNode: isFirstNode },
        };

        dispatch(setNodesState(updatedNode));

        return nds.concat(updatedNode);
      });
    },
    [screenToFlowPosition, setNodes, type, dispatch]
  );

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    setSelectedNode(node.id);
  };

  const onFlowClick = () => {
    setSelectedNode(null);
  };

  const handleDeleteClick = (id) => {
    if (alldata?.data?.isStartNode) {
      message.error("Start Node Can't be deleted");
      return;
    } else {
      setNodes((prev) => {
        const node = prev.filter((nd) => nd.id !== id);
        dispatch(setDeleteNodeState(id));
        console.log("Delete", id);
        return node;
      });
    }
  };

  const handleUnsetStart = (e) => {
    e.preventDefault();
    if (nodeData.length > 1) {
      if (alldata.id === selectedNode && alldata?.data?.isStartNode) {
        const data = { selectedNode, value: false, key: "isStartNode" };
        dispatch(setUpdateNodeData(data));
      } else {
        message.info("First set this node as the start node.");
      }
    } else {
      message.info(
        "You cannot unset the start node when there is only one node."
      );
    }
  };

  const handleSetStart = (e) => {
    e.preventDefault();
    if (!Array.isArray(nodeData)) {
      message.error("Data is not available.");
      return;
    }
    const existingStartNode = nodeData.find((node) => node.data.isStartNode);
    if (existingStartNode && existingStartNode.id === selectedNode) {
      message.info("This node is already set as the start node.");
      return;
    }
    if (existingStartNode) {
      const data = {
        selectedNode: existingStartNode.id,
        value: false,
        key: "isStartNode",
      };
      dispatch(setUpdateNodeData(data));
    }
    const data = { selectedNode, value: true, key: "isStartNode" };
    dispatch(setUpdateNodeData(data));
  };

  const items = [
    {
      key: "unsetStartNode",
      label: (
        <Typography onClick={handleUnsetStart}>
          <DisconnectOutlined style={{ fontSize: "20px" }} />
          Unset start node
        </Typography>
      ),
    },
    {
      key: "setStartNode",
      label: (
        <Typography onClick={handleSetStart}>
          <FlagOutlined style={{ fontSize: "20px" }} />
          Set start node
        </Typography>
      ),
    },
  ];

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);
          const remainingEdges = acc.filter(
            (edge) => !connectedEdges.includes(edge)
          );
          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({
              id: `${source}->${target}`,
              source,
              target,
            }))
          );
          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [setEdges, edges, nodes]
  );

  const renderSidebar = () => {
    if (!selectedNode) return <Sidebar />;
    const selected = nodes.find((node) => node.id === selectedNode);
    if (!selected) return <Sidebar />;
    switch (selected.type) {
      case "Text":
        return (
          <TextNodeSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        );
      case "button":
        return (
          <ButtonNodeSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        );
      case "richcard":
        return (
          <RichcardNodeSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        );
      case "richcard_carosal":
        return (
          <RichCardCarouselSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        );
      case "media":
        return (
          <MediaSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
        );
      default:
        return <Sidebar />;
    }
  };

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  const createCopyNode = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    if (
      event.clientX < reactFlowBounds.left ||
      event.clientX > reactFlowBounds.right ||
      event.clientY < reactFlowBounds.top ||
      event.clientY > reactFlowBounds.bottom
    ) {
      return;
    }
    const position = screenToFlowPosition({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top - 35,
    });

    const newId = uuidv4();
    const newNode = {
      id: newId,
      type: alldata.type,
      position,
      data: {
        ...alldata.data,
        id: newId,
        isStartNode: false,
      },
    };
    setNodes((nds) => nds.concat(newNode));
    dispatch(setNodesState(newNode));
  };
  return (
    <div className="dndflow" style={{ display: "flex" }}>
      <div
        style={{ height: "98vh", width: "100%" }}
        ref={reactFlowWrapper}
        onClick={onFlowClick}
      >
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onReconnect={onReconnect}
          nodeTypes={{
            Text: TextNode,
            button: ButtonNode,
            richcard: RichcardNode,
            richcard_carosal: RichcardCarouselNode,
            media: MediaNode,
          }}
          fitView
          fitViewOptions={{ maxZoom: 1 }}
          onInit={setReactFlowInstance}
          onNodeClick={onNodeClick}
          onNodesDelete={onNodesDelete}
        >
          {selectedNode && (
            <NodeToolbar
              style={{ left: "70px", top: "9px" }}
              isVisible={!!selectedNode}
              nodeId={selectedNode}
              position={Position.Top}
            >
              <CopyOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={createCopyNode}
              />
              <Popconfirm
                title="Delete the Node"
                description="Are you sure to delete this Node?"
                onConfirm={() => handleDeleteClick(selectedNode)}
                okText="Yes"
                cancelText="No"
              >
                <Space onClick={(e) => e.stopPropagation()}>
                  <DeleteOutlined
                    style={{ fontSize: "20px" }}
                  />
                </Space>
              </Popconfirm>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                placement="topLeft"
              >
                <MoreOutlined
                  onClick={(e) => e.stopPropagation()}
                  style={{ fontSize: "20px", cursor: "pointer" }}
                />
              </Dropdown>
            </NodeToolbar>
          )}
          <Controls />
          <MiniMap />
          <Background />
        </ReactFlow>
      </div>
      {renderSidebar()}
    </div>
  );
};
export default () => (
  <ReactFlowProvider>
    <DnDProvider>
      <DnDFlow />
    </DnDProvider>
  </ReactFlowProvider>
);
