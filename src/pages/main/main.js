import React, { Component } from 'react';
import Slider from '../../components/slider/slider';
import MoviesList from '../../components/movies-list/movies-list';
import axios from 'axios';

// import { Container } from './styles';

export default class Main extends Component {

  state = {
    movies: []
  }

  componentDidMount(){
    this.getMovies();
  }

  render() {
    return (
     <div>
        <Slider></Slider>
        <MoviesList movies={this.state.movies}></MoviesList>
     </div>
    );
  }

  getMovies = () => {
     axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc').then(resp => {
      console.log('Movies', resp.data.results);
      this.setState({ movies: resp.data.results});
    });
  }

  
}
