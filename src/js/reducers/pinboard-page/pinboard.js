import { handleActions } from 'redux-actions';
import * as _ from 'lodash';

import * as constants from 'utils/constants';
import { getFormatId } from 'utils/pinboard';

const DEFAULT_PINBOARD_STATUSES = {
  saving: false,
  needRefreshData: false,
  hasPendingChanges: false,
  isPinboardRestored: false,
};

const defaultState = {
  'id': null,
  'title': '',
  'officer_ids': [],
  'crids': [],
  'trr_ids': [],
  'description': '',
  ...DEFAULT_PINBOARD_STATUSES,
};

export default handleActions({
  [constants.PINBOARD_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
  [constants.PINBOARD_LATEST_RETRIEVED_FETCH_REQUEST_SUCCESS]: (state, action) => ({
    ...state,
    ...action.payload,
    isPinboardRestored: true,
  }),
  [constants.PINBOARD_CREATE_REQUEST_SUCCESS]: (state, action) => {
    const notFoundOfficerIds = _.get(action.payload, 'not_found_items.officer_ids', []);
    const notFoundCrids = _.get(action.payload, 'not_found_items.crids', []);
    const notFoundTrrIds = _.get(action.payload, 'not_found_items.trr_ids', []);

    const officerIds = _.difference(_.get(state, 'officer_ids', []), notFoundOfficerIds);
    const crids = _.difference(_.get(state, 'crids', []), notFoundCrids);
    const trrIds = _.difference(_.get(state, 'trr_ids', []), notFoundTrrIds);

    return {
      ...state,
      'officer_ids': officerIds,
      crids,
      'trr_ids': trrIds,
      id: action.payload.id,
      saving: false,
      isPinboardRestored: true,
    };
  },
  [constants.PINBOARD_CREATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [constants.PINBOARD_UPDATE_REQUEST_SUCCESS]: (state, action) => {
    return {
      ...state,
      saving: false,
      'example_pinboards': action.payload['example_pinboards'],
    };
  },
  [constants.PINBOARD_UPDATE_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      saving: false,
    };
  },
  [constants.PINBOARD_CREATE_REQUEST_START]: (state, action) => {
    const creatingData = _.get(action.payload, 'request.data', {});
    if (creatingData['officer_ids']) {
      creatingData['officer_ids'] = _.map(creatingData['officer_ids'], _.parseInt);
    }
    if (creatingData['trr_ids']) {
      creatingData['trr_ids'] = _.map(creatingData['trr_ids'], _.parseInt);
    }

    return {
      ...state,
      ...creatingData,
      saving: true,
    };
  },
  [constants.PINBOARD_UPDATE_REQUEST_START]: (state, action) => ({
    ...state,
    saving: true,
  }),
  [constants.UPDATE_PINBOARD_INFO_STATE]: (state, action) => {
    return {
      ...state,
      [action.payload.attr]: action.payload.value,
    };
  },
  [constants.ADD_ITEM_TO_PINBOARD_STATE]: (state, action) => {
    const attr = constants.PINBOARD_ATTR_MAP[action.payload.type];
    const ids = state[attr] || [];
    const format = getFormatId(attr);
    const newId = format(action.payload.id);
    return {
      ...state,
      [attr]: _.includes(ids, newId) ? ids : ids.concat(newId),
      needRefreshData: true,
    };
  },
  [constants.REMOVE_ITEM_FROM_PINBOARD_STATE]: (state, action) => {
    const { type, mode, id: payloadId } = action.payload;
    const attr = constants.PINBOARD_ATTR_MAP[type];
    let ids = state[attr] || [];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.reject(ids, id => id === format(payloadId)),
      needRefreshData: mode !== constants.PINBOARD_ITEM_REMOVE_MODE.STATE_ONLY,
    };
  },
  [constants.ORDER_PINBOARD_STATE]: (state, action) => {
    const { ids, type } = action.payload;
    const attr = constants.PINBOARD_ATTR_MAP[type];
    const format = getFormatId(attr);

    return {
      ...state,
      [attr]: _.map(ids, format),
    };
  },
  [constants.PERFORM_FETCH_PINBOARD_RELATED_DATA]: (state, action) => {
    return {
      ...state,
      needRefreshData: false,
    };
  },
  [constants.SET_PINBOARD_HAS_PENDING_CHANGES]: (state, action) => {
    return {
      ...state,
      hasPendingChanges: action.payload,
    };
  },
  [constants.CHANGE_PINBOARD]: (state, action) => {
    return {
      ...state,
      ...DEFAULT_PINBOARD_STATUSES,
    };
  },
}, defaultState);
