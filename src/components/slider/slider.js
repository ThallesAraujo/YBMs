import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './slider.css';

export default class Slider extends React.Component {


    state = {
        showMovie: true,
        attractionInSlider: {},
        movie: {},
        serie: {},
    }

    constructor(props) {
        super(props);
        this.changeAttraction = this.changeAttraction.bind(this);
    }

    componentDidMount() {
        this.getTopAttractions();
        this.changeAttraction();
    }

    componentWillUnmount() {
        if (this.timeout) clearTimeout(this.timeout);
    }

    getPoster = (poster_path) => {
        return `https://image.tmdb.org/t/p/w500/${poster_path}`
    }


    changeAttraction() {
        this.setState(function () {
            if (this.state.showMovie) {
                this.setState({ showMovie: false });
                return this.setState({ attractionInSlider: this.state.movie });
            } else {
                this.setState({ showMovie: true });
                return this.setState({ attractionInSlider: this.state.serie });
            }

        }, function () {
            this.timeout = setTimeout(
                this.changeAttraction,
                10000
            )
        })
    }

    navigateToDetails = () =>{
        window.location = `/details/${this.state.attractionInSlider.attractionType}/${this.state.attractionInSlider.id}`;
    }


    getTopAttractions = () => {
        axios.get('https://api.themoviedb.org/3/movie/420818?api_key=c18fec111ebd528f496fa9e56d50f3b1').then(resp => {
            console.log('Movie', resp.data);
            this.setState({ movie: resp.data, attractionInSlider: {attractionType: 'movie', ...resp.data} });
        });
        axios.get('https://api.themoviedb.org/3/tv/60735?api_key=c18fec111ebd528f496fa9e56d50f3b1').then(resp => {
            console.log('Serie', resp.data);
            this.setState({ serie: { title: resp.data.original_name, attractionType: 'tv', ...resp.data } });
        });

    }


    render() {
        return (

            <div className="slider">
                
                    <img onClick={() => this.navigateToDetails()} className="slider-poster" src={this.getPoster(this.state.attractionInSlider.poster_path)} alt="poster" />
                
                <div className="attraction-info">
                    
                    <h1 onClick={() => this.navigateToDetails()} className="attraction-title">{this.state.attractionInSlider.title}</h1>
                    
                    <p>{this.state.attractionInSlider.vote_average}</p>
                    <p>{this.state.attractionInSlider.overview}</p>

                </div>
            </div>

        )
    }
}

ReactDOM.render(
    <Slider animDuration={10} />,
    document.getElementById('root')
);
