import React from 'react'
import {SubHeader} from '../../components'
import {Col, Row} from "antd";

export const ShoppingCart: React.FC = () => {
  return (
    <>
      <SubHeader current={1} />
      <Row>
        <Col span={16}>
          {/*<ProductList/>*/}
        </Col>
        <Col span={8}>
          {/*<PaymentCard/>*/}
        </Col>
      </Row>
    </>
  )
}
