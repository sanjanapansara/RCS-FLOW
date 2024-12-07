import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Switch, Typography } from "antd";
import { useSelector } from "react-redux";
import Meta from "antd/es/card/Meta";

const TextNode = ({ data, selected }) => {
  const [enabled, setEnabled] = useState(true);
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === id);
  console.log("alldata", alldata);
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#e5cccc",
          },
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
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Handle type="target" position={Position.Left} isConnectable={true} />

        <Card bodyStyle={{ padding: "10px" }}>
          <Meta
            title=""
            description={
              <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
                {data.label
                  ? data.label.split("\n").map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        <br />
                      </React.Fragment>
                    ))
                  : "No label available."}
              </Typography.Text>
            }
          />
        </Card>
      </Card>
    </ConfigProvider>
  );
};
export default TextNode;
