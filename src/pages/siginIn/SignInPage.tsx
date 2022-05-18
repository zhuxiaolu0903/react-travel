import React, { useContext } from 'react'
import { layoutStateContext } from '../../layouts/userLayout'
import styles from './SignInPage.module.css'
import { SignInForm } from './SignInForm'

export const SignInPage: React.FC = () => {
  const { themeColor } = useContext(layoutStateContext)

  return (
    <div className={styles['signIn-page-container']}>
      <SignInForm themeColor={themeColor} />
    </div>
  )
}
