/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:11:38
 * @LastEditTime: 2022-07-20 23:32:42
 * @Description: 
 */
import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppstoreOutlined, 
  MailOutlined, 
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.css'
import { Layout, Menu } from 'antd';
const { Sider } = Layout;

// 模拟数组结构
const menuList = [
  {
    key: "/home",
    title: "首页",
    icon: <UserOutlined />
  },
  {
    key: "/user-manage",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/user-manage/list",
        title: "用户列表",
        icon: <UserOutlined />
      }
    ]
  },
  {
    key: "/right-manage",
    title: "权限管理",
    icon: <UserOutlined />,
    children: [
      {
        key: "/right-manage/role/list",
        title: "角色列表",
        icon: <UserOutlined />
      },
      {
        key: "/right-manage/right/list",
        title: "权限列表",
        icon: <UserOutlined />,
      }
    ]
  },
]


function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type
  };
}

function getItems(myList){
  // let items = []
  // menuList.forEach(item => {
  //   if(item.children){
  //     items.push(getItem(item.title, item.key, item.icon, item.children.map(subItem => {return getItem(subItem.title, subItem.key, subItem.icon)}))) 
  //   }else{
  //     items.push(getItem(item.title, item.key, item.icon)) 
  //   }
    
  // })
  // return items
  // 第二种
  // return menuList.map(item => {
  //   if(item.children){
  //     return getItem(item.title, item.key, item.icon, item.children.map(subItem => {return getItem(subItem.title, subItem.key, subItem.icon)}))
  //   }else{
  //     return getItem(item.title, item.key, item.icon)
  //   }
  // })
  // 第三种，递归，可处理多个层级
  return myList.map(item => {
    if(item.children){
      // return getItem(item.title, item.key, item.icon, getItems(item.children), undefined, function(){console.log("123")})
      return getItem(item.title, item.key, item.icon, getItems(item.children))
    }else{
      return getItem(item.title, item.key, item.icon)
    }
  })
}


function SideMenu(props) {
  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    props.history.push(e.key)
  }

  const items = [
    getItem('Navigation One', 'sub1', <MailOutlined />, [
      getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
      getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),
    getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
      getItem('Option 5', '5'),
      getItem('Option 6', '6'),
      getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),
    getItem('Navigation Three', 'sub4', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
    getItem('用户管理', 'sub5', <SettingOutlined />, [
      getItem('Option 9', '9'),
      getItem('Option 10', '10'),
      getItem('Option 11', '11'),
      getItem('Option 12', '12'),
    ]),
  ];

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" >全球新闻发布管理系统</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          items={getItems(menuList)}
          onClick={onClick}
          // items={items}
        />
      </Sider>
  )
}

export default withRouter(SideMenu)