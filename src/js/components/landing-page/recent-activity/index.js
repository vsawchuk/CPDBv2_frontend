import React from 'react';

import { CAROUSEL_TYPES } from 'utils/constants';
import OfficerCard from 'components/landing-page/activity-grid/officer-card';
import CarouselWrapper from '../carousel-wrapper';

export default CarouselWrapper(OfficerCard, CAROUSEL_TYPES.ACTIVITY, {
  'cardStyle': { width: '232px', margin: 0 },
  'visualTokenStyle': { height: '100px' }
});