import React, { Component } from 'react';

// import { Container } from './styles';

export default class About extends Component {
  render() {
    return (
      <div className="container">
        <h1>Why should I use YBMs?</h1>
        <div>
          <h3><i className="fas fa-window-restore" style={{ paddingRight: '10px' }}></i>Simplified Interface</h3>
          <p>With a user-focused interface, YBMs allows you to see informations about your favorite movies and tv shows
             and create a very own favorite list to watch later without unnecessary complications.
            </p>
        </div>
        <div>
          <h3><i className="fas fa-user" style={{ paddingRight: '10px' }}></i>Here, the remote control is yours!</h3>
          <p>
            In YBMs, we value and recognize user importance not only in the usage, but also in development of our platform.
            Your suggestions are always welcome!
            </p>
        </div>
        <div>
          <h3><i className="fas fa-concierge-bell" style={{ paddingRight: '10px' }}></i>Human-centered support</h3>
          <p>

            We work with people, for people! If you have any problem with our services, you could contact our hotlines.
            Our attendants will be ready to offer the best solution for your issues!
            </p>
        </div>

        <div>
          <h2>Development team:</h2>
          <p>Thalles Henrique do Nascimento Araújo | junior front-end developer - UX Team</p>
        </div>
      </div>
    );
  }
}
