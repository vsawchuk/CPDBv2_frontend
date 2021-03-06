import { map } from 'lodash';

import { CitySummaryFactory, rawCommunityFactory } from 'utils/test/factories/heat-map';


export const getCitySummary = () => CitySummaryFactory.build({
  'start_year': 1988,
  'end_year': 2017,
  'allegation_count': 10,
  'discipline_count': 5,
  'most_common_complaints': [
    {
      name: 'Operation/Personnel Violations',
      count: 3,
    },
    {
      name: 'Use Of Force',
      count: 2,
    },
    {
      name: 'Illegal Search',
      count: 1,
    },
  ],
});

export const getCommunities = () => ({
  type: 'FeatureCollection',
  features: map(
    [
      rawCommunityFactory.build({
        'allegation_count': 5,
        'discipline_count': 2,
        'name': 'Hyde Park',
      }),
      ...rawCommunityFactory.buildList(9),
    ],
    properties => ({ properties })
  ),
});
