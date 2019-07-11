import React from 'react';
import { connect } from 'dva';

function AddUser(){
    return(
        <div>
           添加用户
        </div>
    )
}


AddUser.propTypes = {
};


export default connect()(AddUser);
