import {
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  MessageOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Handle, Position } from "@xyflow/react";

import {
  Badge,
  Button,
  Card,
  ConfigProvider,
  Switch,
  Typography,
  Image as 
  Image,
  Flex,
  Space,
  Divider,
} from "antd";


import React, {  useState } from "react";
import { useSelector } from "react-redux";

function RichcardNode({ data, selected }) {
  const [enabled, setEnabled] = useState(true);
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  console.log("richcard node", nodes);

  const alldata = nodes.find((item) => item.id === id);

  const getCardStyle = () => {
    switch (alldata?.data?.size) {
      case "short":
        return {
          imageWidth: 80,
        };
      case "medium":
        return {
          imageWidth: 120,
        };
      case "tall":
        return {
          imageWidth: 180,
        };
      default:
        return {
          imageWidth: 120,
        };
    }
  };

  const cardStyle = getCardStyle();
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: { headerBg: "#d4dfd3", colorBorderSecondary: "#d4dfd3" },
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
        title={alldata?.data?.templateName || "Rich Card"}
        extra={ <Switch
          size="small"
          disabled
          checked={enabled}
          value={enabled}
          onChange={() => setEnabled(!enabled)}
        />}
        size="small"
        bodyStyle={{ padding: cardStyle.padding }}
        style={{
          width: 220,
          padding: "0px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid #d4dfd3" : "none",
          background: "rgba(255, 255, 255, 0.8)",
        }}
        
      >
        <Handle type="target" position={Position.Left} />

        <Flex
          style={{
            width: "100%",
            flexDirection: "column",
            background: "#fff",
            borderRadius: "1rem",
          }}
        >
          <Image
            style={{
              height: cardStyle.imageWidth,
              borderRadius: "8px 8px 8px 8px",
            }}
            src={
              alldata?.data?.mediaUrl ||
              "https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
            }
            alt="Media not found"
            preview={false}
          />

          <Space direction="vertical" style={{ gap: 5, padding: "1rem" }}>
            <Typography style={{ fontWeight: 600, fontSize: "1rem" }}>
              {alldata?.data?.label ?? "Richcard"}
            </Typography>
            <div
              style={{
                overflowWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{
                __html:
                  alldata?.data?.description?.replace(/\n/g, "<br/>") ||
                  "Description of the Card.",
              }}
            />

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
          </Space>
        </Flex>
      </Card>
    </ConfigProvider>
  );
}
export default RichcardNode;
