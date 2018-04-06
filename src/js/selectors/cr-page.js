import { createSelector } from 'reselect';
import { map, get } from 'lodash';

import { extractPercentile } from 'selectors/landing-page/common';


const getCoaccused = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].coaccused;
};

const getComplainants = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].complainants;
};

const getVictims = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].victims;
};

const getCR = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? {} : state.crs[crid];
};

const getInvolvements = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].involvements;
};

const getAttachments = state => {
  const crid = state.crPage.crid;
  return !state.crs[crid] ? [] : state.crs[crid].attachments;
};

export const getCRID = state => String(state.crPage.crid);
export const getOfficerId = state => state.crPage.officerId;

export const getDocumentAlreadyRequested = state => {
  const crid = state.crPage.crid;
  return Boolean(get(
    state, `crPage.attachmentRequest.subscribedCRIDs[${crid}]`, undefined
  ));
};

const getDemographicString = ({ race, gender, age }) => {
  race = race ? race : 'Unknown';
  gender = gender ? gender : 'Unknown';

  if (age) {
    return `${race}, ${gender}, Age ${age}`;
  } else {
    return `${race}, ${gender}`;
  }
};

const getComplainantStringSelector = createSelector(
  getComplainants,
  (complainants) => map(complainants, (complainant) => getDemographicString(complainant))
);

const getVictimStringSelector = createSelector(
  getVictims,
  (victims) => map(victims, (victim) => getDemographicString(victim))
);

const getCoaccusedSelector = createSelector(
  getCoaccused,
  coaccusedList => map(coaccusedList, coaccused => ({
    id: coaccused.id,
    fullname: coaccused['full_name'],
    rank: coaccused['rank'] || 'Officer',
    gender: coaccused['gender'] || 'Unknown',
    race: coaccused['race'] || 'Unknown',
    outcome: coaccused['final_outcome'] || 'Unknown Outcome',
    category: coaccused['category'] || 'Unknown',
    age: coaccused['age'],
    allegationCount: coaccused['allegation_count'],
    sustainedCount: coaccused['sustained_count'],
    allegationPercentile: coaccused['percentile_allegation'],
    percentile: extractPercentile(coaccused)
  }))
);

const getInvolvementsSelector = createSelector(
  getInvolvements,
  involvements => map(involvements, obj => ({
    involvedType: obj['involved_type'],
    officers: map(obj.officers, officer => ({
      id: officer.id,
      abbrName: officer['abbr_name'],
      extraInfo: officer['extra_info']
    }))
  }))
);

export const contentSelector = createSelector(
  getCoaccusedSelector,
  getComplainantStringSelector,
  getVictimStringSelector,
  getCR,
  getInvolvementsSelector,
  getAttachments,
  (coaccused, complainants, victims, cr, involvements, attachments) => ({
    coaccused,
    complainants,
    victims,
    point: cr.point,
    incidentDate: cr['incident_date'],
    address: cr.address,
    crLocation: cr.location,
    beat: cr.beat || 'Unknown',
    summary: cr.summary,
    startDate: cr['start_date'],
    endDate: cr['end_date'],
    involvements,
    attachments
  })
);
