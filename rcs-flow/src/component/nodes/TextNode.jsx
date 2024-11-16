import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Switch, Typography } from "antd";

const TextNode = ({ data, selected }) => {
  const [enabled, setEnabled] = useState(false);
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#cc9999",
            colorBorderSecondary: "#cc9999",
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
          title={data?.templateName ?? "Send Message"}
          extra={
            <Switch
              size="small"
              disabled
              checked={enabled}
              value={enabled}
              onChange={() => setEnabled(!enabled)}
            />
          }
          size="small"
          bodyStyle={{ padding: "10px" }}
          style={{
            width: 200,
            padding: "0px",
            borderRadius: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #D1AFAF" : "none",
          }}
        >
          <Handle type="target" position={Position.Left} />
          {/* <Handle type="target" position={Position.Right} /> */}
          <Typography.Text>{data?.label}</Typography.Text>
        </Card>
      </Badge.Ribbon>
    </ConfigProvider>
  );
};
export default TextNode;
