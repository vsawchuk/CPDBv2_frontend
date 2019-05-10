import { graphDataSelector } from 'selectors/pinboard-page/social-graph';


describe('PinboardPage selectors', function () {
  describe('graphDataSelector', function () {
    it('should return graph data correctly', function () {
      const state = {
        pinboardPage: {
          graphData: {
            officers: [
              {
                'full_name': 'Jerome Finnigan',
                'id': 1,
                'percentile': {
                  'percentile_trr': '78.2707',
                  'percentile_allegation_civilian': '97.8772',
                  'percentile_allegation_internal': '61.1521'
                },
              },
              {
                'full_name': 'Edward May',
                'id': 2,
                'percentile': {
                  'percentile_trr': '80',
                  'percentile_allegation_civilian': '85',
                  'percentile_allegation_internal': '90'
                },
              }
            ],
            'coaccused_data': [
              {
                'officer_id_1': 1,
                'officer_id_2': 2,
                'incident_date': '1988-10-03T00:00:00Z',
                'accussed_count': 1,
              },
              {
                'officer_id_1': 3,
                'officer_id_2': 4,
                'incident_date': '1990-10-03T00:00:00Z',
                'accussed_count': 5,
              }
            ],
            'list_event': [
              '1988-10-03 00:00:00+00:00',
              '1989-12-11 00:00:00+00:00',
              '1990-01-09 00:00:00+00:00',
              '1990-12-13 00:00:00+00:00',
              '1991-01-02 00:00:00+00:00',
              '1991-01-06 00:00:00+00:00',
              '1991-01-15 00:00:00+00:00',
              '1991-02-18 00:00:00+00:00',
              '1991-02-20 00:00:00+00:00',
              '1991-03-06 00:00:00+00:00'
            ]
          }
        }
      };

      graphDataSelector(state).should.eql({
        officers: [
          {
            fullName: 'Jerome Finnigan',
            id: 1,
            visualTokenBackground: '#f0201e'
          },
          {
            fullName: 'Edward May',
            id: 2,
            visualTokenBackground: '#f0201e'
          }
        ],
        coaccusedData: [
          {
            officerId1: 1,
            officerId2: 2,
            incidentDate: '1988-10-03T00:00:00Z',
            accussedCount: 1
          },
          {
            officerId1: 3,
            officerId2: 4,
            incidentDate: '1990-10-03T00:00:00Z',
            accussedCount: 5
          }
        ],
        listEvent: [
          '1988-10-03 00:00:00+00:00',
          '1989-12-11 00:00:00+00:00',
          '1990-01-09 00:00:00+00:00',
          '1990-12-13 00:00:00+00:00',
          '1991-01-02 00:00:00+00:00',
          '1991-01-06 00:00:00+00:00',
          '1991-01-15 00:00:00+00:00',
          '1991-02-18 00:00:00+00:00',
          '1991-02-20 00:00:00+00:00',
          '1991-03-06 00:00:00+00:00'
        ]
      });
    });
  });
});
