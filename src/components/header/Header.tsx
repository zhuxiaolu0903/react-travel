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
import {useNavigate} from 'react-router-dom';
import {useSelector} from "../../redux/hooks";
import {useDispatch} from "react-redux";
import {addLanguageAction, changeLanguageAction} from "../../redux/language/languageActions";
import {useTranslation} from "react-i18next";

export const Header: React.FC = () => {

    const navigate = useNavigate()
    const languageList = useSelector(state => state.language.languageList)
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const menuClickHandler = (e) => {
        const {key} = e
        if (key === 'new') {
            // 新增语言
            dispatch(addLanguageAction('新语言', 'new_lang'))
        } else {
            // 切换语言
            dispatch(changeLanguageAction(key))
        }
    }

    return (
        <div className={styles['app-header']}>
            {/*顶部区域*/}
            <div className={styles['top-header']}>
                <div className={styles['inner']}>
                    <Typography.Text>{t('header.slogan')}</Typography.Text>
                    <Dropdown.Button
                        style={{
                            marginLeft: 15
                        }}
                        overlay={
                            <Menu>
                                {
                                    languageList.map(language => (
                                        <Menu.Item key={language.code} onClick={menuClickHandler}>
                                            {language.name}
                                        </Menu.Item>
                                    ))
                                }
                                <Menu.Item key={'new'} onClick={menuClickHandler}>
                                    {t('header.add_new_language')}
                                </Menu.Item>
                            </Menu>
                        }
                        icon={<GlobalOutlined/>}
                    >
                        语言
                    </Dropdown.Button>
                    <Radio.Group className={styles['button-group']}>
                        <Radio.Button value="注册" onClick={() => navigate('/register')}>{t('header.register')}</Radio.Button>
                        <Radio.Button value="登录" onClick={() => navigate('/signIn')}>{t('header.signin')}</Radio.Button>
                    </Radio.Group>
                </div>
            </div>
            {/*LOGO区域*/}
            <Layout.Header className={styles['main-header']}>
                <span onClick={() => navigate('/')}>
                    <img src={logo} alt="logo" className={styles['app-logo']}/>
                    <Typography.Title level={3} className={styles['title']}>
                        React旅游网
                    </Typography.Title>
                </span>
                <Input.Search
                    placeholder="请输入旅游目的地、主题或关键字"
                    className={styles['search-input']}
                    onSearch={(keyword) => navigate(`/search/${keyword}`)}
                >
                </Input.Search>
            </Layout.Header>
            <div className={styles['main-menu']}>
                <Menu
                    theme="dark"
                    mode="horizontal"
                    className={styles['main-menu-container']}
                >
                    <Menu.Item key="1"> {t("header.home_page")} </Menu.Item>
                    <Menu.Item key="2"> {t("header.weekend")} </Menu.Item>
                    <Menu.Item key="3"> {t("header.group")} </Menu.Item>
                    <Menu.Item key="4"> {t("header.backpack")} </Menu.Item>
                    <Menu.Item key="5"> {t("header.private")} </Menu.Item>
                    <Menu.Item key="6"> {t("header.cruise")} </Menu.Item>
                    <Menu.Item key="7"> {t("header.hotel")} </Menu.Item>
                    <Menu.Item key="8"> {t("header.local")} </Menu.Item>
                    <Menu.Item key="9"> {t("header.theme")} </Menu.Item>
                    <Menu.Item key="10"> {t("header.custom")} </Menu.Item>
                    <Menu.Item key="11"> {t("header.study")} </Menu.Item>
                    <Menu.Item key="12"> {t("header.visa")} </Menu.Item>
                    <Menu.Item key="13"> {t("header.enterprise")} </Menu.Item>
                    <Menu.Item key="14"> {t("header.high_end")} </Menu.Item>
                    <Menu.Item key="15"> {t("header.outdoor")} </Menu.Item>
                    <Menu.Item key="16"> {t("header.insurance")} </Menu.Item>
                </Menu>
            </div>
        </div>
    )
}