import React, { Component, PropTypes } from 'react';

import styles from './log-file-modal-content.sass';


export default class LogFileModalContent extends Component {
  render() {
    const { logUrl, crawlerName, recentRunAt } = this.props.crawler;

    return (
      <div className={ styles.logFileModal }>
        <div className='modal-title'>{ `${crawlerName} - ${recentRunAt}` }</div>
        <embed src={ logUrl } className='embed-content'/>
      </div>

    );
  }
}


LogFileModalContent.propTypes = {
  crawler: PropTypes.object,
};
