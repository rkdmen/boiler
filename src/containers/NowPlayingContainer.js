import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getNowPlayingList } from '../actions/movieActions';
// import MovieInfoContainer from './MovieInfoContainer';
import NowPlayingDetailContainer from './NowPlayingDetailContainer';

class NowPlayingContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nowPlayingList:[]
        };
    }
    componentDidMount() {
      this.props.getNowPlayingList();
    }
    componentWillReceiveProps(nextProps) {
      console.log(nextProps, ' next prop');
      this.setState({nowPlayingList:nextProps.nowPlayingList})

    }

    render() {

      console.log(this.state, ' this state, nowPlaying')
      return (
        <div className="nowPlayingContainer">

            {!this.props.nowPlayingList ? 'Loading...':
            this.props.nowPlayingList.map((movie, i)=>{
              return (

                <NowPlayingDetailContainer
                  key={i}
                  id={movie.id}
                  title={movie.original_title}
                  overview={movie.overview}
                  poster={movie.poster_path}
                />
              )
            })
          }

        </div>
        )
    }

}

function mapStateToProps(state) {
  console.log(state, ' state movieContainer')
    return {
      nowPlayingList: state.reducer.movie.movieList
    }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getNowPlayingList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NowPlayingContainer);
