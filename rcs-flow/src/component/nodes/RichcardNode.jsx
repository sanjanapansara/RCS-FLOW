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

function RichcardNode({ data, selected }) {
  console.log(data);

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
          {/* <Typography.Text>{data.label}</Typography.Text><br/> */}
          <Typography.Text>
            <strong>{data.label}</strong>
          </Typography.Text>
          <br />
          <Typography.Text>{data.description}</Typography.Text>
          <img
            style={{ width: "100%" }}
            alt="example"
            src={
              data.imageUrl ||
              "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
            }
          />
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
      </Badge.Ribbon>
    </ConfigProvider>
  );
}

export default RichcardNode;
