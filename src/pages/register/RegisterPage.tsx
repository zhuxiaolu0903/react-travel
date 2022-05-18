import React, { useContext } from 'react'
import { layoutStateContext } from '../../layouts/userLayout'
import styles from './RegisterPage.module.css'
import { RegisterForm } from './RegisterForm'

export const RegisterPage: React.FC = () => {
  const { themeColor } = useContext(layoutStateContext)

  return (
    <div className={styles['register-page-container']}>
      <RegisterForm themeColor={themeColor} />
    </div>
  )
}
