import { Route, Routes, useLocation } from 'react-router-dom';
import './App.css';

import Dashboard from './components/Dashboard';

import Login from './components/Login';

import Home from './components/Home';
import NotFound from './components/NotFound';

import { Navigation } from './components/common/Navigation';


import { UserContext } from "./components/context/UserContext";
import About from './components/About';
import User from './components/User';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap';
import { useState } from 'react';

function App() {

  // conditinal oprator

  const [user, setUser] = useState({});

  return (
    <UserContext.Provider value={{
      user,
      setUser
    }}>
      <Container>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/user/:name" element={<User />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
