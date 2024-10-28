import React from "react";
// import { useDnD } from "./DnDContext";
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
    { id: 1, text: "Text", type: "Text", bgColor: "#F9D4D4" },
    { id: 2, text: "Text With Button", type: "button", bgColor: "#D6D8F7" },
    { id: 3, text: "Richcard", type: "richcard", bgColor: "#CEDFCC" },
    { id: 4, text: "Richcard carosal", type: "richcard_carosal", bgColor: "#EED2FA" },
    { id: 5, text: "Media", type: "media", bgColor: "#CACACA" },
  ];
  return (
    <Layout>
      <Sider
        width="305px"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover" }}
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
