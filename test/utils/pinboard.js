import { parseInt, identity } from 'lodash';
import { stub, spy } from 'sinon';
import { Promise } from 'es6-promise';

import browserHistory from 'utils/history';
import {
  generatePinboardUrl,
  getFormatId,
  redirectToCreatedPinboard,
  dispatchFetchPinboardPageData,
  dispatchFetchPinboardPinnedItems,
  isEmptyPinboard,
  getRequestPinboard,
  isPinboardButtonIntroductionVisited,
  setPinboardButtonIntroductionVisited,
  isPinboardIntroductionVisited,
  setPinboardIntroductionVisited,
  isPinButtonIntroductionVisited,
  setPinButtonIntroductionVisited,
  isPinboardFeatureEnabled,
} from 'utils/pinboard';
import PinboardFactory from 'utils/test/factories/pinboard';
import {
  fetchFirstPagePinboardGeographicCrs,
  fetchFirstPagePinboardGeographicTrrs,
  fetchPinboardGeographic,
  fetchPinboardRelevantCoaccusals,
  fetchPinboardRelevantComplaints,
  fetchPinboardRelevantDocuments,
  fetchPinboardSocialGraph,
  fetchPinboardComplaints,
  fetchPinboardOfficers,
  fetchPinboardTRRs,
} from 'actions/pinboard';
import { PINBOARD_INTRODUCTION } from 'utils/constants';
import config from 'config';


