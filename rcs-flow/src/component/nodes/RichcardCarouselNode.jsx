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
  Divider,
  Flex,
  Image,
  Space,
  Switch,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";
const { Meta } = Card;
function RichcardCarouselNode({ data, selected }) {
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes?.find((element) => element?.id === id);
  console.log("alldata", alldata);
  const defaultCards = [
    {
      title: "Card Title",
      description: "Card description",
      imageUrl: "",
      actions: [],
    },
    {
      title: "Card Title",
      description: "Card description",
      imageUrl: "",
      actions: [],
    },
  ];

  const cardsToShow =
    alldata?.data?.richCardCarousels?.cards?.length > 0
      ? alldata?.data?.richCardCarousels?.cards
      : defaultCards;

  const getImageWidth = () => {
    if (alldata?.data?.cardWidth == "0") return 400;
    if (alldata?.data?.cardWidth == "1") return 500;
    return 400;
  };

  const getCardStyle = (size) => {
    switch (size) {
      case "short":
        return {
          imageWidth: 100,
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
  console.log("card size-->", cardsToShow);

  // const cardStyle = getCardStyle();

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#dbd3de",
            // colorBorderSecondary: "#796383",
          },
        },
      }}
    >
      <Card
        title={alldata?.data?.templateName || "Richcard Carousels"}
        size="small"
        extra={<Switch size="small" value={true} />}
        bodyStyle={{ padding: "15px" }}
        style={{
          padding: "0px",
          marginBottom: "10px",
          boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
          border: selected ? "1px solid #dbd3de" : "none",
          background: "rgba(255, 255, 255, 0.8)",
        }}
      >
        {alldata?.data?.isStartNode && (
          <Badge.Ribbon
            text={<div className="flex justify-start m-1">Start</div>}
            placement="start"
            style={{ marginTop: -30 }}
          />
        )}
        <Flex Direction="column" alignItems="center" gap={7}>
          {cardsToShow.map((card, index) => {
            const cardStyle = getCardStyle(card.size);
            return (
              <>
                <Handle type="target" position={Position.Left} />
                <Flex
                  vertical
                  gap={12}
                  style={{
                    width: "50%",
                    background: "#fff",
                    borderRadius: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    paddingTop: "10px",
                  }}
                >
                  <div
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <Image
                      style={{
                        borderRadius: "4px",
                        objectFit: "cover",
                        height:
                          card?.size === "short"
                            ? "100px"
                            : card?.size === "tall"
                            ? "150px"
                            : "120px",

                        width: "10vw",
                      }}
                      preview={false}
                      alt="example"
                      src={
                        card?.media ||
                        "https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
                      }
                    />
                    <Typography
                      style={{
                        fontWeight: 600,
                        fontSize: "1rem",
                        marginTop: "10px",
                        alignSelf:"flex-start",
                        width: "10vw",
                      }}
                    >
                      {card?.title || "Card Title"}
                    </Typography>
                    <Typography
                      style={{
                        // marginTop: "5px",
                        // textAlign: "center",
                        width: "10vw",
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          card?.description?.replace(/\n/g, "<br/>") ||
                          "Description of the Card.",
                      }}
                    >
                      </Typography>
                  </div>
                  <div
                    style={{
                      marginTop: "auto",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "stretch",
                    }}
                  >
                    {card?.actions?.length > 0 ? (
                      card.actions.map((action, actionIndex) => (
                        <div key={actionIndex}>
                          <Divider
                            style={{
                              margin: 0,
                              width: "100%",
                            }}
                          />
                          <Button
                            key={actionIndex}
                            size="small"
                            type="text"
                            block
                          >
                            {action?.type === "quick" && (
                              <Handle
                                type="source"
                                position={Position.Right}
                                isConnectable={true}
                              />
                            )}
                            {action.type === "quick" && (
                              <Typography.Text strong>
                                <MessageOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "call" && (
                              <Typography.Text strong>
                                <PhoneOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "url" && (
                              <Typography.Text strong>
                                <LinkOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "location" && (
                              <Typography.Text strong>
                                <EnvironmentOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "calendar" && (
                              <Typography.Text strong>
                                <CalendarOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                          </Button>
                          {/* </Divider> */}
                        </div>
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
                  </div>
                </Flex>
              </>
            );
          })}
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

export default RichcardCarouselNode;
