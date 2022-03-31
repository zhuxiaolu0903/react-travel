import React, {useContext} from "react";
import {layoutStateContext} from "../../layouts/userLayout";
import {Button, Checkbox, Col, Input, Row, Space} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import styles from "./SignInPage.module.css"
import {useNavigate} from "react-router-dom";

export const SignInPage: React.FC = () => {

  const {themeColor} = useContext(layoutStateContext)
  const navigate = useNavigate()

  return (
    <div className={styles["signIn-page-container"]}>
      <Space direction={"vertical"} size={"large"}>
        <Input placeholder={"请输入用户名"} prefix={<UserOutlined/>}/>
        <Input.Password placeholder={"请输入密码"} prefix={<LockOutlined/>}/>
        <Row justify={"space-between"} align={"middle"}>
          <Col><Checkbox checked>自动登录</Checkbox></Col>
          <Col>
            <span className={styles["link-text"]} style={{
              color: themeColor
            }} onClick={() => navigate('/register')}>立即注册</span>
          </Col>
        </Row>
        <Button type="primary" block onClick={() => navigate('/')}>立即登录</Button>
      </Space>
    </div>
  )
}