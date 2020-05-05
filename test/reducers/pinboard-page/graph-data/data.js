import dataReducer from 'reducers/pinboard-page/graph-data/data';
import { PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS } from 'utils/constants';


describe('dataReducer', function () {
  it('should have initial state', function () {
    dataReducer(undefined, {}).should.deepEqual({});
  });

  it('should handle PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS', function () {
    dataReducer(
      {},
      {
        type: PINBOARD_SOCIAL_GRAPH_FETCH_REQUEST_SUCCESS,
        payload: {
          'coaccused_data': [],
          'list_event': [],
        },
      }
    ).should.deepEqual({ 'coaccused_data': [], 'list_event': [] });
  });
});
