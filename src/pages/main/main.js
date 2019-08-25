import React, { Component } from 'react';
import Slider from '../../components/slider/slider';
import MoviesList from '../../components/movies-list/movies-list';
import axios from 'axios';

// import { Container } from './styles';

export default class Main extends Component {

  state = {
    movies: [],
    series: [],
    currentView: [],
    view : 'movie'
  }

  componentDidMount(){
    this.getMovies();
    this.getSeries();
  }

  render() {
    return (
     <div>
        <Slider></Slider>
        <button onClick={() => this.switchView()}>{this.state.view === 'movie'? 'View Top Series': 'View Top Movies'}</button>
        <button onClick={() => this.orderByReleaseDate()}>Order by Release Date</button>
        <MoviesList movies={this.state.currentView} isFavorites="false"></MoviesList>
     </div>
    );
  }

  switchView = () =>{
    if(this.state.view === 'movie'){
      this.setState({view: 'tv', currentView: this.state.series})
    }else{
      this.setState({view: 'movie', currentView: this.state.movies})
    }
  }



  getMovies = () => {
     axios.get('https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc').then(resp => {
      console.log('Movies', resp.data.results);
      let movies = resp.data.results.map(movie => {return {attractionType: 'movie', ...movie}});
      this.setState({ movies, currentView : movies});
    });
  }

  getSeries = () => {
    axios.get('https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc').then(resp => {
     console.log('Movies', resp.data.results);
     let series = resp.data.results.map(serie => {return {attractionType: 'tv', title: serie.original_name, ...serie}});
     this.setState({ series});
   });
 }

 orderByReleaseDate = () =>{
  axios.get(`https://api.themoviedb.org/3/discover/${this.state.view}?&language=en-US&sort_by=release_date.desc`).then(resp => {
     let attractions = resp.data.results.map(attr => {return {attractionType: this.state.view, title: this.state.view==='tv'? attr.original_name: attr.title, ...attr}});
     this.setState({ currentView: attractions});
   });
 }

  
}
