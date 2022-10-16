import React, { useEffect } from 'react'
import { Footer, Header } from '../../components'
import { useSelector } from '../../redux/hooks'
import { getPendingOrder } from '../../redux/order/slice'
import { useDispatch } from 'react-redux'
import { Button, notification } from 'antd'
import { SmileOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

export const MainLayout: React.FC = ({ children }) => {
  const orderItems = useSelector((state) => state.order.orderItems)
  const token = useSelector((state) => state.user.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (token) {
      dispatch(getPendingOrder(token))
      if (orderItems.length > 0) {
        notification.destroy()
        notification.open({
          type: 'warning',
          message: '温馨提示',
          description: '您还有一个未支付的订单，是否立即前往支付?',
          duration: null,
          btn: (
            <Button
              type="primary"
              size="small"
              onClick={() => {
                notification.destroy()
                navigate('/placeOrder1')
              }}
            >
              前往支付
            </Button>
          ),
          icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        })
      }
    }
  }, [token])
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
      {/*消息提示*/}
    </>
  )
}
