/* eslint-disable react/prop-types */
import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Card, ConfigProvider, Switch, Typography } from "antd";

const TextNode = ({ data, selected }) => {
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
      <Card
        title="Send Message"
        extra={<Switch size="small"/>}
        size="small"
        bodyStyle={{ padding: "10px" }}
        style={{
          width: 200,
          padding: "0px",
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid#D1AFAF" : "none",
        }}
      >
        <Handle type="target" position={Position.Left} />
        <Typography.Text>{data.label}</Typography.Text>
      </Card>
    </ConfigProvider>
  );
};

export default TextNode;
