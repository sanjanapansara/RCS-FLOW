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
  Switch,
  Typography,
  Image as AntdImage,
  Image,
} from "antd";
import Meta from "antd/es/card/Meta";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

function RichcardNode({ data, selected }) {
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  console.log("richcard node", nodes);

  const alldata = nodes.find((item) => item.id === id);

  const getCardStyle = () => {
    switch (alldata?.data?.size) {
      case "short":
        return {
          height: 120,
          fontSize: 10,
          description: 8,
          padding: 8,
          imageWidth: 150,
        };
      case "medium":
        return {
          height: 160,
          fontSize: 16,
          description: 12,
          padding: 12,
          imageWidth: 180,
        };
      case "tall":
        return {
          height: 200,
          fontSize: 22,
          description: 14,
          padding: 16,
          imageWidth: 200,
        };
      default:
        return {
          height: 180,
          fontSize: 16,
          description: 12,
          padding: 10,
          imageWidth: 180,
        };
    }
  };

  const cardStyle = getCardStyle();

  // console.log("richcard data-->", alldata);

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: { headerBg: "#d4dfd3", colorBorderSecondary: "#d4dfd3" },
        },
      }}
    >
      {alldata?.data?.isStartNode && (
        <Badge.Ribbon
          text={<div className="flex justify-start m-1">Start</div>}
          placement="start"
          style={{ marginTop: -30 }}
        />
      )}

      <Card
        title={alldata?.data?.templateName || "Rich Card"}
        extra={<Switch size="small" />}
        size="small"
        bodyStyle={{ padding: cardStyle.padding }}
        style={{
          padding: "0px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid #d4dfd3" : "none",
          background: "rgba(255, 255, 255, 0.8)", // Apply opacity only to the card background
        }}
      >
        <Handle type="target" position={Position.Left} />
        <Card
          bodyStyle={{ padding: "10px" }}
          width="68%"
          cover={
            <Image
              style={{
                marginBottom: "10px",
                borderRadius: "4px",
              }}
              preview={false}
              width={cardStyle.imageWidth}
              alt="example"
              src={
                alldata?.data?.mediaUrl ||
                "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              }
            />
          }
        >
          <Meta
            title={alldata?.data?.label ?? "Richcard"}
            description={
              alldata?.data.description
                ? alldata?.data.description.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : "Card description"
            }
          />
          <br />
          {alldata?.data?.actions?.length > 0 ? (
            alldata.data.actions.map((btn, i) => (
              <Button
                key={i}
                size="small"
                block
                style={{
                  background: "#adafce",
                  color: "black",
                  marginBottom: 5,
                  fontSize: cardStyle.fontSize,
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
                {btn?.type === "quick" && (
                  <Handle
                    type="source"
                    position={Position.Right}
                    isConnectable={true}
                  />
                )}
                <Typography.Text>
                  {btn?.title ?? "Default Button"}
                </Typography.Text>
              </Button>
            ))
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
              <Typography.Text>Default Button</Typography.Text>
            </Button>
          )}
        </Card>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: "1px solid #d9d9d9",
            borderRadius: "8px",
            padding: "13.1px",
            backgroundColor: "#f9f9f9",
          }}
        >
          <Image
            style={{
              marginBottom: "10px",
              borderRadius: "4px",
            }}
            preview={false}
            width={cardStyle.imageWidth}
            alt="example"
            src={
              alldata?.data?.mediaUrl ||
              "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            }
          />
          <Typography.Title
            level={5}
            style={{
              margin: "0 0 0px",
              textAlign: "center",
              fontSize: cardStyle.fontSize,
            }}
          >
            <strong>{alldata?.data?.label ?? "Richcard"}</strong>
          </Typography.Title>
          <Typography.Text
            style={{
              marginBottom: "10px",
              fontSize: cardStyle.description,
            }}
          >
            {alldata?.data.description
              ? alldata?.data.description.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))
              : "Card description"}
          </Typography.Text>
          
          {alldata?.data?.actions?.length > 0 ? (
            alldata.data.actions.map((btn, i) => (
              <Button
                key={i}
                size="small"
                block
                style={{
                  background: "#adafce",
                  color: "black",
                  marginBottom: 5,
                  fontSize: cardStyle.fontSize,
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
                {btn?.type === "quick" && (
                  <Handle
                    type="source"
                    position={Position.Right}
                    isConnectable={true}
                  />
                )}
                <Typography.Text>
                  {btn?.title ?? "Default Button"}
                </Typography.Text>
              </Button>
            ))
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
              <Typography.Text>Default Button</Typography.Text>
            </Button>
          )}
        </div> */}
      </Card>
    </ConfigProvider>
  );
}
export default RichcardNode;
