/*
 * @Author: yanzhourong
 * @Date: 2022-06-29 22:14:55
 * @LastEditTime: 2022-08-10 22:34:08
 * @Description: 
 */
import React, { useEffect } from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import './NewsSandBox.css'

import { AutoComplete, Layout, Menu } from 'antd';
const { Content } = Layout;

export default function NewsSandBox() {
  NProgress.start()
  useEffect(()=>{
    NProgress.done()
  })
  return (
    <Layout>
      <SideMenu></SideMenu>
      <Layout className="site-layout">
        <TopHeader></TopHeader>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            overflow: 'auto',
          }}
        >
          <NewsRouter />
        </Content>
        
      </Layout>
    </Layout>
  )
}
