/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Handle, Position } from "@xyflow/react";
import { Badge, Button, Card, ConfigProvider, Divider, Switch, Typography } from "antd";
import { useSelector } from "react-redux";
import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
const ButtonNode = ({ data, selected }) => {
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === id);
  const [enabled, setEnabled] = useState(true);
  console.log("setEnabled", nodes);

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#8f91a8",
            // colorBorderSecondary: "#8f91a8",
          },
        },
      }}
    >
      {alldata?.data?.isStartNode || data.isStartNode ? (
        <Badge.Ribbon
          text={<div className="flex justify-start m-1">Start</div>}
          placement="start"
          style={{ marginTop: -30 }}
        >
          <Card
            title={alldata?.data?.templateName || "Send Button template"}
            extra={
              <Switch
                size="small"
                disabled={
                  true
                }
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
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              border: selected ? "1px solid #8f91a8" : "none",
              background: "rgba(255, 255, 255, 0.8)", 
            }}
          >
            <Card
          bodyStyle={{ padding: "10px" }}
          
        >
          <Meta
            title=""
            
            description={
              <Typography.Text >{
              alldata?.data.label
                ? alldata?.data.label.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : data.label}
                </Typography.Text>
            }
          /><br/>
            {alldata?.data?.actions?.length > 0 ? (
              alldata.data.actions.map((btn, i) => (
                <>
                  <Divider style={{ margin: "0px" }} />
                  <Button key={i} size="small" block type="text">
                    {btn?.type === "quick" && (
                      <Handle
                        type="source"
                        position={Position.Right}
                        isConnectable={true}
                      />
                    )}

                    {btn.type === "quick" && (
                      <Typography.Text href={btn?.url} strong>
                        <MessageOutlined /> {btn?.title}
                      </Typography.Text>
                    )}

                    {btn.type === "call" && (
                      <Typography.Text href={btn?.url} strong>
                        <PhoneOutlined /> {btn?.title}
                      </Typography.Text>
                    )}
                    {btn.type === "url" && (
                      <Typography.Text href={btn?.url} strong>
                        <LinkOutlined /> {btn?.title}
                      </Typography.Text>
                    )}
                    {btn.type === "location" && (
                      <Typography.Text href={btn?.url} strong>
                        <EnvironmentOutlined /> {btn?.title}
                      </Typography.Text>
                    )}
                    {btn.type === "calendar" && (
                      <Typography.Text href={btn?.url} strong>
                        <CalendarOutlined /> {btn?.title}
                      </Typography.Text>
                    )}
                  </Button>
                </>
              ))
            ) : (
              <>
                <Divider style={{ margin: "0px" }} />
                <Button size="small" type="text" block>
                  <Handle
                    type="source"
                    position={Position.Right}
                    isConnectable={true}
                  />
                  <Typography.Text strong>
                    <MessageOutlined />
                    Default Button
                  </Typography.Text>
                </Button>
              </>
            )}
        </Card>
            {/* <div
              style={{ display: "flex", flexDirection: "column" }}
              dangerouslySetInnerHTML={{
                __html:
                  alldata?.data?.label?.replace(/\n/g, "<br/>") || data.label,
              }}
            /> */}

            {/* {alldata?.data?.actions?.length > 0 ? (
              <>
                {alldata?.data?.actions?.map((btn, i) => (
                  <Button
                    key={i}
                    size="small"
                    block
                    style={{
                      background: "#adafce",
                      color: "black",
                      marginBottom: 5,
                    }}
                    icon={
                      <>
                        {btn?.type === "quick" && <MessageOutlined />}
                        {btn?.type === "call" && <PhoneOutlined />}
                        {btn?.type === "url" && <LinkOutlined />}
                        {btn?.type === "location" && <EnvironmentOutlined />}
                        {btn?.type === "calendar" && <CalendarOutlined />}
                      </>
                    }
                  >
                    {btn.type === "quick" && (
                      <Handle
                        type="source"
                        position={Position.Right}
                        isConnectable={true}
                      />
                    )}
                    <Typography.Text>
                      {btn?.title ?? "Deafult Button"}
                    </Typography.Text>
                  </Button>
                ))}
              </>
            ) : (
              <Button
                size="small"
                block
                style={{ background: "#adafce", color: "black" }}
              >
                <Handle
                  type="source"
                  position={Position.Right}
                  isConnectable={true}
                />
                <Typography.Text>Deafult Button</Typography.Text>
              </Button>
            )} */}
          </Card>
        </Badge.Ribbon>
      ) : (
        <Card
          title={alldata?.data?.templateName ?? "Send Button Message"}
          extra={
            <Switch
              size="small"
              disabled={alldata?.data?.isStartNode && true}
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
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #ADB3E8" : "none",
            background: "rgba(255, 255, 255, 0.8)", 
          }}
        >
          {enabled && (
            <Handle
              type="target"
              position={Position.Left}
              isConnectable={true}
            />
          )}

<Card
          bodyStyle={{ padding: "10px" }}
          
        >
          <Meta
            title=""
            
            description={
              <Typography.Text >{
              alldata?.data.label
                ? alldata?.data.label.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : data.label}
                </Typography.Text>
            }
          /><br/>
           {alldata?.data?.actions?.length > 0 ? (
              <>
                {alldata?.data?.actions?.map((btn, i) => (
                  <Button
                    key={i}
                    size="small"
                    block
                    style={{
                      background: "#adafce",
                      color: "black",
                      marginBottom: 5,
                    }}
                    icon={
                      <>
                        {btn?.type === "quick" && <MessageOutlined />}
                        {btn?.type === "call" && <PhoneOutlined />}
                        {btn?.type === "url" && <LinkOutlined />}
                        {btn?.type === "location" && <EnvironmentOutlined />}
                        {btn?.type === "calendar" && <CalendarOutlined />}
                      </>
                    }
                  >
                    {btn.type === "quick" && (
                      <Handle
                        type="source"
                        position={Position.Right}
                        isConnectable={true}
                      />
                    )}
                    <Typography.Text>
                      {btn?.title ?? "Deafult Button"}
                    </Typography.Text>
                  </Button>
                ))}
              </>
            ) : (
              <Button
                size="small"
                block
                style={{ background: "#adafce", color: "black" }}
              >
                <Handle
                  type="source"
                  position={Position.Right}
                  isConnectable={true}
                />
                <Typography.Text>Deafult Button</Typography.Text>
              </Button>
            )}
        </Card>
        </Card>
      )}
    </ConfigProvider>
  );
};
export default ButtonNode;
