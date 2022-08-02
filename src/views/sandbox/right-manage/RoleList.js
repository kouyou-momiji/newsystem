/*
 * @Author: yanzhourong
 * @Date: 2022-07-18 07:28:04
 * @LastEditTime: 2022-08-02 23:11:15
 * @Description: 
 */
import React,{useState, useEffect} from 'react'
import { Table, Button, Modal, Tree } from 'antd'
import axios from 'axios'
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

export default function RoleList() {
  const [dataSource, setDataSource] = useState([])
  const [rightList, setRightList] = useState([])
  const [currentRights, setCurrentRights] = useState([])
  const [currentId, setCurrentId] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false)
  


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
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      render: (item) => {
        return <div>
          <Button danger type="primary" shape="circle" icon={<DeleteOutlined />} onClick={() => confirmMethod(item)}/>
          <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={() => {
            setCurrentRights(item.rights) 
            setCurrentId(item.id)
            setIsModalVisible(true)}}
          />
        </div>
      }
    },
  ]
  useEffect(() => {
    axios.get('http://localhost:5000/roles').then(res => {
      setDataSource(res.data)
    })
    axios.get('http://localhost:5000/rights?_embed=children').then(res => {
      setRightList(res.data)
    })
  }, [])

  const confirmMethod = (item) => {
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
      axios.delete(`http://localhost:5000/roles/${item.id}`)
  }

  const handleOk = () => {
    axios.patch(`http://localhost:5000/roles/${currentId}`, {
      rights: currentRights
    })
    setDataSource(dataSource.map(item => {
      if(item.id===currentId){
        return {
          ...item,
          rights: currentRights
        }
      }
      return item
    }))
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const onCheck = (checkedKeys) => {
    setCurrentRights(checkedKeys.checked)
  }

  return (
    <div>
      <Table dataSource={dataSource} columns={columns} rowKey={(item)=>item.id}></Table>
      <Modal title="权限分配" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          // defaultExpandedKeys={['0-0-0', '0-0-1']}
          // defaultSelectedKeys={['0-0-0', '0-0-1']}
          checkedKeys={currentRights}
          // onSelect={onSelect}
          onCheck={onCheck}
          checkStrictly={true}
          treeData={rightList}
        />
      </Modal>
    </div>
  )
}
