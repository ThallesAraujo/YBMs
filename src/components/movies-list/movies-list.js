import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './movies-list.css';
import Sidebar from '../sidebar/sidebar';

// import { Container } from './styles';

export default class MoviesList extends Component {


  render() {
    return (
        <div className="movies-list">
            {this.props.movies.map(movie => {
                return <div className="movie-card">
                    <img className="movie-card-poster" src={this.getPoster(movie.poster_path)} alt="poster"/>
                    <div className="movie-details">
                    <h3 className="movie-title">{movie.title}</h3>
                    <p>{movie.original_language}</p>
                    <p>{movie.vote_count}</p>
                    <Link to={`/details/${movie.id}`}>Details</Link>
                    <Sidebar movie={movie}></Sidebar>
                    </div>
                </div>
            })}
        </div>
    );
  }

  getPoster = (poster_path) => {
    return `https://image.tmdb.org/t/p/w500/${poster_path}`
}

}
