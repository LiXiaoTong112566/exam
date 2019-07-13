import React, {useEffect } from 'react';
import { connect } from 'dva';
import detailStyle from './detail.scss'
import ReactMarkdown from 'react-markdown'
function Detail(props) {
    console.log(props)
    useEffect(() => {
        props.detailCon({
            questions_id: props.match.params.id.split('=')[1]
        });
    }, []);

    console.log(props.detailConDataL)
    return (
        <div>
            <h2>试题详情</h2>
            {
                props.detailConDataL && props.detailConDataL.map((item, index) => {
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
