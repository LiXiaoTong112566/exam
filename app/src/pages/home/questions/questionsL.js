import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Input, Col, Row, Select, Button } from "antd";
import List from './lists'
function questionsL(props) {
  // const [AllData,setAllData]=useState(props.questionsData);
  useEffect(() => {
    props.lookCheck();
    props.examType();
    props.getQuestionsType();
    props.questions();
  }, []);

  const { Option } = Select;
  //考试类型：
  const [seleValue, setSeleValue] = useState("");
  //题目类型
  const [seleTypeValue, setseleTypeValue] = useState("");
  //课程类型
  const [typeData, setTypeData] = useState("");

  let seleFn = e => {
    setSeleValue(e);
  };
  let typeFn = e => {
    setseleTypeValue(e);
  };
  let s = "";
  let lisFn = e => {
    s = e.target.getAttribute("datakey");
    setTypeData(s);
  };
  //点击按钮时get请求数据
  let btnFn = () => {
    props.condition({
      questions_type_id: seleTypeValue,
      exam_id: seleValue,
      subject_id: typeData
    });
  };
  let routerTo=()=>{
    console.log(1)
  }



  return (
    <div>
      <h2>查看试题</h2>
      <div className="box">
        <div className="top">
          <ul>
            <p className="ql_p">课程类型:</p>
            {props.data &&
              props.data.map((item, index) => (
                <li key={index} onClick={lisFn} datakey={item.subject_id}>
                  {item.subject_text}
                </li>
              ))}
          </ul>
          <ol>
            <li>
              考试类型：
              <Select defaultValue="" value={seleValue} onChange={seleFn}>
                {props.examTData &&
                  props.examTData.map((item, index) => (
                    <Option key={index} value={item.exam_id}>
                      {item.exam_name}
                    </Option>
                  ))}
              </Select>
            </li>
            <li>
              题目类型 :
              <Select defaultValue="" value={seleTypeValue} onChange={typeFn}>
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
        <div className="buttom">
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
