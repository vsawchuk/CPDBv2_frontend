import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './link-header-button.sass';


export default function LinkHeaderButton(props) {
  const { buttonText, to } = props;

  return (
    <div className={ styles.linkHeaderButton }>
      <Link
        to={ to }
        className='button'
      >
        { buttonText }
      </Link>
    </div>
  );
}

LinkHeaderButton.propTypes = {
  buttonText: PropTypes.string,
  to: PropTypes.string,
};

LinkHeaderButton.defaultProps = {
  buttonText: 'Click',
  to: '',
};
