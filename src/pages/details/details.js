import React, { Component } from 'react';
import axios from 'axios'

// import { Container } from './styles';

export default class Details extends Component {

    state = {
        attraction: {}
    }

    componentDidMount() {
        this.getAttraction();
    }

    render() {
        return <div />;
    }

    getAttraction = () => {
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('Movie', resp.data);
            this.setState({ movie: resp.data, attraction: resp.data });
        });

        //elenco
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/credits?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('credits', resp);
        });

        //Reproduz o vídeo com a key Ex: https://www.themoviedb.org/video/play?key=d7rlUe-Thvk
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/videos?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('videos', resp);
        });

        //reviews
        axios.get(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}/reviews?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('reviews', resp);
        });
    }

}
