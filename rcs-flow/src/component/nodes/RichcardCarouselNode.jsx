// import {
//   CalendarOutlined,
//   EnvironmentOutlined,
//   LinkOutlined,
//   MessageOutlined,
//   PhoneOutlined,
// } from "@ant-design/icons";
// import { Handle, Position } from "@xyflow/react";
// import {
//   Badge,
//   Button,
//   Card,
//   ConfigProvider,
//   Image,
//   Switch,
//   Typography,
// } from "antd";
// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";

// function RichcardCarouselNode({ data, selected }) {
//   const id = data.id;
//   const nodes = useSelector((state) => state.nodes.nodes);
//   console.log("123", selected);

//   const alldata = nodes?.find((element) => element?.id == id);
//   console.log("isExistnode", alldata?.data?.richCardCarousels?.cards);

//   // const alldata =""

//   // console.log("rich card2 alldata", alldata.data.richCardCarousels);

//   useEffect(() => {}, [nodes]);

//   const getImageWidth = () => {
//     if (alldata?.data?.size === "short") {
//       return 80;
//     } else if (alldata?.data?.size === "medium") {
//       return 120;
//     } else if (alldata?.data?.size === "tall") {
//       return 180;
//     } else {
//       return 150;
//     }
//   };

//   return (
//     <ConfigProvider
//       theme={{
//         components: {
//           Card: {
//             headerBg: "#dbd3de",
//             colorBorderSecondary: "#796383",
//           },
//         },
//       }}
//     >
//       {alldata?.data?.isStartNode ? (
//         <Badge.Ribbon
//           text={<div className="flex justify-start m-1">Start</div>}
//           placement="start"
//           style={{ marginTop: -30 }}
//         >
//           <Card
//             title={data.templateName || "Rich Card Carousel"}
//             extra={<Switch size="small" />}
//             size="small"
//             bodyStyle={{ padding: "10px" }}
//             style={{
//               width: 200,
//               padding: "0px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               border: selected ? "1px solid #796383" : "none",
//             }}
//           >
//             <Handle type="target" position={Position.Left} />
//             <Typography.Text>
//               <strong>{data.label}</strong>
//             </Typography.Text>
//             <br />
//             <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
//               {data.description
//                 ? data.description.split("\n").map((line, index) => (
//                     <span key={index}>
//                       {line}
//                       <br />
//                     </span>
//                   ))
//                 : "No description available."}
//             </Typography.Text>
//             <Image
//               preview={false}
//               style={{width:"100%"}}
//               width={getImageWidth() + 0}
//               alt="example"
//               src={
//                 data.imageUrl ||
//                 "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
//               }
//             />
//             {alldata?.data?.actions?.length > 0 ? (
//               <>
//                 {alldata?.data?.actions?.map((btn, i) => (
//                   <Button
//                     key={i}
//                     size="small"
//                     block
//                     style={{
//                       background: "#adafce",
//                       color: "black",
//                       marginBottom: 5,
//                     }}
//                     icon={
//                       <>
//                         {btn?.type === "quick" && <MessageOutlined />}
//                         {btn?.type === "call" && <PhoneOutlined />}
//                         {btn?.type === "url" && <LinkOutlined />}
//                         {btn?.type === "location" && <EnvironmentOutlined />}
//                         {btn?.type === "calendar" && <CalendarOutlined />}
//                       </>
//                     }
//                   >
//                     {btn.type === "quick" && (
//                       <Handle
//                         type="source"
//                         position={Position.Right}
//                         isConnectable={true}
//                       />
//                     )}
//                     <Typography.Text>
//                       {btn?.title ?? "Deafult Button"}
//                     </Typography.Text>
//                   </Button>
//                 ))}
//               </>
//             ) : (
//               <Button
//                 size="small"
//                 block
//                 style={{ background: "#adafce", color: "black" }}
//               >
//                 <Handle
//                   type="source"
//                   position={Position.Right}
//                   isConnectable={true}
//                 />
//                 <Typography.Text>Deafult Button</Typography.Text>
//               </Button>
//             )}
//           </Card>
//         </Badge.Ribbon>
//       ) : (
//            alldata?.data?.richCardCarousels?.cards?.map((card, index) => (
//           <Card
//             key={index}
//             title={card.title || "Rich Card"}
//             size="small"
//             bodyStyle={{ padding: "10px" }}
//             style={{
//               width: 200,
//               padding: "0px",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
//               border: selected ? "1px solid #796383" : "none",
//               marginBottom: 10,
//             }}
//           >
//             <Typography.Text>
//               <strong>{card.title || "Card Label"}</strong>
//             </Typography.Text>
//             <br />
//             <Image
//               preview={false}
//               width={getImageWidth()}
//               alt="example"
//               src={
//                 card.imageUrl ||
//                 "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
//               }
//             />
//             {card.actions?.length > 0 ? (
//               card.actions.map((btn, i) => (
//                 <Button
//                   key={i}
//                   size="small"
//                   block
//                   style={{
//                     background: "#adafce",
//                     color: "black",
//                     marginBottom: 5,
//                   }}
//                   icon={
//                     <>
//                       {btn?.type === "quick" && <MessageOutlined />}
//                       {btn?.type === "call" && <PhoneOutlined />}
//                       {btn?.type === "url" && <LinkOutlined />}
//                       {btn?.type === "location" && <EnvironmentOutlined />}
//                       {btn?.type === "calendar" && <CalendarOutlined />}
//                     </>
//                   }
//                 >
//                   <Typography.Text>{btn?.title ?? "Default Button"}</Typography.Text>
//                 </Button>
//               ))
//             ) : (
//               <Button
//                 size="small"
//                 block
//                 style={{ background: "#adafce", color: "black" }}
//               >
//                 <Typography.Text>Default Button</Typography.Text>
//               </Button>
//             )}
//           </Card>
//         ))

