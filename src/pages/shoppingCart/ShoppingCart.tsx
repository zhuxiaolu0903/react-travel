import React, { useEffect } from 'react'
import {
  PaymentCard,
  ProductList,
  SubHeader,
} from '../../components'
import { Col, Row, Space } from 'antd'
import { useSelector } from '../../redux/hooks'
import { getShoppingCart } from '../../redux/shoppingCart/slice'
import { useDispatch } from 'react-redux'
import styles from './ShoppingCart.module.css'

export const ShoppingCart: React.FC = () => {
  const token = useSelector((state) => state.user.token)
  const shoppingCartList = useSelector((state) => state.shoppingCart.items)
  const loading = useSelector((state) => state.shoppingCart.loading)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      dispatch(getShoppingCart(token))
    }
  }, [token])
  return (
    <>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <SubHeader current={1} />
        <Row
          justify={'center'}
          className={styles['shopping-cart-content-wrapper']}
        >
          <Col span={14}>
            <ProductList
              loading={loading}
              data={{
                productList: shoppingCartList,
                total: shoppingCartList.length,
              }}
            />
          </Col>
          <Col span={8}>
            <PaymentCard
              list={shoppingCartList}
              loading={loading}
              originalPrice={shoppingCartList
                .map((item) => item.price)
                .reduce((a, b) => a + b, 0)}
              price={shoppingCartList
                .map((item) =>
                  parseFloat(
                    (
                      item.price *
                      (item.discountPresent ? item.discountPresent : 1)
                    ).toFixed(2)
                  )
                )
                .reduce((a, b) => a + b, 0)}
            />
          </Col>
        </Row>
      </Space>
    </>
  )
}
