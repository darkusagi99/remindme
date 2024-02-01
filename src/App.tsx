import React, {useEffect, useState} from 'react';
import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./common/Login";
import { auth } from './services/firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import NoteList from "./notes/NoteList";
import FeedList from "./feeds/FeedList";
import FeedSettings from "./feeds/FeedSettings";
import ToastProps from "./types/toast-props";
import InfoToast from "./common/InfoToast";

export const App = () => {

  const [user  , setUser] = useState(auth.currentUser);
  const [toastParam, setToastParam] = useState<ToastProps>({toastMessage: "", showToast: false});

  useEffect(() => {
    auth.onAuthStateChanged(user => {
        setUser(user);
    })
  }, [])

  return (
      <>
          {/* Routes */}
          <div className="app">
            <Routes>
              <Route path="/" element={user ? <NoteList toastParam={toastParam} setToastParam={setToastParam} /> : <Login />} />
              <Route path="/notes" element={user ? <NoteList toastParam={toastParam} setToastParam={setToastParam}  /> : <Login />} />
              <Route path="/rss" element={user ? <FeedList toastParam={toastParam} setToastParam={setToastParam} /> : <Login />} />
              <Route path="/settings" element={user ? <FeedSettings toastParam={toastParam} setToastParam={setToastParam} /> : <Login />} />
            </Routes>
          </div>
          {/* Application info Toast */}
          {InfoToast(toastParam, setToastParam)}
      </>
  );
}

export default App;
