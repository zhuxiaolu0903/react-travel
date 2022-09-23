import React, { useState } from 'react'
import { Button, Col, List, Row, Skeleton, Typography } from 'antd'
import styles from './PaymentCard.module.css'
import { CheckCircleOutlined } from '@ant-design/icons'
import { useSelector } from '../../redux/hooks'
import Text from 'antd/es/typography/Text'

export enum PAGE_TYPE {
  CART = 'cart',
  ORDER = 'order',
}

interface PropsType {
  pageType: PAGE_TYPE
  list: any[]
  loading: boolean
  originalPrice: number
  price: number
}

export const PaymentCard: React.FC<PropsType> = ({
  pageType,
  list,
  loading,
  originalPrice,
  price,
}) => {
  return (
    <>
      <List
        header={
          <Typography.Title level={5}>
            {pageType === PAGE_TYPE.CART ? '费用明细' : '订单明细'}
          </Typography.Title>
        }
        footer={
          <Row
            className={styles['payment-card-footer']}
            justify={'space-between'}
          >
            <Col>
              <div>
                总价：
                <Typography.Text type="danger" delete>
                  ￥{originalPrice}
                </Typography.Text>
              </div>
              <div>
                已省：
                <Typography.Text type="danger">
                  ￥{price}
                </Typography.Text>
              </div>
            </Col>
            <Col>
              <Button type={'primary'} danger icon={<CheckCircleOutlined />}>
                去支付
              </Button>
            </Col>
          </Row>
        }
        bordered
        style={{ backgroundColor: '#ffffff', marginLeft: '16px' }}
      >
        <div style={{ margin: '18px auto', width: '90%' }}>
          <Skeleton loading={loading} active>
            <List.Item.Meta
              description={list.map(
                  item => (
                  <Row key={new Date().getTime()}>
                    <Col span={18}>
                      <Typography.Title level={5}>{item.title}</Typography.Title>
                      <Typography.Text>{item.description}</Typography.Text>
                    </Col>
                    <Col span={6}>￥{item.price}</Col>
                  </Row>
                )
              )}
            />
          </Skeleton>
        </div>
      </List>
    </>
  )
}
