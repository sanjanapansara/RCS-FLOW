import { Handle, Position } from "@xyflow/react";
import { Button, Card, ConfigProvider, Flex, Switch, Typography } from "antd";
import React from "react";

function RichcardCarouselNode({ data, selected }) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#796383",
            colorBorderSecondary: "#796383",
          },
        },
      }}
    >
      <Card
        title="Rich Card Carousel"
        extra={<Switch size="small" />}
        size="small"
        bodyStyle={{ padding: "10px" }}
        style={{
          width: 200,
          padding: "0px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid #796383" : "none",
        }}
      >
        <Handle type="target" position={Position.Left} />
        {/* <Typography.Text>{data.label}</Typography.Text><br/> */}
        <img
          style={{ width: "100%" }}
          alt="example"
          src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
        />
        <Typography.Text>
          <strong>{data.label}</strong>
        </Typography.Text>
        <br />
        <Typography.Text>Description</Typography.Text>
        <Flex justify="space-around">
          <Button
            size="small"
            block
            style={{ background: "#8f91a8", color: "black" }}
          >
            <Handle
              type="source"
              position={Position.Right}
              isConnectable={true}
            />
            <Typography.Text>Deafult Button</Typography.Text>
          </Button>
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

export default RichcardCarouselNode;
