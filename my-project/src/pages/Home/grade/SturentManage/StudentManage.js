import React from 'react';
import {connect} from "dva";
function StudentManage(){
    return (
        <div>学生管理</div>
    )

}

StudentManage.propTypes={

}

export default connect()(StudentManage)