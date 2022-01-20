import React, { useEffect, useState } from 'react';
import './index.scss';
const logo = require('../../assets/images/logo.png').default;

function PageNotFound() {
  const [isCool, setIsCool] = useState<boolean>(false);

  const changeStatus = (flag: boolean) => {
    setIsCool(flag);
  };

  return (
    <>
      <button
        name="cool-button"
        onClick={() => {
          changeStatus(true);
        }}
      />
      {isCool && (
        <div>
          <p>cool</p>
        </div>
      )}
      <div className="page-not-found">
        <h1>404 Not Found.</h1>
        <img src={logo} />
      </div>
    </>
  );
}

export default PageNotFound;
