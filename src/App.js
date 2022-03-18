import React, { useEffect, useState } from 'react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

import './assets/scss/custom.scss';
import './assets/css/general.css';

import NavBar from './Navbar/NavBar';
import EventList from './EventList/EventList';
import SignupLogin from './SignupLogin/SignupLogin';
import Footer from './Footer/Footer';
import EventDetail from './EventDetail/EventDetail';
import SuggestEvent from './SuggestEvent/SuggestEvent';

import AuthService from './services/auth.service';
import tokenPayload from './services/token-payload';

import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));

function App() {
  const [modalSignupLogin, setModalSignupLogin] = useState(false);
  const [modalSuggestEvent, setModalSuggestEvent] = useState(false);
  const [authentification, setAuthentification] = useState(false);

  const token = tokenPayload();

  useEffect(() => {
    if (Object.keys(token).length) {
      if (token.exp * 1000 >= Date.now()) {
        setAuthentification(true);
        setInterval(() => {
          AuthService.logout();
          setAuthentification(false);
        }, token.exp * 1000 - Date.now());
      } else {
        AuthService.logout();
      }
    }
  }, [token]);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <header className="App-header">
            <NavBar
              setModalSignupLogin={setModalSignupLogin}
              setModalSuggestEvent={setModalSuggestEvent}
              authentification={authentification}
              setauthentification={setAuthentification}
            />
            <SignupLogin
              setauthentification={setAuthentification}
              show={modalSignupLogin}
              onHide={() => setModalSignupLogin(false)}
            />
            <Route exact path="/" component={EventList} />
            <Route path="/events/:eventId" component={EventDetail} />
            <SuggestEvent
              show={modalSuggestEvent}
              onHide={() => setModalSuggestEvent(false)}
            />
          </header>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
