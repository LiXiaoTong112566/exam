import React from 'react';
import {connect} from "dva";
function ShowUser(){
    return (
        <div>用户展示</div>
    )
}

ShowUser.propTypes={

}

export default connect()(ShowUser)