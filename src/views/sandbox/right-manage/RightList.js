/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:28:17
 * @LastEditTime: 2022-08-01 21:19:51
 * @Description: 
 */
import React, { useState,useEffect } from 'react'
import { Table, Tag, Button } from 'antd';
import axios from 'axios';
import {DeleteOutlined, EditOutlined} from '@ant-design/icons';

export default function RightList() {


  const [dataSource, setDataSource] = useState([])

  useEffect(() => {
    axios.get("http://localhost:5000/rights?_embed=children").then(res => {
        const list = res.data
        list[0].children = ''
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
      render: () => {
        return <div>
          <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} />
        </div>
      }
    },
  ];

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
