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
            <button className="btn-show" onClick={this.showSidebar}>
              <i className="fas fa-info"></i>
            </button>
        <div hidden={!this.state.showSidebar} className="sidebar">
            <h2>{this.props.movie.title}</h2>
            <p>{this.props.movie.overview.substring(1, 130)}[...]</p>
            <p>{this.props.movie.runtime} min</p>
            <p>{this.props.movie.rating}</p>
        </div>
        </div>
    );
  }

  showSidebar = () =>{
    this.setState({showSidebar : !this.state.showSidebar});
  }

}
