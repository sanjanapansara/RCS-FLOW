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
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import Sider from "antd/es/layout/Sider";
import CustomSegment from "./CustomSegment";
import SideBarHeader from "./SideBarHeader";
import { useDispatch, useSelector } from "react-redux";
import { setRichCardNodeCarousleData } from "../redux/reducer.button";
const props = {
  name: "file",
  multiple: false,
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      setImageUrl (info.file);
      const value = info.file.response.url;
      const data = { selectedNode, value, key: "mediaUrl" };
      dispatch(setRichCardNodeCarousleData(data));
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function RichCardCarouselSidebar({
  node,
  // form,
  updateNodeData,
  setSelectedNode,
  selectedNode,
  isEdit,
  title,
}) {
  console.log(node);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === selectedNode);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(node?.data?.imageUrl || "");
  const [options, setOptions] = useState(["Card 1", "Card 2"]);
  const [cardIndex, setCardIndex] = useState(0);
  const [richCardCarousels, setRichCardCarousels] = useState([]);
  const [previewImage, setPreviewImage] = useState([]);
  const [value, setValue] = useState(alldata?.data?.value ?? "short");
  const [templateName, setTemplateName] = useState(
    node?.data?.templateName || ""
  );
  const [messagename, setMessageName] = useState(node?.data?.label || "");
  const [description, setDescription] = useState(node?.data?.description || "");
  const [data, setData] = useState({
    actions: alldata?.data?.actions ?? [
      {
        id: 0,
        type: "quick",
        title: "",
        payload: "",
      },
    ],
  });

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const data = { selectedNode, value, key: "size" };
    dispatch(setRichCardNodeCarousleData(data));
  };

  const handleTemplateNameChange = (e) => {
    const newTemplateName = e.target.value;
    setTemplateName(newTemplateName);
    updateNodeData(node.id, { templateName: newTemplateName });
    dispatch(setRichCardNodeCarousleData(data));
  };

  const handleMessageNameChange = (e) => {
    const MessageName = e.target.value;
    setMessageName(MessageName);
    updateNodeData(node.id, { label: MessageName });
    dispatch(setRichCardNodeCarousleData(data));
  };

  const handleDescriptionNameChange = (e) => {
    const DescriptionName = e.target.value;
    setDescription(DescriptionName);
    updateNodeData(node.id, { description: DescriptionName });
    dispatch(setRichCardNodeCarousleData(data));
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
      dispatch(setRichCardNodeCarousleData(data));
    }
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

  useEffect(() => {
    const initValues = richCardCarousels[cardIndex]?.actions?.reduce(
      (acc, button, i) => {
        acc[`button-type-${cardIndex}-${i}`] = button.type;
        acc[`button-title-${cardIndex}-${i}`] = button.title;
        acc[`button-payload-${cardIndex}-${i}`] = button.payload;
        acc[`button-phoneNumber-${cardIndex}-${i}`] = button.phoneNumber;
        acc[`button-url-${cardIndex}-${i}`] = button.url;
        acc[`button-label-${cardIndex}-${i}`] = button.label;
        acc[`button-latitude-${cardIndex}-${i}`] = button.latitude;
        acc[`button-longitude-${cardIndex}-${i}`] = button.longitude;
        acc[`button-startDate-${cardIndex}-${i}`] = button.startDate;
        acc[`button-endDate-${cardIndex}-${i}`] = button.endDate;
        acc[`button-description-${cardIndex}-${i}`] = button.description;
        return acc;
      },
      {}
    );
    form.setFieldsValue(initValues);
  }, [richCardCarousels[cardIndex]?.actions]);

  // const handleAddCardsTemplate = () => {
  //   if (options.length < 10) {
  //     const newButton = {
  //       id: 0,
  //       type: "quick",
  //       title: "",
  //       payload: "",
  //     };

  //     const newCard = {
  //       title: "",
  //       description: "",
  //       media: "",
  //       mediaHeight: 10,
  //       button: [newButton],
  //     };

  //     setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);
  //   } else {
  //     message.warning("Cannot add more than 10 cards");
  //   }
  // };
  const handleAddCardsTemplate = () => {
    if (options.length < 10) {
      setOptions((prev) => [...prev, `Card ${options.length + 1}`]);
      setRichCardCarousels((prev) => [
        ...prev,
        {
          width: value,
          title: "",
          description: "",
          media: "",
          // mediaHeight: value1,
          actions: [
            {
              id: 0,
              type: "quick",
              title: "",
              payload: "",
            },
          ],
        },
      ]);
    } else {
      message.warning("Cannot add more than 10 cards");
    }
  };

  console.log("datta", richCardCarousels);
  useEffect(() => {
    const initValues = richCardCarousels?.reduce((acc, cards, i) => {
      acc[`title${i}`] = cards.title;
      acc[`description${i}`] = cards.description;
      acc[`media${i}`] = cards.media;
      acc[`size${i}`] = cards.mediaHeight;
      return acc;
    }, {});
    form.setFieldsValue(initValues);
  }, [richCardCarousels[cardIndex]]);

  const handleCardChange = (newValue) => {
    setCardIndex(newValue);
  };

  const addNewCard = () => {
    if (data.actions.length < 11) {
      setData((prev) => {
        const value = {
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
        };
        const data = { selectedNode, value: value.actions, key: "actions" };
        dispatch(setRichCardNodeCarousleData(data));
        return value;
      });
    } else {
      message.warning("Cannot add more than 11 buttons");
    }
  };

  const deleteCard = (index) => {
    if (data.actions.length > 1) {
      setData((prev) => {
        const value = [...prev.actions]
          .filter((_, i) => i !== index)
          .map((item, i) => ({ ...item, id: i }));
        const data = { selectedNode, value, key: "actions" };
        dispatch(setRichCardNodeCarousleData(data));
        return { ...prev, actions: value };
      });
    } else {
      message.warning("Buttons must be greater than 1");
    }
  };

  const handleChange = (index, key, val) => {
    setData((prev) => {
      const actions = [...prev.actions];
      // cardIndex === ind;
      actions[index] = { ...actions[index], [key]: val };
      const { actions: value } = { ...prev, actions };
      const data = { selectedNode, value, key: "actions" };
      dispatch(setRichCardNodeCarousleData(data));
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
                <SideBarHeader
                  setSelectedNode={setSelectedNode}
                  title={title}
                />
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
            <Form.Item label="Template Name" style={{ marginBottom: "10px" }}>
              <Input
                variant="filled"
                placeholder="Template Name"
                value={templateName}
                onChange={handleTemplateNameChange}
              />
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
            <Form.Item
              name={`title${cardIndex}`}
              label="Title"
              style={{ marginBottom: "10px" }}
              initialValue={
                isEdit
                  ? data?.richCardCarousel?.cards[cardIndex]?.messagename
                  : ""
              }
            >
              <Input
                variant="filled"
                placeholder="Title"
                id="message"
                value={richCardCarousels[cardIndex]?.messagename}
                onChange={handleMessageNameChange}
              />
            </Form.Item>
            <Form.Item
              name={`description${cardIndex}`}
              initialValue={
                isEdit
                  ? data?.richCardCarousel?.cards[cardIndex]?.description
                  : ""
              }
              label="Description"
              style={{ marginBottom: "10px" }}
            >
              <TextArea
                variant="filled"
                size="small"
                placeholder="Description"
                rows={4}
                value={description}
                onChange={handleDescriptionNameChange}
              />
            </Form.Item>
            <Row>
              <Col md={24}>
                <Form.Item
                  name={`media${cardIndex}`}
                  label="Media"
                  layout="vertical"
                  rules={[{ required: true, message: "Please select media" }]}
                  initialValue={richCardCarousels[cardIndex]?.media?.id}
                >
                  <Dragger
                    {...props}
                    showUploadList={false}
                    customRequest={({ onSuccess }) => {
                      setTimeout(() => onSuccess("ok"), 0); // Mock success
                    }}
                    onChange={handleImageUpload}
                  >
                    {richCardCarousels[cardIndex]?.imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="avatar"
                        style={{ width: "100%" }}
                      />
                    ) : (
                      uploadButton
                    )}
                  </Dragger>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col md={24}>
                <Form.Item
                  label="Size"
                  name={`size${cardIndex}`}
                  rules={[{ required: true, message: "Select media height" }]}
                  // initialValue={
                  //   isEdit
                  //     ? data?.richCardCarousel?.cards[cardIndex]?.mediaHeight
                  //     : value1
                  // }
                >
                  <Radio.Group
                    defaultValue="short"
                    onChange={onChange}
                    value={value}
                    style={{ width: "100%" }}
                  >
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
            <Flex justify="space-between">
              <Form.Item label="" />
              <Button
                onClick={() =>
                  addNewCard(richCardCarousels[cardIndex]?.actions?.length)
                }
              >
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
