import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, browserHistory } from 'react-router';
import { Button } from 'react-bootstrap';
import { getMovieDetail } from '../actions/movieActions';

class MovieInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.goBack = this.goBack.bind(this);

    }

    componentDidMount() {
      this.props.getMovieDetail(this.props.params.id)
    }
    componentWillReceiveProps(nextProps) {
      // console.log(nextProps, ' next prop')
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
            <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2"+this.props.movieData.poster_path} alt="poster"/>
            <img src={"https://image.tmdb.org/t/p/w185_and_h278_bestv2"+this.props.movieData.backdrop_path} alt="poster"/>
          </div>
          }
        </div>
        )
    }

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
