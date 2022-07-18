/*
 * @Author: yanzhourong
 * @Date: 2022-06-29 22:05:34
 * @LastEditTime: 2022-07-18 07:21:50
 * @Description: 
 */
import React from 'react'
import {HashRouter,Redirect,Route, Switch} from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewsSandBox'

export default function IndexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={NewsSandBox} /> */}
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <NewsSandBox> </NewsSandBox>
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </HashRouter>
  )
}
