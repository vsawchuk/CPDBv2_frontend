import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import cx from 'classnames';

import AttachmentHeader from './headers/attachment-header';
import PrintAttachments from './print-attachments';
import NoAttachmentHeader from './headers/no-attachment-header';
import AttachmentItem from './attachment-item';
import styles from './attachments.sass';
import { PrintModeContext } from 'contexts';


export default function Attachments(props) {
  const {
    items,
    openRequestDocumentModal,
    alreadyRequested,
    pathname,
    noAttachmentTextEditWrapperStateProps,
    onTrackingAttachment,
  } = props;

  const { printMode } = useContext(PrintModeContext);

  const hasData = items.length > 0;

  return (
    printMode
      ? (
        <PrintAttachments items={ items }/>
      ) : (
        <div className={ cx(styles.attachmentsContainer, { 'has-data': hasData }) }>
          <div className='attachments-content'>
            {
              hasData
                ? (
                  <AttachmentHeader
                    openRequestDocumentModal={ openRequestDocumentModal }
                    alreadyRequested={ alreadyRequested }
                  />
                ) : (
                  <NoAttachmentHeader
                    openRequestDocumentModal={ openRequestDocumentModal }
                    alreadyRequested={ alreadyRequested }
                    editWrapperStateProps={ noAttachmentTextEditWrapperStateProps }
                  />
                )
            }
            <div className='attachments'>
              {
                items.map((item, ind) => (
                  <AttachmentItem
                    key={ ind }
                    { ...item }
                    pathname={ pathname }
                    onTrackingAttachment={ onTrackingAttachment }
                  />
                ))
              }
            </div>
          </div>
        </div>
      )
  );
}

Attachments.defaultProps = {
  items: [],
};

Attachments.propTypes = {
  items: PropTypes.array,
  openRequestDocumentModal: PropTypes.func,
  alreadyRequested: PropTypes.bool,
  pathname: PropTypes.string,
  noAttachmentTextEditWrapperStateProps: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
};
