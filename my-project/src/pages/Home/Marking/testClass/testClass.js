import React from "react";
import { connect } from "dva";

import TestClassCom from "@/components/testClassCom";

import TestClassSearchBoxCom from "@/components/TestClassSearchBoxCom";
import testClassCss from "./testClass.scss";
function testClass(props) {
  console.log(props);
  return (
    <div className={testClassCss.testClassPage}> 
      <div className={testClassCss.searchBox}>
    <TestClassSearchBoxCom></TestClassSearchBoxCom>

      </div>
      <div className={testClassCss.testClassBox}>
      <h3>试卷列表</h3>
        <TestClassCom {...props}/>
      </div>
    </div>
  );
}
testClass.propTypes = {};

export default connect()(testClass);
