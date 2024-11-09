/* eslint-disable react/prop-types */
import React from "react";
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
const ButtonNode = ({ data, selected }) => {
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
          title={data.templateName || "Send Button Message"}
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
};
export default ButtonNode;
