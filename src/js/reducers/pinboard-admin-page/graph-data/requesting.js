import createRequestingReducer from 'reducers/common/requesting';
import {
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
} from 'utils/constants';

export default createRequestingReducer(
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_START,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
  PINBOARD_STATIC_SOCIAL_GRAPH_FETCH_REQUEST_FAILURE,
);
