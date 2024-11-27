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
  const dispatch = useDispatch();

  const handleSelect = (option) => {
    if (!close) {
      onChange(option);
    }
  };

  // const handleClose = (index) => {
  //   if (options.length > 2) {
  //     const cards = options.filter((_, i) => i !== index);
  //     const filteredCards = richCardCarousels.filter((_, i) => i !== index);
  //     const images = previewImage.filter((_, i) => i !== index);

  //     setRichCardCarousels(filteredCards);
  //     setPreviewImage(images);
  //     setOptions(cards.map((_, i) => `Card ${i + 1}`));

  //     if (index === 0 && value === index) {
  //       onChange(index);
  //     } else if (value < index) {
  //       onChange(value);
  //     } else if (index < value) {
  //       onChange(value - 1);
  //     } else if (value === index && options.length - 1 === index) {
  //       onChange(value - 1);
  //     } else if (value === index) {
  //       onChange(value);
  //     }
  //   }
  // };

  const handleClose = (index) => {
    if (options.length > 2) {
      // Remove the card from options, richCardCarousels, and previewImage
      const updatedOptions = options.filter((_, i) => i !== index);
      const updatedCards = richCardCarousels?.cards.filter((_, i) => i !== index);
      const updatedImages = previewImage.filter((_, i) => i !== index);
      console.log("updated option",updatedOptions);
      console.log("updatedCards",richCardCarousels?.cards.filter((_, i) => i !== index));
      setRichCardCarousels(updatedCards);
      setPreviewImage(updatedImages);
      setOptions(updatedOptions.map((_, i) => `Card ${i + 1}`));
  
      // Adjust the selected value based on the new list of options
      if (updatedOptions.length === 0) {
        onChange(null);  // Reset selection if no cards remain
      } else if (value === index && updatedOptions.length > 0) {
        onChange(index === 0 ? 0 : index - 1);  // Adjust to previous card
      } else if (value < index) {
        onChange(value);
      } else {
        onChange(value - 1);
      }
  
      // Dispatch updated data to Redux store
      const data = {
        selectedNode,
        value: { ...richCardCarousels, cards: updatedCards }, // Keep other data intact, update cards
        key: "richCardCarousels",  // You can use whatever key is needed to update this part of the state
      };
      console.log("handle clode data-->",data);
      
      dispatch(setRichCardNodeCarousleData(data)); // Dispatch the updated data
  
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
          <Col md={6} key={option}>
            <Space size="large">
              <Tag
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
                {option}
              </Tag>
            </Space>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CustomSegment;
