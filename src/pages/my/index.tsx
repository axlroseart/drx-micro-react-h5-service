import React, { useState, useContext } from 'react';
import { AppContext } from '../../components/context';
import { ACTIONS } from '../../components/context/reducer';
import './index.scss';

const My = () => {
  const { state, dispatch } = useContext(AppContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const updateUsername = (e: any) => {
    const value = e.target.value;
    setUsername(value);
  };

  const updatePassword = (e: any) => {
    const value = e.target.value;
    setPassword(value);
  };

  const doLogin = (e: any) => {
    e.preventDefault();
    // todo - api req
    dispatch({
      type: ACTIONS.USER_LOGIN,
      payload: {},
    });
    dispatch({
      type: ACTIONS.USER_UPDATE,
      payload: {
        username: username,
      },
    });
  };

  const doLogout = (e: any) => {
    e.preventDefault();
    // todo - api req
    dispatch({
      type: ACTIONS.USER_LOGOUT,
      payload: {
        username: username,
      },
    });
  };

  return (
    <>
      <h2>now time: {state.id}</h2>
      {state.isLogin ? (
        <div>
          <h1>welcome to my page</h1>
          <p>my name is : {state.username}</p>
          <button onClick={doLogout}>logout</button>
        </div>
      ) : (
        <div className="login-input-wrapper">
          <input type="text" name="username" onChange={updateUsername} value={username} />
          <input type="password" name="passwprd" onChange={updatePassword} value={password} />
          <button onClick={doLogin}>login</button>
        </div>
      )}
    </>
  );
};

export default My;
