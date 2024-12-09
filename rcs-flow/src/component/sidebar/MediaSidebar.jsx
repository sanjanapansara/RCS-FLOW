import React, { useEffect, useState } from "react";
import { ConfigProvider, Form, Input, Layout, message, Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import SideBarHeader from "./SideBarHeader";
import { useDispatch, useSelector } from "react-redux";
import { setUpdateNodeData } from "../redux/reducer.button";
const { Sider } = Layout;

const MediaNodeSider = ({ title, setSelectedNode, selectedNode }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.nodes);
  const alldata = nodes.find((item) => item.id === selectedNode);
  const { Dragger } = Upload;
  const [loading] = useState(false);
  const [imageUrl, setImageUrl] = useState(alldata?.data?.mediaUrl ?? "");
  const [message1, setMessage] = useState(alldata?.data?.label ?? "");
  const [templateName, setTemplateName] = useState(
    alldata?.data?.templateName ?? ""
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

  const handleTemplateNameChange = (e) => {
    const value = e.target.value;
    setTemplateName(value);
    const data = { selectedNode, value, key: "templateName" };
    dispatch(setUpdateNodeData(data));
  };

  const handleMessageChange = (e) => {
    const value = e.target.value;
    setMessage(value);
    const data = { selectedNode, value, key: "label" };
    dispatch(setUpdateNodeData(data));
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
        dispatch(setUpdateNodeData(data));
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const customUpload = ({ file, onSuccess, onError }) => {
    setTimeout(() => {
      if (file) {
        onSuccess({ url: URL.createObjectURL(file) });
      } else {
        onError(new Error("Upload failed"));
      }
    }, 1000);
  };

  return (
    <Layout>
      <Sider width="305px">
        <SideBarHeader setSelectedNode={setSelectedNode} title={title} />
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
            <Form.Item label="Media" required>
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
            <Form.Item label="Message">
              <TextArea
                rows={4}
                placeholder="Enter Message"
                onChange={handleMessageChange}
                value={message1}
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Sider>
    </Layout>
  );
};

export default MediaNodeSider;
