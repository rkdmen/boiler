import React from 'react';
import { Link } from 'react-router';

const Header = () => (
    <div className="header">
      <Link to={'/'}>
        <div className="headerLeft">
          <p>Now Playing</p>
        </div>
      </Link>
      <Link to={'/upcoming'}>
        <div  className="headerRight">
          <p>Upcoming</p>
        </div>
      </Link>
    </div>
)

export default Header;