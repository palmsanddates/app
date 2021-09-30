import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
import { Route, BrowserRouter } from 'react-router-dom';
import NavBar from './Navbar/NavBar';
import EventList from './EventsList/EventList'
import LogIn from './LogIn/LogIn';
import CreateEvent from './CreateEvent/CreateEvent';
import Footer from './Footer/Footer';
import EventDetails from './EventDetails/EventDetails';
import './App.css'

function App () {
  // const [message, setMessage] = useState('')
  const [modalLogin, setModalLogin] = useState(false);
  const [modalCreateEvent, setModalCreateEvent] = useState(false);

  // useEffect(() => {
  //   fetch('http://localhost:5000')
  //     .then((res) => res.json())
  //     .then((data) => setMessage(data.message))
  //     .catch(err => console.log(err))
  // }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <NavBar
            setModalLogin={setModalLogin}
            setModalCreateEvent={setModalCreateEvent}
          />
          <LogIn show={modalLogin} onHide={() => setModalLogin(false)} />
          <Route exact path="/" component={EventList} />
          <Route path="/eventDetails/:id" component={EventDetails} />
          <CreateEvent
            show={modalCreateEvent}
            onHide={() => setModalCreateEvent(false)}
          />
        </header>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App