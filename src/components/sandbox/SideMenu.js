/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:11:38
 * @LastEditTime: 2022-08-09 22:59:34
 * @Description: 
 */
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {
  AppstoreOutlined, 
  MailOutlined, 
  SettingOutlined,
  UserOutlined
} from '@ant-design/icons';
import './index.css'
import { Layout, Menu } from 'antd';
import axios from 'axios';
const { Sider } = Layout;

// icon 映射表
const iconList = {
  '/home': <UserOutlined />,
}


function SideMenu(props) {

  const [menu, setMenu] = useState([])
  
  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
      setMenu(res.data)
    })
  }, [])

  const [collapsed, setCollapsed] = useState(false);

  const onClick = (e) => {
    props.history.push(e.key)
  }

  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }

  const { role:{rights} } = JSON.parse(localStorage.getItem("token"))

  const checkPagePermission = (item) => {
    return item.pagepermisson===1 && rights.includes(item.key)
  }
  
  const getItems = (myList) => {
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
      if(item.children?.length>0 && checkPagePermission(item)){
        // return getItem(item.title, item.key, item.icon, getItems(item.children), undefined, function(){console.log("123")})
        return getItem(item.title, item.key, iconList[item.key], getItems(item.children))
      }else{
        return checkPagePermission(item) && getItem(item.title, item.key, iconList[item.key])
      }
    })
  }

  const selectKeys = [props.location.pathname]
  const openKeys = ["/"+props.location.pathname.split("/")[1]]

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
        <div style={{display: "flex", height:"100%", flexDirection:"column"}}>
          <div className="logo" >全球新闻发布管理系统</div>
          <div style={{flex: 1, overflow: 'auto'}}>
            <Menu
              theme="dark"
              mode="inline"
              selectedKeys={selectKeys}
              defaultOpenKeys={openKeys}
              items={getItems(menu)}
              onClick={onClick}
              // items={items}
            />
          </div>
        </div>
      </Sider>
  )
}

export default withRouter(SideMenu)