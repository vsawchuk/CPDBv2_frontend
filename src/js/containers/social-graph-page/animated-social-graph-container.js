import { connect } from 'react-redux';
import testData from './data/testDataWithPrecinct';

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
  return testData.edges.filter(edge => edge.precinct === precinct);
}


function getTestOfficers(precinct) {
  const edges = getTestCoaccused(precinct);
  const officersMap = {};
  testData.officers.forEach(officer => officersMap[officer.id] = officer);
  const officersToReturn = [];
  edges.forEach(edge => {
    if (officersMap[edge.officerId1]) {
      officersToReturn.push(officersMap[edge.officerId1]);
      officersMap[edge.officerId1] = null;
    }
    if (officersMap[edge.officerId2]) {
      officersToReturn.push(officersMap[edge.officerId2]);
      officersMap[edge.officerId2] = null;
    }
  });
  return officersToReturn;
}


function mapStateToProps(state, ownProps) {
  const isTest = window.location.pathname.includes('/test-social-graph');
  let precinct = "";
  if (isTest) {
    const splitPath = window.location.pathname.split('/');
    precinct = splitPath[splitPath.length - 1];
  }
  const graphData = graphDataSelector(state);
  return {
    performResizeGraph: ownProps.performResizeGraph,
    customRightControlButton: ownProps.customRightControlButton,
    officers: isTest ? getTestOfficers(precinct) : graphData.officers,
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
