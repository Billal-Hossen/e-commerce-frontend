import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
      <nav className='navbar navbar-dark bg-dark'>
      <ul className="nav nav-tabs" >
          <li className="nav-item">
              <Link className="nav-link"  to="/">Home</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link"  to="/login">Login</Link>
          </li>
          <li className="nav-item">
              <Link className="nav-link"  to="/register">Register</Link>
          </li>
      </ul>
  </nav>
    );
};

export default Menu;