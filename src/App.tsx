import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {
    HomePage,
    DetailPage
} from "./pages";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/signIn" element={<h1>登录页面</h1>}/>
                <Route path="/register" element={<h1>注册页面</h1>}/>
                <Route path="/detail/:touristRouteId" element={<DetailPage/>}/>
                <Route path="/*" element={<h1>404</h1>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
