import React, { Component } from 'react';
import './sidebar.css'
import axios from 'axios'

// import { Container } from './styles';

export default class Sidebar extends Component {

  state = {
    showSidebar: false,
    runtime: ''
  }

  componentDidMount(){
    this.getAttractionDetails();
  }

  render() {
    return (
      <div>
        <button style={{cursor: 'pointer'}} className="btn-show" onClick={() => this.showSidebar(this.props.attraction.id)}>
          <i className="fas fa-info"></i>
        </button>
        <div id={`sidebar-${this.props.attraction.id}`} className="hide-sidebar">
          <i hidden={!this.state.showSidebar} onClick={() => this.showSidebar(this.props.attraction.id)} style={{cursor: 'pointer'}} className="fas fa-times"></i>
          <h2>{this.props.attraction.title}</h2>
          <p>{this.props.attraction.overview.substring(0, 130)}[...]</p>
          <p><i className="fas fa-clock" style={{paddingRight: '10px'}}></i>{this.state.runtime? `${this.state.runtime} min`: 'Not informed'}</p>
          <p><i className="fas fa-star" style={{paddingRight: '10px'}}></i>{this.props.attraction.vote_average}</p>
          <div hidden={!this.props.isFavoritePage}>
            <i className="fas fa-trash" onClick={() => this.props.removeFavoriteCallback(this.props.attraction)}></i>
          </div>
          <div hidden={this.props.isFavoritePage}>
            <p><i
              style={{ cursor: 'pointer' , paddingRight: '10px'}}
              className={this.getIsFavorite(this.props.attraction) ? 'fas fa-heart' : 'far fa-heart'}
              onClick={this.getIsFavorite(this.props.attraction) ? () => this.props.removeFavoriteCallback(this.props.attraction) : () => this.props.addFavoriteCallback(this.props.attraction)}></i>
              {this.getIsFavorite(this.props.attraction) ? 'Remove from Favorites' : 'Add to Favorites'}
          </p>
          </div>
        </div>
      </div>
    );
  }

  getIsFavorite = (movie) => {
    var favorites = JSON.parse(sessionStorage.getItem('favorites'));
    return favorites && favorites.find(fav => fav.id === movie.id);
}

getAttractionDetails = () =>{
  axios.get(`https://api.themoviedb.org/3/${this.props.attraction.attractionType}/${this.props.attraction.id}?api_key=c18fec111ebd528f496fa9e56d50f3b1`).then(resp => {
            console.log('Movie Sidebar', resp.data.runtime);
            this.setState({ runtime: resp.data.runtime });
        });
}

  showSidebar = (id) => {
    this.setState({attraction: this.props.attraction})
    if(!this.state.showSidebar){
      document.getElementById(`sidebar-${id}`).classList.remove('hide-sidebar');
      document.getElementById(`sidebar-${id}`).classList.add('show-sidebar');
    }else{
      document.getElementById(`sidebar-${id}`).classList.add('hide-sidebar');
      document.getElementById(`sidebar-${id}`).classList.remove('show-sidebar');
    }
    this.setState({ showSidebar: !this.state.showSidebar });
  }

}
