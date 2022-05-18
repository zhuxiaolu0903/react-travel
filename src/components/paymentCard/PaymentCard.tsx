import React, { useState } from 'react'
import { Button, Col, List, Row, Typography } from 'antd'
import styles from './PaymentCard.module.css'
import {CheckCircleOutlined} from "@ant-design/icons";

enum PAGE_TYPE {
  CART = 'cart',
  ORDER = 'order',
}

interface PropsType {
  pageType: PAGE_TYPE
  list: any[]
}

export const PaymentCard: React.FC<PropsType> = ({ pageType, list }) => {
  const totalPrice = useState<number>(list.map(item => item.originalPrice).reduce((a, b) => a + b, 0))

  return (
    <>
      <List
        header={
          <Typography.Title level={5}>
            {pageType === PAGE_TYPE.CART ? '费用明细' : '订单明细'}
          </Typography.Title>
        }
        footer={
          <Row className={styles['payment-card-footer']}>
            <Col>
              <div className={styles['total-price']}>
                总价
                <span>￥{totalPrice}</span>
              </div>
              <div className={styles['save-price']}>已省￥{totalPrice}</div>
            </Col>
            <Col>
              <Button type={'primary'} danger icon={<CheckCircleOutlined />}>
                去支付
              </Button>
            </Col>
          </Row>
        }
        bordered
        renderItem={(item: { title: string; price: number }) => (
          <List.Item>
            <Row>
              <Col span={18}>{item.title}</Col>
              <Col span={6}>{item.price}</Col>
            </Row>
          </List.Item>
        )}
      />
    </>
  )
}
