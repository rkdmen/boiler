import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NowPlayingDetailContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgSrc:this.props.poster
        };
        this.hover = this.hover.bind(this);
        this.unhover = this.unhover.bind(this);
    }
    componentDidMount() {

    }



    hover() {
        if(!this.props.backPoster) return;
        //if there is no backPoster availaable, it will not do anything.
        this.setState({imgSrc: this.props.backPoster})
    }

    unhover() {
        this.setState({imgSrc: this.props.poster})
    }

    render() {
      return (
        <div className="singleMovie">
            <Link to={`/info/${this.props.id}`}>
            <img className="poster" src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+this.state.imgSrc} alt="poster"  onMouseOver={this.hover} onMouseOut={this.unhover} />
            <p className="movieTitle">{//this.props.title
            }
            </p>
            </Link>
        </div>
        )
    }
}

NowPlayingDetailContainer.propTypes = {
    poster: React.PropTypes.string,
    backPoster:React.PropTypes.string,
    id:React.PropTypes.number
}

export default connect(null, null)(NowPlayingDetailContainer);
