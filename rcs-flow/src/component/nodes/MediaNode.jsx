import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Switch } from "antd";
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
            headerBg: !enabled ? "#f0f0f0" :"#CACACA",
            colorBorderSecondary: "#ADC0A7",
          },
        },
      }}
    >
      {alldata?.data?.isStartNode ? (
        <Badge.Ribbon
          text={<div className="flex justify-start m-1">Start</div>}
          placement="start"
          style={{ marginTop: -30 }}
        >
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
            cover={
              <img
                alt="example"
                src={
                  alldata?.data?.mediaUrl ??
                   "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                }
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
            <div
              style={{ display: "flex", flexDirection: "column" }}
              dangerouslySetInnerHTML={{
                __html:
                  alldata?.data?.label?.replace(/\n/g, "<br/>") || "message",
              }}
            />
          </Card>
        </Badge.Ribbon>
      ) : (
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
          cover={
            <img
              alt="example"
              src={
                alldata?.data?.mediaUrl ??
                "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              }
            />
          }
          bodyStyle={{ padding: "10px" }}
          style={{
            width: 200,
            padding: "1px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #ADC0A7" : "none",
            backgroundColor: !enabled ? "#f0f0f0" : "white",
            color: !enabled ? "#aaa" : "black",
          }}
        >
          {enabled && (
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={true}
            />
          )}
          <div
            style={{ display: "flex", flexDirection: "column" }}
            dangerouslySetInnerHTML={{
              __html:
                alldata?.data?.label?.replace(/\n/g, "<br/>") || "message",
            }}
          />
        </Card>
      )}
    </ConfigProvider>
  );
}
export default MediaNode;
