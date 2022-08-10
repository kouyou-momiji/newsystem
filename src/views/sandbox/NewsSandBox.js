/*
 * @Author: yanzhourong
 * @Date: 2022-06-29 22:14:55
 * @LastEditTime: 2022-08-10 21:30:54
 * @Description: 
 */
import React from 'react'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import NewsRouter from '../../components/sandbox/NewsRouter'
import './NewsSandBox.css'

import { AutoComplete, Layout, Menu } from 'antd';
const { Content } = Layout;

export default function NewsSandBox() {
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
