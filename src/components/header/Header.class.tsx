import React from 'react';
import logo from '../../assets/logo.svg';
import styles from './Header.module.css';
import {
    Typography,
    Dropdown,
    Menu,
    Radio,
    Layout,
    Input
} from "antd";
import {GlobalOutlined} from "@ant-design/icons";
import store from "../../redux/store";
import {LanguageState} from "../../redux/languageReducer";

interface PropsType {
}

interface State extends LanguageState {
}

export class Header extends React.Component<PropsType, State> {

    constructor(prop, state) {
        super(prop);
        const storeState = store.getState()
        this.state = {
            language: storeState.language,
            languageList: storeState.languageList
        }
    }

    render() {
        return (
            <div className={styles['app-header']}>
                {/*顶部区域*/}
                <div className={styles['top-header']}>
                    <div className={styles['inner']}>
                        <Typography.Text>让旅游更幸福</Typography.Text>
                        <Dropdown.Button
                            style={{
                                marginLeft: 15
                            }}
                            overlay={
                                <Menu>
                                    {
                                        this.state.languageList.map(language => (
                                            <Menu.Item key={language.code}>
                                                {language.name}
                                            </Menu.Item>
                                        ))
                                    }
                                </Menu>
                            }
                            icon={<GlobalOutlined/>}
                        >
                            语言：{this.state.language}
                        </Dropdown.Button>
                        <Radio.Group className={styles['button-group']}>
                            <Radio.Button value="注册">注册</Radio.Button>
                            <Radio.Button value="登录">登录</Radio.Button>
                        </Radio.Group>
                    </div>
                </div>
                {/*LOGO区域*/}
                <Layout.Header className={styles['main-header']}>
                    <img src={logo} alt="logo" className={styles['app-logo']}/>
                    <Typography.Title level={3} className={styles['title']}>
                        React旅游网
                    </Typography.Title>
                    <Input.Search
                        placeholder="请输入旅游目的地、主题或关键字"
                        className={styles['search-input']}
                    >
                    </Input.Search>
                </Layout.Header>
                <div className={styles['main-menu']}>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        className={styles['main-menu-container']}
                    >
                        <Menu.Item key="1">旅游首页</Menu.Item>
                        <Menu.Item key="2">周末游</Menu.Item>
                        <Menu.Item key="3">跟团游</Menu.Item>
                        <Menu.Item key="4"> 自由行 </Menu.Item>
                        <Menu.Item key="5"> 私家团 </Menu.Item>
                        <Menu.Item key="6"> 邮轮 </Menu.Item>
                        <Menu.Item key="7"> 酒店+景点 </Menu.Item>
                        <Menu.Item key="8"> 当地玩乐 </Menu.Item>
                        <Menu.Item key="9"> 主题游 </Menu.Item>
                        <Menu.Item key="10"> 定制游 </Menu.Item>
                        <Menu.Item key="11"> 游学 </Menu.Item>
                        <Menu.Item key="12"> 签证 </Menu.Item>
                        <Menu.Item key="13"> 企业游 </Menu.Item>
                        <Menu.Item key="14"> 高端游 </Menu.Item>
                        <Menu.Item key="15"> 爱玩户外 </Menu.Item>
                        <Menu.Item key="16"> 保险 </Menu.Item>
                    </Menu>
                </div>
            </div>
        )
    }
}