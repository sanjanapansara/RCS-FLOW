import { Card, Flex, Row, Typography } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import React from "react";

function SideBarHeader({ setSelectedNode, title }) {
  return (
    <>
      <Row>
        <Card
          bodyStyle={{ padding: 5 }}
          style={{ width: "100%" }}
          bordered={false}
        >
          <Row align="middle">
            <Flex align="center" gap={20}>
              <LeftOutlined onClick={() => setSelectedNode(null)} />
              <Typography.Title level={5} style={{ margin: "0px" }}>
                {" "}
                {title}
              </Typography.Title>
            </Flex>
          </Row>
        </Card>
      </Row>
    </>
  );
}

export default SideBarHeader;
