/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:28:17
 * @LastEditTime: 2022-08-01 22:17:13
 * @Description: 
 */
import React, { useState,useEffect } from 'react'
import { Table, Tag, Button, Modal, Popover, Switch } from 'antd';
import axios from 'axios';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function RightList() {


  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
        const list = res.data
        list.forEach(item => {
            if(item.children.length === 0)
            item.children = ""
        })
        setDataSource(list) 
    })
  },[])

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      // key: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '权限名称',
      dataIndex: 'title',
      // key: 'title',
    },
    {
      title: '权限路径',
      dataIndex: 'key',
      // key: 'key',
      render: (key) => {
        return <Tag color={'orange'}>{key}</Tag>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger type="primary" shape="circle" onClick={() => confirmMethon(item)} icon={<DeleteOutlined />} />
          <Popover content={<div style={{textAlign: 'center'}}>
            <Switch checked={item.pagepermisson} onChange={() => {switchMethod(item)}}></Switch>
          </div>} title="页面配置项" trigger={item.pagepermisson===undefined ? "" : "click"}>
            <Button type="primary" shape="circle" icon={<EditOutlined />} disabled={item.pagepermisson===undefined}/></Popover>
        </div>
      }
    },
  ];

  const switchMethod = (item) => {
    item.pagepermisson = item.pagepermisson===1?0:1
    setDataSource([...dataSource])
    if(item.grade===1){
        axios.patch(`http://localhost:5000/rights/${item.id}`, {
            pagepermisson: item.pagepermisson
        })
    }else{
        axios.patch(`http://localhost:5000/children/${item.id}`,{
            pagepermisson: item.pagepermisson
        })
    }
  }

  const confirmMethon = (item) => {
    confirm({
        title: '你确定要删除吗?',
        icon: <ExclamationCircleOutlined />,
        content: 'Some descriptions',
        onOk() {
            deleteMethod(item);
        },
        onCancel() {
          console.log('Cancel');
        },
      });
  }

  const deleteMethod = (item) => {
    console.log(item)
    if(item.grade === 1){
        setDataSource(dataSource.filter(data => data.id !== item.id))
        axios.delete(`http://localhost:5000/rights/${item.id}`)
    }else{
         let list = dataSource.filter(data => data.id===item.rightId)
         list[0].children = list[0].children.filter(data => data.id!==item.id)
         setDataSource([...dataSource])
         axios.delete(`http://localhost:5000/children/${item.id}`)
    }
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{
        pageSize: 5,
      }}
      />
    </div>
  )
}
