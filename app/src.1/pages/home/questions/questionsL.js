import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Input, Col, Row, Select, Button } from "antd";
function questionsL(props) {
  useEffect(() => {
    props.lookCheck();
    props.examType();
    props.getQuestionsType();
    props.questions();
  }, []);

  const { Option } = Select;
  //考试类型：
  const [seleValue, setSeleValue] = useState('');
  //题目类型
  const [seleTypeValue, setseleTypeValue] = useState('');
  const [seleTLisValue, setseleTLisValue] = useState('');
    let seleFn=(e)=>{
        setSeleValue(e)
    }
   let typeFn=(e)=>{
       setseleTypeValue(e)
   }
   let lisFn=(e)=>{
    setseleTLisValue(e.target.innerHTML)
   }
   console.log(seleValue);
   let btnFn=()=>{
     console.log(seleValue,seleTypeValue,seleTLisValue)
   }
  return (
    <div>
      <h2>查看试题</h2>
      <div className="box">
        <div className="top">
          <ul>
            <p className="ql_p">课程类型:</p>
            {props.data &&props.data.map((item, index) => (
                <li key={index} onClick={lisFn} value={seleTLisValue}>{item.subject_text}</li>
              ))}
          </ul>
          <ol>
            <li>
              考试类型：
              <Select defaultValue="" value={seleValue} onChange={seleFn}>
                {props.examTData &&props.examTData.map((item, index) => (
                    <Option key={item.exam_id} value={item.exam_name} >
                      {item.exam_name}
                    </Option>
                  ))}
              </Select>
            </li>
            <li>
              题目类型 :
              <Select defaultValue="" value={seleTypeValue} onChange={typeFn}>
                {props.getQueData && props.getQueData.map((item, index) => (
                    <Option key={index} value={item.questions_type_text}>
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
        <div className="buttom">
            {
                 props.questionsData&&props.questionsData.map((item,index)=>{
                     return (
                        <dl key={index}>
                            <dt>
                            <p className="p_t">{item.title}</p>
                            <Button type="primary">{item.questions_type_text}</Button>
                            <Button type="primary">{item.subject_text}</Button>
                            <Button type="primary">{item.exam_name}</Button>
                            <p>{item.user_name}</p>
                            </dt>
                            <dd>编辑</dd>
                      </dl> 
                     ) 
                 })
            }

       
         
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
    examType: payload => {
      dispatch({
        type: "lookCheck/examType",
        payload
      });
    },
    getQuestionsType: payload => {
      dispatch({
        type: "lookCheck/getQuestionsType",
        payload
      });
    },
    questions: payload => {
        dispatch({
          type: "lookCheck/questions",
          payload
        });
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToPorps
)(questionsL);
