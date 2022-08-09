/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:11:44
 * @LastEditTime: 2022-08-09 23:09:10
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
import { withRouter } from 'react-router-dom';
const { Header } = Layout;

function TopHeader(props) {
  const [collapsed, setCollapsed] = useState(false);

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const { role:{roleName}, username } = JSON.parse(localStorage.getItem("token"))

  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: roleName,
        },
        {
          key: '2',
          danger: true,
          label: (
            <div onClick={() => {
              localStorage.removeItem("token")
              props.history.replace("/login")
            }}>退出</div>
          ),
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
        <span>欢迎<span style={{color: "#1890ff"}}>{username}</span>回来</span>
        <Dropdown overlay={menu}>
          <a onClick={e => e.preventDefault()}>
            <Avatar size={64} icon={<UserOutlined />} />
          </a>
        </Dropdown>
      </div>
    </Header>
  )
}

export default withRouter(TopHeader)
