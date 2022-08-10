/*
 * @Author: yanzhourong
 * @Date: 2022-08-10 21:42:50
 * @LastEditTime: 2022-08-10 23:34:27
 * @Description: 
 */
import React, { useEffect, useRef, useState } from 'react'
import { PageHeader, Steps, Button, Form, Input, Select  } from 'antd'
import style from './News.module.css'
import axios from 'axios'
const { Step } = Steps
const { Option } = Select

export default function NewsAdd() {
  const [current, setCurrent] = useState(0)
  const [categoryList, setCategoryList] = useState([])
  const NewsForm = useRef(null)

  const handleNext = () => {
    if(current===0){
      NewsForm.current.validateFields().then(res =>{
        setCurrent(current+1)
      }).catch(error => {
        console.log(error)
      })
    }
  }

  const handlePrevious = () => {
    setCurrent(current-1)
  }

  useEffect(() => {
    axios.get("/categories").then(res=>{
      setCategoryList(res.data)
    })
  }, [])

  return (
    <div>
      <PageHeader
        className="site-page-header"
        // onBack={() => null}
        title="撰写新闻"
        // subTitle="This is a subtitle"
      />
      <Steps current={current}>
        <Step title="基本信息" description="新闻标题，新闻分类" />
        <Step title="新闻内容" description="新闻主题内容" />
        <Step title="新闻提交" description="保存草稿或者提交审核" />
      </Steps>
      <div style={{marginTop:"50px"}}>
        <div className={current===0?'':style.active}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            ref={NewsForm}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Select>
                {
                  categoryList.map(item => {
                    return <Option key={item.id} value={item.title}></Option>
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current===1?'':style.active}>2222222222222222222</div>
        <div className={current===2?'':style.active}>3333333333333333333</div>
      </div>
      <div style={{marginTop:"50px"}}>
        {
          current===2 && <span>
            <Button type='primary'>保存草稿箱</Button>
            <Button danger>提交审核</Button>
          </span>
        }
        { current<2 && <Button type='primary' onClick={handleNext}>下一步</Button> }
        { current>0 && <Button onClick={handlePrevious}>上一步</Button> }
      </div>
    </div>
  )
}
