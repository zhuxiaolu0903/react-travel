import React from 'react'
import {Button, Col, List, Modal, Row, Skeleton, Typography} from 'antd'
import {
  CheckCircleOutlined,
  CloseOutlined,
  DeleteOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons'
import styles from './PaymentCard.module.css'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import {checkout, clearShoppingCartItem} from '../../redux/shoppingCart/slice'
import listNoData from '../../assets/list-no-data.png'
import {useNavigate} from "react-router-dom";

interface PropsType {
  list: any[]
  loading: boolean
  originalPrice: number
  price: number
}

export const PaymentCard: React.FC<PropsType> = ({
  list,
  loading,
  originalPrice,
  price,
}) => {
  const token = useSelector((state) => state.user.token) as string
  const deleteLoading = useSelector((state) => state.shoppingCart.loading)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const gotoShoppingCart = () => {
    navigate('/search')
  }
  return (
    <>
      <List
        dataSource={list}
        header={
          <Row justify={'space-between'}>
            <Col>
              <Typography.Title level={5}>
                费用明细
              </Typography.Title>
            </Col>
            <Col>
              {list.length > 0 && (
                <Button type={'text'} icon={<DeleteOutlined />} onClick={() => {
                  Modal.confirm({
                    title: '确认退出',
                    icon: <ExclamationCircleOutlined />,
                    content: '是否确认清空购物车？',
                    onOk: () => {
                      dispatch(clearShoppingCartItem({
                        token,
                        itemIds: list.map(item => item.id),
                      }))
                    },
                  })
                }}>
                  清空
                </Button>
              )}
            </Col>
          </Row>
        }
        locale={{
          emptyText: (
            <div className={styles['payment-card-no-data']}>
              <img src={listNoData} alt="暂无数据" />
              <span>
                购物车为空，
                <span
                  style={{ color: '#1890ff', cursor: 'pointer' }}
                  onClick={gotoShoppingCart}
                >
                  添加商品
                </span>
              </span>
            </div>
          ),
        }}
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
                <Button type={'primary'} danger icon={<CheckCircleOutlined />} onClick={async () => {
                  // @ts-ignore
                  const {payload} = await dispatch(checkout(token))
                  if (payload.success) {
                    navigate('/placeOrder1')
                  }
                }}>
                  去支付
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
                    <Col span={18}>
                      <Typography.Title level={5}>
                        {item.title}
                      </Typography.Title>
                      <Typography.Text>{item.description}</Typography.Text>
                    </Col>
                    <Col span={2}>￥{item.price}</Col>
                    <Col span={1}>
                      <Button
                        type={'text'}
                        loading={deleteLoading}
                        onClick={() =>
                          dispatch(
                            clearShoppingCartItem({
                              token,
                              itemIds: [item.id],
                            })
                          )
                        }
                      >
                        <Typography.Text>
                          <CloseOutlined />
                        </Typography.Text>
                      </Button>
                    </Col>
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
