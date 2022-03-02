import { NavBar } from 'antd-mobile';
import React, { useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import { apiClient } from '../../api';
import './index.scss';

function Index() {
  const [state, request] = useFetch(apiClient);
  // const [state2, request2] = useFetch(apiClient);

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const { data } = state;
    console.log(data?.data);
  }, [state]);

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
