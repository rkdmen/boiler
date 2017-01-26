import React from 'react';
import { Link } from 'react-router';

const Header = () => (
    <div className="header">
      <Link className="headerNowPlaying" to={'/'}>Now Playing </Link>
      <Link className="headerUpcoming" to={'/upcoming'}> Upcoming </Link>
      <Link className="headerSaved" to={'/saved'}>Saved </Link>
    </div>
)

export default Header;