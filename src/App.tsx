import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./common/Login";
import { auth } from './services/firebase';

export const App = () => {

  const [user  , setUser] = useState(auth.currentUser);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        setUser(user);
    })
  }, [])

  return (
      <div className="app">
        <Routes>
          <Route path="/" element={user ? <h1>Logged</h1> : <Login />} />
        </Routes>
      </div>
  );
}

export default App;
