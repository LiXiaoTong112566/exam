import React, { useEffect, useState } from "react";
import { connect } from "dva";
import ReactMarkdown from "react-markdown";
import { Button, Drawer } from "antd";
import TableView from "@/components/questionList.js";
// import TableView from '@/components/questionList.js'
import style from "./ExamEdit.scss";

function ExamEdit(props) {
  useEffect(() => {
    //获取所有试题
    props.questions();
  }, []);
  let [visible, showDrawer] = useState(false);

  let handleDel = index => {
    props.questionDel(index);
  };
  return (
    <div className={style.exam_wrapper}>
      <h2 className="user-title">创建试卷</h2>
      <div className={style.exam_main}>
        <Button onClick={() => showDrawer(true)}>添加新题</Button>
        <div className={style.exam_content}>
          <h2>{props.createpaperList.title}</h2>
          <p>
            考试时间：1小时30分钟 监考人：刘于 开始考试时间：2018.9.10 10:00
            阅卷人：刘于
          </p>
          <div className={style.exam_question_box}>
            {props.createpaperList.questions.map((item, index) => (
              <div className={style.exam_item} key={index}>
                <h4>
                  <p>
                    {index + 1}: {item.title}
                  </p>
                  <Button type="link" onClick={() => handleDel(index)}>
                    删除
                  </Button>
                </h4>
                <div>
                  2
                  <ReactMarkdown source={item.questions_stem} />
                </div>
              </div>
            ))}
          </div>
          <Button
            type="primary"
            onClick={() => props.history.push("/home/examList")}
          >
            创建试卷
          </Button>
        </div>
      </div>
      <Drawer
        title="所有题目"
        placement="right"
        closable={false}
        width="520"
        onClose={() => showDrawer(false)}
        visible={visible}
        style={{ padding: 0 }}
      >
        {<TableView props={props.getQuestionsData} />}
      </Drawer>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    ...state.questionClass
  };
};

const mapDispatchToProps = dispatch => {
  return {
    questions() {
      dispatch({ type: "questionClass/getQuestions" });
    },
    questionDel(index) {
      dispatch({
        type: "questionClass/questionDel",
        index
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExamEdit);
