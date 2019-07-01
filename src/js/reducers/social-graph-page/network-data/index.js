import { combineReducers } from 'redux';

import graphData from './graph-data';
import networkOfficers from './network-officers';
import networkAllegations from './network-allegations';
import currentNetworkTab from './current-network-tab';
import selectedOfficerId from './selected-officer-id';
import timelineIdx from './timeline-idx';
import refreshIntervalId from './refresh-interval-id';
import timelineIdxTriggerChange from './timeline-idx-trigger-change';
import showTimelineTab from './show-timeline-tab';
import selectedEdge from './selected-edge';


export default combineReducers({
  graphData,
  networkOfficers,
  networkAllegations,
  currentNetworkTab,
  selectedOfficerId,
  timelineIdx,
  refreshIntervalId,
  timelineIdxTriggerChange,
  showTimelineTab,
  selectedEdge,
});
