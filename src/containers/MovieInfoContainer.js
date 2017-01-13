import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { getMovieDetail } from '../actions/movieActions';

class MovieInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
      this.props.getMovieDetail(this.props.params.id)
    }


    goBack() {
     browserHistory.goBack();
    }

    render() {
      console.log(this.props, ' prop in movie info')
      return (
        <div>
          <h3 className="header">NOW PLAYING</h3>
          <Button onClick={this.goBack}>Back</Button>

            {!this.props.movieData ? 'Loading...':
            <div className="movieInfoDetailContainer">
              <p className="movieTitle">{this.props.movieData.original_title}</p>
              <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+this.props.movieData.poster_path} alt="poster"/>

            </div>
          }
        </div>
        )
    }

}

MovieInfoContainer.propTypes = {
    getMovieDetail: React.PropTypes.func,
    movieData:React.PropTypes.object,
    params:React.PropTypes.string
}

function mapStateToProps(state) {
  console.log(state, ' state MovieInfoDetailContainer')
    return {
      movieData: state.reducer.movie.movieData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMovieDetail }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieInfoContainer);
