import React , {useState,useEffect} from 'react';
import {connect} from "dva";
import examStyle from "./ExamListDetail.scss"
function ExamListDetail(props){
  console.log(props.match.url.split('=')[1])
    useEffect(() => {
        props.examTeachDa(props.match.url.split('=')[1])//获取试卷详情（教师端）
      }, [])
    console.log(props.examTeachData.questions)
    return (
        <div>
            <h1>试卷详情</h1>
            <div className={examStyle.box}>
              <div className={examStyle.left}>
                  
                    {
                      props.examTeachData.questions&&props.examTeachData.questions.map((item,index)=>{
                        return (
                          <ul className={examStyle.ul} key={index}>
  
                            <li>
                              <h4>{index+1}、{item.title}</h4>
                              <p>{item.questions_stem}</p>
                            </li>
                          </ul>
                        )
                      })
                    }
                      
                
              </div>
              <div className={examStyle.right}></div>
            </div>
           
        </div>
    )

}

ExamListDetail.propTypes={

}
const mapToProps = state => {
    return {...state.examListS}
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      //获取所有课程
      examTeachDa: payload => {
        dispatch({
            type: "examListS/examTeach",
            payload: payload
        });
    }
       
    }
  }

export default connect(mapToProps,mapDispatchToProps)(ExamListDetail);
