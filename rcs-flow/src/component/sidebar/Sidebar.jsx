import React from "react";
import { Card, Col, Layout, Row, Typography } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDnD } from "./DnDContext";
import image from "../../assets/footer-bg-1.png";

const { Sider } = Layout;
function Sidebar() {
  const [_, setType] = useDnD();
  const onDragStart = (event, nodeType) => {
    setType(nodeType);
    event.dataTransfer.effectAllowed = "move";
  };
  const cards = [
    { id: 1, text: "Text", type: "Text", bgColor: "#e5cccc" },
    { id: 2, text: "Text With Button", type: "button", bgColor: "#d4d5de" },
    { id: 3, text: "Richcard", type: "richcard", bgColor: "#d4dfd3" },
    { id: 4, text: "Richcard carosal", type: "richcard_carosal", bgColor: "#dbd3de" },
    { id: 5, text: "Media", type: "media", bgColor: "#dad7d7" },
  ];
  return (
    <Layout >
      <Sider
        width="305px"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", overflow:"auto",height:"99vh",scrollbarWidth:"none" }}
      >
        <Row gutter={[10, 10]}>
          {cards.map((card) => (
            <Col key={card.id} span={12}>
              <div
                draggable
                onDragStart={(event) => onDragStart(event, card.type)}
              >
                <Card
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    transition: "transform 0.2s",
                  }}
                  bodyStyle={{
                    backgroundColor: card.bgColor,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                  hoverable
                >
                  <Row justify={"center"}>
                    <PlusOutlined style={{ fontSize: "30px", color: "black" }} />
                  </Row>
                  <Row justify={"center"} gutter={[16, 24]} align="middle">
                    <Typography.Text
                      style={{ textAlign: "center", paddingTop: "10px" }}
                    >
                      {card.text}
                    </Typography.Text>
                  </Row>
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </Sider>
    </Layout>
  );
}
export default Sidebar;
