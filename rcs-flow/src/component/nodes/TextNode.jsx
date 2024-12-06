import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Badge, Card, ConfigProvider, Switch, Typography } from "antd";
import { useSelector } from "react-redux";

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
            colorBorderSecondary: "#cc9999",
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
                
                checked={enabled}
                value={enabled}
                onChange={(value) => setEnabled(value)}
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
              {alldata?.data?.isStartNode ? (
              <Handle
                type={alldata?.data?.isStartNode ? "source" : "target"}
                position={
                   Position.Left
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
                    position={Position.Left}
                    isConnectable={true}
                  />
                )}
              </>
            )}
            <center>
            <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
              {data.label
                ? data.label.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : "No label available."}
            </Typography.Text>
            </center>
          </Card>     
    </ConfigProvider>
  );
};
export default TextNode;
