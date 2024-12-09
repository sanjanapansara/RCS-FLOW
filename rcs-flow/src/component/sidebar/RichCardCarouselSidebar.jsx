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
  console.log("nodes", selectedNode);
  const alldata = nodes?.find((element) => element?.id == selectedNode);
  console.log("isExist", alldata);
  const [cardIndex, setCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(node?.data?.imageUrl || "");
  const [options, setOptions] = useState(
    alldata?.data?.richCardCarousels?.cards ?? [
      {
        size: "medium",
        templateName: "",
        title: "Card 1",
        description: "",
        media: "",
      },
      {
        size: "medium",
        templateName: "",
        title: "Card 2",
        description: "",
        media: "",
      },
    ]
  );
  console.log("options", options);
  console.log("cardIndex", cardIndex);
  const [richCardCarousels, setRichCardCarousels] = useState({
    cards: alldata?.data?.richCardCarousels?.cards ?? [
      {
        size: "medium",
        templateName: "Rich Card Carousels",
        title: "Card 1 Title",
        description: "Card 1 Description",
        media: "",
        actions: [
          {
            id: 0,
            type: "quick",
            title: "Card 1  Title",
            payload: "",
          },
        ],
      },
      {
        size: "medium",
        templateName: "Rich Card Carousels",
        title: "Card 2 Title",
        description: "Card 2 Description",
        media: "",
        actions: alldata?.data?.richCardCarousels?.cards[1]?.actions ?? [
          {
            id: 0,
            type: "quick",
            title: "Card 2  Title",
            payload: "",
          },
        ],
      },
    ],
  });
  const [previewImage, setPreviewImage] = useState([]);
  const [value, setValue] = useState(alldata?.data?.value ?? "medium");
  const [templateName, setTemplateName] = useState(
    alldata?.data?.templateName || ""
  );
  const [messageName, setMessageName] = useState(
    alldata?.data?.richCardCarousels?.cards[cardIndex]?.title ?? ""
  );
  const [description, setDescription] = useState("");
  const [cardWidth, setCardWidth] = useState(0);
console.log( "name",alldata?.data?.templateName);

  useEffect(() => {
    const initValues = richCardCarousels?.cards?.[cardIndex]?.actions?.reduce(
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
  }, [richCardCarousels?.cards[cardIndex]?.actions]);

  console.log("richCardCarousels", richCardCarousels);

  const props = {
    name: "file",
    multiple: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        setImageUrl(info.file);
        const value = info.file.response.url;
        const data = { selectedNode, value, key: "mediaUrl" };
        dispatch(setRichCardNodeCarousleData(data));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChange = (e, index, key) => {
    const newSize = e.target.value;
    setValue(newSize);
    setRichCardCarousels((prev) => {
      console.log("Prev State:", prev);
      console.log("Key:", key);

      const updatedCards = prev.cards.map((card, i) =>
        i === index ? { ...card, [key]: newSize } : card
      );

      const value = { ...prev, cards: updatedCards };
      const data = { selectedNode, value, key: "richCardCarousels" };
      console.log("Dispatching Data:", data);

      dispatch(setRichCardNodeCarousleData(data));

      return { ...prev, cards: updatedCards };
    });
  };

  const handleTemplateNameChange = (e) => {
    const value = e.target.value;
    setTemplateName(value);
    const data = { selectedNode, value, key: "templateName" };
    dispatch(setRichCardNodeCarousleData(data));
  };
  const handleMessageNameChange = (e, index, key) => {
    const newMessageName = e.target.value;
    setMessageName(newMessageName);

    setRichCardCarousels((prev) => {
      console.log("Prev State:", prev);
      console.log("Key:", key);

      const updatedCards = prev.cards.map((card, i) =>
        i === index ? { ...card, [key]: newMessageName } : card
      );

      const value = { ...prev, cards: updatedCards };
      const data = { selectedNode, value, key: "richCardCarousels" };
      console.log("Dispatching Data:", data);

      dispatch(setRichCardNodeCarousleData(data));

      return { ...prev, cards: updatedCards };
    });
  };

  const handleDescriptionNameChange = (e, index, key) => {
    const newDescriptionName = e.target.value;
    setDescription(newDescriptionName);
    setRichCardCarousels((prev) => {
      console.log("Prev State:", prev);
      console.log("Key:", key);

      const updatedCards = prev.cards.map((card, i) =>
        i === index ? { ...card, [key]: newDescriptionName } : card
      );

      const value = { ...prev, cards: updatedCards };
      const data = { selectedNode, value, key: "richCardCarousels" };
      console.log("Dispatching Data:", data);

      dispatch(setRichCardNodeCarousleData(data));

      return { ...prev, cards: updatedCards };
    });
  };

  const handleImageUpload = (info, index, key) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      const newImageUrl = URL.createObjectURL(info.file.originFileObj);
      setImageUrl(newImageUrl);
      setLoading(false);
      setRichCardCarousels((prev) => {
        console.log("Prev State:", prev);
        console.log("Key:", key);

        const updatedCards = prev.cards.map((card, i) =>
          i === index ? { ...card, [key]: newImageUrl } : card
        );

        const value = { ...prev, cards: updatedCards };
        const data = { selectedNode, value, key: "richCardCarousels" };
        console.log("Dispatching Data:", data);

        dispatch(setRichCardNodeCarousleData(data));

        return { ...prev, cards: updatedCards };
      });
    }
  };

  const uploadButton = (
    <Button
      style={{
        border: 0,
        background: "none",
      }}
      icon={loading ? <LoadingOutlined /> : <PlusOutlined />}
    >
      Upload
    </Button>
  );

  const handleAddCardsTemplate = () => {
    if (options.length < 10) {
      console.log("please selectP", options.length);
      const newCard = {
        size: value,
        templateName: "",
        title: "",
        description: "",
        media: "",
        actions: [
          {
            id: 0,
            type: "quick",
            title: "",
            payload: "",
          },
        ],
      };
      setOptions((prev) => [...prev, `Card ${prev.length + 1}`]);
      setRichCardCarousels((prev) => {
        const updatedCards = [...(prev.cards || []), newCard];
        const data = {
          selectedNode,
          value: { ...prev, cards: updatedCards },
          key: "richCardCarousels",
        };
        dispatch(setRichCardNodeCarousleData(data));
        return { ...prev, cards: updatedCards };
      });
    } else {
      message.warning("Cannot add more than 10 cards");
    }
  };

  const addNewCard = () => {
    setRichCardCarousels((prev) => {
      const updatedCards = prev.cards.map((card, index) => {
        if (index === cardIndex) {
          if (card.actions.length < 4) {
            const updatedActions = [
              ...card.actions,
              {
                id: card.actions.length,
                type: "quick",
                title: "",
                payload: "",
              },
            ];
            return { ...card, actions: updatedActions };
          } else {
            message.warning("Cannot add more than 4 actions to a card");
            return card;
          }
        }
        return card;
      });

      const data = {
        selectedNode,
        value: { ...prev, cards: updatedCards },
        key: "richCardCarousels",
      };
      dispatch(setRichCardNodeCarousleData(data));

      return { ...prev, cards: updatedCards };
    });
  };

  const deleteCard = (index) => {
    if (richCardCarousels?.cards[cardIndex]?.actions?.length > 1) {
      const updatedRichCardCarousels = {
        ...richCardCarousels,
        cards: richCardCarousels.cards.map((card, i) => {
          if (i === cardIndex) {
            return {
              ...card,
              actions: card.actions.filter((_, i) => i !== index),
            };
          }
          return card;
        }),
      };
      const data = {
        selectedNode,
        value: updatedRichCardCarousels,
        key: "richCardCarousels",
      };
      dispatch(setRichCardNodeCarousleData(data));
      setRichCardCarousels(updatedRichCardCarousels);
    } else {
      message.warning("Buttons must be greater than 1");
    }
  };

  const handleChange = (index, type, value) => {
    setRichCardCarousels((prev) => {
      const updatedCards = prev.cards.map((card, i) => {
        if (i === cardIndex) {
          return {
            ...card,
            actions: card.actions.map((action, j) =>
              j === index ? { ...action, [type]: value } : action
            ),
          };
        }
        return card;
      });
      const updatedData = { ...prev, cards: updatedCards };
      const data = {
        selectedNode,
        value: updatedData,
        key: "richCardCarousels",
      };
      dispatch(setRichCardNodeCarousleData(data));
      console.log("change", updatedData);
      return updatedData;
    });
  };
  console.log("state", richCardCarousels.cards);

  const handleCardChange = (newValue) => {
    setCardIndex(newValue);
  };

  const handlecardwidth = (e) => {
    const value = e.target.value;
    setCardWidth(value);
    const data = { selectedNode, value, key: "cardWidth" };
    dispatch(setRichCardNodeCarousleData(data));
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
          <Form layout="vertical" form={form}>
            <Form.Item label="Template Name" style={{ marginBottom: "10px" }} name={"templatename"}>
              <Input
                variant="filled"
                placeholder="Template Name"
                defaultValue={templateName}
                onChange={handleTemplateNameChange}
              />
            </Form.Item>
            <Form.Item
              name={"rich_card_carousel_width"}
              label="Width"
              rules={[{ required: true, message: "Width is required" }]}
            >
              <Radio.Group
                defaultValue={cardWidth}
                size="small"
                style={{ display: "flex", gap: 20 }}
                onChange={(e)=>handlecardwidth(e)}
              >
                <div
                  style={{
                    border: "1px solid #D9D9D9",
                    padding: "10px 15px",
                    borderRadius: "8px",
                  }}
                >
                  <Radio value={0}>{"small"}</Radio>
                </div>

                <div
                  style={{
                    border: "1px solid #D9D9D9",
                    padding: "10px 15px",
                    borderRadius: "8px",
                  }}
                >
                  <Radio value={1}>{"medium"}</Radio>
                </div>
              </Radio.Group>
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
                    selectedNode={selectedNode}
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
                <Typography style={{ textAlign: "end" }}>
                  {options.length}/10
                </Typography>
              </Col>
            </Row>
            <Form.Item
              name={`title${cardIndex}`}
              label="Title"
              style={{ marginBottom: "10px" }}
            >
              <Input
                placeholder="Title"
                defaultValue={
                  alldata?.data?.richCardCarousels?.cards[cardIndex]?.title ||
                  messageName
                }
                id="message"
                onChange={(e) => handleMessageNameChange(e, cardIndex, "title")}
              />
            </Form.Item>
            <Form.Item
              name={`description${cardIndex}`}
              label="Description"
              style={{ marginBottom: "10px" }}
            >
              <TextArea
                variant="filled"
                size="small"
                placeholder="Description"
                rows={4}
                // value={description}
                defaultValue={
                  alldata?.data?.richCardCarousels?.cards[cardIndex]
                    ?.description || description
                }
                onChange={(e) =>
                  handleDescriptionNameChange(e, cardIndex, "description")
                }
              />
            </Form.Item>
            <Row>
              <Col md={24}>
                <Form.Item
                  name={`media${cardIndex}`}
                  label="Media"
                  layout="vertical"
                  rules={[{ required: true, message: "Please select media" }]}
                  initialValue={
                    alldata?.data?.richCardCarousels?.cards[cardIndex]?.media ||
                    ""
                  }
                >
                  <Dragger
                    {...props}
                    showUploadList={false}
                    customRequest={({ onSuccess }) => {
                      setTimeout(() => onSuccess("ok"), 0);
                    }}
                    onChange={(info) =>
                      handleImageUpload(info, cardIndex, "media")
                    }
                  >
                    {alldata?.data?.richCardCarousels?.cards[cardIndex]
                      ?.media ? (
                      <img
                        src={
                          alldata?.data?.richCardCarousels?.cards[cardIndex]
                            ?.media
                        }
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
                >
                  <Radio.Group
                    defaultValue={
                      alldata?.data?.richCardCarousels?.cards[cardIndex]
                        ?.size || "medium"
                    }
                    onChange={(e) => onChange(e, cardIndex, "size")}
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
                  addNewCard(
                    richCardCarousels?.cards[cardIndex]?.actions?.length
                  )
                }
              >
                <PlusOutlined /> Add Button
              </Button>
            </Flex>
            {richCardCarousels?.cards[cardIndex]?.actions.map((btn, index) => (
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
                      name={`button-title-${cardIndex}-${index}`}
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
