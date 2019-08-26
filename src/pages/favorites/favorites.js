import React, { Component } from 'react';
import MoviesList from '../../components/movies-list/movies-list';
import axios from 'axios';
import './favorites.css'

// import { Container } from './styles';
export default class Favorites extends Component {

  state = {
    favoriteMovies: [],
    view: 'movie'
  }

  constructor(props) {
    super(props)
    this.refreshHandler = this.refreshHandler.bind(this)
  }


  componentDidMount() {
    this.getMovies();
  }

  render() {
    return (
      <div>
        <div className="subheader">
          <h1 className="subheader-title">{this.state.view === 'movie' ? 'My Favorite Movies' : 'My Favorite Series'}</h1>
          <button className="btn-action" onClick={() => this.switchView()}>
          <i class="fas fa-exchange-alt"></i>
          {this.state.view === 'movie' ? 'Switch to Series' : 'Switch to Movies'}
          </button>
        </div>
        <MoviesList refreshCallback={this.refreshHandler} movies={this.state.favoriteMovies} isFavorites={true}></MoviesList>
      </div>
    );
  }

  refreshHandler = () => {
    this.getMovies();
    console.log('atualizou')
  }

  getMovies = () => {
    let favorites = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [];
    this.setState({ favoriteMovies: favorites.filter(attr => attr.attractionType === 'movie') });
  }

  switchView = () => {
    let favorites = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [];
    if (this.state.view === 'movie') {
      this.setState({ favoriteMovies: favorites.filter(attr => attr.attractionType === 'tv'), view: 'tv' });
    } else {
      this.setState({ favoriteMovies: favorites.filter(attr => attr.attractionType === 'movie'), view: 'movie' });
    }
  }

}
