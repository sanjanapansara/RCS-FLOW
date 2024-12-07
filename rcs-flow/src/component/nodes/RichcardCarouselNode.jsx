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
          height: 160,
          fontSize: 16,
          description: 12,
          padding: 12,
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
          width: getImageWidth(),
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
        <Flex Direction="column" alignItems="center" gap={7} >
          {cardsToShow.map((card, index) => {
            const cardStyle = getCardStyle(card.size);
            return (
              <>
                <Handle type="target" position={Position.Left} />
                <Flex
                  style={{
                    width: "50%",
                    flexDirection: "column",
                    background: "#fff",
                    borderRadius: "1rem",
                  }}
                >
                  <Image
                    style={{
                      marginBottom: "10px",
                      borderRadius: "4px",
                    }}
                    preview={false}
                    height={cardStyle.imageWidth}
                    alt="example"
                    src={
                      alldata?.data?.mediaUrl ||
                      "https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
                    }
                  />

                  <Space
                    direction="vertical"
                    style={{ gap: 5, padding: "1rem" }}
                  >
                    <Typography style={{ fontWeight: 600, fontSize: "1rem" }}>
                      {card?.title || "Card Title"}
                    </Typography>
                    <div
                      style={{
                        overflowWrap: "break-word",
                      }}
                      dangerouslySetInnerHTML={{
                        __html:
                          card?.description?.replace(/\n/g, "<br/>") ||
                          "Description of the Card.",
                      }}
                    />

                    {card?.actions?.length > 0 ? (
                      card.actions.map((action, actionIndex) => (
                        <>
                          <Divider style={{ margin: "0px" }} />
                          <Button key={actionIndex} size="small" type="text" block>
                            {action?.type === "quick" && (
                              <Handle
                                type="source"
                                position={Position.Right}
                                isConnectable={true}
                              />
                            )}

                            {action.type === "quick" && (
                              <Typography.Text href={action?.url} strong>
                                <MessageOutlined /> {action?.title}
                              </Typography.Text>
                            )}

                            {action.type === "call" && (
                              <Typography.Text href={action?.url} strong>
                                <PhoneOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "url" && (
                              <Typography.Text href={action?.url} strong>
                                <LinkOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "location" && (
                              <Typography.Text href={action?.url} strong>
                                <EnvironmentOutlined /> {action?.title}
                              </Typography.Text>
                            )}
                            {action.type === "calendar" && (
                              <Typography.Text href={action?.url} strong>
                                <CalendarOutlined /> {action?.title}
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
              </>

              // <Card
              //   key={index}
              //   bodyStyle={{ padding: "10px" }}
              //   style={{
              //     width: getImageWidth(),
              //   }}
              //   cover={
              //     <Image
              //       style={{
              //         marginBottom: "10px",
              //         borderRadius: "4px",
              //       }}
              //       preview={false}
              //   height={cardStyle.imageWidth}
              //       alt="example"
              //       src={
              //         alldata?.data?.mediaUrl ||
              //         "https://dash-bootstrap-components.opensource.faculty.ai/static/images/placeholder286x180.png"
              //       }
              //     />
              //   }
              // >
              //   <Meta
              //     title={card?.title || "Card Title"}
              //     description={
              //       card?.description
              //         ? card.description.split("\n").map((line, idx) => (
              //             <span key={idx}>
              //               {line}
              //               <br />
              //             </span>
              //           ))
              //         : "Card description"
              //     }
              //   />
              //   <br />
              //   <div
              //     style={{
              //       display: "flex",
              //       flexDirection: "column",
              //       alignItems: "center",
              //       gap: "8px",
              //       width: "100%",
              //     }}
              //   >
              //     {card?.actions?.length > 0 ? (
              //       card.actions.map((action, actionIndex) => (
              //         <>
              //           <Divider style={{ margin: "0px" }} />
              //           <Button
              //             key={actionIndex}
              //             type="text"
              //             size="small"

              //             // icon={
              //             //   {
              //             //     quick: <MessageOutlined />,
              //             //     call: <PhoneOutlined />,
              //             //     url: <LinkOutlined />,
              //             //     location: <EnvironmentOutlined />,
              //             //     calendar: <CalendarOutlined />,
              //             //   }[action?.type]
              //             // }
              //           >
              //             {action.type === "quick" && (
              //               <Handle
              //                 type="source"
              //                 position={Position.Right}
              //                 isConnectable={true}
              //               />
              //             )}
              //             {action.type === "quick" && (
              //               <Typography.Text href={action?.url} strong>
              //                 <MessageOutlined /> {action?.title}
              //               </Typography.Text>
              //             )}

              //             {action.type === "call" && (
              //               <Typography.Text href={action?.url} strong>
              //                 <PhoneOutlined /> {action?.title}
              //               </Typography.Text>
              //             )}
              //             {action.type === "url" && (
              //               <Typography.Text href={action?.url} strong>
              //                 <LinkOutlined /> {action?.title}
              //               </Typography.Text>
              //             )}
              //             {action.type === "location" && (
              //               <Typography.Text href={action?.url} strong>
              //                 <EnvironmentOutlined /> {action?.title}
              //               </Typography.Text>
              //             )}
              //             {action.type === "calendar" && (
              //               <Typography.Text href={action?.url} strong>
              //                 <CalendarOutlined /> {action?.title}
              //               </Typography.Text>
              //             )}
              //           </Button>
              //         </>
              //       ))
              //     ) : (
              //       <>
              //       <Divider style={{ margin: "0px" }} />
              //       <Button size="small" type="text" >
              //         <Handle
              //           type="source"
              //           position={Position.Right}
              //           isConnectable={true}
              //         />
              //         <Typography.Text strong>
              //           <MessageOutlined />
              //           Default Button
              //         </Typography.Text>
              //       </Button>
              //     </>
              //     )}
              //   </div>
              // </Card>

              // <div
              //   key={index}
              //   style={{
              //     display: "flex",
              //     flexDirection: "column",
              //     alignItems: "center",
              //     width:getImageWidth(),
              //     border: "1px solid #d9d9d9",
              //     borderRadius: "8px",
              //     padding: "15px",
              //     backgroundColor: "#f9f9f9",
              //   }}
              // >
              //   <Handle type="target" position={Position.Left} />
              //   <Typography.Title
              //     level={5}
              //     style={{ margin: "0 0 10px", textAlign: "center", }}
              //   >
              //     {card?.title || "Card Title"}
              //   </Typography.Title>

              //   <Typography.Text
              //     style={{
              //       textAlign: "center",
              //       whiteSpace: "pre-wrap",
              //       marginBottom: "10px",
              //     }}
              //   >
              //     {card?.description
              //       ? card.description.split("\n").map((line, idx) => (
              //           <span key={idx}>
              //             {line}
              //             <br />
              //           </span>
              //         ))
              //       : "Card description"}
              //   </Typography.Text>

              //   <Image
              //     preview={false}
              //     width={cardStyle.imageWidth}
              //     alt="example"
              //     src={
              //       card?.media ||
              //       "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
              //     }
              //     style={{
              //       marginBottom: "10px",
              //       borderRadius: "4px",
              //     }}
              //   />

              //   <div
              //     style={{
              //       display: "flex",
              //       flexDirection: "column",
              //       alignItems: "center",
              //       gap: "8px",
              //       width: "100%",
              //     }}
              //   >
              //     {card?.actions?.length > 0 ? (
              //       card.actions.map((action, actionIndex) => (
              //         <Button
              //           key={actionIndex}
              //           size="small"
              //           style={{
              //             background: "#adafce",
              //             color: "black",
              //             width: "100%",
              //           }}
              //           icon={
              //             {
              //               quick: <MessageOutlined />,
              //               call: <PhoneOutlined />,
              //               url: <LinkOutlined />,
              //               location: <EnvironmentOutlined />,
              //               calendar: <CalendarOutlined />,
              //             }[action?.type]
              //           }
              //         >
              //           {action.type === "quick" && (
              //             <Handle
              //               type="source"
              //               position={Position.Right}
              //               isConnectable={true}
              //             />
              //           )}
              //           {action?.title || "Default Action"}
              //         </Button>
              //       ))
              //     ) : (
              //       <Button
              //         size="small"
              //         style={{
              //           background: "#adafce",
              //           color: "black",
              //           width: "100%",
              //         }}
              //       >
              //         <Handle
              //           type="source"
              //           position={Position.Right}
              //           isConnectable={true}
              //         />
              //         Default Action
              //       </Button>
              //     )}
              //   </div>
              // </div>
            );
          })}
        </Flex>
      </Card>
    </ConfigProvider>
  );
}

export default RichcardCarouselNode;
