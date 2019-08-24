import React, { Component } from 'react';
import MoviesList from '../../components/movies-list/movies-list';
import axios from 'axios';

// import { Container } from './styles';

export default class Favorites extends Component {

  state = {
      favoriteMovies : []
  }

  componentDidMount(){
      this.getMovies();
  }
    
  render() {
    return (
        <div>
            <h1>Favorites</h1>
            <MoviesList movies = {this.state.favoriteMovies}></MoviesList>
        </div>
    );
  }

  getMovies = () => {
    axios.get('https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2014-10-22').then(resp => {
     console.log('Movies', resp.data.results);
     this.setState({ favoriteMovies: resp.data.results});
   });
}

}
