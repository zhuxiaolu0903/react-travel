import React, {useState} from "react"
import {Button, Form, Input, message, Modal} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./RegisterForm.module.css";
import {useNavigate} from "react-router-dom";
import axios from "axios";

interface PropsType {
  themeColor: string
}

export const RegisterForm: React.FC<PropsType> = ({themeColor}) => {

  const navigator = useNavigate()
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const onFinish = async (value) => {
    const {username, password} = value
    setSubmitLoading(true)
    try {
      const res = await axios.post('http://127.0.0.1:8080/auth/register', {
        username,
        password
      })
      setSubmitLoading(false)
      if (res.data) {
        navigator('/signIn')
        message.success('注册成功！')
      } else {
        Modal.error({
          title: '注册失败',
          content: '抱歉，此用户名已被注册，请更换用户名后再试！'
        })
      }
    } catch (e) {
      setSubmitLoading(false)
      Modal.error({
        title: '注册失败',
        content: e.message
      })
    }
  }

  return (
    <Form
      name="registerForm"
      autoComplete="off"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{required: true, message: '请输入用户名'}]}
      >
        <Input placeholder={"请输入用户名"} prefix={<UserOutlined/>}/>
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{required: true, message: '请输入密码'}]}
      >
        <Input.Password placeholder={"请输入密码"} prefix={<LockOutlined/>}/>
      </Form.Item>
      <Form.Item
        name="confirm"
        rules={[
          {required: true, message: '请再次输入密码'},
          ({getFieldValue}) => ({
            validator(_, value) {
              if (!value || value === getFieldValue('password')) {
                return Promise.resolve()
              }
              return Promise.reject('两次密码不一致！')
            }
          })
        ]}
      >
        <Input.Password placeholder={"请再次输入密码"} prefix={<LockOutlined/>}/>
      </Form.Item>
      <Form.Item>
        <p className={styles["link-text"]} style={{
          marginTop: '10px',
          color: themeColor
        }} onClick={() => navigator('/signIn')}>已有账号，立即登录</p>
        <Button type="primary" htmlType="submit" className={styles["login-form-button"]} loading={submitLoading}>
          立即注册
        </Button>
      </Form.Item>
    </Form>
  )
}