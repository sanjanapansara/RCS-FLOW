import {
    Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Layout,
  message,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";
import { CloseOutlined, LeftOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import Sider from "antd/es/layout/Sider";
import CustomSegment from "./CustomSegment";

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

function RichCardCarouselSidebar() {
  const [loading] = useState(false);
  const [imageUrl] = useState();
  const [options, setOptions] = useState(["Card 1", "Card 2"]);
  const [cardIndex, setCardIndex] = useState(0);
  const [richCardCarousels, setRichCardCarousels] = useState();
  const [previewImage, setPreviewImage] = useState([]);
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
  const handleAddCardsTemplate = () => {
    if (options.length < 10) {
      const newButton = {
        id: 0, // Set this dynamically if you have multiple buttons per card
        type: "quick",
        title: "",
        payload: "",
      };
  
      const newCard = {
        title: "",
        description: "",
        media: "",
        mediaHeight: 10, // Assuming value1 is defined
        button: [newButton],
      };
  
      setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);
  
    //   setRichCardCarousels((prev) => {
    //     const updatedCarousels = [...prev, newCard];
  
    //     // Call updateNodeLabel with the updated state
    //     if (selectedNode) {
    //       updateNodeLabel(selectedNode.id, {
    //         richCardCarousels: updatedCarousels,
    //       });
    //     }
  
    //     return updatedCarousels;
    //   });
    } else {
      message.warning("Cannot add more than 10 cards");
    }
  };
  const handleCardChange = (newValue) => {
    setCardIndex(newValue);
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
      actions: prev.actions.filter((_, i) => i !== index),
    }));
  };

  const handleChange = (index, key, value) => {
    setData((prev) => {
      const actions = [...prev.actions];
      actions[index] = { ...actions[index], [key]: value };
      return { ...prev, actions };
    });
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
                <LeftOutlined />
                <Typography.Title level={5} style={{ margin: "0px" }}>
                  {" "}
                  Rich Card Carousel
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
              <Input variant="filled" placeholder="Template Name" />
            </Form.Item>
            <Row>
          <Col md={24}>
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: 10, marginBottom: 10 }}
            >
              <Typography
                style={{
                  alignSelf: "center",
                  fontSize: 16,
                  fontWeight: "600",
                }}
              >
                Cards
              </Typography>
              <Button
                onClick={handleAddCardsTemplate}
                style={{
                  backgroundColor: "#0F3B48",
                }}
                type="primary"
              >
                <PlusOutlined /> Add Cards
              </Button>
            </Flex>
          </Col>
        </Row>
            <Row>
              <Col md={24}>
                <Col>
                  <CustomSegment
                    onChange={handleCardChange}
                    options={options}
                    value={cardIndex}
                    setOptions={setOptions}
                    setRichCardCarousels={setRichCardCarousels}
                    setPreviewImage={setPreviewImage}
                    previewImage={previewImage}
                    richCardCarousels={richCardCarousels}
                  />
                </Col>
              </Col>
            </Row>
            <Form.Item label="Title" style={{ marginBottom: "10px" }}>
              <Input variant="filled" placeholder="Title" id="message" />
            </Form.Item>
            <Form.Item label="Description" style={{ marginBottom: "10px" }}>
              <TextArea
                variant="filled"
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
                  <Radio.Group style={{ width: "100%" }}>
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
            <br/>
            <Flex justify="space-between">
              <Form.Item label="Button Label" />
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
}

export default RichCardCarouselSidebar;
