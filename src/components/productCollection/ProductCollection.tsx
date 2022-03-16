import React from "react"
import {Col, Row, Space} from "antd";
import {ProductImage} from "../productImage/ProductImage";

interface PropsType {
  list: any[]
}

export const ProductCollection: React.FC<PropsType> = ({list}) => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <ProductImage
          id={list[0].id}
          img={list[0].img}
          subTitle={list[0].title}
          height={332}
        />
      </Col>
      <Col span={12}>
        <Space direction={"vertical"} size={'middle'} style={{width: '100%'}}>
          <Row gutter={16}>
            <Col span={12}>
              <ProductImage
                id={list[1].id}
                img={list[1].img}
                subTitle={list[1].title}
                height={158}
              />
            </Col>
            <Col span={12}>
              <ProductImage
                id={list[2].id}
                img={list[2].img}
                subTitle={list[2].title}
                height={158}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <ProductImage
                id={list[3].id}
                img={list[3].img}
                subTitle={list[3].title}
                height={158}
              />
            </Col>
            <Col span={12}>
              <ProductImage
                id={list[4].id}
                img={list[4].img}
                subTitle={list[4].title}
                height={158}
              />
            </Col>
          </Row>
        </Space>
      </Col>
    </Row>
  )
}