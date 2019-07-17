import React, { useState, useEffect } from "react";
import { connect } from "dva";
import readExamScss from "./readExam.scss";
import { Slider, Tooltip, Button, Modal } from "antd";
function testClass(props) {
  console.log(props);
  let score = props.location.params.score;
  const [newscore, setNewScore] = useState(0);
  const [visible, setVisible] = useState(false);
  const onChange = value => {
    console.log(value);
    setNewScore(value);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <div className={readExamScss.box}>
      <h1>阅卷</h1>

      <div className={readExamScss.main}>
        <h1>分数是{newscore}</h1>
        <div>
          <Slider
            min={1}
            max={100}
            tooltipVisible={false}
            value={typeof newscore === "number" ? newscore : 0}
            onChange={onChange}
            style={{ width: "300px" }}
          />
        </div>

        <div>
          <Button type="primary" onClick={showModal}>
           确定
          </Button>
          <Modal
           
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="确认"
          cancelText="取消"
          >
              <h3>确定提交阅卷结果?</h3>
              <div>分数值是{newscore}</div>
           
          </Modal>
        </div>
      </div>
    </div>
  );
}
testClass.propTypes = {};

export default connect()(testClass);
