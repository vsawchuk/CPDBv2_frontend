import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as _ from 'lodash';
import { browserHistory } from 'react-router';

import * as constants from 'utils/constants';
import DocumentsTable from './documents-table';
import SearchBar from './search-bar';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';


export default class DocumentsOverviewPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: _.get(this.props.location.query, 'match', ''),
    };
  }

  handleSearchChange = (text) => {
    const { pathname } = this.props.location;
    if (this.state.searchText === text)
      return;
    this.setState({ searchText: text });
    if (text.trim() === '') {
      browserHistory.push(pathname);
    } else {
      browserHistory.push(`${pathname}?match=${text}`);
    }
  };

  render() {
    const {
      documents,
      hasMore,
      nextParams,
      fetchDocuments,
      fetchDocumentsAuthenticated,
    } = this.props;

    return (
      <div>
        <ShareableHeaderContainer
          buttonType={ constants.SHAREABLE_HEADER_BUTTON_TYPE.LINK }
          buttonText='Crawlers'
          to='/crawlers/' />
        <SearchBar
          value={ this.state.searchText }
          onChange={ this.handleSearchChange }/>
        <DocumentsTable
          rows={ documents }
          hasMore={ hasMore }
          nextParams={ nextParams }
          fetchDocuments={ fetchDocuments }
          fetchDocumentsAuthenticated={ fetchDocumentsAuthenticated }
          onCRLinkClick={ this.handleSearchChange }/>
      </div>
    );
  }
}

DocumentsOverviewPage.propTypes = {
  documents: PropTypes.array,
  hasMore: PropTypes.bool,
  nextParams: PropTypes.object,
  fetchDocuments: PropTypes.func,
  fetchDocumentsAuthenticated: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string,
    query: PropTypes.string,
  }).isRequired,
};

DocumentsOverviewPage.defaultProps = {
  documents: [],
  location: {},
};
