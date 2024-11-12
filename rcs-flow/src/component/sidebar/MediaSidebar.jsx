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
  Upload,
} from "antd";
import {  LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import SideBarHeader from "./SideBarHeader";
const { Sider } = Layout;
const MediaSidebar = ({ node, updateNodeData, setSelectedNode, title }) => {
  console.log("node", node);
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const [tempaltename, setTemplateName] = useState(
    node?.data?.templateName || ""
  );
  const [messagename, setMessageName] = useState(node?.data?.label || "");
  const [imageUrl, setImageUrl] = useState(node?.data?.imageUrl || "");
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
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

  const handleImageUpload = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(newImageUrl);
      setLoading(false);
      updateNodeData(node.id, { imageUrl: newImageUrl });
    }
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
                  {" "}
                  Media
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
                value={tempaltename}
                onChange={handleTemplateNameChange}
              />
            </Form.Item>
            <Form.Item label="Media" required>
              <Dragger
                showUploadList={false}
                customRequest={({ onSuccess }) => {
                  setTimeout(() => onSuccess("ok"), 0);
                }}
                onChange={handleImageUpload}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Dragger>
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
export default MediaSidebar;
