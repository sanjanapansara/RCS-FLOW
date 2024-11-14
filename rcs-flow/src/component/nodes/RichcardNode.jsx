import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
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
import React from "react";
import { useSelector } from "react-redux";

function RichcardNode({ data, selected }) {
  console.log(data);

  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === id);
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#D1AFAF",
            colorBorderSecondary: "#D1AFAF",
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
          title={data.templateName || "Rich Card"}
          extra={<Switch size="small" />}
          size="small"
          bodyStyle={{ padding: "10px" }}
          style={{
            width: 200,
            padding: "0px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #ADB3E8" : "none",
          }}
        >
          <Handle type="target" position={Position.Left} />
          <Typography.Text>
            <strong>{data.label}</strong>
          </Typography.Text>
          <br />
          <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
            {data.description
              ? data.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))
              : "No description available."}
          </Typography.Text>
          <img
            style={{ width: "100%" }}
            alt="example"
            src={
              data.imageUrl ||
              "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            }
          />
          {alldata?.data?.actions?.length > 0 ? (
            <>
              {alldata?.data?.actions?.map((btn, i) => (
                <Button
                  key={i}
                  size="small"
                  block
                  style={{
                    background: "#adafce",
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
              style={{ background: "#adafce", color: "black" }}
            >
              <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
              />
              <Typography.Text>Deafult Button</Typography.Text>
            </Button>
          )}
        </Card>
      </Badge.Ribbon>
    </ConfigProvider>
  );
}

export default RichcardNode;
