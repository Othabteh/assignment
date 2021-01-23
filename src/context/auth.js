import React, { useState, useEffect } from 'react';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import superagent from 'superagent';
import cookie from 'react-cookies';
dotenv.config();
const API = 'https://osamapwc.herokuapp.com';
const SECRET = 'mysecret';

export const AuthContext = React.createContext();

function AuthProvider(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [error, setError] = useState(false);
  const [token, setToken] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = cookie.load('auth');

    validateToken(token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const validateToken = (token) => {
    try {
      const user = jwt.verify(token, SECRET);
      setLoginState(true, token, user);
    } catch (e) {
      setLoginState(false, null, {});
    }
  };

  const setLoginState = (loggedIn, token, user) => {
    cookie.save('auth', token);
    setUser(user);
    setToken(token);
    setRole(user.role);

    setLoggedIn(loggedIn);
    setError(false);
  };

  const login = async (username, password) => {
    console.log(username, password);
    try {
      const response = await superagent.post(`${API}/signin`).set('authorization', `Basic ${btoa(`${username}:${password}`)}`);
      validateToken(response.body.token);
      console.log('here');
    } catch (e) {
      setError(true);
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await superagent.post(`${API}/signup`).send({ username, password });
      console.log(response);
      validateToken(response.body.token);
      console.log('here');
    } catch (e) {
      setError(true);
    }
  };

  const logout = () => {
    setLoginState(false, null, {});
  };

  const state = { login, logout, signup, token, role, loggedIn, user, error, setError };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
}

export default AuthProvider;
