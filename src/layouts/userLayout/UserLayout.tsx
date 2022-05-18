import React, { useEffect, useRef, useState } from 'react'
import styles from './UserLayout.module.css'
import { getAverageRGB } from '../../utils/tools'
import bg01 from '../../assets/images/bg01.jpg'
import bg02 from '../../assets/images/bg02.jpg'
import bg03 from '../../assets/images/bg03.jpg'
import bg04 from '../../assets/images/bg04.jpg'
import bg05 from '../../assets/images/bg05.jpg'
import travelImg from '../../assets/travel.png'
import travelLogo from '../../assets/travel-logo.png'
import { Carousel, Layout, Typography, Dropdown, Menu } from 'antd'
import { TranslationOutlined } from '@ant-design/icons'
import { useSelector } from '../../redux/hooks'
import { useDispatch } from 'react-redux'
import { changeLanguageAction } from '../../redux/language/languageActions'
import {useTranslation} from "react-i18next";

interface layoutStateValue {
  themeColor: string
}

const defaultStateValue: layoutStateValue = {
  themeColor: 'rgb(24, 144, 255)',
}

export const layoutStateContext = React.createContext(defaultStateValue)
export const UserLayout: React.FC = (props) => {
  const imgEle01 = useRef(null)
  const imgEle02 = useRef(null)
  const imgEle03 = useRef(null)
  const imgEle04 = useRef(null)
  const imgEle05 = useRef(null)
  const { Title, Text } = Typography
  const { Header, Content } = Layout
  const [state, setState] = useState(defaultStateValue)
  const language = useSelector((state) => state.language.language)
  const languageList = useSelector((state) => state.language.languageList)
  const {t} = useTranslation()
  const dispatch = useDispatch()

  const onBeforeChange = (from, to) => {
    let rgb
    switch (to) {
      case 0:
        rgb = getAverageRGB(imgEle01.current)
        break
      case 1:
        rgb = getAverageRGB(imgEle02.current)
        break
      case 2:
        rgb = getAverageRGB(imgEle03.current)
        break
      case 3:
        rgb = getAverageRGB(imgEle04.current)
        break
      case 4:
        rgb = getAverageRGB(imgEle05.current)
        break
      default:
        rgb = {
          r: 255,
          g: 255,
          b: 255,
        }
    }
    setState({
      themeColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
    })
  }

  const onChangeLanguage = ({ key }) => {
    dispatch(changeLanguageAction(key))
  }

  useEffect(() => {
    setTimeout(() => {
      const rgb = getAverageRGB(imgEle01.current)
      setState({
        themeColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
      })
    }, 1000)
  }, [])

  return (
    <div className={styles['page-container']}>
      <Carousel
        beforeChange={onBeforeChange}
        className={styles['carousel-container']}
        autoplay
      >
        <img ref={imgEle01} src={bg01} alt="" />
        <img ref={imgEle02} src={bg02} alt="" />
        <img ref={imgEle03} src={bg03} alt="" />
        <img ref={imgEle04} src={bg04} alt="" />
        <img ref={imgEle05} src={bg05} alt="" />
      </Carousel>
      <Layout
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'transparent',
        }}
      >
        <Header
          style={{
            backgroundColor: 'transparent',
          }}
        >
          <div className={styles['header-content']}>
            <Dropdown.Button
              overlay={
                <Menu>
                  {languageList.map((language) => (
                    <Menu.Item key={language.code} onClick={onChangeLanguage}>
                      {language.name}
                    </Menu.Item>
                  ))}
                </Menu>
              }
              placement={'bottomRight'}
              icon={<TranslationOutlined />}
            >
              {language === 'zh' ? '语言' : 'language'}
            </Dropdown.Button>
          </div>
        </Header>
        <Content>
          <div className={styles['page-content']}>
            <img src={travelImg} alt="" />
            <div className={styles['page-section']}>
              <div className={styles['page-title']}>
                <img src={travelLogo} alt="" />
                <Title
                  level={3}
                  style={{
                    marginLeft: 20,
                    color: state.themeColor,
                  }}
                >
                  React 旅游网
                </Title>
              </div>
              <div className={styles['page-describe']}>
                <Text type={'secondary'}>{t('layout.userLayoutDescribe')}</Text>
              </div>
              {/*页面内容*/}
              <layoutStateContext.Provider value={state}>
                {props.children}
              </layoutStateContext.Provider>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  )
}
