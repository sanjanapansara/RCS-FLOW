import { CloseOutlined } from "@ant-design/icons";
import { Col, message, Popconfirm, Row, Space, Tag } from "antd";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setRichCardNodeCarousleData } from "../redux/reducer.button";

const CustomSegment = ({
  options = [],
  selectedNode,
  onChange,
  setOptions,
  setPreviewImage,
  setRichCardCarousels,
  richCardCarousels = [],
  previewImage = [],
  value,
}) => {
  const [close, setClose] = useState(false);
  const [selectedValue, setSelectedValue] = useState(0);

  const dispatch = useDispatch();
  const nodes = useSelector((state) => state.nodes.nodes);
  console.log("nodes", selectedNode);
  const alldata = nodes?.find((element) => element?.id == selectedNode);
  console.log("isExist", alldata);

  const handleSelect = (option) => {
    if (close === false) {
      setSelectedValue(option);
      onChange(option);
    }
  };
  
  console.log("Selected value", options);

  const handleClose = (index) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      const updatedCards =
        richCardCarousels?.cards?.filter((_, i) => i !== index) || [];
      const updatedImages = previewImage.filter((_, i) => i !== index);
      setOptions(updatedOptions.map((_, i) => `Card ${i + 1}`));
      setRichCardCarousels((prev) => ({
        ...prev,
        cards: updatedCards,
      }));
      setPreviewImage(updatedImages);
      if (updatedOptions.length === 0) {
        onChange(null);
      } else if (value === index) {
        onChange(index === 0 ? 0 : index - 1);
      } else if (value < index) {
        onChange(value);
      } else {
        onChange(value - 1);
      }
      const data = {
        selectedNode,
        value: { ...richCardCarousels, cards: updatedCards },
        key: "richCardCarousels",
      };
      dispatch(setRichCardNodeCarousleData(data));
    } else {
      message.warning("At least two cards must remain.");
    }
  };

  const cancel = (e) => {
    console.log(e);
  };

  return (
    <div>
      <Row gutter={[16, 24]}>
        {options.map((option, index) => (
          <Col md={6} key={index}>
            <Space size="large">
              <Tag
                key={option}
                defaultChecked={selectedValue}
                onClick={() => {
                  setClose(false);
                  handleSelect(index);
                }}
                onClose={(e) => {
                  e.preventDefault();
                  setClose(true);
                }}
                closeIcon={
                  options.length === 2 ? null : (
                    <Popconfirm
                      icon=""
                      description="Are you sure to delete this Card?"
                      onConfirm={() => handleClose(index)}
                      onCancel={cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <CloseOutlined style={{ fontSize: "14px" }} />
                    </Popconfirm>
                  )
                }
                style={{
                  border: value === index ? "2px solid #91caff" : "",
                  cursor: "pointer",
                  fontSize: 14,
                  margin: "0",
                  backgroundColor: value === index ? "#fff" : "#fff",
                  color: "#000",
                  zIndex: 1,
                  borderRadius: 5,
                }}
              >
                {`Card ${index + 1}`}
              </Tag>
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomSegment;
