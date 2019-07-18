import React, { useState, useEffect } from "react";
import { connect } from "dva";
import {  Select, Button } from "antd";
import List from './lists'
import checkItem from  "./checkItem.scss";
function questionsL(props) {
  useEffect(() => {
    props.lookCheck();
    props.examTypes();
    props.getQuestionsTypes();
    props.questions();
  }, []);

  const { Option } = Select;
  
  //考试类型：
  const [seleValue, setSeleValue] = useState("");
  //题目类型
  const [seleTypeValue, setseleTypeValue] = useState("");
  //课程类型
  const [typeData, setTypeData] = useState("");
  const [ind,setind]=useState("-1");

  let seleFn = e => {
    setSeleValue(e);
  };
  let typeFn = e => {
    setseleTypeValue(e);
  };
  let s = "";
  let lisFn = e => {
    s = e.target.getAttribute("datakey");
    setind(e.target.getAttribute("dataind"));

    setTypeData(s);

  };
  //点击按钮时get请求数据
  let btnFn = () => {
    let obj={
      questions_type_id: seleTypeValue,
      exam_id: seleValue,
      subject_id: typeData
    }
    for(let i in obj){
       if(obj[i]===""){
          delete obj[i]
       }  
    }
    props.condition(obj);
  };


  return (
    <div>
      <h1 className={checkItem.h1}>查看试题</h1>
      <div className={checkItem.box}>
        <div className={checkItem.top}>
          <ul>
            <p className={checkItem.ql_p}>课程类型:</p>
            {props.data && props.data.map((item, index) => (
                <li key={index} onClick={lisFn} dataind={index} datakey={item.subject_id} className={ind==index?checkItem.active:""} dataind={index}>
                  {item.subject_text}
                </li>
              ))}
          </ul>
          <ol>
            <li>
              考试类型: 
              <Select defaultValue="" value={seleValue} onChange={seleFn} style={{ width: 160 }}>
                {props.examTData &&
                  props.examTData.map((item, index) => (
                    <Option key={index} value={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  ))}
              </Select>
            </li>
            <li>
              题目类型: 
              <Select defaultValue="" value={seleTypeValue} onChange={typeFn} style={{ width: 160 }}>
                {props.getQueData &&
                  props.getQueData.map((item, index) => (
                    <Option key={index} value={item.questions_type_id}>
                      {item.questions_type_text}
                    </Option>
                  ))}
              </Select>
            </li>
            <li>
              <Button type="primary" icon="search" onClick={btnFn}>
                查询
              </Button>
            </li>
          </ol>
        </div>
        <div className={checkItem.buttom}>
          {props.questionsData &&props.questionsData.map((item, index) =><List key={index} item={item}></List>)}
        </div>
      </div>
    </div>
  );
}

questionsL.propTypes = {};

const mapStateToProps = state => {
  return { ...state.lookCheck };
};

const mapDispatchToPorps = dispatch => {
  return {
    lookCheck: payload => {
      dispatch({
        type: "lookCheck/lookCheck",
        payload
      });
    },
    examTypes: payload => {
      dispatch({
        type: "lookCheck/examTypes",
        payload
      });
    },
    getQuestionsTypes: payload => {
      console.log(payload);
      dispatch({
        type: "lookCheck/getQuestionsTypes",
        payload
      });
    },
    questions: payload => {
      dispatch({
        type: "lookCheck/questions",
        payload
      });
    },
    condition: payload => {
      dispatch({
        type: "lookCheck/condition",
        payload: payload
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(questionsL);
