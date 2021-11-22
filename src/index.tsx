import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import { routes } from './pages/router';
import Loading from './components/loading';
import './assets/styles/reset.css';
import ErrorBoundary from './components/errorboundary';
import '../public-path';

const rootElement = document.getElementById('root');

const render = (props: { container?: any }) => {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react-h5' : '/'}>
        <React.Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <Routes>
              {
                routes.map((val, key) => <Route
                  {...val}
                  key={`route_${key}`}/>)
              }
            </Routes>
          </ErrorBoundary>
        </React.Suspense>
      </BrowserRouter>
    </React.StrictMode>,
    container ? container.querySelector('#root') : rootElement,
  );
};

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}

export const bootstrap = async() => {
  console.log('[react16] react app bootstraped');
};

export const mount = async(props:any) => {
  console.log('[react16] props from main framework', props);
  render(props);
};

export const unmount = async(props:any) => {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container ? container.querySelector('#root') : document.querySelector('#root'));
};
