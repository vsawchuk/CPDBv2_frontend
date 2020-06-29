import { connect } from 'react-redux';
import testData from './data/testDataWithPrecinctAndComplaintCount-badgeId767';

import {
  getSocialGraphTimelineIdx,
  getSocialGraphRefreshIntervalId,
} from 'selectors/social-graph-page/network-timeline';
import { AnimatedSocialGraphWithSpinner } from 'components/common/animated-social-graph';
import {
  updateSocialGraphTimelineIdx,
  updateSelectedOfficerId,
  updateSocialGraphRefreshIntervalId,
  updateSocialGraphSelectedEdge,
} from 'actions/social-graph-page';
import {
  graphDataSelector,
  getSelectedOfficerId,
  selectedEdgeDataSelector,
  getRequesting,
} from 'selectors/social-graph-page/network';

function getTestCoaccused(precinct) {
  if (precinct == null) {
    return testData.edges;
  }
  return testData.edges.filter(edge => edge.precinct === precinct);
}

function mapStateToProps(state, ownProps) {
  const isTest = window.location.pathname.includes('/test-social-graph');
  let precinct = null;
  if (isTest && window.location.pathname.includes('precinct')) {
    const splitPath = window.location.pathname.split('/');
    precinct = splitPath[splitPath.length - 1];
  }
  const graphData = graphDataSelector(state);
  return {
    performResizeGraph: ownProps.performResizeGraph,
    customRightControlButton: ownProps.customRightControlButton,
    officers: isTest ? testData.officers : graphData.officers,
    coaccusedData: isTest ? getTestCoaccused(precinct) : graphData.coaccusedData,
    listEvent: isTest ? testData.listEvents : graphData.listEvent,
    timelineIdx: getSocialGraphTimelineIdx(state),
    refreshIntervalId: getSocialGraphRefreshIntervalId(state),
    selectedOfficerId: getSelectedOfficerId(state),
    selectedEdge: selectedEdgeDataSelector(state),
    updateSortedOfficerIds: ownProps.updateSortedOfficerIds,
    requesting: getRequesting(state),
  };
}

const mapDispatchToProps = {
  updateSelectedOfficerId,
  updateTimelineIdx: updateSocialGraphTimelineIdx,
  updateRefreshIntervalId: updateSocialGraphRefreshIntervalId,
  updateSelectedEdge: updateSocialGraphSelectedEdge,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnimatedSocialGraphWithSpinner);
