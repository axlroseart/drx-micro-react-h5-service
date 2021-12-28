import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabBar } from 'antd-mobile';
import { AppOutline, UserOutline } from 'antd-mobile-icons';

export const Bottom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value: string) => {
    navigate(value);
  };
  const tabBarData = [
    {
      key: 'home',
      title: '首页',
      icon: <AppOutline />,
    },
    {
      key: 'my',
      title: '我的',
      icon: <UserOutline />,
    },
  ];
  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabBarData.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  );
};
