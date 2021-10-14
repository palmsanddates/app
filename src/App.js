import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import EventList from './EventsList/EventList';
import Login from './Login/Login';
import CreateEvent from './CreateEvent/CreateEvent';
import Footer from './Footer/Footer';
import EventDetail from './EventDetail/EventDetail';
import './assets/css/general.css';

function App() {
  // const [message, setMessage] = useState('')
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCreateEvent, setModalCreateEvent] = useState(false);
  const [authentification, setAuthentification] = useState(false);
  // useEffect(() => {
  //   fetch('http://localhost:5000')
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch(err => console.log(err))
  // }, [])

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
          <Login
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
