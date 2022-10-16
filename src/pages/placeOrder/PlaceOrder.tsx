import React from 'react'
import { Col, Row, Space } from 'antd'
import { SubHeader, PaymentForm, CheckOutCard } from '../../components'
import styles from './/PlaceOrder.module.css'
import {useSelector} from "../../redux/hooks";

export const PlaceOrder: React.FC = () => {
  const loading = useSelector(state => state.order.loading)
  const orderItems = useSelector(state => state.order.orderItems)[0]?.items ?? []
  return (
    <>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <SubHeader current={2} />
        <Row
          justify={'center'}
          className={styles['place-order-content-wrapper']}
        >
          <Col span={8}>
            <PaymentForm />
          </Col>
          <Col span={14}>
            <CheckOutCard loading={loading} list={orderItems} originalPrice={orderItems
              .map((item) => item.price)
              .reduce((a, b) => a + b, 0)} price={orderItems
              .map((item) =>
                parseFloat(
                  (
                    item.price *
                    (item.discountPresent ? item.discountPresent : 1)
                  ).toFixed(2)
                )
              )
              .reduce((a, b) => a + b, 0)}/>
          </Col>
        </Row>
      </Space>
    </>
  )
}
