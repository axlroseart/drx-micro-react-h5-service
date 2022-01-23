import React, { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bottom } from '../components/bottom';
import { routes } from '../pages/router';
import Loading from '../components/loading';
import { AppProvider } from '../components/context';
import { initialState } from '../components/context/reducer';
import '@/assets/styles/common.scss';

// h5 web app layout
const App: FC = () => {
  useEffect(() => {
    console.log(initialState);
  }, [initialState]);
  return (
    <AppProvider>
      <div className="app">
        <div className="body">
          <Routes>
            {routes.map((val) => (
              <Route {...val} key={`route ${val.path}`} />
            ))}
          </Routes>
          {initialState?.isLogin && <Loading label="loading component" />}
        </div>
        <div className="bottom">
          <Bottom />
        </div>
      </div>
    </AppProvider>
  );
};

export default App;
