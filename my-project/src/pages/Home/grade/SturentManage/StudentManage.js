/**
 * 学生管理页面
 *
 */

import React from "react";
import { connect } from "dva";
import StudentManageCom from "@/components/studentManageCom"; //搜索框页面
import StudentManageTable from "@/components/studentManageTable"; //搜索框页面
import StudentManageCss from "./StudentManage.scss";

function StudentManage() {
  return (
    <div className={StudentManageCss.studentBox}>
      <h1 className={StudentManageCss.title}>学生管理</h1>
      <div className={StudentManageCss.student_list}>
        <StudentManageCom />
        <StudentManageTable />
      </div>
    </div>
  );
}

StudentManage.propTypes = {};

export default connect()(StudentManage);
