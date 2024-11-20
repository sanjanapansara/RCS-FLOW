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
import Sider from "antd/es/layout/Sider";
import React, { useEffect, useState } from "react";
import {
  CloseOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import SideBarHeader from "./SideBarHeader";
import { useDispatch, useSelector } from "react-redux";
import { setRichCardNodeData } from "../redux/reducer.button";

function RichcardNodeSidebar({
  node,
  updateNodeData,
  title,
  setSelectedNode,
  selectedNode,
}) {
  console.log(node);
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === selectedNode);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(alldata?.data?.mediaUrl ?? "");
  const [value, setValue] = useState(alldata?.data?.size ?? "medium");
  const [templateName, setTemplateName] = useState(
    alldata?.data?.templateName ?? ""
  );
  const [messagename, setMessageName] = useState(alldata?.data?.label ?? "");
  console.log("all data", alldata);
  
  const [description, setDescription] = useState(
    alldata?.data?.description ?? ""
  );
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
  const handleTemplateNameChange = (e) => {
    const value = e.target.value;
    setTemplateName(value);
    const data = { selectedNode, value, key: "templateName" };
    dispatch(setRichCardNodeData(data));
  };

  const handleMessageNameChange = (e) => {
    const value = e.target.value;
    setMessageName(value);
    const data = { selectedNode, value, key: "label" };
    dispatch(setRichCardNodeData(data));
  };
  const handleDescriptionNameChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    const data = { selectedNode, value, key: "description" };
    dispatch(setRichCardNodeData(data));
  };
  useEffect(() => {
    const initValues = data?.actions?.reduce((acc, button, i) => {
      acc[`button-type-${i}`] = button.type;
      acc[`button-title-${i}`] = button.title;
      acc[`button-payload-${i}`] = button.payload;
      acc[`button-phoneNumber-${i}`] = button.phoneNumber;
      acc[`button-url-${i}`] = button.url;
      acc[`button-label-${i}`] = button.label;
      acc[`button-latitude-${i}`] = button.latitude;
      acc[`button-longitude-${i}`] = button.longitude;
      acc[`button-startDate-${i}`] = button.startDate;
      acc[`button-endDate-${i}`] = button.endDate;
      acc[`button-description-${i}`] = button.description;
      return acc;
    }, {});
    form.setFieldsValue(initValues);
  }, [data?.actions]);

  const onChange = (e) => {
    const value = e.target.value;
    setValue(value);
    const data = { selectedNode, value, key: "size" };
    dispatch(setRichCardNodeData(data));
  };

  const handleChange = (index, key, val) => {
    setData((prev) => {
      const actions = [...prev.actions];
      actions[index] = { ...actions[index], [key]: val };
      const { actions: value } = { ...prev, actions };
      const data = { selectedNode, value, key: "actions" };
      dispatch(setRichCardNodeData(data));
      return { ...prev, actions };
    });
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
        dispatch(setRichCardNodeData(data));
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
        dispatch(setRichCardNodeData(data));
        return { ...prev, actions: value };
      });
    } else {
      message.warning("Buttons must be greater than 1");
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
        dispatch(setRichCardNodeData(data));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const customUpload = ({ file, onSuccess, onError }) => {
    try {
      const img = new Image();
      img.src = URL.createObjectURL(file); // Correct usage
      onSuccess({ url: img.src });
    } catch (error) {
      onError(error);
    }
  };
  

  // const customUpload = ({ file, onSuccess, onError }) => {
  //   setTimeout(() => {
  //     if (file) {
  //       onSuccess({ url: URL.createObjectURL(file) });
  //     } else {
  //       onError(new Error("Upload failed"));
  //     }
  //   }, 1000);
  // };
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
                  <SideBarHeader
                    setSelectedNode={setSelectedNode}
                    title={title}
                  />
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
            <Form layout="vertical" form={form}>
              <Form.Item label="Template Name" style={{ marginBottom: "10px" }}>
                <Input
                  placeholder="Enter Template Name"
                  value={templateName}
                  onChange={handleTemplateNameChange}
                />
              </Form.Item>
              <Form.Item label="Title" style={{ marginBottom: "10px" }}>
                <Input
                  placeholder="Title"
                  id="message"
                  value={messagename}
                  onChange={handleMessageNameChange}
                />
              </Form.Item>
              <Form.Item label="Description" style={{ marginBottom: "10px" }}>
                <TextArea
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
                    label="Media"
                    layout="vertical"
                    rules={[{ required: true, message: "Please select media" }]}
                  >
                    <Dragger {...props} customRequest={customUpload}>
                      {imageUrl ? (
                        <img
                          src={imageUrl?.response?.url || imageUrl}
                          alt="avatar"
                          style={{
                            objectFit: "scale-down",
                            width: "100%",
                            height: 50,
                          }}
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
                    rules={[{ required: true, message: "Select media height" }]}
                  >
                    <Radio.Group
                      defaultValue="medium"
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
                          onChange={(value) =>
                            handleChange(index, "type", value)
                          }
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
                          <Form.Item
                            name={`button-label-${index}`}
                            label="Label"
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
    </>
  );
}

export default RichcardNodeSidebar;
