import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Layout,
  message,
  Radio,
  Row,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import { LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";

const props = {
  name: "file",
  multiple: true,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

function RichcardNodeSidebar() {
  const [loading] = useState(false);
  const [imageUrl] = useState();
  const [value, setValue] = useState("short");

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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
    <>
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
                    Rich Card
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
            <Form layout="vertical">
              <Form.Item
                label="Template Name"
                name={"Template Name"}
                style={{ marginBottom: "10px" }}
              >
                <Input placeholder="Template Name" />
              </Form.Item>
              <Form.Item label="Title" style={{ marginBottom: "10px" }}>
                <Input placeholder="Title" id="message" />
              </Form.Item>
              <Form.Item label="Description" style={{ marginBottom: "10px" }}>
                <TextArea
                 
                  size="small"
                  placeholder="Description"
                  rows={4}
                />
              </Form.Item>
              <Row>
                <Col md={24}>
                  <Form.Item
                    label="Media"
                    layout="vertical"
                    rules={[{ required: true, message: "Please select media" }]}
                  >
                    <Dragger {...props} style={{ height: "170px" }}>
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
                      {/* <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload
                      </p>
                      <p className="ant-upload-hint">
                        Support for a single or bulk upload. Strictly prohibited
                        from uploading company data or other banned files.
                      </p> */}
                    </Dragger>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col md={24}>
                  <Form.Item
                    label="Size"
                    rules={[{ required: true, message: "Select media height" }]}
                  >
                    <Radio.Group  onChange={onChange} value={value} style={{ width: "100%" }}>
                      <Space direction="vertical" style={{ width: "100%" }}>
                        <div
                          style={{
                            border: "1px solid #D9D9D9",
                            padding: "7px 7px",
                            borderRadius: "8px",
                            textAlign: "left",
                          }}
                        >
                          <Radio value="short">Short: 112 DP</Radio>
                        </div>
                        <div
                          style={{
                            border: "1px solid #D9D9D9",
                            padding: "7px 7px",
                            borderRadius: "8px",
                            textAlign: "left",
                          }}
                        >
                          <Radio value="medium">Medium: 168 DP</Radio>
                        </div>
                        <div
                          style={{
                            border: "1px solid #D9D9D9",
                            padding: "7px 7px",
                            borderRadius: "8px",
                            textAlign: "left",
                          }}
                        >
                          <Radio value="tall">Tall: 264 DP</Radio>
                        </div>
                      </Space>
                    </Radio.Group>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </ConfigProvider>
        </Sider>
      </Layout>
    </>
  );
}

export default RichcardNodeSidebar;
