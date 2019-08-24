import React, { Component } from 'react';
import './sidebar.css'

// import { Container } from './styles';

export default class Sidebar extends Component {

    state = {
        showSidebar : false
    }

  render() {
    return (
        <div>
            <button onClick={this.showSidebar}>Details</button>
        <div hidden={!this.state.showSidebar} className="sidebar">
            <h2>{this.props.movie.title}</h2>
        </div>
        </div>
    );
  }

  showSidebar = () =>{
    this.setState({showSidebar : !this.state.showSidebar});
  }

}
