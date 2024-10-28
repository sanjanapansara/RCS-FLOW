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
  Panel,
  MiniMap,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import "./App.css";
import Sidebar from "./component/sidebar/Sidebar";
import { DnDProvider, useDnD } from "./component/sidebar/DnDContext";
// import ButtonNode from "./components/Node/ButtonNode";
// import TextNode from "./components/Node/TextNode";
// import PollNode from "./components/Node/PollNode";
// import ListNode from "./components/Node/ListNode";
// import MediaNode from "./components/Node/MediaNode";
// import TextNodeSidebar from "./components/sidebar/TextNodeSidebar";
// import ButtonNodeSidebar from "./components/sidebar/ButtonNodeSidebar";
// import ListNodeSidebar from "./components/sidebar/ListNodeSidebar";
// import MediaNodeSider from "./components/sidebar/MediaNodeSider";
// import PollNodeSider from "./components/sidebar/PollNodeSider";
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
import RichcardCarosalNode from "./component/nodes/RichcardCarouselNode";
import RichcardCarouselNode from "./component/nodes/RichcardCarouselNode";
import RichCardCarouselSidebar from "./component/sidebar/RichCardCarouselSidebar";
import MediaNode from "./component/nodes/MediaNode";
import MediaSidebar from "./component/sidebar/MediaSidebar";
// import dagre from '@dagrejs/dagre';

const initialNodes = [];
// const dagreGraph = new dagre.graphlib.Graph().setDefaultEdgeLabel(() => ({}));
// const nodeWidth = 300;
// const nodeHeight = 100;
// const getLayoutedElements = (nodes, edges, direction = 'TB') => {
//   const isHorizontal = direction === 'LR';
//   dagreGraph.setGraph({ rankdir: direction });
//   nodes.forEach((node) => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });
//   edges.forEach((edge) => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });
//   dagre.layout(dagreGraph);
//   const newNodes = nodes.map((node) => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     const newNode = {
//       ...node,
//       targetPosition: isHorizontal ? 'left' : 'top',
//       sourcePosition: isHorizontal ? 'right' : 'bottom',
//       position: {
//         x: nodeWithPosition.x - nodeWidth / 2,
//         y: nodeWithPosition.y - nodeHeight / 2,
//       },
//     };

//     return newNode;
//   });
//   return { nodes: newNodes, edges };
// };
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
        return <TextNodeSidebar node={selected} />;
      case "button":
        return <ButtonNodeSidebar node={selected} />;
      case "richcard":
        return <RichcardNodeSidebar node={selected} />;
      case "richcard_carosal":
        return <RichCardCarouselSidebar node={selected} />;
      case "media":
        return <MediaSidebar node={selected} />;
      default:
        return <Sidebar />;
    }
  };

  const onReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [setEdges]
  );

  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges],
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
            richcard:RichcardNode,
            richcard_carosal:RichcardCarouselNode,
            // poll: PollNode,
            // list: ListNode,
            media: MediaNode,
          }}
          fitView
          fitViewOptions={{ maxZoom: 1 }}
          onInit={setReactFlowInstance}
          onNodeClick={onNodeClick}
          onNodesDelete={onNodesDelete}
        >
          <Panel position="top-right">
            <button onClick={() => onLayout("LR")}>horizontal layout</button>
          </Panel>
          {selectedNode && (
            <NodeToolbar
            style={{left: "60px"}}
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
                onConfirm={() => confirm(id)}
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
          <MiniMap/>
          <Background />
        </ReactFlow>
      </div>
      {renderSidebar  ()}
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
