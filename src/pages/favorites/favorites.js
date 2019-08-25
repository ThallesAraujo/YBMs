import React, { Component } from 'react';
import MoviesList from '../../components/movies-list/movies-list';
import axios from 'axios';

// import { Container } from './styles';
export default class Favorites extends Component {

  state = {
    favoriteMovies: [],
    view : 'movie'
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
        <h1>Favorites</h1>
        <button onClick={() => this.switchView()}>{this.state.view === 'movie'? 'Switch to Series': 'Switch to Movies'}</button>
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

  switchView = () =>{
    let favorites = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [];
    if(this.state.view === 'movie'){
      this.setState({ favoriteMovies: favorites.filter(attr => attr.attractionType === 'tv'), view: 'tv' });
    }else{
      this.setState({ favoriteMovies: favorites.filter(attr => attr.attractionType === 'movie'), view: 'movie' });
    }
  }

}
