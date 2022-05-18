import React from 'react'
import { Footer, Header } from '../../components'

export const MainLayout: React.FC = ({ children }) => {
  return (
    <>
      <Header />
      <>{children}</>
      <Footer />
    </>
  )
}
