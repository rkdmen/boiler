import React from "react";
import NowPlayingContainer from "../containers/NowPlayingContainer";
import UpcomingMovieContainer from "../containers/UpcomingMovieContainer";

class MovieNow extends React.Component {
  render() {
    return (
      <div>
        <NowPlayingContainer />
      </div>
    );
  }
}

export default MovieNow;
