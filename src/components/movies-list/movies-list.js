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
                        <Link to={`/details/${movie.attractionType}/${movie.id}`}>
                            <img className="movie-card-poster" src={this.getPoster(movie.poster_path)} alt="poster" />
                        </Link>
                        <div className="movie-details">
                            <Link to={`/details/${movie.attractionType}/${movie.id}`}>
                                <h3 className="movie-title">{movie.title}</h3>
                            </Link>
                            <p hidden={movie.attractionType === 'tv'}>Status: {this.getStatus(movie.release_date)}</p>

                            <div className="card-actions">
                                <div hidden={this.props.isFavorites}>
                                    <i
                                        style={{ cursor: 'pointer' }}
                                        className={this.getIsFavorite(movie) ? 'fas fa-heart' : 'far fa-heart'}
                                        onClick={this.getIsFavorite(movie) ? () => this.removeFromFavorites(movie) : () => this.addToFavorites(movie)}></i>
                                </div>
                                <div hidden={!this.props.isFavorites}>
                                    <i className="fas fa-trash" onClick={() => this.props.removeFavoriteCallback(this.props.movie)}></i>
                                </div>
                                <Sidebar movie={movie} isFavoritePage={this.props.isFavorites} addFavoriteCallback={(movie) => this.addToFavorites(movie)} removeFavoriteCallback={(movie) => this.removeFromFavorites(movie)}></Sidebar>
                            </div>
                        </div>
                    </div>
                })}
            </div>
        );
    }



    getStatus = (releaseDate) => {
        var isBefore = new Date(releaseDate) < new Date(new Date().toDateString());
        return isBefore ? 'Released' : `To Release (${releaseDate})`
    }

    getIsFavorite = (movie) => {
        var favorites = JSON.parse(sessionStorage.getItem('favorites'));
        return favorites && favorites.find(fav => fav.id === movie.id);
    }

    removeFromFavorites = (movie) => {
        var favorites = JSON.parse(sessionStorage.getItem('favorites'));
        favorites.splice(favorites.indexOf(favorites.find(fav => fav.id === movie.id)), 1);
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        this.props.refreshCallback();
        this.setState({});
    }

    addToFavorites = (movie) => {
        let savedFavorites = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [];
        let favorites = [movie, ...savedFavorites];
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites', JSON.parse(sessionStorage.getItem('favorites')));
        this.props.refreshCallback();
        this.setState({});
    }

    getPoster = (poster_path) => {
        return `https://image.tmdb.org/t/p/w500/${poster_path}`
    }

}
