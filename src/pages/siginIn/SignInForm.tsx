import React, { useEffect } from 'react'
import { Button, Checkbox, Col, Form, Input, Row } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from '../register/RegisterForm.module.css'
import { useNavigate } from 'react-router-dom'
import { signIn } from '../../redux/user/slice'
import { useDispatch } from 'react-redux'
import { useSelector } from '../../redux/hooks'
import { useTranslation } from 'react-i18next'

interface PropsType {
  themeColor: string
}

export const SignInForm: React.FC<PropsType> = ({ themeColor }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const submitLoading = useSelector((state) => state.user.submitLoading)
  const token = useSelector((state) => state.user.token)
  const { t } = useTranslation()

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])

  const onFinish = (values) => {
    const { username, password } = values
    dispatch(signIn({ username, password }))
  }

  return (
    <Form name="signInForm" autoComplete="off" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('signIn.inputUsername') }]}
      >
        <Input
          placeholder={t('signIn.inputUsername')}
          prefix={<UserOutlined />}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('signIn.inputPassword') }]}
      >
        <Input.Password
          placeholder={t('signIn.inputPassword')}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <Row
          justify={'space-between'}
          align={'middle'}
          style={{ marginBottom: 25 }}
        >
          <Col>
            <Checkbox checked>{t('signIn.autoSignIn')}</Checkbox>
          </Col>
          <Col>
            <span
              className={styles['link-text']}
              style={{
                color: themeColor,
              }}
              onClick={() => navigate('/register')}
            >
              {t('signIn.register')}
            </span>
          </Col>
        </Row>
        <Button
          type="primary"
          htmlType="submit"
          loading={submitLoading}
          className={styles['login-form-button']}
        >
          {t('signIn.signIn')}
        </Button>
      </Form.Item>
    </Form>
  )
}
