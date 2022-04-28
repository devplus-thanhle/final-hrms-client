import { BackTop } from 'antd';
import React from 'react';
import { UpCircleTwoTone } from "@ant-design/icons";
function AppFooter() {
  let getYear = () => {
    let currentYear = new Date().getFullYear();
    return currentYear;
  }
  return (
    <div className="container-fluid">
      <div className="footer">
        <div>Created by team Felicity on &copy; {getYear()} </div>
        <BackTop>
          <div className="goTop"><i><UpCircleTwoTone style={{ fontSize: '200%'}}/></i></div>
        </BackTop>
      </div>
    </div>
  );
}

export default AppFooter;