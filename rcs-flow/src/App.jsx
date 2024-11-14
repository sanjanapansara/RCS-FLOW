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
import { Dropdown, Menu, Popconfirm, Row, Space } from "antd";
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
  setEmptyState,
  setNodesState,
  setUpdateNodeData,
} from "./component/redux/reducer.button";

// import { useStore } from "zustand";

let id = 0;
const getId = () => `dndnode_${id++}`;
const initialNodes = [
  {
    id: "0",
    type: "button",
    data: {
      label: "Text with Button",
      isInitial: true,
      id: "0",
    },
    position: { x: 0, y: 50 },
  },
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
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
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
      const newId = uuidv4();

      const newNode = {
        id: newId,
        type,
        position,
        data: { id: newId, label: `${type} node`, isStartNode: false },
      };
      setNodes((nds) => nds.concat(newNode));
      dispatch(setNodesState(newNode));
    },
    [screenToFlowPosition, setNodes, type]
  );

  // const onNodeClick = (event, node) => {
  //   event.stopPropagation();
  //   setSelectedNode(node.id);
  // };

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
    <>
      <Row align="middle">
        <Menu style={{ margin: "-130px", marginBlock: "auto" }}>
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
      </Row>
    </>
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



  const handleCopyNode = (node) => {
    const newNode = {
      ...node,
      id: getId(), // Get a unique ID for the new node
      position: {
        x: node.position.x + 20, // Offset position to avoid overlap
        y: node.position.y + 20,
      },
    };
    setNodes((nds) => nds.concat(newNode));
  };
  

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
              style={{ left: "70px", top: "9px" }}
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
