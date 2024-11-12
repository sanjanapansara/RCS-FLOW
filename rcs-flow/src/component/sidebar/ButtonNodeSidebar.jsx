import React, { useState } from "react";
import {
  Input,
  Button,
  Layout,
  Row,
  Card,
  Flex,
  Typography,
  ConfigProvider,
  Form,
  Upload,
  Col,
  Select,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import SideBarHeader from "./SideBarHeader";
const { Sider } = Layout;

const ButtonNodeSidebar = ({ node, updateNodeData,setSelectedNode,title}) => {
  console.log("node", node);
  const [form] = Form.useForm();
  const [templateName, setTemplateName] = useState(
    node?.data?.templateName || ""
  );
  const [meesagename, setMessageName] = useState(node?.data?.label || "");
  const [data, setData] = useState({
    actions: [
      {
        id: 0,
        type: "quick",
        title: "",
        payload: "",
      },
    ],
  });

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

  const handleChange = (index, key, value) => {
    setData((prev) => {
      const actions = [...prev.actions];
      actions[index] = { ...actions[index], [key]: value };
      return { ...prev, actions };
    });
  };
  const addNewCard = () => {
    if (data.actions.length < 11) {
      setData((prev) => ({
        ...prev,
        actions: [
          ...prev.actions,
          {
            id: prev.actions.length,
            type: "quick",
            title: "",
            payload: "",
          },
        ],
      }));
    } else {
      message.warning("Cannot add more than 11 buttons");
    }
  };

  const deleteCard = (index) => {
    setData((prev) => ({
      ...prev,
      actions: prev.actions.filter(
        (_, i) => i !== index || prev.actions[i].id === 0
      ),
    }));
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
              <SideBarHeader setSelectedNode={setSelectedNode} title={title} />
                <Typography.Title level={5} style={{ margin: "0px" }}>
                  {" "}
                  Text with Button
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
                value={meesagename}
                onChange={handleMessageNameChange}
              />
            </Form.Item>
            <Flex justify="space-between">
              <Form.Item label="" />
              <Button onClick={addNewCard}>
                <PlusOutlined /> Add Button
              </Button>
            </Flex>
            {data.actions.map((btn, index) => (
              <Card key={index} style={{ position: "relative" }}>
                <CloseOutlined
                  onClick={() => deleteCard(index)}
                  style={{ position: "absolute", top: 6, right: 6 }}
                />
                <Row gutter={[16, 0]}>
                  <Col md={24}>
                    <Form.Item name={`button-type-${index}`} label="Action">
                      <Select
                        defaultValue="quick"
                        value={btn.type}
                        onChange={(value) => handleChange(index, "type", value)}
                        style={{ width: "100%" }}
                        options={[
                          { value: "quick", label: "Quick Reply" },
                          { value: "call", label: "Call Button" },
                          { value: "url", label: "URL Button" },
                          { value: "location", label: "Location" },
                          { value: "calendar", label: "Calendar" },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col md={24}>
                    <Form.Item
                      name={`button-title-${index}`}
                      rules={[
                        {
                          required: true,
                          type: "string",
                          message: "Please enter title",
                        },
                        {
                          max: 25,
                          message: "Title must be within 25 characters",
                        },
                      ]}
                      label="Title"
                      initialValue={btn.title}
                    >
                      <Input
                        style={{ fontSize: "15px" }}
                        value={btn.title}
                        onChange={(e) =>
                          handleChange(index, "title", e.target.value)
                        }
                        placeholder="Enter Title"
                        maxLength={25}
                      />
                    </Form.Item>
                  </Col>
                  {btn.type === "call" && (
                    <Col md={24}>
                      <Form.Item
                        name={`button-phoneNumber-${index}`}
                        label="Phone Number"
                      >
                        <Input
                          value={btn.phoneNumber}
                          onChange={(e) =>
                            handleChange(index, "phoneNumber", e.target.value)
                          }
                          placeholder="Enter Phone Number"
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {btn.type === "url" && (
                    <Col md={24}>
                      <Form.Item name={`button-url-${index}`} label="URL">
                        <Input
                          value={btn.payload}
                          onChange={(e) =>
                            handleChange(index, "payload", e.target.value)
                          }
                          placeholder="Enter URL"
                        />
                      </Form.Item>
                    </Col>
                  )}
                  {btn.type === "location" && (
                    <>
                      <Col md={24}>
                        <Form.Item name={`button-label-${index}`} label="Label">
                          <Input
                            value={btn.payload}
                            onChange={(e) =>
                              handleChange(index, "payload", e.target.value)
                            }
                            placeholder="Enter Label"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item
                          name={`button-latitude-${index}`}
                          label="Latitude"
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            value={btn.latitude}
                            onChange={(value) =>
                              handleChange(index, "latitude", value)
                            }
                            placeholder="Enter Latitude"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item
                          name={`button-longitude-${index}`}
                          label="Longitude"
                        >
                          <InputNumber
                            style={{ width: "100%" }}
                            value={btn.longitude}
                            onChange={(value) =>
                              handleChange(index, "longitude", value)
                            }
                            placeholder="Enter Longitude"
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                  {btn.type === "calendar" && (
                    <>
                      <Col md={24}>
                        <Form.Item
                          name={`button-label-${index}`}
                          label="Label"
                          rules={[
                            {
                              required: true,
                              type: "string",
                              message: "Please enter label",
                            },
                          ]}
                        >
                          <Input
                            value={btn.payload}
                            onChange={(e) =>
                              handleChange(index, "payload", e.target.value)
                            }
                            placeholder="Enter Label"
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item
                          name={`button-startDate-${index}`}
                          label="Start Date"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            value={btn.startDate}
                            onChange={(date) =>
                              handleChange(index, "startDate", date)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col md={24}>
                        <Form.Item
                          name={`button-endDate-${index}`}
                          label="End Date"
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            value={btn.endDate}
                            onChange={(date) =>
                              handleChange(index, "endDate", date)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
              </Card>
            ))}
          </Form>
        </ConfigProvider>
      </Sider>
    </Layout>
  );
};
export default ButtonNodeSidebar;
