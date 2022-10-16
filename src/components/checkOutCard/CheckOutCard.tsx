import React from 'react'
import { Button, Col, List, Row, Skeleton, Typography } from 'antd'
import {
  CheckCircleOutlined,
} from '@ant-design/icons'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { checkout } from '../../redux/shoppingCart/slice'
import listNoData from '../../assets/list-no-data.png'
import { useNavigate } from 'react-router-dom'
import {placeOrder} from "../../redux/order/slice";

interface PropsType {
  list: any[]
  loading: boolean
  originalPrice: number
  price: number
}

export const CheckOutCard: React.FC<PropsType> = ({
  list,
  loading,
  originalPrice,
  price,
}) => {
  const token = useSelector((state) => state.user.token) as string
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return (
    <>
      <List
        header={
          <Row justify={'space-between'}>
            <Col>
              <Typography.Title level={5}>订单明细</Typography.Title>
            </Col>
          </Row>
        }
        footer={
          list.length > 0 && (
            <Row
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
                  <Typography.Text type="danger">￥{price}</Typography.Text>
                </div>
              </Col>
              <Col>
                <Button
                  type={'primary'}
                  danger
                  icon={<CheckCircleOutlined />}
                  loading={loading}
                  onClick={async () => {
                    // @ts-ignore
                    const { payload } = await dispatch(placeOrder(token))
                    if (payload.success) {
                      navigate('/placeSuccess1')
                    }
                  }}
                >
                  支付
                </Button>
              </Col>
            </Row>
          )
        }
        bordered
        style={{ backgroundColor: '#ffffff', marginLeft: '16px' }}
      >
        <div style={{ margin: '18px auto', width: '90%' }}>
          {list.length > 0 ? (
            <Skeleton loading={loading} active>
              <List.Item.Meta
                description={list.map((item) => (
                  <Row
                    key={item.id}
                    style={{ marginBottom: '8px' }}
                    justify={'space-around'}
                  >
                    <Col span={20}>
                      <Typography.Title level={5}>
                        {item.title}
                      </Typography.Title>
                    </Col>
                    <Col span={4}>￥{item.price}</Col>
                  </Row>
                ))}
              />
            </Skeleton>
          ) : (
            <div className="list-no-data-container">
              <img src={listNoData} alt="" />
              <span>暂无数据</span>
            </div>
          )}
        </div>
      </List>
    </>
  )
}
