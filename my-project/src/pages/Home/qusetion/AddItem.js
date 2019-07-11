import React from 'react';
import {connect} from "dva";
function AddItem(){
    return (
        <div>添加试题</div>
    )

}

AddItem.propTypes={

}

export default connect()(AddItem)
