import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import EventList from './EventsList/EventList';
import LogIn from './LogIn/LogIn';
import CreateEvent from './CreateEvent/CreateEvent';
import Footer from './Footer/Footer';
import EventDetail from './EventDetail/EventDetail';

import './assets/scss/custom.scss';
import './assets/css/general.css';

import AuthService from './services/auth.service';
import tokenPayload from './services/token-payload';

function App() {
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCreateEvent, setModalCreateEvent] = useState(false);
  const [authentification, setAuthentification] = useState(false);

  let token = tokenPayload();

  useEffect(() => {
    if (Object.keys(token).length) {
      if (token.exp * 1000 >= Date.now()) {
        setAuthentification(true);
      } else {
        AuthService.logout();
      }
    }
  }, [token]);

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavBar
            setModalLogin={setModalLogin}
            setModalCreateEvent={setModalCreateEvent}
            authentification={authentification}
            setAuthentification={setAuthentification}
          />
          <LogIn
            setAuthentification={setAuthentification}
            show={modalLogin}
            onHide={() => setModalLogin(false)}
          />
          <Route exact path="/" component={EventList} />
          <Route path="/events/:eventId" component={EventDetail} />
          <CreateEvent
            show={modalCreateEvent}
            onHide={() => setModalCreateEvent(false)}
          />
        </header>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
