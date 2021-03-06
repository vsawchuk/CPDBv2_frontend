import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';

import styles from './heading.sass';


export default function Heading(props) {
  const { crid, category, finding, outcome, date, coaccused } = props.complaint;

  return (
    <Link to={ `/complaint/${crid}/` } className={ styles.heading }>
      <div className='heading-box'>
        <div className='heading-kind-wrapper'>
          <span className={ cx('attachments-heading-kind', { 'active': finding === 'Sustained' }) }>
            Complaint
          </span>
        </div>
        <span className='heading-detail'>
          <div className='attachments-heading-category'>
            { category }
          </div>
          <div className='attachments-heading-finding'>{ finding }, { outcome }</div>
        </span>
        <span className='heading-right'>
          <span className='attachments-heading-coaccused'>
            1 of { coaccused } coaccused
          </span>
          <span className='attachments-heading-date'>
            { date }
          </span>
        </span>
      </div>
    </Link>
  );
}

Heading.propTypes = {
  complaint: PropTypes.object,
};
