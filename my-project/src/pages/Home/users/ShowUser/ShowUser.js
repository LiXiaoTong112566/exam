import React,{useState,useEffect} from "react";
import { connect } from "dva";
import { Tabs } from "antd";

const { TabPane } = Tabs;

function ShowUser(props) {
  console.log(props);
  function callback(key) {
    console.log(key);
  }

  useEffect(()=>{
    console.log(props);



  },[])

  return (
    <div>
      <h1>用户展示</h1>
      <Tabs onChange={callback} type="card">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>


      
    </div>
  );
}

ShowUser.propTypes = {};

const  mapStateToProps = (state) => {
  return {
    
  }
}

 const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    listData: () => {
      
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ShowUser);
