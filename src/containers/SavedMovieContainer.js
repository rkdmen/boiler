import React from 'react';
import { saveMovie, getSavedMovie } from '../actions/movieActions';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../components/Header';
import { Col, Row, Grid } from 'react-bootstrap';

class SavedMovieContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            savedList:[]
        };
        // this.hover = this.hover.bind(this);
        // this.unhover = this.unhover.bind(this);
    }
    componentDidMount() {
      this.props.getSavedMovie();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({savedList:nextProps.savedMovieData.savedMovie})
    }


    // hover() {
    //     if(!this.props.backPoster) return;
    //     //if there is no backPoster availaable, it will not do anything.
    //     this.setState({imgSrc: this.props.backPoster})
    // }

    // unhover() {
    //     //On poster hover, will show back poster if available.
    //     this.setState({imgSrc: this.props.poster})
    // }

    render() {
      return (
          <Grid className="main-container">
            <Row className="show-grid">
            <Col xs={12} md={12}>
                <div className="nowPlayingContainer">
                <Header />
                {!this.state.savedList? "<div>Loading...</div>":
                  this.state.savedList.map((movie, i)=>{
                    return (
                        <div  className="singleMovie" key={i} >
                        <Link  to={`/info/${movie.movieId}`}>
                        <img className="posterImg" src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+movie.poster} alt="poster"   />
                        <p className="overlay movieTitle">{movie.title} </p>
                        </Link>
                        </div>
                        )
                  })
                }
                </div>
            </Col>
            </Row>
            </Grid>
        )
    }
}

SavedMovieContainer.propTypes = {
}

function mapStateToProps(state) {
    return {
        savedMovieData: state.reducer.movie.savedMovieData
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ saveMovie, getSavedMovie }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(SavedMovieContainer);
