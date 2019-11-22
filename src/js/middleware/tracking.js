import { reduce, values } from 'lodash';
import { CHANGE_SEARCH_QUERY, SUGGESTION_REQUEST_SUCCESS, SUGGESTION_SINGLE_REQUEST_SUCCESS } from 'utils/constants';
import * as tracking from 'utils/tracking';


const EVENTS = {
  '@@router/LOCATION_CHANGE': (store, action) => {
    tracking.trackPageView(action.payload.pathname);
  },

  [CHANGE_SEARCH_QUERY]: (store, action) => {
    tracking.trackSearchQuery(action.payload);
  },

  [SUGGESTION_SINGLE_REQUEST_SUCCESS]: (store, action) => {
    tracking.trackSearchResultsCount(action.payload.count);
  },

  [SUGGESTION_REQUEST_SUCCESS]: (store, action) => {
    const count = reduce(values(action.payload), (sum, array) => sum + array.length, 0);
    tracking.trackSearchResultsCount(count);
  },
};


export default store => next => action => {
  if (EVENTS.hasOwnProperty(action.type)) {
    EVENTS[action.type](store, action);
  }

  return next(action);
};
