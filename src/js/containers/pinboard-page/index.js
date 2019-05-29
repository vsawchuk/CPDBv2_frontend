import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { push as pushBreadcrumbs } from 'redux-breadcrumb-trail';

import { getPinboard, isEmptyPinboardSelector } from 'selectors/pinboard-page/pinboard';
import PinboardPage from 'components/pinboard-page';
import { hasMapMarkersSelector, getCurrentTab } from 'selectors/pinboard-page/geographic-data';
import { shouldRedirect } from 'selectors/pinboard-page/redirect';
import { getInitialRequested } from 'selectors/pinboard-page/pinboard';
import { changePinboardTab } from 'actions/pinboard';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    pinboard: getPinboard(state),
    currentTab: getCurrentTab(state),
    hasMapMarker: hasMapMarkersSelector(state),
    initialRequested: getInitialRequested(state),
    shouldRedirect: shouldRedirect(state),
    isEmptyPinboard: isEmptyPinboardSelector(state),
  };
}

const mapDispatchToProps = {
  changePinboardTab,
  pushBreadcrumbs,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PinboardPage));
