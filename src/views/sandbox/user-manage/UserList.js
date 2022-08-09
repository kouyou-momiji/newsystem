/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:28:17
 * @LastEditTime: 2022-08-09 23:28:25
 * @Description: 
 */
import React, { useState,useEffect, useRef } from 'react'
import { Table, Button, Modal, Switch } from 'antd';
import axios from 'axios';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import UserForm from '../../../components/user-manage/UserForm';
const { confirm } = Modal;


export default function UserList() {


  const [dataSource, setDataSource] = useState([])
  const [isAddvisible, setIsAddvisible] = useState(false)
  const [isUpdateVisible, setIsUpdateVisible] = useState(false)
  const [roleList, setRoleList] = useState([])
  const [regionList, setRegionList] = useState([])
  const [isUpdateDisabled, setIsUpdateDisabled] = useState()
  const [currentData, setCurrentData] = useState(null);
  const addForm = useRef(null)
  const updateForm = useRef(null)
  const { roleId, region, username } = JSON.parse(localStorage.getItem("token"))
  const roleObj = {
    "1":"superadmin",
    "2":"admin",
    "3":"editor",
  }
  useEffect(() => {
    axios.get("http://localhost:5000/users?_expand=role").then(res => {
        const list = res.data
        setDataSource(roleObj[roleId]==="superadmin" ? list : [
          ...list.filter(item=>item.username===username),
          ...list.filter(item=>item.region===region&&roleObj[item.roleId]==="editor"),
        ]) 
    })
  },[])
  useEffect(() => {
    axios.get("http://localhost:5000/regions").then(res => {
        const list = res.data
        setRegionList(list) 
    })
  },[])
  useEffect(() => {
    axios.get("http://localhost:5000/roles").then(res => {
        const list = res.data
        setRoleList(list) 
    })
  },[])

  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      // key: 'id',
      filters: [
        ...regionList.map(item => ({
          text: item.title,
          value: item.value,
        })),
        {
          text:"全球",
          value: "全球",
        }
      ],
      onFilter:(value, item) =>{
        if(value==="全球"){
          return item.region===""
        }
        return item.region===value
      },
      render: (region) => {
        return <b>{region==='' ? '全球' : region}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (role) => {
        return role.roleName
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState,item) => {
        return <Switch onChange={() => handleChange(item)} checked={roleState} disabled={item.default}></Switch>
      }
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger type="primary" shape="circle" onClick={() => confirmMethon(item)} icon={<DeleteOutlined />} />
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => handleUpdate(item)} />
        </div>
      }
    },
  ];

  const handleUpdate = (item) => {
    // setTimeout(() => {
      // if(item.roleId===1){
      //   setIsUpdateDisabled(true)
      // }else{
      //   setIsUpdateDisabled(false)
      // }
    //   setIsUpdateVisible(true)
    //   updateForm.current.setFieldsValue(item)
    // },0)
    setIsUpdateVisible(true)
    setTimeout(() => {
      if(item.roleId===1){
        setIsUpdateDisabled(true)
      }else{
        setIsUpdateDisabled(false)
      }
      setCurrentData(item)
      item.roleId = item.roleId+""
      updateForm.current.setFieldsValue(item)
    }, 0);
    
  }

  const handleChange = (item) => {
    item.roleState = !item.roleState
    setDataSource([...dataSource])
    axios.patch(`http://localhost:5000/users/${item.id}`,{
      roleState: item.roleState
    })
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
    setDataSource(dataSource.filter(data => data.id !== item.id))
    axios.delete(`http://localhost:5000/users/${item.id}`)
  }

  const addFormOk = () => {
    addForm.current.validateFields().then(value => {
      setIsAddvisible(false)
      addForm.current.resetFields()
      axios.post(`http://localhost:5000/users`, {
        ...value,
        "roleState": true,
        "default": false,
      }).then(res => {
        axios.get("http://localhost:5000/users?_expand=role").then(res => {
            const list = res.data
            setDataSource(list) 
        })
            
      })
    }).catch(err => {
      console.log('error=',err)
    })
    
  }

  const updateFormOk = () => {
    updateForm.current.validateFields().then(value => {
      setIsUpdateVisible(false)
      axios.patch(`http://localhost:5000/users/${currentData.id}`, {
        ...value,
      }).then(res => {
        axios.get("http://localhost:5000/users?_expand=role").then(res => {
            const list = res.data
            setDataSource(list) 
        })  
      })
    }).catch(err => {
      console.log('error=',err)
    })
  }

  return (
    <div>
      <Button type='primary' onClick={() => setIsAddvisible(true)}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} 
      pagination={{
        pageSize: 5,
      }}
      rowKey={item=>item.id}
      />

      <Modal
        visible={isAddvisible}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={()  => {setIsAddvisible(false)}}
        onOk={addFormOk}
      >
        <UserForm regionList={regionList} roleList={roleList} ref={addForm}></UserForm>
      </Modal>

      <Modal
        visible={isUpdateVisible}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={()  => {setIsUpdateVisible(false);setIsUpdateDisabled(!isUpdateDisabled)}}
        onOk={updateFormOk}
      >
        <UserForm regionList={regionList} roleList={roleList} isUpdate={true} ref={updateForm} isUpdateDisabled={isUpdateDisabled}></UserForm>
      </Modal>

    </div>
  )
}
