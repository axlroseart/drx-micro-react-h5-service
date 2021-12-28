import { NavBar } from 'antd-mobile';
import React from 'react';
import './index.scss';

function Index() {
  return (
    <div className="home-wrap">
      <div className="top">
        <NavBar backArrow={false}>首页</NavBar>
      </div>
      <div className="index-page">
        <p>content</p>
      </div>
    </div>
  );
}

export default Index;
