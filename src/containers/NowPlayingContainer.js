import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Button,  DropdownButton, MenuItem  } from 'react-bootstrap';
import { getNowPlayingList, getGenreData, searchByGenre } from '../actions/movieActions';
import NowPlayingDetailContainer from './NowPlayingDetailContainer';

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
        // this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
      this.props.getNowPlayingList(1);
      this.props.getGenreData();
    }
    componentWillReceiveProps(nextProps) {
      // console.log(nextProps, 'NextProps~')
      this.setState({nowPlayingList:nextProps.nowPlayingList, genres:nextProps.genreData})
    }

    nextPage(){
      window.scrollTo(0, 0);
      this.setState({page:this.state.page+1});
      this.props.getNowPlayingList(this.state.page+1);
      this.setState({disableBtn:false});
    }

    prevPage(){
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
                I decided not to include onto my app.
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
  // console.log(state, ' state map ~~~')
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
