import React from 'react';
import {connect} from "dva";
function CheckItem(){
    return (
        <div>查看试题</div>
    )
}

CheckItem.propTypes={

}

export default connect()(CheckItem)