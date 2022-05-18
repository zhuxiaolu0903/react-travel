import React from 'react'
import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom'
import { HomePage, DetailPage, SearchPage, ShoppingCart } from './pages'
import { Type, UserLayoutContent } from './layouts/userLayout'
import { useSelector } from './redux/hooks'

// 私有路由
const PrivateRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to={'/signIn'} />
}

function App() {
  const token = useSelector((state) => state.user.token)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/signIn"
          element={<UserLayoutContent type={Type.SIGN_IN} />}
        />
        <Route
          path="/register"
          element={<UserLayoutContent type={Type.REGISTER} />}
        />
        <Route path="/detail/:touristRouteId" element={<DetailPage />} />
        <Route path="/search/:keyword" element={<SearchPage />} />
        <Route element={<PrivateRoute isAuthenticated={token !== null} />}>
          <Route path="/shoppingCart" element={<ShoppingCart />} />
        </Route>
        <Route path="/*" element={<h1>404</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
