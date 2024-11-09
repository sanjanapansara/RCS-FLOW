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
import { Dropdown, Menu, Popconfirm, Space } from "antd";
import TextNode from "./component/nodes/TextNode";
import TextNodeSidebar from "./component/sidebar/TextNodeSidebar";
import ButtonNodeSidebar from "./component/sidebar/ButtonNodeSidebar";
import ButtonNode from "./component/nodes/ButtonNode";
import RichcardNode from "./component/nodes/RichcardNode";
import RichcardNodeSidebar from "./component/sidebar/RichcardNodeSidebar";
import RichcardCarouselNode from "./component/nodes/RichcardCarouselNode";
import RichCardCarouselSidebar from "./component/sidebar/RichCardCarouselSidebar";
import MediaNode from "./component/nodes/MediaNode";
import MediaSidebar from "./component/sidebar/MediaSidebar";

const initialNodes = [];

let id = 0;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const { screenToFlowPosition } = useReactFlow();
  const [setReactFlowInstance] = useState(null);
  const [type] = useDnD();
  const [selectedNode, setSelectedNode] = useState(null);

  const updateNodeData = (nodeId, newData) => {
    setNodes((nds) =>
      nds.map((node) => (node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node))
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
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  const onNodeClick = (event, node) => {
    event.stopPropagation();
    setSelectedNode(node.id);
  };

  const onFlowClick = () => {
    setSelectedNode(null);
  };

  const handleDeleteClick = (id) => {
    console.log("Delete icon clicked for node", id);
  };

  const menu = (
    <Menu>
      <Menu.Item key="unsetStartNode">
        <Space>
          <DisconnectOutlined style={{ fontSize: "20px" }} />
          Unset start node
        </Space>
      </Menu.Item>
      <Menu.Item key="setStartNode">
        <Space>
          <FlagOutlined style={{ fontSize: "20px" }} />
          Set start node
        </Space>
      </Menu.Item>
    </Menu>
  );

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
        return <TextNodeSidebar node={selected} updateNodeData={updateNodeData} setSelectedNode={setSelectedNode} />;
      case "button":
        return <ButtonNodeSidebar node={selected} updateNodeData={updateNodeData} setSelectedNode={setSelectedNode} />;
      case "richcard":
        return <RichcardNodeSidebar node={selected} updateNodeData={updateNodeData} setSelectedNode={setSelectedNode} />;
      case "richcard_carosal":
        return <RichCardCarouselSidebar node={selected} updateNodeData={updateNodeData} setSelectedNode={setSelectedNode} />;
      case "media":
        return <MediaSidebar node={selected} updateNodeData={updateNodeData} setSelectedNode={setSelectedNode} />;
      default:
        return <Sidebar />;
    }
  };

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  return (
    <div className="dndflow" style={{ display: "flex" }}>
      <div
        style={{ height: "99vh", width: "100%" }}
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
              style={{ left: "60px" }}
              isVisible={!!selectedNode}
              nodeId={selectedNode}
              position={Position.Top}
            >
              <CopyOutlined
                style={{ fontSize: "20px", cursor: "pointer" }}
                onClick={(e) => e.stopPropagation()}
              />
              <Popconfirm
                title="Delete the Node"
                description="Are you sure to delete this Node?"
                onConfirm={() => handleDeleteClick(id)}
                okText="Yes"
                cancelText="No"
              >
                <Space onClick={(e) => e.stopPropagation()}>
                  <DeleteOutlined
                    style={{ fontSize: "20px" }}
                    onClick={() => handleDeleteClick(id)}
                  />
                </Space>
              </Popconfirm>
              <Dropdown overlay={menu} trigger={["click"]} placement="topLeft">
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
