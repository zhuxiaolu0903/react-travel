import React from 'react'
import { Button, Result, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { SubHeader } from '../../components'

export const PlaceSuccess: React.FC = () => {
  const navigate = useNavigate()
  return (
    <>
      <Space direction={'vertical'} style={{ width: '100%' }}>
        <SubHeader current={3} />
        <Result
          status="success"
          title="支付成功！"
          subTitle=""
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => navigate('/')}
            >
              返回首页
            </Button>,
          ]}
        />
      </Space>
    </>
  )
}
