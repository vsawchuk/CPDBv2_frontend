import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import pluralize from 'pluralize';
import { slice, noop } from 'lodash';

import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import styles from './document-page.sass';
import SimpleListWidget from './simple-list-widget';
import EditableTextBox from './editable-text-box';
import EditableTagsInput from './editable-tags-input';
import FooterContainer from 'containers/footer-container';
import OutboundLink from 'components/common/outbound-link';
import MinimalScrollBars from 'components/common/minimal-scroll-bars';
import * as LayeredKeyBinding from 'utils/layered-key-binding';


export default class DocumentPage extends Component {
  componentDidMount() {
    LayeredKeyBinding.bind('esc', noop);
  }

  componentWillUnmount() {
    LayeredKeyBinding.unbind('esc');
  }

  render() {
    const {
      title,
      url,
      previewImageUrl,
      pageCount,
      crid,
      linkedDocuments,
      lastUpdatedBy,
      lastEditedDateTime,
      titleEditWrapperStateProps,
      tagsEditWrapperStateProps,
      fullText,
      isSignedIn,
      infoItems,
      nextDocumentId,
      tagsErrorMessages,
      suggestionTags,
    } = this.props;

    const displayedDocuments = slice(linkedDocuments, 0, 11);
    const restDocumentsCount = linkedDocuments.length - displayedDocuments.length;

    return (
      <React.Fragment>
        <Helmet>
          <title>{ title }</title>
          <meta name='description' content={ title }/>
        </Helmet>
        <div className={ styles.documentPage }>
          <ShareableHeaderContainer />
          <div className='document-wrapper'>
            <div className='document-side-bar'>
              <OutboundLink className='document-thumbnail' href={ url }>
                <img className='document-thumbnail-img' src={ previewImageUrl } alt='thumbnail'/>
                {
                  pageCount !== 0 ? (
                    <span className='document-thumbnail-page-count'>{ `${ pluralize('page', pageCount, true) }` }</span>
                  ) : null
                }
              </OutboundLink>
              <SimpleListWidget className='document-info' items={ infoItems }/>
              <div className='linked-documents'>
                <div className='linked-documents-title'>Linked Documents ({ linkedDocuments.length })</div>
                <Link
                  className='linked-documents-content'
                  to={ isSignedIn ? `/documents/crid/${ crid }/` : `/documents/?match=${ crid }/` }
                >
                  {
                    displayedDocuments.map(document => (
                      <div key={ document.id } className='linked-documents-thumbnail'>
                        <img
                          className='linked-documents-thumbnail-img'
                          src={ document.previewImageUrl }
                          width='40'
                        />
                      </div>
                    ))
                  }
                  {
                    restDocumentsCount > 0 ? (
                      <span className='linked-documents-thumbnail linked-documents-more'>+{ restDocumentsCount }</span>
                    ) : null
                  }
                </Link>
              </div>
            </div>
            <div className='main-section'>
              <EditableTextBox
                className='main-section-title'
                title='Document Title'
                fieldName='title'
                editWrapperStateProps={ titleEditWrapperStateProps }
              />
              {
                isSignedIn ? (
                  <EditableTagsInput
                    className='main-section-tags'
                    title='Tags'
                    fieldName='tags'
                    suggestionTags={ suggestionTags }
                    editWrapperStateProps={ tagsEditWrapperStateProps }
                    nextDocumentId={ nextDocumentId }
                    errorMessages={ tagsErrorMessages }
                  />
                ) : null
              }

              <div className='main-section-full-text'>
                <div className='full-text-title'>Full-text OCR</div>
                <div className='full-text-wrapper'>
                  <MinimalScrollBars viewClassName='full-text-scroll-bar'>
                    <div className='full-text-content'>{ fullText }</div>
                  </MinimalScrollBars>
                </div>
              </div>
              <div className='main-section-last-edited'>
                This document was last edited{ lastUpdatedBy ? ' by ' : '' }
                <span className='last-edited-highlight'>{ lastUpdatedBy } { lastEditedDateTime }</span>
              </div>
            </div>
          </div>
          <FooterContainer className={ styles.crPageFooter }/>
        </div>
      </React.Fragment>
    );
  }
}

DocumentPage.propTypes = {
  attachmentId: PropTypes.number,
  title: PropTypes.string,
  fullText: PropTypes.string,
  comment: PropTypes.string,
  url: PropTypes.string,
  previewImageUrl: PropTypes.string,
  crid: PropTypes.string,
  pageCount: PropTypes.number,
  linkedDocuments: PropTypes.array,
  lastUpdatedBy: PropTypes.string,
  lastEditedDateTime: PropTypes.string,
  titleEditWrapperStateProps: PropTypes.object,
  tagsEditWrapperStateProps: PropTypes.object,
  isSignedIn: PropTypes.bool,
  infoItems: PropTypes.array,
  nextDocumentId: PropTypes.number,
  tagsErrorMessages: PropTypes.array,
  suggestionTags: PropTypes.array,
};
