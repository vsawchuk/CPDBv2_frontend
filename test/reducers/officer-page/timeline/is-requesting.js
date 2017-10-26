import {
  OFFICER_TIMELINE_ITEMS_REQUEST_START,
  OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
  OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
  OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS
} from 'utils/constants';
import isRequesting from 'reducers/officer-page/timeline/is-requesting';


describe('isRequesting reducer', function () {
  it('should return initial state', function () {
    isRequesting(undefined, {}).should.be.false();
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_START', function () {
    isRequesting(undefined, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_START
    }).should.be.true();
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS', function () {
    isRequesting(true, {
      type: OFFICER_TIMELINE_FIRST_ITEMS_REQUEST_SUCCESS,
      payload: [1, 2, 3]
    }).should.be.false();
  });

  it('should handle OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE', function () {
    isRequesting(true, {
      type: OFFICER_TIMELINE_ITEMS_REQUEST_FAILURE,
      payload: new Error('Load failed')
    }).should.be.false();
  });
});
