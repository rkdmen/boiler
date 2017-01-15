import React from 'react';
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

    componentWillReceiveProps(nextProps) {
        this.setState({imgSrc: nextProps.poster})
    }


    hover() {
        if(!this.props.backPoster) return;
        //if there is no backPoster availaable, it will not do anything.
        this.setState({imgSrc: this.props.backPoster})
    }

    unhover() {
        //On poster hover, will show back poster if available.
        this.setState({imgSrc: this.props.poster})
    }

    render() {
      return (
        <div className="singleMovie">
            <Link to={`/info/${this.props.id}`}>
            <img className="posterImg" src={'https://image.tmdb.org/t/p/w185_and_h278_bestv2'+this.state.imgSrc} alt="poster"  onMouseOver={this.hover} onMouseOut={this.unhover} />

            <p className="overlay movieTitle">{this.props.title} </p>
            </Link>
        </div>
        )
    }
}

NowPlayingDetailContainer.propTypes = {
    poster: React.PropTypes.string,
    backPoster:React.PropTypes.string,
    id:React.PropTypes.number,
    title: React.PropTypes.string
}

export default NowPlayingDetailContainer;
