import React from 'react';
import { NavLink } from 'react-router-dom';

import "./nav.style.css"

export const Navigation = () => {

  return (
    <div>
      <ul>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/dashboard">Dashborad</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
      </ul>
    </div>
  );
}
