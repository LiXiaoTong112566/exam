/**
 * 添加视图接口权限
 */

import React, { useEffect } from "react";
import { connect } from "dva";
import { Form,  Button, Select, message } from "antd";

import AdduserCss from "@/pages/Home/users/AddUser/AddUser.scss";
const { Option } = Select;
function AddViewCom(props) {
  const handleSubmit = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        let checkData = props.getViewData.filter((item, index) => {
          return item.view_authority_text === values.view_authority_text;
        });
        props.addViewprops({
          view_authority_text: checkData[0].view_authority_text,
          view_id: checkData[0].view_id
        });
      }
    });
  };

  useEffect(() => {
    props.getUserView();
    if (props.addViewData) {
      if (props.addViewData.code === 1) {
        message.success(props.addViewData.msg);
      } else {
        message.error(props.addViewData.msg);
      }
    }
  }, [props.addViewData]);

  //重置
  function handleReset() {
    props.form.resetFields();
  }

  const { getFieldDecorator } = props.form;
  return (
    <div className={AdduserCss.borderBox}>
      <div className={AdduserCss.btn}>添加视图接口权限</div>

      <Form onSubmit={handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("view_authority_text", {

            rules: [{ required: true, message: "请选择已有的视图!" }]
          })(
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="请选择已有的视图"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.getViewData &&
                props.getViewData.map((item, index) => {
                  return (
                    <Option
                      value={item.view_authority_text}
                      key={"view" + index}
                    >
                      {item.view_authority_text}
                    </Option>
                  );
                })}
            </Select>
          )}
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            确定
          </Button>
          <Button className="login-form-button" onClick={handleReset}>
            重置
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

AddViewCom.propTypes = {};

const mapStateToProps = state => {
  return {
    ...state.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //获取权限数据
    getUserView() {
      dispatch({
        type: "userData/getView"
      });
    },
    //添加视图接口权限

    addViewprops(data) {
      dispatch({
        type: "userData/addViewModel",
        payload: data
      });
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(AddViewCom));
