import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./common/Login";
import { auth } from './services/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from "./notes/NoteList";
import FeedList from "./feeds/FeedList";
import FeedSettings from "./feeds/FeedSettings";

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
          <Route path="/" element={user ? <NoteList /> : <Login />} />
          <Route path="/notes" element={user ? <NoteList /> : <Login />} />
          <Route path="/rss" element={user ? <FeedList /> : <Login />} />
          <Route path="/settings" element={user ? <FeedSettings /> : <Login />} />
        </Routes>
      </div>
  );
}

export default App;
