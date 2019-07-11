import React from 'react';
import { connect } from 'dva';
import { Input } from 'antd';
function AddQ(){
    return(
        <div>
            <h2>添加试题</h2>
            <div className="box">
               <p>题目信息</p>   
               <p>题干</p>   
               <Input placeholder="Basic usage" style={{width:'550px'}}  />
            </div>
        </div>
    )
}


AddQ.propTypes = {
};


export default connect()(AddQ);
