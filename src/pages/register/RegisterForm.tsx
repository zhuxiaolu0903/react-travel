import React, { useState } from 'react'
import { Button, Form, Input, message, Modal } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import styles from './RegisterForm.module.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useTranslation } from 'react-i18next'

interface PropsType {
  themeColor: string
}

export const RegisterForm: React.FC<PropsType> = ({ themeColor }) => {
  const navigate = useNavigate()
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const { t } = useTranslation()

  const onFinish = async (values) => {
    const { username, password } = values
    setSubmitLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:8080/auth/register', {
        username,
        password,
      })
      setSubmitLoading(false)
      if (res.data) {
        navigate('/signIn')
        message.success('注册成功！')
      } else {
        Modal.error({
          title: '注册失败',
          content: '抱歉，此用户名已被注册，请更换用户名后再试！',
        })
      }
    } catch (e) {
      setSubmitLoading(false)
      Modal.error({
        title: '注册失败',
        content: e.message,
      })
    }
  }

  return (
    <Form name="registerForm" autoComplete="off" onFinish={onFinish}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: t('register.inputUsername') }]}
      >
        <Input placeholder={t('register.inputUsername')} prefix={<UserOutlined />} />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: t('register.inputPassword') }]}
      >
        <Input.Password placeholder={t('register.inputPassword')} prefix={<LockOutlined />} />
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[
          { required: true, message: t('register.againInputPassword') },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || value === getFieldValue('password')) {
                return Promise.resolve()
              }
              return Promise.reject('两次密码不一致！')
            },
          }),
        ]}
      >
        <Input.Password
          placeholder={t('register.againInputPassword')}
          prefix={<LockOutlined />}
        />
      </Form.Item>
      <Form.Item>
        <p
          className={styles['link-text']}
          style={{
            color: themeColor,
          }}
          onClick={() => navigate('/signIn')}
        >
          {t('register.signIn')}
        </p>
        <Button
          type="primary"
          htmlType="submit"
          className={styles['login-form-button']}
          loading={submitLoading}
        >
          {t('register.register')}
        </Button>
      </Form.Item>
    </Form>
  )
}
