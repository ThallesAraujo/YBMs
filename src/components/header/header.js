import React from 'react';
import { Link } from 'react-router-dom';
import './header.css'


export default class shared extends React.Component {


  render() {
    return (
      <nav>
        <Link to="/">
          <div className="logo-container">
            <div className="logo">Y</div>
            <div className="second">BMs</div>
          </div>
        </Link>

        <div className="nav-link-container">
          <Link to="/favorites">
            <p className="nav-link"><i className="fas fa-heart"></i>Favorites</p>
          </Link>
          <Link to="/about">
            <p className="nav-link"><i className="fas fa-info-circle"></i>About</p>
          </Link>
        </div>
      </nav>
    );
  }
}
