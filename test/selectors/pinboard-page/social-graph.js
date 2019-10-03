import {
  graphDataSelector,
  getPinboardTimelineIdx,
  getPinboardRefreshIntervalId,
  getExpandedLink,
  getSocialGraphRequesting,
  getCoaccusedData,
} from 'selectors/pinboard-page/social-graph';


describe('PinboardPage selectors', function () {
  describe('graphDataSelector', function () {
    it('should return graph data correctly', function () {
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 1,
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521',
                  },
                },
                {
                  'full_name': 'Edward May',
                  'id': 2,
                  'percentile': {
                    'percentile_trr': '80',
                    'percentile_allegation_civilian': '85',
                    'percentile_allegation_internal': '90',
                  },
                },
              ],
              'coaccused_data': [
                {
                  'officer_id_1': 1,
                  'officer_id_2': 2,
                  'incident_date': '1988-10-03',
                  'accussed_count': 1,
                },
                {
                  'officer_id_1': 3,
                  'officer_id_2': 4,
                  'incident_date': '1990-10-03',
                  'accussed_count': 5,
                },
              ],
              'list_event': [
                '1988-10-03',
                '1989-12-11',
                '1990-01-09',
                '1990-12-13',
                '1991-01-02',
                '1991-01-06',
                '1991-01-15',
                '1991-02-18',
                '1991-02-20',
                '1991-03-06',
              ],
            },
          },
        },
      };

      graphDataSelector(state).should.eql({
        officers: [
          {
            fullName: 'Jerome Finnigan',
            id: 1,
            visualTokenBackground: '#f0201e',
          },
          {
            fullName: 'Edward May',
            id: 2,
            visualTokenBackground: '#f0201e',
          },
        ],
        coaccusedData: [
          {
            officerId1: 1,
            officerId2: 2,
            incidentDate: '1988-10-03',
            accussedCount: 1,
          },
          {
            officerId1: 3,
            officerId2: 4,
            incidentDate: '1990-10-03',
            accussedCount: 5,
          },
        ],
        listEvent: [
          '1988-10-03',
          '1989-12-11',
          '1990-01-09',
          '1990-12-13',
          '1991-01-02',
          '1991-01-06',
          '1991-01-15',
          '1991-02-18',
          '1991-02-20',
          '1991-03-06',
        ],
      });
    });
  });

  describe('getPinboardTimelineIdx', function () {
    it('should return correct status', function () {
      const state = {
        pinboardPage: {
          timelineIdx: 20,
        },
      };
      getPinboardTimelineIdx(state).should.eql(20);
    });
  });

  describe('getPinboardRefreshIntervalId', function () {
    it('should return correct status', function () {
      const state = {
        pinboardPage: {
          refreshIntervalId: 1234,
        },
      };
      getPinboardRefreshIntervalId(state).should.eql(1234);
    });
  });

  describe('getSocialGraphRequesting', function () {
    it('should return requesting status', function () {
      getSocialGraphRequesting({
        pinboardPage: {
          graphData: { requesting: false, data: {} },
        },
      }).should.be.false();

      getSocialGraphRequesting({
        pinboardPage: {
          graphData: { requesting: true, data: {} },
        },
      }).should.be.true();
    });
  });

  describe('getExpandedLink', function () {
    it('should url correctly', function () {
      getExpandedLink('/pinboard/123/').should.eql('/social-graph/?pinboard_id=123');
    });
  });


  describe('getCoaccusedData', function () {
    it('should return coaccused data data correctly', function () {
      const coaccusedData = [
        {
          'officer_id_1': 1,
          'officer_id_2': 2,
          'incident_date': '1988-10-03',
          'accussed_count': 1,
        },
        {
          'officer_id_1': 3,
          'officer_id_2': 4,
          'incident_date': '1990-10-03',
          'accussed_count': 5,
        },
      ];
      const state = {
        pinboardPage: {
          graphData: {
            requesting: false,
            data: {
              officers: [
                {
                  'full_name': 'Jerome Finnigan',
                  'id': 1,
                  'percentile': {
                    'percentile_trr': '78.2707',
                    'percentile_allegation_civilian': '97.8772',
                    'percentile_allegation_internal': '61.1521',
                  },
                },
              ],
              'coaccused_data': coaccusedData,
              'list_event': [
                '1988-10-03',
              ],
            },
          },
        },
      };

      getCoaccusedData(state).should.eql(coaccusedData);
    });
  });
});