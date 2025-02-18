import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import "./App.css";
import Navbar from './components/Navbar/Navbar';
import Dialogs from './components/Dialogs/Dialogs';
import News from './components/News/News';
import UsersContainer from './components/Users/UsersContainer';
import Music from './components/Music/Music';
import Settings from './components/Settings/Settings';
import ProfileContainer from './components/Profile/ProfileContainer';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import withRouter from './utils/withRouter';
import { initializeApp } from './redux/app/thunks';
import Preloader from './components/Preloader/Preloader';
import { getInitialized } from './redux/app/selectors';

class App extends React.Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    return (
      !this.props.initialized ? <Preloader />
      :
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <div className="app-wrapper-content">
          <Routes>

            <Route path='/profile/:userId?' element={<ProfileContainer />} />
            <Route path='/dialogs/*' element={<Dialogs />} />
            <Route path='/news' element={<News />} />
            <Route path='/users' element={<UsersContainer />} />
            <Route path='/music' element={<Music />} />
            <Route path='/settings' element={<Settings />} />
            <Route path='/login' element={<Login />} />

          </Routes>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  initialized: getInitialized(state),
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App)
