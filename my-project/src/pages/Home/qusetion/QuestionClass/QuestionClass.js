import React,{useEffect,useState} from "react";
import { connect } from "dva";
import "./QuestionClass.css";
import { Table, Divider, Tag,Icon } from "antd";
import { Button, Modal, Form, Input} from 'antd';
const { Column, ColumnGroup } = Table;
// const { getFieldDecorator } = form;
function QuestionClass(props) {
  
    useEffect(()=>{
        props.getQuestion();
    
    },[props.questionClassData])

const data=props.questionClassData;

  const [visible,setvisible]=useState(false)
  const [inputValue,setInputValue]=useState("")

  let showModal=()=>{
     setvisible(true);
  }

  //点击确定
  let handleOk=()=>{
      console.log(2)
      console.log(inputValue);
      setvisible(false);
      if(inputValue){
        props.addQuestion({text:inputValue,sort:(props.questionClassData.length+1).toString()});
      }
      setInputValue("")

  }

  //点击取消
  let handleCancel=()=>{
    setvisible(false);
      
  }

  //设置input框的值
  let changeInput=(e)=>{
      console.log(e.target.value);
      setInputValue(e.target.value);

  }

  return (
    <div>
       
      <h1 className="title">试题分类</h1>
      <div className="QuestionClass_addType">
      <div className="addBox">
        <Button type="primary" onClick={showModal}>
         添加类型
        </Button>
        <Modal
          title="创建新类型"
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="确认"
          cancelText="取消"
        >

    <Input placeholder="请输入类型名称"  value={inputValue} onChange={changeInput}/>
        
        </Modal>
      </div>
     
        <Table dataSource={data}  pagination={false}>
            <Column title="类型ID" dataIndex="questions_type_id" key="questions_type_id" />
          <Column title="类型名称" dataIndex="questions_type_text" key="questions_type_text" />
          <Column title="操作" dataIndex="questions_type_sort " key="questions_type_sort" />
         
        </Table>
      
      </div>
    </div>
  );
}

QuestionClass.propTypes = {};

 const mapStateToProps = (state) => {
    return {
        ...state.questionClass
      
    }
}

 const mapDispatchToProps = dispatch => {
    return {
      //获取所有的数据
       getQuestion: () => {
           dispatch({
               type:"questionClass/questionClass",

           })

        },
        //添加数据
        addQuestion:(payload)=>{
          console.log(payload);
            dispatch({
                type:"questionClass/addType",
                payload:payload,
            })
            

        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(QuestionClass);