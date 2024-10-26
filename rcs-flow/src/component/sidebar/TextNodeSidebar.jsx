/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
  Card,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Layout,
  Row,
  Tag,
  Typography,
  Upload,
} from "antd";
import { LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
const { Sider } = Layout;
const TextNodeSidebar = ({ node }) => {
  const [form] = Form.useForm();
  const { Dragger } = Upload;
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
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
                <LeftOutlined />
                <Typography.Title level={5} style={{ margin: "0px" }}>
                  {" "}
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
              <Input placeholder="Enter Template Name" />
            </Form.Item>
            <Form.Item
              label={
                <>
                  Media{" "}
                  <Typography.Text type="secondary">(Optional)</Typography.Text>
                </>
              }
              required={false}
            >
              <Dragger>
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
              <TextArea rows={4} placeholder="Enter Message" />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Sider>
    </Layout>
  );
};
export default TextNodeSidebar;
