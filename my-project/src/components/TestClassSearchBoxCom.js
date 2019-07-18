import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Form, Button, Select, message } from "antd";

import TestClassSearchScss from "@/pages/Home/Marking/testClass/testClass.scss";
const { Option } = Select;



function TestClassSearchBoxCom(props) {

    console.log(props.getAllGradeData);

    useEffect(()=>{

        props.getGrade();


    },[])



  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        //添加视图接口
       console.log(values);
       props.filterTestSearch(values.grade_name)
      }
    });
  };

  //重置
  function handleReset() {
    props.form.resetFields();
  }
  const { getFieldDecorator } = props.form;

  return (
    <div className="AwaitBox">
      <Form onSubmit={handleSubmit} className="login-form" layout="inline">
        <Form.Item>
          <label
            className={TestClassSearchScss.label}
            style={{ marginRight: "10px" }}
          >
            状态
          </label>
          {getFieldDecorator("identity_id", {
            rules: [{ required: false, message: "请选择身份id!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择状态"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.userIdentData &&
                props.userIdentData.map((item, index) => {
                  return (
                    <Option value={item.identity_id} key={"id" + index}>
                      {item.identity_text}
                    </Option>
                  );
                })}
            </Select>
          )}
        </Form.Item>
        <Form.Item>
          <label
            className={TestClassSearchScss.label}
            style={{ marginRight: "10px" }}
          >
            班级
          </label>
          {getFieldDecorator("grade_name", {
            rules: [{ required: true, message: "请选择班级!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择班级"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.getAllGradeData &&
               props.getAllGradeData.map((item, index) => {
                  return (
                    <Option
                      value={item.grade_name}
                      key={"apiData" + index}
                    >
                      {item.grade_name}
                    </Option>
                  );
                })}
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" icon="search" htmlType="submit">
            查询
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

TestClassSearchBoxCom.propTypes = {};

const mapStateToProps = (state, ownProps) => {
  return {
    ...state.AwaitClassModel
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getStudentExamFn(data) {
      dispatch({
        type: "AwaitClassModel/getStudentExamModel",
        payload: data
      });
    },
    
    getGrade(data) {
        dispatch({
          type: "AwaitClassModel/getAllGradeModel",
         
        });
      },

      

      filterTestSearch(data) {
        dispatch({
          type: "AwaitClassModel/filterTestSearchModel",
          payload: data
        });
      },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(TestClassSearchBoxCom));
