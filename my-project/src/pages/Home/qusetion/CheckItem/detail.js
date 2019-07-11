import Reac,{ useState, useEffect }from 'react';
import { connect } from 'dva';
import { Input, Col, Row, Select, Button } from "antd";
import detailStyle from './detail.css'
import ReactMarkdown from 'react-markdown'
function Detail(props){
console.log(props)
    useEffect(() => {
        props.detailCon({
            questions_id:props.match.params.id.split('=')[1]
          });
      }, []);

      console.log(props.detailConDataL)
    return(
        <div>
            <h2>试题详情</h2>
            {
                        props.detailConDataL&&props.detailConDataL.map((item,index)=>{
                          return <div key={index} className={detailStyle.bottom}>
                                    <div className={detailStyle.left}>
                                        <p>出题人:dingshaoshan</p>
                                        <p>题目信息</p>
                                        <div className="color">
                                            <span className={detailStyle.content_every_cont_left_left_y}>{item.user_name}</span>
                                            <span className={detailStyle.content_every_cont_left_center_y}>{item.subject_text}</span>
                                            <span className={detailStyle.content_every_cont_left_right_y}>{item.questions_type_text}</span>
                                        </div>
                                        <div className={detailStyle.titleBox}>
                                            <p>{item.title}</p>
                                            <p>{item.questions_stem}</p>
                                        </div>
                                        <ReactMarkdown source={item.questions_answer}></ReactMarkdown>
                                        <div>
                                            <p>请根据题意在横线处填写合适的代码</p>
                                        </div>    
                                    </div>
                                <div className={detailStyle.right}>
                                    <p>答案信息</p>
                                    <ReactMarkdown source={item.questions_answer}></ReactMarkdown>
                                </div>
                        </div>
                    })
                }

            {/* {
                props.detailConDataL&&props.detailConDataL.map((item,index)=>{
                    console.log(item)
                    return (
                        <div className="boxDetail" key={index}>
                            <p>出题人:{item.user_name}</p>
                            <h4>题目信息</h4>
                            <Button type="primary">{item.subject_text}</Button>
                            <Button type="primary">{item.questions_type_text}</Button>
                            <Button type="primary">{item.exam_name}</Button>
                            <div className="examDetail">
                                <h5> {item.title}</h5>
                                <p>
                                   
                                    {item.questions_stem}
                                </p>
                            </div>  
                        </div>
                    )
                  
                })
            } */}
                
                    
            
           
        </div>
    )
}
Detail.propTypes = {
};
const mapStateToProps = state => {
    return { ...state.lookCheck };
  };
  
  const mapDispatchToPorps = dispatch => {
    return {
      detailCon: payload => {
        dispatch({
          type: "lookCheck/detailCon",
          payload: payload
        });
      }
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToPorps
  )(Detail);
