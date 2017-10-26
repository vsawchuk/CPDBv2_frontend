import { handleActions } from 'redux-actions';

import {
  OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS
} from 'utils/constants';


const isRequesting = handleActions({
  [OFFICER_TIMELINE_ITEMS_REQUEST_START]: (state, action) => (true),
  [OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS]: (state, action) => (false),
  [OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE]: (state, action) => (false)
}, false);

export default isRequesting;
