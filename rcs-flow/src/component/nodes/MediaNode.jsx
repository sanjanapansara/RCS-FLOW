import { Handle, Position } from "@xyflow/react";
import { Card, ConfigProvider, Divider, Switch, Typography } from "antd";
import React from "react";

const { Text, Title } = Typography;

function MediaNode({ data,selected}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#DFE6DC",
            colorBorderSecondary: "#ADC0A7",
          },
        },
      }}
    >
      <Card
        title="Media"
        size="small"
        extra={<Switch size="small"/>}
        cover={
          <img
            alt="example"
            src="https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
          />
        }
        bodyStyle={{ padding: "10px" }}
        style={{
          width: 200,
          padding: "1px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid#ADC0A7" : "none",

        }}
      >
        <Handle type="target" position={Position.Left} />
        <Title level={5} style={{ margin: "0px" }}>
          Header Title
        </Title>
        <Text type="secondary">Menu Middle Title</Text>
        <br />
        <Text type="secondary">Footer Title</Text>
        <Card
          bordered={false}
          style={{ backgroundColor: "#f5f5f5", borderRadius: 10 }}
          bodyStyle={{ padding: "5px" }}
        >
          <Title level={5} style={{ margin: "0px" }}>
            Title
          </Title>
          <Text>Lorem Ipsum is simply dummy text</Text>
          <Divider style={{ margin: "8px 0" }} />
          <Title level={5} style={{ margin: "0px" }}>
            Title
          </Title>
          <Text>Lorem Ipsum is simply dummy text</Text>
        </Card>
      </Card>
    </ConfigProvider>
  );
}
export default MediaNode;
