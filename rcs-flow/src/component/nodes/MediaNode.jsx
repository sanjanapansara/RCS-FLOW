import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Image, Switch, Typography } from "antd";
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              border: selected ? "1px solid#CACACA" : "none",
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
              // dangerouslySetInnerHTML={{
              //   __html:
              //     alldata?.data?.label?.replace(/\n/g, "<br/>") || "message",
              // }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  // width: "100%",
                  border: "1px solid #d9d9d9",
                  borderRadius: "8px",
                  padding: "15px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <Image
                  preview={false}
                  alt="example"
                  src={
                    alldata?.data?.mediaUrl ||
                    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                  }
                  style={{
                    marginBottom: "10px",
                    borderRadius: "4px",
                    width: "100%" 
                  }}
                />
                <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
            {alldata?.data?.label
              ? alldata?.data?.label.split("\n").map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))
              : "No description available."}
          </Typography.Text>
              </div>
            </div>
          </Card>
       
     
    </ConfigProvider>
  );
}
export default MediaNode;
