/*
 * @Author: yanzhourong
 * @Date: 2022-06-29 22:05:34
 * @LastEditTime: 2022-06-29 22:30:15
 * @Description: 
 */
import React from 'react'
import {HashRouter,Navigate,Route,Routes} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/newssandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/" element={localStorage.getItem("token") ? <NewsSandBox /> : <Navigate to="/login" />}></Route>
      </Routes>
    </HashRouter>
  )
}
