import React, { useState } from "react";
import {
  Card,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import SideBarHeader from "./SideBarHeader";
const { Sider } = Layout;
const TextNodeSidebar = ({ node, updateNodeData, setSelectedNode, title }) => {
  const [form] = Form.useForm();
  const [templateName, setTemplateName] = useState(
    node?.data?.templateName || ""
  );
  const [messagename, setMessageName] = useState(node?.data?.label || "");

  const handleTemplateNameChange = (e) => {
    const newTemplateName = e.target.value;
    setTemplateName(newTemplateName);
    updateNodeData(node.id, { templateName: newTemplateName });
  };

  const handleMessageNameChange = (e) => {
    const MessageName = e.target.value;
    setMessageName(MessageName);
    updateNodeData(node.id, { label: MessageName });
  };

  return (
    <Layout>
      <Sider width="305px">
        <Row>
          <Card
            bodyStyle={{ padding: 5 }}
            style={{ width: "100%" }}
            bordered={false}
          >
            <Row align="middle">
              <Flex align="center" gap={20}>
                <SideBarHeader
                  setSelectedNode={setSelectedNode}
                  title={title}
                />
                <Typography.Title level={5} style={{ margin: "0px" }}>
                  {""}
                  Text
                </Typography.Title>
              </Flex>
            </Row>
          </Card>
        </Row>
        <br />
        <ConfigProvider
          theme={{
            components: {
              Form: {
                verticalLabelPadding: "0 0 3px",
                itemMarginBottom: 5,
              },
            },
          }}
        >
          <Form form={form} layout="vertical">
            <Form.Item label="Template Name">
              <Input
                placeholder="Enter Template Name"
                value={templateName}
                onChange={handleTemplateNameChange}
              />
            </Form.Item>
            <Form.Item label="Message">
              <TextArea
                rows={4}
                placeholder="Enter Message"
                value={messagename}
                onChange={handleMessageNameChange}
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Sider>
    </Layout>
  );
};

export default TextNodeSidebar;
