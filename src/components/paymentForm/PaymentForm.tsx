import React, { useEffect, useState } from 'react'
import Cards from 'react-credit-cards'
import styles from './PaymentForm.module.css'
import 'react-credit-cards/es/styles-compiled.css'
import { Form, Input } from 'antd'
import { useSelector } from '../../redux/hooks'
import jwt_decode, { JwtPayload as DefaultJwtPayload } from 'jwt-decode'
import {CreditCardOutlined, UserOutlined} from "@ant-design/icons";
interface JwtPayload extends DefaultJwtPayload {
  username: string
}
export const PaymentForm: React.FC = () => {
  const token = useSelector((state) => state.user.token)
  const [username, setUsername] = useState<string>('')
  const [cvc, setCvc] = useState<string>('')
  const [expiry, setExpiry] = useState<string>('')
  const [focus, setFocus] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [cardNo, setCardNo] = useState<string>('')

  useEffect(() => {
    if (token) {
      const { username } = jwt_decode<JwtPayload>(token)
      setUsername(username)
    }
  }, [token])

  const handleInputFocus = (e) => {
    setFocus(e.target.name)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setCardNo(value.replace(/([^0-9]|\s)/g,'').replace(/(\d{4})/g,'$1 '))
    setName(cardNo)
  }
  return (
    <div id="PaymentForm" className={styles['payment-form-container']}>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={cardNo}
      />
      <div style={{ marginTop: 20 }}>
        <Form
          name="basic"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item>
            <Input value={username} prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item>
            <Input
              value={cardNo}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              prefix={<CreditCardOutlined />}
              ref={(input) => input && input.focus()}
            />
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}
