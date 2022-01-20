import React, { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Bottom } from '../components/bottom';
import { routes } from '../pages/router';
import Loading from '../components/loading';
import '@/assets/styles/common.scss';

// h5 web app layout
const App: FC = () => (
  <div className="app">
    <div className="body">
      <Routes>
        {routes.map((val) => (
          <Route {...val} key={`route ${val.path}`} />
        ))}
      </Routes>
      <Loading label="loading component" />
    </div>
    <div className="bottom">
      <Bottom />
    </div>
  </div>
);

export default App;
