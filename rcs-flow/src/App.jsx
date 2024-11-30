/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/display-name */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useCallback, useState, useEffect } from "react";
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
  useViewport,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import "./index.css";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./component/sidebar/Sidebar";
import { DnDProvider, useDnD } from "./component/sidebar/DnDContext";
import TextNode from "./component/nodes/TextNode";
import TextNodeSidebar from "./component/sidebar/TextNodeSidebar";
import ButtonNodeSidebar from "./component/sidebar/ButtonNodeSidebar";
import ButtonNode from "./component/nodes/ButtonNode";
import RichcardNode from "./component/nodes/RichcardNode";
import RichcardNodeSidebar from "./component/sidebar/RichcardNodeSidebar";
import RichcardCarouselNode from "./component/nodes/RichcardCarouselNode";
import RichCardCarouselSidebar from "./component/sidebar/RichCardCarouselSidebar";
import MediaNode from "./component/nodes/MediaNode";
import dagre from "@dagrejs/dagre";
import MediaSidebar from "./component/sidebar/MediaSidebar";
import { useDispatch, useSelector } from "react-redux";
import {
  setDeleteNodeState,
  setNodesState,
  setEmptyState,
  setUpdateNodeData,
} from "./component/redux/reducer.button";
import { Dropdown, message, Popconfirm, Space, Typography } from "antd";
import {
  CopyOutlined,
  DeleteOutlined,
  DisconnectOutlined,
  FlagOutlined,
  MoreOutlined,
} from "@ant-design/icons";

const defaultNodePosition = {
  x: 250,
  y: 250,
};
const newId = uuidv4();
const newNode = {
  id: newId,
  type: "button",
  position: defaultNodePosition,
  data: { id: newId, label: "Default Button Node", isStartNode: true },
};

const initialNodes = [newNode];
const initialEdges = [];
const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
const nodeWidth = 300;
const nodeHeight = 100;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({ rankdir: direction });
  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });
  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });
  dagre.layout(dagreGraph);
  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };

    return newNode;
  });
  return { nodes: newNodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const DnDFlow = () => {
  const dispatch = useDispatch();
  const reactFlowWrapper = useRef(null);
  const nodeData = useSelector((state) => state.nodes.nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const { screenToFlowPosition } = useReactFlow();
  const [setReactFlowInstance] = useState(null);
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState("button");
  const alldata = nodeData.find((item) => item?.id === selectedNode);
  const [toolbarWidth, setToolbarWidth] = useState(200); // Default width
  const { x, y, zoom } = useViewport();

  useEffect(() => {
    dispatch(setEmptyState());
  }, [dispatch]);

  useEffect(() => {
    if (selectedNode) {
      const selectedNodeData = nodes.find((n) => n.id === selectedNode);
      if (selectedNodeData) {
        const nodeWidth = 350;
        setToolbarWidth(nodeWidth * zoom);
      }
    }
  }, [zoom, selectedNode, nodes]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };
  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

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
        if (nodeData.length === 0) {
          delete nds[0].measured;
          dispatch(setNodesState(nds[0]));
          dispatch(setNodesState(newNode));
          return nds.concat(newNode);
        } else {
          dispatch(setNodesState(newNode));
          return nds.concat(newNode);
        }
      });
    },
    [dispatch, nodeData.length, screenToFlowPosition, setNodes, type]
  );

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    if (nodeData?.length === 0) {
      delete node.measured;
      dispatch(setNodesState(node));
    }
    setSelectedNode(node.id);
  };

  const onFlowClick = () => {
    setSelectedNode(null);
  };

  const handleDeleteClick = (id) => {
    if (alldata?.data?.isStartNode) {
      message.error("Start Node Can't be deleted");
    } else {
      setNodes((prev) => {
        const node = prev.filter((nd) => nd.id !== id);
        dispatch(setDeleteNodeState(id));
        return node;
      });
    }
  };

  const handleUnsetStart = (e) => {
    e.preventDefault();
    if (
      nodeData.length > 1 &&
      alldata.id === selectedNode &&
      alldata?.data?.isStartNode
    ) {
      setNodes((prev) => {
        const nodedata = prev.find((nd) => nd.id === selectedNode);
        const updatedNodeData = {
          ...nodedata,
          data: {
            ...nodedata.data,
            isStartNode: false,
          },
        };
        return prev.map((node) =>
          node.id === selectedNode ? updatedNodeData : node
        );
      });
      const data = { selectedNode, value: false, key: "isStartNode" };
      dispatch(setUpdateNodeData(data));
      setSelectedNode(selectedNode);
    } else if (
      nodeData.length === 1 &&
      alldata.id === selectedNode &&
      alldata?.data?.isStartNode
    ) {
      message.info("Please add one more Node");
    } else {
      message.info("First Set this node to Start");
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
      message.info("Another node is already set as the start node.");
      return;
    }
    const data = { selectedNode, value: true, key: "isStartNode" };
    dispatch(setUpdateNodeData(data));
    setSelectedNode(selectedNode);
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
            (edge) => !connectedEdges?.includes(edge)
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
  const selected = nodes.find((node) => node?.id === selectedNode);
  const renderSidebar = () => {
    if (!selectedNode) return <Sidebar className="sidebar" />;
    const selected = nodes.find((node) => node?.id === selectedNode);
    if (!selected) return <Sidebar className="sidebar" />;
    switch (selected.type) {
      case "Text":
        return (
          <div className="sidebar">
            <TextNodeSidebar
              node={selected}
              updateNodeData={updateNodeData}
              setSelectedNode={setSelectedNode}
              selectedNode={selectedNode}
            />
          </div>
        );
      case "button":
        return (
          <div className="sidebar">
            <ButtonNodeSidebar
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
          </div>
        );
      case "richcard":
        return (
          <div className="sidebar">
            <RichcardNodeSidebar
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
          </div>
        );
      case "richcard_carosal":
        return (
          <div className="sidebar">
          <RichCardCarouselSidebar
            node={selected}
            updateNodeData={updateNodeData}
            setSelectedNode={setSelectedNode}
            selectedNode={selectedNode}
          />
          </div>
        );
      case "media":
        return (
          <div className="sidebar">
            <MediaSidebar
              node={selected}
              updateNodeData={updateNodeData}
              selectedNode={selectedNode}
              setSelectedNode={setSelectedNode}
            />
          </div>
        );
      default:
        return <Sidebar className="sidebar" />;
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
    const position = {
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top - 35,
    };

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
  console.log("type",selected);
  

  return (
    <div className="dndflow" style={{ display: "flex", overflowY: "hidden" }}>
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
          <NodeToolbar
            style={{
              display: "flex",
              // alignItems: "center",
              justifyContent: "end",
              // width: toolbarWidth,
              width: selected?.type === "richcard_carosal" ? "26%" : "15%",
            }}
            nodeId={selectedNode}
            position={Position.Top}
          >
            {selectedNode && (
              <div>
                <CopyOutlined
                  style={{ fontSize: "20px", cursor: "pointer" }}
                  onClick={createCopyNode}
                />
                <Popconfirm
                  title="Delete the Node"
                  description="Are you sure to delete this Node?"
                  onConfirm={() => {
                    handleDeleteClick(selectedNode);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Space onClick={(e) => e.stopPropagation()}>
                    <DeleteOutlined style={{ fontSize: "20px" }} />
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
              </div>
            )}
          </NodeToolbar>
          <Controls />
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
