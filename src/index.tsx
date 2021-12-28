import * as React from 'react';
import '../public-path';
import './assets/styles/reset.css';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import ErrorBoundary from './components/errorboundary';
import Loading from './components/loading';
import 'antd-mobile/es/global';
import App from './pages/app';

const rootElement = document.getElementById('root');

const render = (props: { container?: any }) => {
  const { container } = props;
  ReactDOM.render(
    <React.StrictMode>
      <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/react-h5' : '/'}>
        <React.Suspense fallback={<Loading />}>
          <ErrorBoundary>
            <App />
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

export const mount = async(props: any) => {
  console.log('[react16] props from main framework', props);
  render(props);
};

export const unmount = async(props: any) => {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(
    container ? container.querySelector('#root') : document.querySelector('#root'),
  );
};