describe('pinboard utils', function () {
  describe('generatePinboardUrl', function () {
    context('pinboard is null or pinboard id is not defined', function () {
      it('should return empty string if isCurrent is false', function () {
        generatePinboardUrl(null).should.be.equal('');
      });

      it('should return default pinboard path if isCurrent is true', function () {
        generatePinboardUrl(null, true).should.be.equal('/pinboard/');
      });
    });

    context('pinboard is not null and pinboard id is defined', function () {
      it('should return correct url', function () {
        generatePinboardUrl({
          id: '5cd06f2b',
          title: 'Title',
        }).should.be.equal('/pinboard/5cd06f2b/title/');
      });
    });
  });

  describe('getFormatId', function () {
    it('should return correct format function', function () {
      getFormatId('officer_ids').should.be.equal(parseInt);
      getFormatId('trr_ids').should.be.equal(parseInt);
      getFormatId('cr_ids').should.be.equal(identity);

      getFormatId('officer_ids')('123456').should.be.equal(123456);
      getFormatId('trr_ids')('123456').should.be.equal(123456);
      getFormatId('cr_ids')('123456').should.be.equal('123456');
    });
  });

  describe('redirectToCreatedPinboard', function () {
    beforeEach(function () {
      this.browserHistoryPush = stub(browserHistory, 'push');
    });

    it('should redirect to pinboard url', function () {
      redirectToCreatedPinboard({
        payload: {
          id: '5cd06f2b',
          title: 'Pinboard title',
        },
      });
      this.browserHistoryPush.should.be.calledWith('/pinboard/5cd06f2b/pinboard-title/');
    });

    it('should not redirect if pinboard null', function () {
      redirectToCreatedPinboard({
        payload: null,
      });
      this.browserHistoryPush.should.not.be.called();
    });

    it('should not redirect if pinboard id is null', function () {
      redirectToCreatedPinboard({
        payload: {
          title: 'Pinboard title',
        },
      });
      this.browserHistoryPush.should.not.be.called();
    });
  });

  describe('dispatchFetchPinboardPageData', function () {
    it('should dispatch correct actions', function () {
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc'),
      };
      dispatchFetchPinboardPageData(store, '66ef1560');

      store.dispatch.should.be.calledWith(fetchPinboardSocialGraph('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardGeographic());
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicCrs({ 'pinboard_id': '66ef1560' }));
      store.dispatch.should.be.calledWith(fetchFirstPagePinboardGeographicTrrs({ 'pinboard_id': '66ef1560' }));

      store.dispatch.should.be.calledWith(fetchPinboardRelevantDocuments('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantCoaccusals('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardRelevantComplaints('66ef1560'));
    });
  });

  describe('dispatchFetchPinboardPinnedItems', function () {
    it('should dispatch correct actions', function () {
      const store = {
        getState: () => {
          return {
            pinboardPage: {
              pinboard: PinboardFactory.build({
                'id': '66ef1560',
                'officer_ids': [123, 456],
              }),
            },
          };
        },
        dispatch: stub().usingPromise(Promise).resolves('abc'),
      };
      dispatchFetchPinboardPinnedItems(store, '66ef1560');

      store.dispatch.should.be.calledWith(fetchPinboardComplaints('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardOfficers('66ef1560'));
      store.dispatch.should.be.calledWith(fetchPinboardTRRs('66ef1560'));
    });
  });

  describe('isEmptyPinboard', function () {
    it('should return true if pinboard is empty', function () {
      const pinboard = {
        id: 'abcd1234',
        officerIds: [],
        crids: [],
        trrIds: [],
      };
      isEmptyPinboard(pinboard).should.be.true();
    });

    it('should return false if pinboard is not empty', function () {
      const pinboard = {
        id: 'abcd1234',
        officerIds: [1],
        crids: [],
        trrIds: [],
      };
      isEmptyPinboard(pinboard).should.be.false();
    });
  });

  describe('getRequestPinboard', function () {
    it('should return default pinboard', function () {
      getRequestPinboard({}).should.deepEqual({
        id: null,
        title: '',
        officerIds: [],
        crids: [],
        trrIds: [],
        description: '',
      });
    });

    it('should return correct requested pinboard', function () {
      const pinboard = {
        'id': 'abcd1234',
        'title': 'Pinboard Title',
        'officer_ids': [1, 2, 3],
        'crids': ['123456'],
        'trr_ids': [4, 5, 6],
        'description': 'Pinboard Description',
      };
      getRequestPinboard(pinboard).should.deepEqual({
        id: 'abcd1234',
        title: 'Pinboard Title',
        officerIds: ['1', '2', '3'],
        crids: ['123456'],
        trrIds: ['4', '5', '6'],
        description: 'Pinboard Description',
      });
    });
  });

  describe('isPinboardButtonIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should return correct value', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION);
        isPinboardButtonIntroductionVisited().should.be.false();
        localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION, '1');
        isPinboardButtonIntroductionVisited().should.be.true();
      });
    });

    context('pinboard feature is disabled', function () {
      it('should always return true', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION);
        isPinboardButtonIntroductionVisited().should.be.true();
      });
    });
  });

  describe('setPinboardButtonIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinboardButtonIntroductionVisited();
        localStorageSetSpy.should.be.calledOnce();
        localStorage.getItem(PINBOARD_INTRODUCTION.PINBOARD_BUTTON_INTRODUCTION).should.equal('1');
      });
    });

    context('pinboard feature is disabled', function () {
      it('should not set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinboardButtonIntroductionVisited();
        localStorageSetSpy.should.not.be.called();
      });
    });
  });

  describe('isPinboardIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should return correct value', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION);
        isPinboardIntroductionVisited().should.be.false();
        localStorage.setItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION, '1');
        isPinboardIntroductionVisited().should.be.true();
      });
    });

    context('pinboard feature is disabled', function () {
      it('should always return true', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION);
        isPinboardIntroductionVisited().should.be.true();
      });
    });
  });

  describe('setPinboardIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinboardIntroductionVisited();
        localStorageSetSpy.should.be.calledOnce();
        localStorage.getItem(PINBOARD_INTRODUCTION.PINBOARD_INTRODUCTION).should.equal('1');
      });
    });

    context('pinboard feature is disabled', function () {
      it('should not set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinboardIntroductionVisited();
        localStorageSetSpy.should.not.be.called();
      });
    });
  });

  describe('isPinButtonIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should return correct value', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
        isPinButtonIntroductionVisited().should.be.false();
        localStorage.setItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION, '1');
        isPinButtonIntroductionVisited().should.be.true();
      });
    });

    context('pinboard feature is disabled', function () {
      it('should always return true', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        localStorage.removeItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION);
        isPinButtonIntroductionVisited().should.be.true();
      });
    });
  });

  describe('setPinButtonIntroductionVisited', function () {
    context('pinboard feature is enabled', function () {
      it('should set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinButtonIntroductionVisited();
        localStorageSetSpy.should.be.calledOnce();
        localStorage.getItem(PINBOARD_INTRODUCTION.PIN_BUTTON_INTRODUCTION).should.equal('1');
      });
    });

    context('pinboard feature is disabled', function () {
      it('should not set localStorage', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        const localStorageSetSpy = spy(localStorage, 'setItem');
        setPinButtonIntroductionVisited();
        localStorageSetSpy.should.not.be.called();
      });
    });
  });

  describe('isPinboardFeatureEnabled', function () {
    context('pinboard feature is disabled', function () {
      it('should return false', function () {
        stub(config.enableFeatures, 'pinboard').value(false);
        isPinboardFeatureEnabled().should.be.false();
      });
    });

    context('pinboard feature is enabled', function () {
      it('should return false', function () {
        stub(config.enableFeatures, 'pinboard').value(true);
        isPinboardFeatureEnabled().should.be.true();
      });
    });
  });
});
