import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {
  HomePage,
  DetailPage,
  SearchPage
} from "./pages";
import {Type, UserLayoutContent} from "./layouts/userLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/signIn" element={<UserLayoutContent type={Type.SIGN_IN}/>}/>
        <Route path="/register" element={<UserLayoutContent type={Type.REGISTER}/>}/>
        <Route path="/detail/:touristRouteId" element={<DetailPage/>}/>
        <Route path="/search/:keyword" element={<SearchPage/>}/>
        <Route path="/*" element={<h1>404</h1>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
