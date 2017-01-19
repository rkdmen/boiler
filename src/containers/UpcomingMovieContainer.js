import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button,  DropdownButton, MenuItem  } from 'react-bootstrap';
import { getUpcoming } from '../actions/movieActions';
import NowPlayingDetailContainer from './NowPlayingDetailContainer';

class UpcomingMovieContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          upcomingList:[],
          page:1,
          disableBtn:true,
          genres: []
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
      //On main page, it will load with first page section of Upcoming and get list of genre
      this.props.getUpcoming(this.state.page);
      this.props.getGenreData();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({upcomingList:nextProps.upcomingList, genres:nextProps.genreData})
    }

    nextPage(){
      //Search next page for Upcoming
      window.scrollTo(0, 0);
      // browserHistory.push(`/page/${this.state.page+1}`)
      setTimeout(()=>{
        //after button is called using setTimeout 400ms to prevent rendering immediately.
        this.props.getUpcoming(this.state.page+1)
        this.setState({page:this.state.page+1, disableBtn:false})
        }, 400)
    }


    prevPage(){
      //Search prev page for Upcoming
      window.scrollTo(0, 0);
          this.setState({page:this.state.page-1});
          this.props.getUpcoming(this.state.page-1)
          .then(()=>{
            if(this.state.page === 1){
            //disable prev button if current page is 1
            this.setState({disableBtn:true});
            }
          })
    }

    // handleChange(val){
    //   //Shows first page of by genre
    //   this.props.searchByGenre(val)
    //   .then(()=>{
    //     this.setState({nowPlayingList:this.props.searchByGenreResult});
    //   })
    // }

    render() {
      return (
        <div className="nowPlayingContainer">
            {!this.state.nowPlayingList ? 'Loading...':
            this.state.nowPlayingList.map((movie, i)=>{
              if(movie.poster_path === null){
                /*For beauty purpose of my app, if poster data is not available
                I decided omit from my app.
                  */
                return ;
              } else return (
                <NowPlayingDetailContainer
                  key={i}
                  id={movie.id}
                  title={movie.original_title}
                  overview={movie.overview}
                  poster={movie.poster_path}
                  backPoster={movie.backdrop_path}
                />
              )
            })
          }
          <div className="emptySpace"></div>
          <div className="btnGroup">
            <Button className='btn btn-default btn-lg next' disabled={this.state.disableBtn} onClick={this.prevPage}>Prev</Button>
            <Button className='btn btn-default btn-lg next' onClick={this.nextPage}>Next</Button>
            <div className="emptySpace"></div>
          </div>
        </div>
        )
    }
}

UpcomingMovieContainer.propTypes = {
    getUpcoming: React.PropTypes.func,
}

function mapStateToProps(state) {
    return {
      upcomingList: state.reducer.movie.upcomingData,
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUpcoming }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(UpcomingMovieContainer);