//       )}
//     </ConfigProvider>
//   );
// }

// export default RichcardCarouselNode;

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
  Flex,
  Image,
  Typography,
} from "antd";
import React from "react";
import { useSelector } from "react-redux";

function RichcardCarouselNode({ data, selected }) {
  const id = data.id;
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes?.find((element) => element?.id === id);
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

  const getImageWidth = (size) => {
    if (size === "short") return 80;
    if (size === "medium") return 120;
    if (size === "tall") return 180;
    return 150;
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            headerBg: "#dbd3de",
            colorBorderSecondary: "#796383",
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
            title={alldata?.data?.templateName || "Default Card"}
            size="small"
            bodyStyle={{ padding: "10px" }}
            style={{
              width: 400,
              padding: "0px",
              marginBottom: "10px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              border: selected ? "1px solid #796383" : "none",
            }}
          >
            <Flex direction="column" align="center">
              {cardsToShow.map((card, index) => (
                <div key={index}>
                  <Handle type="target" position={Position.Left} />
                  <Typography.Text>
                    <strong>{card?.title || "Card Title"}</strong>
                  </Typography.Text>
                  <br />
                  <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
                    {card?.description
                      ? card?.description.split("\n").map((line, index) => (
                          <span key={index}>
                            {line}
                            <br />
                          </span>
                        ))
                      : "Card description"}
                  </Typography.Text>
                  <br />
                  <Image
                    preview={false}
                    width={getImageWidth(card.size)}
                    alt="example"
                    src={
                      card?.media ||
                      "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                    }
                  />
                  <div style={{ marginTop: 10 }}>
                    {card?.actions?.length > 0 ? (
                      card.actions.map((action, actionIndex) => (
                        <Button
                          key={actionIndex}
                          size="small"
                          block
                          style={{
                            background: "#adafce",
                            color: "black",
                            marginTop: 5,
                          }}
                          icon={
                            <>
                              {action?.type === "quick" && <MessageOutlined />}
                              {action?.type === "call" && <PhoneOutlined />}
                              {action?.type === "url" && <LinkOutlined />}
                              {action?.type === "location" && (
                                <EnvironmentOutlined />
                              )}
                              {action?.type === "calendar" && (
                                <CalendarOutlined />
                              )}
                            </>
                          }
                        >
                          {action.type === "quick" && (
                            <Handle
                              type="source"
                              position={Position.Right}
                              isConnectable={true}
                            />
                          )}
                          <Typography.Text>
                            {action?.title || "Default Action"}
                          </Typography.Text>
                        </Button>
                      ))
                    ) : (
                      <Button
                        size="small"
                        block
                        style={{
                          background: "#adafce",
                          color: "black",
                          marginTop: 5,
                        }}
                      >
                        <Handle
                          type="source"
                          position={Position.Right}
                          isConnectable={true}
                        />
                        <Typography.Text>Default Action</Typography.Text>
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </Flex>
          </Card>
        </Badge.Ribbon>
      ) : (
        <Card
          title={alldata?.data?.templateName || "Default Card"}
          size="small"
          bodyStyle={{ padding: "10px" }}
          style={{
            width: 400,
            padding: "0px",
            marginBottom: "10px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            border: selected ? "1px solid #796383" : "none",
          }}
        >
          <Flex direction="column" align="center">
            {cardsToShow.map((card, index) => (
              <div key={index}>
                <Handle type="target" position={Position.Left} />
                <Typography.Text>
                  <strong>{card?.title || "Card Title"}</strong>
                </Typography.Text>
                <br />
                <Typography.Text style={{ whiteSpace: "pre-wrap" }}>
                  {card?.description
                    ? card?.description.split("\n").map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))
                    : "Card description"}
                </Typography.Text>
                <br />
                <Image
                  preview={false}
                  width={getImageWidth(card.size)}
                  alt="example"
                  src={
                    card?.media ||
                    "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630"
                  }
                />
                <div style={{ marginTop: 10 }}>
                  {card?.actions?.length > 0 ? (
                    card.actions.map((action, actionIndex) => (
                      <Button
                        key={actionIndex}
                        size="small"
                        block
                        style={{
                          background: "#adafce",
                          color: "black",
                          marginTop: 5,
                        }}
                        icon={
                          <>
                            {action?.type === "quick" && <MessageOutlined />}
                            {action?.type === "call" && <PhoneOutlined />}
                            {action?.type === "url" && <LinkOutlined />}
                            {action?.type === "location" && (
                              <EnvironmentOutlined />
                            )}
                            {action?.type === "calendar" && (
                              <CalendarOutlined />
                            )}
                          </>
                        }
                      >
                        {action.type === "quick" && (
                          <Handle
                            type="source"
                            position={Position.Right}
                            isConnectable={true}
                          />
                        )}
                        <Typography.Text>
                          {action?.title || "Default Action"}
                        </Typography.Text>
                      </Button>
                    ))
                  ) : (
                    <Button
                      size="small"
                      block
                      style={{
                        background: "#adafce",
                        color: "black",
                        marginTop: 5,
                      }}
                    >
                      <Handle
                        type="source"
                        position={Position.Right}
                        isConnectable={true}
                      />
                      <Typography.Text>Default Action</Typography.Text>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </Flex>
        </Card>
      )}
    </ConfigProvider>
  );
}

export default RichcardCarouselNode;
