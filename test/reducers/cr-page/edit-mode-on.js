import { LOCATION_CHANGE } from 'connected-react-router';

import editModeOn from 'reducers/cr-page/edit-mode-on';
import { CR_EDIT_TYPES, CR_EDIT_MODE } from 'utils/constants';


describe('edit-mode-on reducer', function () {
  it('should have initial state', function () {
    editModeOn(undefined, {}).should.eql({
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });
  });

  it('should handle CR_EDIT_MODE', function () {
    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
      },
      {
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: true },
      }
    ).should.eql( {
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
      },
      {
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NO_ATTACHMENT_TEXT, mode: false },
      }
    ).should.eql( {
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
      },
      {
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION, mode: false },
      }
    ).should.eql( {
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: true,
      },
      {
        type: CR_EDIT_MODE,
        payload: { editType: CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION, mode: false },
      }
    ).should.eql( {
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });
  });

  it('should handle LOCATION_CHANGE', function () {
    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { location: { pathname: '/complaint/1/' } },
      }
    ).should.eql({
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: false,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: false,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: false,
    });

    editModeOn(
      {
        [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
        [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
        [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: true,
      },
      {
        type: LOCATION_CHANGE,
        payload: { location: { pathname: '/edit/complaint/1/' } },
      }
    ).should.eql({
      [CR_EDIT_TYPES.NO_ATTACHMENT_TEXT]: true,
      [CR_EDIT_TYPES.DOCUMENT_REQUEST_INSTRUCTION]: true,
      [CR_EDIT_TYPES.NEW_DOCUMENT_NOTIFICATIONS_INSTRUCTION]: true,
    });
  });
});
