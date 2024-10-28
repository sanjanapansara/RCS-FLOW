import { Handle, Position } from '@xyflow/react'
import { Button, Card, ConfigProvider, Flex, Switch, Typography } from 'antd'
import React from 'react'

function RichcardCarouselNode({data,selected}) {
  return (
    <ConfigProvider
    theme={{
      components: {
        Card: {
          headerBg: "#796383",
          colorBorderSecondary: "#796383",
        },
      },
    }}
  >
    <Card
      title="Rich Card Carousel"
      extra={<Switch size="small"/>}
      size="small"
      bodyStyle={{ padding: "10px" }}
      
      style={{
        width: 200,
        padding: "0px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
        border: selected ? "1px solid #796383" : "none",
      }}
    >
      <Handle type="target" position={Position.Left} />
      <Typography.Text>{data.label}</Typography.Text>
      <Flex justify="space-around">
        <Button
          size="small"
          block
          style={{ background: "#adafce", color: "black" }}
        >
          <Handle
            type="source"
            position={Position.Right}
            isConnectable={true}
          />
          <Typography.Text>Deafult Button</Typography.Text>
        </Button>
      </Flex>
    </Card>
  </ConfigProvider>
  )
}

export default RichcardCarouselNode