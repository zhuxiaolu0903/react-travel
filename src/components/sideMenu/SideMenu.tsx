import React from 'react'
import styles from './SideMenu.module.css'
import { Menu } from 'antd'
import { sideMenuList } from './mockup'
import { ShopOutlined } from '@ant-design/icons/lib'

export const SideMenu: React.FC = () => {
  return (
    <Menu mode="vertical" className={styles['side-menu']}>
      {sideMenuList.map((m, index) => (
        <Menu.SubMenu
          key={`side-menu-${index}`}
          title={
            <span className={styles['menu-item-container']}>
              <ShopOutlined />
              {m.title}
            </span>
          }
        >
          {m.subMenu.map((sm, smIndex) => (
            <Menu.SubMenu
              key={`sub-menu-${index}-${smIndex}`}
              title={
                <span className={styles['menu-item-container']}>
                  <ShopOutlined />
                  {sm.title}
                </span>
              }
            >
              {sm.subMenu.map((sms, smsIndex) => (
                <Menu.Item key={`sms-sub-menu-${index}-${smIndex}-${smsIndex}`}>
                  <span className={styles['menu-item-container']}>
                    <ShopOutlined />
                    {sms}
                  </span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}
