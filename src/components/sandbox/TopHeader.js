/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:11:44
 * @LastEditTime: 2022-07-19 07:05:50
 * @Description: 
 */
import React, { useState } from 'react'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Dropdown, Avatar } from 'antd';
const { Header } = Layout;

export default function TopHeader() {
  const [collapsed, setCollapsed] = useState(false);

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: '超级管理员',
        },
        {
          key: '2',
          danger: true,
          label: '退出',
        },
      ]}
    />
  );
  
  return (
    <Header className="site-layout-background" style={{ padding: '0 16px' }}>
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: () => setCollapsed(!collapsed),
      })} */}
      {
        collapsed ? <MenuUnfoldOutlined onClick={changeCollapsed}/> : <MenuFoldOutlined onClick={changeCollapsed}/>
      }
      <div style={{float: 'right'}}>
        <span>欢迎admin回来</span>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Avatar size={64} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}
