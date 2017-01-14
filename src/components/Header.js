import React from 'react';
import { Link } from 'react-router';

const Header = () => (
    <div>
      <Link to={'/'}>
        <h3 className="header">Now Playing</h3>
      </Link>
    </div>
)

export default Header;