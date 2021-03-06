import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import App from 'components/app';
import { receiveTokenFromCookie } from 'actions/authentication';
import showLoginModalSelector from 'selectors/login-modal/show-login-modal';
import { toggleEditMode } from 'actions/inline-editable/edit-mode';
import { toggleSearchMode, changeSearchQuery } from 'actions/search-page';


function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    showLoginModal: showLoginModalSelector(state, ownProps),
  };
}

const mapDispatchToProps = {
  receiveTokenFromCookie,
  toggleEditMode,
  toggleSearchMode,
  changeSearchQuery,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
