/* eslint-disable jsx-a11y/img-redundant-alt */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

export default function Header({ username ,profilePic}) {
  return (
    <div className="flex border-b border-gray-primary h-4 p-4 py-8">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            className="rounded-full h-8 w-8 flex mr-3"
            src={profilePic=== undefined ?  DEFAULT_IMAGE_PATH: profilePic}
            alt={`${username} profile picture`}
            onError={(e) => {
              e.target.src = DEFAULT_IMAGE_PATH;
            }}
          />
          <p className="font-bold">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired
};
