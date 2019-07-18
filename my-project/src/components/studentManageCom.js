/**
 * 学生管理页面Form表单
 */

import React, { useState, useEffect } from "react";
import { connect } from "dva";
import { Form, Icon, Input, Button, Select } from "antd";
import StudentManageCss from "@/pages/Home/grade/SturentManage/StudentManage.scss";

const { Option } = Select;

function StudentManageCom(props) {
  useEffect(() => {
    props.getClassRoom(); //获取教室号
    props.getGrade(); //获取班级名称
    props.getNewGrade(); //获取班级名称
  }, []);
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        props.filterStudent(values);
      }
    });
  };

  function handleReset() {
    props.form.resetFields();
  }

  const { getFieldDecorator } = props.form;
  return (
    <Form layout="inline" onSubmit={handleSubmit}>
      <Form.Item>
        {getFieldDecorator("student_name", {
          rules: [{ required: true, message: "输入学生姓名" }]
        })(<Input placeholder="输入学生姓名" />)}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("room_text", {
          rules: [{ required: true, message: "请选择教室号" }]
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择教室号"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.StudentRoomData &&
              props.StudentRoomData.map((item, index) => {
                return (
                  <Option value={item.room_text} key={item.room_id}>
                    {item.room_text}
                  </Option>
                );
              })}
          </Select>
        )}
      </Form.Item>

      <Form.Item>
        {getFieldDecorator("grade_name", {
          rules: [{ required: true, message: "请选择班级名" }]
        })(
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="请选择班级名"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.StudentGradeData &&
              props.StudentGradeData.concat(props.NewStudentGradeData).map(
                (item, index) => {
                  return (
                    <Option value={item.grade_name} key={item.grade_id}>
                      {item.grade_name}
                    </Option>
                  );
                }
              )}
          </Select>
        )}
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          block
          htmlType="submit"
          style={{ width: "130px" }}
        >
          搜索
        </Button>
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          block
          onClick={handleReset}
          style={{ width: "130px" }}
        >
          重置
        </Button>
      </Form.Item>
    </Form>
  );
}

StudentManageCom.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.ManageStudentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //获取教室号
    getClassRoom() {
      dispatch({
        type: "ManageStudentPage/getRoomText"
      });
    },

    //获取所有已经分班班级名称
    getGrade() {
      dispatch({
        type: "ManageStudentPage/getGradeName"
      });
    },

    //获取没有分班的班级名称

    getNewGrade() {
      dispatch({
        type: "ManageStudentPage/getNewGradeName"
      });
    },

    //筛选名称
    filterStudent(data) {
      dispatch({
        type: "ManageStudentPage/filterStudentModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(StudentManageCom));
