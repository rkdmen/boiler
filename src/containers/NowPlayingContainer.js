import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Button,  DropdownButton, MenuItem  } from 'react-bootstrap';
import { getNowPlayingList, getGenreData, searchByGenre } from '../actions/movieActions';
import NowPlayingDetailContainer from './NowPlayingDetailContainer';
import { Link } from 'react-router';

class NowPlayingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nowPlayingList:[],
          page:1,
          disableBtn:true,
          genres: []
        };
        this.nextPage = this.nextPage.bind(this);
        this.prevPage = this.prevPage.bind(this);
    }

    componentDidMount() {
      //On main page, it will load with first page section of NowPlaying and get list of genre
      this.props.getNowPlayingList(1);
      this.props.getGenreData();
    }

    componentWillReceiveProps(nextProps) {
      this.setState({nowPlayingList:nextProps.nowPlayingList, genres:nextProps.genreData})
    }

    nextPage(){
      //Search next page for NowPlaying
      window.scrollTo(0, 0);
      // browserHistory.push(`/page/${this.state.page+1}`)
      setTimeout(()=>{
        //after button is called using setTimeout 400ms to prevent rendering immediately.
        this.setState({page:this.state.page+1});
        this.setState({disableBtn:false});
          this.props.getNowPlayingList(this.state.page+1)
      }, 400);
    }


    prevPage(){
      //Search prev page for NowPlaying
      window.scrollTo(0, 0);
      if(this.state.page === 1){
        this.setState({disableBtn:true})
        return;
      } else {
          this.setState({page:this.state.page-1})
          this.props.getNowPlayingList(this.state.page-1)
          .then(()=>{
            if(this.state.page === 1){
            this.setState({disableBtn:true})
            }
          })
      }
    }

    handleChange(val){
      //Shows first page of by genre
      this.props.searchByGenre(val)
      .then(()=>{
        this.setState({nowPlayingList:this.props.searchByGenreResult})
      })
    }

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
            <Link to={`/page/${this.state.page-1}`}>
              <Button className='btn btn-default btn-lg next' disabled={this.state.disableBtn} onClick={this.prevPage}>Prev</Button>
            </Link>
            <Link to={`/page/${this.state.page+1}`}>
              <Button className='btn btn-default btn-lg next' onClick={this.nextPage}>Next</Button>
            </Link>
            <div className="emptySpace"></div>
              <DropdownButton dropup bsStyle="info" onSelect={ (val) => this.handleChange(val) } title="Search By Genre" id="bg-nested-dropdown" >
                {!this.state.genres?<MenuItem>Loading...</MenuItem>:
                  this.state.genres.map((genre, i) =>{
                    return (
                        <MenuItem key={i} eventKey={genre.id}>
                          {genre.name}
                        </MenuItem>
                      )
                  })
                }
              </DropdownButton>
          </div>

        </div>
        )
    }
}

NowPlayingContainer.propTypes = {
    getNowPlayingList: React.PropTypes.func,
    getGenreData: React.PropTypes.func,
    searchByGenre: React.PropTypes.func,
    searchByGenreResult: React.PropTypes.array
}

function mapStateToProps(state) {
    return {
      nowPlayingList: state.reducer.movie.movieList,
      genreData: state.reducer.movie.genreData,
      searchByGenreResult: state.reducer.movie.searchByGenre
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNowPlayingList, getGenreData, searchByGenre }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingContainer);
