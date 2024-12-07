import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Image, Switch, Typography } from "antd";
import Meta from "antd/es/card/Meta";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function MediaNode({ data, selected }) {
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === id);
  const [enabled, setEnabled] = useState(true);

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: !enabled ? "#f0f0f0" : "#CACACA",
            colorBorderSecondary: "#CACACA",
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
        title={alldata?.data?.templateName ?? "Media"}
        size="small"
        extra={
          <Switch
            size="small"
            disabled={alldata?.data?.isStartNode && true}
            checked={enabled}
            value={enabled}
            onChange={(value) => setEnabled(value)}
          />
        }
        bodyStyle={{ padding: "10px" }}
        style={{
          width: 200,
          padding: "0px",
          borderRadius: 10,
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid #CACACA" : "none",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {alldata?.data?.isStartNode ? (
          <Handle
            type={alldata?.data?.isStartNode ? "source" : "target"}
            position={
              alldata?.data?.isStartNode ? Position.Right : Position.Left
            }
            isConnectable={true}
          />
        ) : (
          <>
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={true}
            />
            {!enabled && (
              <Handle
                type="source"
                position={Position.Right}
                isConnectable={true}
              />
            )}
          </>
        )}
        <Card
          bodyStyle={{ padding: "10px" }}
          cover={
            <Image
              style={{
                marginBottom: "10px",
                borderRadius: "4px",
              }}
              preview={false}
              alt="example"
              src={
                alldata?.data?.mediaUrl ||
                "https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
              }
            />
          }
        >
          <Meta
            title={
              alldata?.data?.label
                ? alldata?.data?.label.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : "No description available."
            }
            description=""
          />
        </Card>
      </Card>
    </ConfigProvider>
  );
}
export default MediaNode;
