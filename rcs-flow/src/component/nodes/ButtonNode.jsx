/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Handle, Position } from "@xyflow/react";
import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Flex,
  Switch,
  Typography,
} from "antd";
import { useSelector } from "react-redux";
import { CalendarOutlined, EnvironmentOutlined, LinkOutlined, MessageOutlined, PhoneOutlined } from "@ant-design/icons";

const ButtonNode = ({ data, selected }) => {
console.log("data-->",data);

  const id = data.id;
  // const nodes = useSelector((state) => state.nodes.nodes);
  // const alldata = nodes.find((item) => item.id === id);
  // const [enabled, setEnabled] = useState(true);
  // console.log("alldata-->",nodes);
  console.log("id:", id);
  const [enabled, setEnabled] = useState(true);
  const nodes = useSelector((state) => state.nodes.nodes);
  console.log("nodes:", nodes);
  const alldata = nodes.find((item) => item.id === id);

console.log("alldata-->",alldata);

  // Force re-render when nodes change
  useEffect(() => {
    // This will run when 'nodes' in Redux store changes
  }, [nodes]);

  console.log("Node Data:", alldata);
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#8f91a8",
            colorBorderSecondary: "#8f91a8",
          },
        },
      }}
    >
      <Badge.Ribbon
        text={<div className="flex justify-start m-1">Start</div>}
        placement="start"
        style={{ marginTop: -30 }}
      >
        <Card
          title={data.templateName ?? "Send Button Message"}
          extra={<Switch size="small" />}
          size="small"
          bodyStyle={{ padding: "10px" }}
          style={{
            width: 200,
            padding: "0px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #8f91a8" : "none",
          }}
        >
          <Handle type="target" position={Position.Left} />
          <Typography.Text>{data.label}</Typography.Text>
          {/* <Flex justify="space-around"> */}
          {alldata?.data?.actions?.length > 0 ? (
            <>
              {alldata?.data?.actions?.map((btn, i) => (
                <Button
                  key={i}
                  size="small"
                  block
                  style={{
                    background: "#ADAFCE",
                    color: "black",
                    marginBottom: 5,
                  }}
                  icon={
                    <>
                      {btn?.type === "quick" && <MessageOutlined />}
                      {btn?.type === "call" && <PhoneOutlined />}
                      {btn?.type === "url" && <LinkOutlined />}
                      {btn?.type === "location" && <EnvironmentOutlined />}
                      {btn?.type === "calendar" && <CalendarOutlined />}
                    </>
                  }
                >
                  {btn.type === "quick" && (
                    <Handle
                      type="source"
                      position={Position.Right}
                      isConnectable={true}
                    />
                  )}
                  <Typography.Text>
                    {btn?.title ?? "Deafult Button"}
                  </Typography.Text>
                </Button>
              ))}
            </>
          ) : (
            <Button
              size="small"
              block
              style={{ background: "#ADAFCE", color: "black" }}
            >
              <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
              />
              <Typography.Text>Deafult Button</Typography.Text>
            </Button>
          )}
          {/* </Flex> */}
        </Card>
      </Badge.Ribbon>
    </ConfigProvider>
  );
};
export default ButtonNode;
