/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import "./App.css";
import Navbar from './components/Navbar/Navbar';
import UsersContainer from './components/Users/UsersContainer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import ProfileContainer from './components/Profile/ProfileContainer';
import Preloader from './components/Preloader/Preloader';

import withRouter from './utils/withRouter';
import { initializeApp } from './redux/app/thunks';
import { getInitialized } from './redux/app/selectors';
import Loader from './components/common/Loader/Loader';
import NotFound from './components/NotFound/NotFound';

// Lazy загрузка
const Dialogs = React.lazy(() => import('./components/Dialogs/Dialogs'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));


const App = () => {
  const dispatch = useDispatch();
  const initialized = useSelector(getInitialized);

  const catchAllUnhandledErrors = (promiseRejectionEvent) => {
    console.error(promiseRejectionEvent);
  }
 
  useEffect(() => {
    dispatch(initializeApp());
    window.addEventListener('unhandledrejection', catchAllUnhandledErrors);

    return () => {
      window.removeEventListener('unhandledrejection', catchAllUnhandledErrors);
    }
  }, []);

  return (
    !initialized ? <Preloader />
      :
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path='/' element={<Navigate to='/profile' />} />
              <Route path='/profile/:userId?' element={<ProfileContainer />} />
              <Route path='/dialogs/*' element={<Dialogs />} />
              <Route path='/news' element={<News />} />
              <Route path='/users' element={<UsersContainer />} />
              <Route path='/music' element={<Music />} />
              <Route path='/settings' element={<Settings />} />
              <Route path='/login' element={<Login />} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>
      </div>
  );
};

export default withRouter(App);
