import React, { Component } from 'react';
import axios from 'axios'
import './details.css'

// import { Container } from './styles';

export default class Details extends Component {

    state = {
        attraction: {},
        cast: [],
        videos: [],
        reviews: []
    }

    componentDidMount() {
        this.getAttraction();
    }

    render() {
        return (
            <div>
                <h1>Details</h1>
                <div className="banner">

                    <img className="banner-poster" src={this.getPoster(this.state.attraction.poster_path)} alt="poster" />

                    <div className="attraction-info">

                        <h1 className="attraction-title">{this.props.match.params.type === 'tv' ? this.state.attraction.original_name : this.state.attraction.title}</h1>

                        <p>{this.state.attraction.vote_average}</p>
                        <p>{this.state.attraction.runtime} min</p>
                        <p>{this.state.attraction.overview}</p>
                        <div>
                            <button onClick={this.getIsFavorite(this.state.attraction) ? () => this.removeFromFavorites(this.state.attraction) : () => this.addToFavorites(this.state.attraction)}>
                                <i className={this.getIsFavorite(this.state.attraction) ? 'fas fa-heart' : 'far fa-heart'}></i>
                                {this.getIsFavorite(this.state.attraction) ? 'Remove From Favorites' : 'Add to Favorites'}
                            </button>
                        </div>

                    </div>
                </div>
                <div>
                    <h3>Cast</h3>
                    <div className="container">
                        {this.state.cast.map(cast => {
                            return <div className="cast-card">
                                <img src={this.getPoster(cast.profile_path)} alt="profile-image" />
                                <p>{cast.name}</p>
                                <p>as {cast.character}</p>
                            </div>
                        })}
                    </div>
                </div>
                <div>
                    <h3>Videos & Trailers</h3>
                    <div className="container">
                        {this.state.videos.map(video => {
                            return <div className="video-card" onClick={() => this.redirectToVideo(video.key)}>
                                <i className="far fa-play-circle"></i>
                                <p>{video.name}</p>
                            </div>
                        })}
                    </div>
                </div>

                <div>
                    <h3>Reviews</h3>
                    <div className="container">
                        {this.state.reviews.map(review => {
                            return <div className="review-bubble">
                                <h2>{review.author}</h2>
                                <p>{review.content.substring(0, 500)}[...]</p>
                            </div>
                        })}
                    </div>
                </div>


            </div>

        );
    }

    getPoster = (poster_path) => {
        return `https://image.tmdb.org/t/p/w500/${poster_path}`
    }

    redirectToVideo = (key) => {
        window.open(`https://www.themoviedb.org/video/play?key=${key}`);
    }

    getIsFavorite = (movie) => {
        var favorites = JSON.parse(sessionStorage.getItem('favorites'));
        return favorites && favorites.find(fav => fav.id === movie.id);
    }

    removeFromFavorites = (movie) => {
        var favorites = JSON.parse(sessionStorage.getItem('favorites'));
        favorites.splice(favorites.indexOf(favorites.find(fav => fav.id === movie.id)), 1);
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        this.setState({});
    }

    addToFavorites = (movie) => {
        let savedFavorites = sessionStorage.getItem('favorites') ? JSON.parse(sessionStorage.getItem('favorites')) : [];
        let favorites = [movie, ...savedFavorites];
        sessionStorage.setItem('favorites', JSON.stringify(favorites));
        console.log('Favorites', JSON.parse(sessionStorage.getItem('favorites')));
        this.setState({});
    }

    getAttraction = () => {
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('Movie', resp.data);
            this.setState({ attraction: resp.data });
        });

        //elenco
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/credits?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('credits', resp.data.cast);
            this.setState({ cast: resp.data.cast });
        });

        //Reproduz o vídeo com a key Ex: https://www.themoviedb.org/video/play?key=d7rlUe-Thvk
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/videos?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('videos', resp.data.results);
            this.setState({ videos: resp.data.results });
        });

        //reviews
        axios.get(`https://api.themoviedb.org/3/${this.props.match.params.type}/${this.props.match.params.id}/reviews?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('reviews', resp.data.results);
            this.setState({ reviews: resp.data.results });
        });
    }

}
