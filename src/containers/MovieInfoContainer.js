import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { getMovieDetail, getVideo } from '../actions/movieActions';
import Header from '../components/Header';
import YouTube from 'react-youtube';

class MovieInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};

    }

    componentDidMount() {
      this.props.getMovieDetail(this.props.params.id)
      this.props.getVideo(this.props.params.id)
    }

    goBack() {
     browserHistory.goBack();
    }

    render() {
      console.log(this.props, ' prop in movie info')
      return (
        <Grid>
          <Header />
            <Row>
            {!this.props.movieData ? 'Loading...':
            <div className="movieInfoContainer">
              <Col xs={12} md={4}>
                <p className="movieTitle">{this.props.movieData.original_title}</p>
                <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+this.props.movieData.poster_path} alt="poster"/>
                <Button onClick={this.goBack}>Back</Button>
              </Col>
              <Col xs={12} md={8}>
                <p className="trailerTitle">{this.props.videoData.name}</p>
                <YouTube
                videoId={this.props.videoData.key}
                onReady={this._onReady}
                />
              </Col>
            </div>
          }
            </Row>
        </Grid>
        )
    }

}

MovieInfoContainer.propTypes = {
    getMovieDetail: React.PropTypes.func,
    getVideo: React.PropTypes.func,
    movieData:React.PropTypes.object,
    params:React.PropTypes.object,
    videoData:React.PropTypes.object
}

function mapStateToProps(state) {
  console.log(state, ' state MovieInfoDetailContainer###')
    return {
      movieData: state.reducer.movie.movieData,
      videoData: state.reducer.movie.videoData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMovieDetail, getVideo }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieInfoContainer);
