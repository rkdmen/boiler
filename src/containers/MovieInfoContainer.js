import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { Button, Col, Row, Grid } from 'react-bootstrap';
import { getMovieDetail, getVideo, getReview, saveMovie, getSavedMovie } from '../actions/movieActions';
import Header from '../components/Header';
import { toastr } from 'react-redux-toastr';

//Implement Toaster after Saved.
//Saved should change to Delete


class MovieInfoContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          disableBtn:false
        };
        this.saveMovie = this.saveMovie.bind(this);
    }

    componentDidMount() {
      this.props.getMovieDetail(this.props.params.id);
      this.props.getVideo(this.props.params.id);
      this.props.getReview(this.props.params.id);
      this.props.getSavedMovie();
    }

    goBack() {
      //Goes back to beginning of app
      browserHistory.goBack();
    }

    saveMovie() {
      this.props.saveMovie({ movieId:this.props.params.id, title:this.props.movieData.original_title, poster:this.props.movieData.poster_path})
      this.setState({disableBtn:true})
    }

    starSymbol(rating){
      let zero = '☆';
      let one = '★';
      let result;
      // this.props.movieData.vote_average
      if(rating === 0 || rating === null || rating === undefined){
        result = (<span>Rating Not Available</span>)
      }
      if(rating > 0){
        let temp = Math.round(rating);
        let temp2 = 10 - temp;
        temp = one.repeat(temp);
        temp2 = zero.repeat(temp2);
        result = (<span>{temp}{temp2}</span>)
      }
      return result;
    }

    render() {
      //Checks if there is zero review, one review, or more than one.
      let review;
      if(this.props.reviewData){
        if(this.props.reviewData.length === 0){
          review = (
            <div className="reviewContainer">
              <span className="bold">No review available.</span>
            </div>
          )
        }
        if(this.props.reviewData.length === 1){
          review = (
              <div className="reviewContainer">
                <span className="bold">Review: </span>
                <p>
                  <span className="reviewAuthor">{this.props.reviewData[0].author}:</span>
                </p>
                <p> {this.props.reviewData[0].content} </p>
              </div>
            )
        }
        if(this.props.reviewData.length > 1){
          review = (
              <div className="reviewContainer">
                <span className="bold">Reviews: </span>
                <div>
                  {
                    this.props.reviewData.map((rev, i)=>{
                      return (
                        <div key={i}>
                          <span className="reviewAuthor">{rev.author}:</span>
                          <p >{rev.content}</p>
                        </div>
                        )
                    })
                  }
                </div>
              </div>
            )
        }
      } //End of {review} condition.

      return (
        <Grid >
          <Header />
            <Row>
            {!this.props.videoData ? <div className="loading">Loading...</div>:
            <div className="movieInfoContainer">

              <Col xs={12} md={4}>
                <p className="movieTitle">{!this.props.movieData.original_title?'':this.props.movieData.original_title}</p>
                <img src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+this.props.movieData.poster_path} alt="poster"/>
                <div className="emptySpace"></div>
                <p><span className="bold">Released: </span> {this.props.movieData.release_date}</p>
                <p><span className="bold">Rating: </span> {this.starSymbol(this.props.movieData.vote_average)}</p>
                <p><span className="bold">Runtime: </span>{this.props.movieData.runtime}mins</p>
                <p><span className="bold">Synopsis: </span>{this.props.movieData.overview}</p>
                <p>
                  <span className="bold">Genre: </span>
                  {this.props.movieData.genres.map((g, i)=>
                    <li key={i}>{g.name}&nbsp;</li>)
                  }
                </p>
                <div className="emptySpace forDesktop"></div>
                <Button className="btn btn-default forDesktop" bsStyle="primary" bsSize="large" onClick={this.goBack}>Back</Button>
                <Button className="btn btn-default forDesktop" disabled={this.state.disableBtn} bsStyle="default" bsSize="large" onClick={this.saveMovie}>Save</Button>
              </Col>

              <Col xs={12} md={8}>
                <p className="trailerTitle bold">{!this.props.videoData.name ? '':this.props.videoData.name}</p>

                <div className="embed-responsive embed-responsive-16by9">
                  <iframe src={`https://www.youtube.com/embed/${this.props.videoData.key}`} className="embed-responsive-item"></iframe>
                </div>

                <div className="emptySpace forMobile"></div>
                <Button className="btn btn-default forMobile" bsStyle="primary" bsSize="large" onClick={this.goBack}>Back</Button>
                <Button className="btn btn-default forMobile" disabled={this.state.disableBtn}  bsStyle="default" bsSize="large" onClick={this.saveMovie}>Save</Button>

                {review}
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
    getReview: React.PropTypes.func,
    getSavedMovie: React.PropTypes.func,
    saveMovie: React.PropTypes.func,
    movieData:React.PropTypes.object,
    params:React.PropTypes.object,
    videoData:React.PropTypes.object,
    reviewData:React.PropTypes.array
}

function mapStateToProps(state) {
    return {
      movieData: state.reducer.movie.movieData,
      videoData: state.reducer.movie.videoData,
      reviewData: state.reducer.movie.reviewData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getMovieDetail, getVideo, getReview, saveMovie, getSavedMovie }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieInfoContainer);
