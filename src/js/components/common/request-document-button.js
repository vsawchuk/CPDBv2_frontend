import PropTypes from 'prop-types';
import React, { Component } from 'react';
import cx from 'classnames';

import styles from './request-document-button.sass';


export class RequestDocumentButton extends Component {
  handleClick = () => {
    if (this.props.alreadyRequested) {
      return;
    }

    this.props.openRequestDocumentModal();
  };

  render() {
    const { alreadyRequested, hasData } = this.props;
    return (
      <div
        className={
          cx(
            styles.requestDocumentButton,
            'test--attachment-request',
            { 'already-requested': alreadyRequested }
          )
        }
        onClick={ this.handleClick }
      >
        {
          !alreadyRequested
            ? (hasData ? 'New Document Notifications' : 'Request Documents')
            : <span>Documents Requested &nbsp; <span>✔</span></span>
        }
      </div>
    );
  }
}

RequestDocumentButton.propTypes = {
  alreadyRequested: PropTypes.bool,
  openRequestDocumentModal: PropTypes.func,
  hovering: PropTypes.bool,
  hasData: PropTypes.bool,
};

export default RequestDocumentButton;
