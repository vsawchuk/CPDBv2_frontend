import { handleActions } from 'redux-actions';
import * as _ from 'lodash';
import { LOCATION_CHANGE } from 'connected-react-router';

import {
  PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS,
  ADD_ITEM_IN_PINBOARD_PAGE,
  ORDER_PINBOARD,
  COMPLETE_REMOVE_ITEM_FROM_PINBOARD,
} from 'utils/constants';


export default handleActions({
  [PINBOARD_OFFICERS_FETCH_REQUEST_SUCCESS]: (state, action) => action.payload,
  [ADD_ITEM_IN_PINBOARD_PAGE]: (state, action) => {
    const currentItems = state;
    const { type, id } = action.payload;
    if (type === 'OFFICER') {
      if (_.every(currentItems, currentItem => currentItem.id !== parseInt(id))) {
        return currentItems.concat(action.payload.rawData);
      }
    }
    return currentItems;
  },
  [COMPLETE_REMOVE_ITEM_FROM_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { id, type } = action.payload;

    if (type === 'OFFICER') {
      return _.reject(currentItems, { id: parseInt(id) });
    }
    return currentItems;
  },
  [ORDER_PINBOARD]: (state, action) => {
    const currentItems = state;
    const { ids, type } = action.payload;

    if (type === 'OFFICER') {
      return _.sortBy(currentItems, item => _.findIndex(ids, id => id === item.id.toString()));
    }
    return currentItems;
  },
  [LOCATION_CHANGE]: (state, action) => [],
}, []);
