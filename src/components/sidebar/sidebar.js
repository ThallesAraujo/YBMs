import React, { Component } from 'react';
import './sidebar.css'

// import { Container } from './styles';

export default class Sidebar extends Component {

  state = {
    showSidebar: false
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
          <div hidden={!this.props.isFavoritePage}>
            <i className="fas fa-trash" onClick={() => this.props.removeFavoriteCallback(this.props.movie)}></i>
          </div>
          <div hidden={this.props.isFavoritePage}>
            <i
              style={{ cursor: 'pointer' }}
              className={this.getIsFavorite(this.props.movie) ? 'fas fa-heart' : 'far fa-heart'}
              onClick={this.getIsFavorite(this.props.movie) ? () => this.props.removeFavoriteCallback(this.props.movie) : () => this.props.addFavoriteCallback(this.props.movie)}></i>
          </div>
        </div>
      </div>
    );
  }

  getIsFavorite = (movie) => {
    var favorites = JSON.parse(sessionStorage.getItem('favorites'));
    return favorites && favorites.find(fav => fav.id === movie.id);
}

  showSidebar = () => {
    this.setState({ showSidebar: !this.state.showSidebar });
  }

}
