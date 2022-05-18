import React from 'react'
import styles from '../subHeader/SubHeader.module.css'
import { Layout, Typography, Steps } from 'antd'
import logo from '../../assets/logo.svg'
import { useNavigate } from 'react-router-dom'

interface PropsType {
  current: number
}

export const SubHeader: React.FC<PropsType> = ({ current }) => {
  const navigate = useNavigate()

  return (
    <div>
      <Layout.Header className={styles['sub-header-container']}>
        <div className={styles['sub-header-content']}>
          <span onClick={() => navigate('/')}>
            <img src={logo} alt="logo" className={styles['app-logo']} />
            <Typography.Title level={3} className={styles['title']}>
              React旅游网
            </Typography.Title>
          </span>
          <Steps
            size="small"
            current={current}
            style={{ marginLeft: 50, width: 500 }}
          >
            <Steps.Step title="选择产品" />
            <Steps.Step title="核对费用" />
            <Steps.Step title="订单支付" />
            <Steps.Step title="完成购买" />
          </Steps>
        </div>
      </Layout.Header>
    </div>
  )
}
