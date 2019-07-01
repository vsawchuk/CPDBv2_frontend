import React from 'react';
import { spy, stub } from 'sinon';
import { renderIntoDocument } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { forOwn, find, forIn, filter, round } from 'lodash';
import should from 'should';

import { unmountComponentSuppressError, reRender } from 'utils/test';
import SocialGraph from 'components/common/animated-social-graph/social-graph';


describe('SocialGraph', function () {
  let instance;
  const officers = [
    { fullName: 'Glenn Evans', id: 8138 },
    { fullName: 'Isaac Lee', id: 15956 },
    { fullName: 'Thomas Kampenga', id: 14045 },
    { fullName: 'Melvin Ector', id: 31945 },
    { fullName: 'Sean Brandon', id: 2671 },
    { fullName: 'Estella Perez-Stanford', id: 22297 },
    { fullName: 'Johnny Cavers', id: 4269 },
    { fullName: 'Gilbert Cobb', id: 4881 },
    { fullName: 'John Hart', id: 11580 },
    { fullName: 'William Roberison', id: 24157 },
    { fullName: 'Francis Higgins', id: 12176 },
    { fullName: 'David Portis', id: 22861 },
    { fullName: 'Eugene Offett', id: 21194 },
    { fullName: 'Joseph Blaye', id: 2171 },
    { fullName: 'Charles Toussas', id: 28805 },
    { fullName: 'Bennie Watson', id: 30209 },
    { fullName: 'Tracy Hughes', id: 12737 },
    { fullName: 'Donnell Calhoun', id: 3663 },
    { fullName: 'Hardy White', id: 30466 },
    { fullName: 'Matthew Brandon', id: 2675 }
  ];
  const coaccusedData = [
    { officerId1: 2675, officerId2: 24157, incidentDate: '1990-01-09', accussedCount: 2 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1991-02-20', accussedCount: 2 },
    { officerId1: 22861, officerId2: 30466, incidentDate: '1991-02-20', accussedCount: 2 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-02-20', accussedCount: 2 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-07-06', accussedCount: 3 },
    { officerId1: 22861, officerId2: 30466, incidentDate: '1991-08-07', accussedCount: 3 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1991-08-07', accussedCount: 4 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1991-08-07', accussedCount: 3 },
    { officerId1: 11580, officerId2: 22861, incidentDate: '1992-03-08', accussedCount: 5 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1992-07-18', accussedCount: 2 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1993-02-15', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1993-03-28', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1993-04-03', accussedCount: 2 },
    { officerId1: 14045, officerId2: 22861, incidentDate: '1993-06-01', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1993-06-03', accussedCount: 3 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1993-06-09', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1993-07-13', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1993-10-16', accussedCount: 4 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1994-01-09', accussedCount: 5 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-01-31', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-01-31', accussedCount: 4 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-01-31', accussedCount: 2 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-01-31', accussedCount: 5 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-01-31', accussedCount: 4 },
    { officerId1: 3663, officerId2: 14045, incidentDate: '1994-02-15', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-02-26', accussedCount: 5 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-06', accussedCount: 6 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-03-07', accussedCount: 6 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-03-07', accussedCount: 2 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-07', accussedCount: 7 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-03-12', accussedCount: 8 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-03-12', accussedCount: 3 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-03-12', accussedCount: 7 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-04-17', accussedCount: 9 },
    { officerId1: 14045, officerId2: 28805, incidentDate: '1994-05-24', accussedCount: 10 },
    { officerId1: 12176, officerId2: 21194, incidentDate: '1994-05-24', accussedCount: 2 },
    { officerId1: 12176, officerId2: 14045, incidentDate: '1994-05-24', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-05-24', accussedCount: 5 },
    { officerId1: 3663, officerId2: 14045, incidentDate: '1994-05-24', accussedCount: 3 },
    { officerId1: 3663, officerId2: 12176, incidentDate: '1994-05-24', accussedCount: 2 },
    { officerId1: 3663, officerId2: 4881, incidentDate: '1994-05-24', accussedCount: 2 },
    { officerId1: 12176, officerId2: 28805, incidentDate: '1994-05-24', accussedCount: 8 },
    { officerId1: 14045, officerId2: 21194, incidentDate: '1994-05-24', accussedCount: 2 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-05-24', accussedCount: 3 },
    { officerId1: 4881, officerId2: 14045, incidentDate: '1994-05-24', accussedCount: 2 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-05-24', accussedCount: 3 },
    { officerId1: 21194, officerId2: 28805, incidentDate: '1994-06-21', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-06-21', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1994-06-21', accussedCount: 4 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1994-08-17', accussedCount: 7 },
    { officerId1: 4269, officerId2: 30209, incidentDate: '1995-02-28', accussedCount: 2 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1995-05-21', accussedCount: 8 },
    { officerId1: 3663, officerId2: 21194, incidentDate: '1995-07-28', accussedCount: 9 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-01-20', accussedCount: 5 },
    { officerId1: 11580, officerId2: 30466, incidentDate: '1996-01-22', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-04-20', accussedCount: 6 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-05-28', accussedCount: 7 },
    { officerId1: 3663, officerId2: 28805, incidentDate: '1996-07-27', accussedCount: 8 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1996-12-27', accussedCount: 2 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1996-12-30', accussedCount: 3 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-06-20', accussedCount: 4 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-07-11', accussedCount: 5 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1997-08-23', accussedCount: 6 },
    { officerId1: 8138, officerId2: 31945, incidentDate: '1998-06-27', accussedCount: 7 },
    { officerId1: 3663, officerId2: 8138, incidentDate: '1998-06-27', accussedCount: 2 },
    { officerId1: 8138, officerId2: 30466, incidentDate: '1998-06-27', accussedCount: 2 },
    { officerId1: 4269, officerId2: 15956, incidentDate: '1998-09-22', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '1998-11-09', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1998-11-17', accussedCount: 2 },
    { officerId1: 2671, officerId2: 4269, incidentDate: '1998-11-28', accussedCount: 2 },
    { officerId1: 3663, officerId2: 30209, incidentDate: '1998-12-03', accussedCount: 2 },
    { officerId1: 30466, officerId2: 31945, incidentDate: '1998-12-03', accussedCount: 2 },
    { officerId1: 30209, officerId2: 31945, incidentDate: '1998-12-03', accussedCount: 2 },
    { officerId1: 30209, officerId2: 30466, incidentDate: '1998-12-03', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '1998-12-03', accussedCount: 3 },
    { officerId1: 3663, officerId2: 30466, incidentDate: '1998-12-03', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-02-08', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-03-30', accussedCount: 4 },
    { officerId1: 2671, officerId2: 4269, incidentDate: '1999-07-22', accussedCount: 3 },
    { officerId1: 4269, officerId2: 15956, incidentDate: '1999-07-22', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-07-22', accussedCount: 5 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-11-16', accussedCount: 6 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '1999-12-15', accussedCount: 7 },
    { officerId1: 4881, officerId2: 21194, incidentDate: '2000-04-20', accussedCount: 2 },
    { officerId1: 4881, officerId2: 31945, incidentDate: '2000-04-28', accussedCount: 2 },
    { officerId1: 4881, officerId2: 21194, incidentDate: '2000-04-28', accussedCount: 3 },
    { officerId1: 4269, officerId2: 4881, incidentDate: '2000-04-28', accussedCount: 2 },
    { officerId1: 21194, officerId2: 31945, incidentDate: '2000-04-28', accussedCount: 2 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2000-04-28', accussedCount: 2 },
    { officerId1: 4269, officerId2: 21194, incidentDate: '2000-04-28', accussedCount: 2 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-05-20', accussedCount: 9 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-05-20', accussedCount: 8 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2000-09-21', accussedCount: 10 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-01-15', accussedCount: 11 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-02-22', accussedCount: 12 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-07-09', accussedCount: 13 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-10-02', accussedCount: 14 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2001-10-19', accussedCount: 15 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-04-01', accussedCount: 3 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '2002-09-28', accussedCount: 4 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-09-28', accussedCount: 4 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2002-10-13', accussedCount: 2 },
    { officerId1: 3663, officerId2: 31945, incidentDate: '2002-10-13', accussedCount: 5 },
    { officerId1: 4269, officerId2: 31945, incidentDate: '2002-10-13', accussedCount: 5 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2003-10-25', accussedCount: 4 },
    { officerId1: 3663, officerId2: 4269, incidentDate: '2003-10-25', accussedCount: 3 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2006-03-15', accussedCount: 16 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2006-09-11', accussedCount: 17 },
    { officerId1: 2671, officerId2: 15956, incidentDate: '2008-01-11', accussedCount: 18 }
  ];
  const listEvent = [
    '1990-01-09',
    '1991-02-20',
    '1991-07-06',
    '1991-08-07',
    '1992-03-08',
    '1992-07-18',
    '1993-02-15',
    '1993-03-28',
    '1993-04-03',
    '1993-06-01',
    '1993-06-03',
    '1993-06-09',
    '1993-07-13',
    '1993-10-16',
    '1994-01-09',
    '1994-01-31',
    '1994-02-15',
    '1994-02-26',
    '1994-03-06',
    '1994-03-07',
    '1994-03-12',
    '1994-04-17',
    '1994-05-24',
    '1994-06-21',
    '1994-08-17',
    '1995-02-28',
    '1995-05-21',
    '1995-07-28',
    '1996-01-20',
    '1996-01-22',
    '1996-04-20',
    '1996-05-28',
    '1996-07-27',
    '1996-12-27',
    '1996-12-30',
    '1997-06-20',
    '1997-07-11',
    '1997-08-23',
    '1998-06-27',
    '1998-09-22',
    '1998-11-09',
    '1998-11-17',
    '1998-11-28',
    '1998-12-03',
    '1999-02-08',
    '1999-03-30',
    '1999-07-22',
    '1999-11-16',
    '1999-12-15',
    '2000-04-20',
    '2000-04-28',
    '2000-05-20',
    '2000-09-21',
    '2001-01-15',
    '2001-02-22',
    '2001-07-09',
    '2001-10-02',
    '2001-10-19',
    '2002-04-01',
    '2002-09-28',
    '2002-10-13',
    '2003-10-25',
    '2006-03-15',
    '2006-09-11',
    '2008-01-11'
  ];

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render all sections correctly', function () {
    const startTimelineFromBeginningStub = stub();
    const stopTimelineStub = stub();
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        startTimelineFromBeginning={ startTimelineFromBeginningStub }
        stopTimeline={ stopTimelineStub }
      />
    );

    const expectedNodes = [
      { id: 0, fname: 'Glenn Evans', uid: 8138, degree: 3, group: 1 },
      { id: 1, fname: 'Isaac Lee', uid: 15956, degree: 2, group: 0 },
      { id: 2, fname: 'Thomas Kampenga', uid: 14045, degree: 6, group: 3 },
      { id: 3, fname: 'Melvin Ector', uid: 31945, degree: 7, group: 1 },
      { id: 4, fname: 'Sean Brandon', uid: 2671, degree: 2, group: 0 },
      { id: 5, fname: 'Estella Perez-Stanford', uid: 22297, degree: 0, group: 0 },
      { id: 6, fname: 'Johnny Cavers', uid: 4269, degree: 7, group: 1 },
      { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 5, group: 5 },
      { id: 8, fname: 'John Hart', uid: 11580, degree: 2, group: 6 },
      { id: 9, fname: 'William Roberison', uid: 24157, degree: 1, group: 0 },
      { id: 10, fname: 'Francis Higgins', uid: 12176, degree: 4, group: 3 },
      { id: 11, fname: 'David Portis', uid: 22861, degree: 3, group: 6 },
      { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 7, group: 5 },
      { id: 13, fname: 'Joseph Blaye', uid: 2171, degree: 0, group: 0 },
      { id: 14, fname: 'Charles Toussas', uid: 28805, degree: 4, group: 3 },
      { id: 15, fname: 'Bennie Watson', uid: 30209, degree: 4, group: 1 },
      { id: 16, fname: 'Tracy Hughes', uid: 12737, degree: 0, group: 0 },
      { id: 17, fname: 'Donnell Calhoun', uid: 3663, degree: 10, group: 5 },
      { id: 18, fname: 'Hardy White', uid: 30466, degree: 6, group: 6 },
      { id: 19, fname: 'Matthew Brandon', uid: 2675, degree: 1, group: 0 }
    ];

    const expectedLinks = [
      { sourceUid: 2675, targetUid: 24157, weight: 2, className: '' },
      { sourceUid: 22861, targetUid: 30466, weight: 3, className: '' },
      { sourceUid: 11580, targetUid: 22861, weight: 5, className: '' },
      { sourceUid: 14045, targetUid: 22861, weight: 2, className: '' },
      { sourceUid: 14045, targetUid: 28805, weight: 10, className: '' },
      { sourceUid: 12176, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 12176, targetUid: 14045, weight: 4, className: '' },
      { sourceUid: 3663, targetUid: 14045, weight: 3, className: '' },
      { sourceUid: 3663, targetUid: 12176, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 4881, weight: 2, className: '' },
      { sourceUid: 12176, targetUid: 28805, weight: 8, className: '' },
      { sourceUid: 14045, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 4881, targetUid: 14045, weight: 2, className: '' },
      { sourceUid: 21194, targetUid: 28805, weight: 4, className: '' },
      { sourceUid: 4269, targetUid: 30209, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 21194, weight: 9, className: '' },
      { sourceUid: 11580, targetUid: 30466, weight: 6, className: '' },
      { sourceUid: 3663, targetUid: 28805, weight: 8, className: '' },
      { sourceUid: 8138, targetUid: 31945, weight: 7, className: '' },
      { sourceUid: 3663, targetUid: 8138, weight: 2, className: '' },
      { sourceUid: 8138, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 30209, weight: 2, className: '' },
      { sourceUid: 30466, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 30209, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 30209, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 30466, weight: 2, className: '' },
      { sourceUid: 2671, targetUid: 4269, weight: 3, className: '' },
      { sourceUid: 4269, targetUid: 15956, weight: 3, className: '' },
      { sourceUid: 4881, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 4881, targetUid: 21194, weight: 3, className: '' },
      { sourceUid: 4269, targetUid: 4881, weight: 2, className: '' },
      { sourceUid: 21194, targetUid: 31945, weight: 2, className: '' },
      { sourceUid: 4269, targetUid: 21194, weight: 2, className: '' },
      { sourceUid: 3663, targetUid: 31945, weight: 5, className: '' },
      { sourceUid: 4269, targetUid: 31945, weight: 5, className: '' },
      { sourceUid: 3663, targetUid: 4269, weight: 3, className: '' },
      { sourceUid: 2671, targetUid: 15956, weight: 18, className: 'current-link' }
    ];

    const expectedLinkedByIndex = {
      '0,0': 1, '0,18': 1, '0,3': 1, '1,1': 1, '10,10': 1, '10,12': 1, '10,14': 1, '10,2': 1,
      '11,11': 1, '11,18': 1, '12,12': 1, '12,14': 1, '12,3': 1, '13,13': 1, '14,14': 1, '15,15': 1,
      '15,18': 1, '15,3': 1, '16,16': 1, '17,0': 1, '17,10': 1, '17,12': 1, '17,14': 1, '17,15': 1,
      '17,17': 1, '17,18': 1, '17,2': 1, '17,3': 1, '17,6': 1, '17,7': 1, '18,18': 1, '18,3': 1,
      '19,19': 1, '19,9': 1, '2,11': 1, '2,12': 1, '2,14': 1, '2,2': 1, '3,3': 1, '4,1': 1, '4,4': 1,
      '4,6': 1, '5,5': 1, '6,1': 1, '6,12': 1, '6,15': 1, '6,3': 1, '6,6': 1, '6,7': 1,
      '7,12': 1, '7,2': 1, '7,3': 1, '7,7': 1, '8,11': 1, '8,18': 1, '8,8': 1, '9,9': 1,
    };

    const expectedMaxNodeInCommunities = {
      '0': { uid: 15956 },
      '1': { uid: 31945 },
      '3': { uid: 14045 },
      '5': { uid: 3663 },
      '6': { uid: 30466 },
    };

    const expectedTopNodes = [
      { uid: 3663 },
      { uid: 21194 },
      { uid: 4269 },
      { uid: 31945 },
      { uid: 30466 },
    ];

    const graphNodes = instance.data.nodes;

    graphNodes.length.should.eql(expectedNodes.length);
    for (let index=0; index < graphNodes.length; index++) {
      const expectedNode = expectedNodes[index];
      const graphNode = graphNodes[index];
      forOwn(expectedNode, (value, key) => {
        graphNode[key].should.eql(value);
      });
    }

    const graphLinks = instance.data.links;
    graphLinks.length.should.eql(expectedLinks.length);
    graphLinks.forEach((graphLink) => {
      const expectedLink = find(expectedLinks, (link) => {
        return link.sourceUid === graphLink.source.uid && link.targetUid === graphLink.target.uid;
      });

      graphLink.weight.should.eql(expectedLink.weight);
      graphLink.className.should.eql(expectedLink.className);
    });
    instance.data.linkedByIndex.should.eql(expectedLinkedByIndex);

    const maxNodeInCommunities = instance.data.maxNodeInCommunities;

    Object.keys(maxNodeInCommunities).should.eql(Object.keys(expectedMaxNodeInCommunities));

    forIn(maxNodeInCommunities, (maxNode, group) => {
      maxNode.uid.should.eql(expectedMaxNodeInCommunities[group].uid);
    });

    const topNodes = instance.data.topNodes;
    topNodes.length.should.eql(expectedTopNodes.length);

    topNodes.forEach((topNode, index) => {
      topNode.uid.should.eql(expectedTopNodes[index].uid);
    });

    instance.data.maxWeight.should.eql(18);

    findDOMNode(instance).getElementsByClassName('node').length.should.eql(expectedNodes.length);
    findDOMNode(instance).getElementsByClassName('link').length.should.eql(expectedLinks.length);
    findDOMNode(instance).getElementsByClassName('node-label').length.should.eql(expectedTopNodes.length);

    startTimelineFromBeginningStub.called.should.be.true();
    stopTimelineStub.called.should.be.true();
  });

  it('should re-render all sections correctly with timelineIdx change', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        timelineIdx={ 14 }
      />,
      instance
    );

    const expectedNodes = [
      { id: 0, fname: 'Glenn Evans', uid: 8138, degree: 0, group: 0 },
      { id: 1, fname: 'Isaac Lee', uid: 15956, degree: 0, group: 0 },
      { id: 2, fname: 'Thomas Kampenga', uid: 14045, degree: 2, group: 3 },
      { id: 3, fname: 'Melvin Ector', uid: 31945, degree: 0, group: 0 },
      { id: 4, fname: 'Sean Brandon', uid: 2671, degree: 0, group: 0 },
      { id: 5, fname: 'Estella Perez-Stanford', uid: 22297, degree: 0, group: 0 },
      { id: 6, fname: 'Johnny Cavers', uid: 4269, degree: 0, group: 0 },
      { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 0, group: 0 },
      { id: 8, fname: 'John Hart', uid: 11580, degree: 2, group: 9 },
      { id: 9, fname: 'William Roberison', uid: 24157, degree: 1, group: 0 },
      { id: 10, fname: 'Francis Higgins', uid: 12176, degree: 1, group: 3 },
      { id: 11, fname: 'David Portis', uid: 22861, degree: 3, group: 9 },
      { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 1, group: 0 },
      { id: 13, fname: 'Joseph Blaye', uid: 2171, degree: 0, group: 0 },
      { id: 14, fname: 'Charles Toussas', uid: 28805, degree: 2, group: 3 },
      { id: 15, fname: 'Bennie Watson', uid: 30209, degree: 0, group: 0 },
      { id: 16, fname: 'Tracy Hughes', uid: 12737, degree: 0, group: 0 },
      { id: 17, fname: 'Donnell Calhoun', uid: 3663, degree: 1, group: 0 },
      { id: 18, fname: 'Hardy White', uid: 30466, degree: 2, group: 9 },
      { id: 19, fname: 'Matthew Brandon', uid: 2675, degree: 1, group: 0 }
    ];

    const expectedLinks = [
      { sourceUid: 2675, targetUid: 24157, weight: 2, className: '' },
      { sourceUid: 22861, targetUid: 30466, weight: 3, className: '' },
      { sourceUid: 11580, targetUid: 22861, weight: 5, className: '' },
      { sourceUid: 14045, targetUid: 22861, weight: 2, className: '' },
      { sourceUid: 14045, targetUid: 28805, weight: 3, className: '' },
      { sourceUid: 3663, targetUid: 21194, weight: 3, className: '' },
      { sourceUid: 12176, targetUid: 28805, weight: 4, className: '' },
      { sourceUid: 11580, targetUid: 30466, weight: 5, className: 'current-link' },
    ];

    const expectedMaxNodeInCommunities = {
      '0': { uid: 24157 },
      '3': { uid: 14045 },
      '9': { uid: 22861 },
    };

    const expectedTopNodes = [
      { uid: 22861 },
      { uid: 28805 },
      { uid: 30466 },
      { uid: 11580 },
      { uid: 14045 },
    ];

    const expectedLinkedByIndex = {
      '0,0': 1, '0,18': 1, '0,3': 1, '1,1': 1, '10,10': 1, '10,12': 1, '10,14': 1, '10,2': 1,
      '11,11': 1, '11,18': 1, '12,12': 1, '12,14': 1, '12,3': 1, '13,13': 1, '14,14': 1, '15,15': 1,
      '15,18': 1, '15,3': 1, '16,16': 1, '17,0': 1, '17,10': 1, '17,12': 1, '17,14': 1, '17,15': 1,
      '17,17': 1, '17,18': 1, '17,2': 1, '17,3': 1, '17,6': 1, '17,7': 1, '18,18': 1, '18,3': 1,
      '19,19': 1, '19,9': 1, '2,11': 1, '2,12': 1, '2,14': 1, '2,2': 1, '3,3': 1, '4,1': 1, '4,4': 1,
      '4,6': 1, '5,5': 1, '6,1': 1, '6,12': 1, '6,15': 1, '6,3': 1, '6,6': 1, '6,7': 1,
      '7,12': 1, '7,2': 1, '7,3': 1, '7,7': 1, '8,11': 1, '8,18': 1, '8,8': 1, '9,9': 1,
    };

    const graphNodes = instance.data.nodes;

    graphNodes.length.should.eql(expectedNodes.length);
    for (let index=0; index < graphNodes.length; index++) {
      const expectedNode = expectedNodes[index];
      const graphNode = graphNodes[index];
      forOwn(expectedNode, (value, key) => {
        graphNode[key].should.eql(value);
      });
    }

    const graphLinks = instance.data.links;
    graphLinks.length.should.eql(expectedLinks.length);
    graphLinks.forEach((graphLink) => {
      const expectedLink = find(expectedLinks, (link) => {
        return link.sourceUid === graphLink.source.uid && link.targetUid === graphLink.target.uid;
      });

      graphLink.weight.should.eql(expectedLink.weight);
      graphLink.className.should.eql(expectedLink.className);
    });
    instance.data.linkedByIndex.should.eql(expectedLinkedByIndex);

    const maxNodeInCommunities = instance.data.maxNodeInCommunities;

    Object.keys(maxNodeInCommunities).should.eql(Object.keys(expectedMaxNodeInCommunities));

    forIn(maxNodeInCommunities, (maxNode, group) => {
      maxNode.uid.should.eql(expectedMaxNodeInCommunities[group].uid);
    });

    const topNodes = instance.data.topNodes;
    topNodes.length.should.eql(expectedTopNodes.length);

    topNodes.forEach((topNode, index) => {
      topNode.uid.should.eql(expectedTopNodes[index].uid);
    });

    instance.data.maxWeight.should.eql(5);

    findDOMNode(instance).getElementsByClassName('node').length.should.eql(expectedNodes.length);
    findDOMNode(instance).getElementsByClassName('link').length.should.eql(expectedLinks.length);
    findDOMNode(instance).getElementsByClassName('node-label').length.should.eql(expectedTopNodes.length);
  });

  it('should return tooltip info when call graphTooltip', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    instance.graphTooltip({ fname: 'Donnell Calhoun' }).should.eql('<span>Donnell Calhoun</span>');
  });

  it('should show connected nodes when click on node', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        collideNodes={ true }
      />
    );

    instance.connectedNodes({ index: 12 });

    let graphNodes = findDOMNode(instance).getElementsByClassName('node');
    let hideGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '0.1');
    let visibleGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '1');
    hideGraphNodes.should.have.length(12);
    visibleGraphNodes.should.have.length(8);

    instance.connectedNodes({ index: 12 });

    hideGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '0.1');
    visibleGraphNodes = filter(graphNodes, graphNode => graphNode.style.opacity === '1');
    hideGraphNodes.should.have.length(0);
    visibleGraphNodes.should.have.length(20);
  });

  it('should move d to be adjacent to the cluster node when call cluster', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    const graphNode = { id: 11, fname: 'David Portis', uid: 22861, degree: 3, group: 6, x: 40, y: 60 };
    const cluster = instance.data.maxNodeInCommunities[graphNode.group];
    cluster.x = 10;
    cluster.y = 20;

    instance.cluster(0.5)(graphNode);

    round(graphNode.x, 2).should.eql(27.55);
    round(graphNode.y, 2).should.eql(43.4);
    round(cluster.x, 2).should.eql(22.45);
    round(cluster.y, 2).should.eql(36.6);
  });

  it('should resolves collisions between d and all other circles when call collide', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    const graphNode1 = { id: 7, fname: 'Gilbert Cobb', uid: 4881, degree: 5, group: 5, x: 390, y: 405 };
    const graphNode2 = { id: 12, fname: 'Eugene Offett', uid: 21194, degree: 7, group: 5, x: 387, y: 418 };

    const graphNodes = [graphNode1, graphNode2];
    instance.data.nodes = graphNodes;

    instance.collide()(graphNode2);

    round(graphNode1.x, 2).should.eql(390.02);
    round(graphNode1.y, 2).should.eql(404.92);
    round(graphNode2.x, 2).should.eql(386.98);
    round(graphNode2.y, 2).should.eql(418.08);
  });

  it('should call drawGraph again when componentDidUpdate', function () {
    const smallCoaccusedData = [
      { officerId1: 2675, officerId2: 24157, incidentDate: '1990-01-09', accussedCount: 2 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1991-02-20', accussedCount: 2 },
      { officerId1: 22861, officerId2: 30466, incidentDate: '1991-02-20', accussedCount: 2 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-02-20', accussedCount: 2 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-07-06', accussedCount: 3 },
      { officerId1: 22861, officerId2: 30466, incidentDate: '1991-08-07', accussedCount: 3 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1991-08-07', accussedCount: 4 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1991-08-07', accussedCount: 3 },
      { officerId1: 11580, officerId2: 22861, incidentDate: '1992-03-08', accussedCount: 5 },
      { officerId1: 12176, officerId2: 28805, incidentDate: '1992-07-18', accussedCount: 2 },
      { officerId1: 11580, officerId2: 30466, incidentDate: '1993-02-15', accussedCount: 4 },
      { officerId1: 3663, officerId2: 21194, incidentDate: '1993-03-28', accussedCount: 2 },
    ];

    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ smallCoaccusedData }
        listEvent={ listEvent }
      />
    );

    instance.data.nodes.should.have.length(20);
    instance.data.links.should.have.length(6);

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />,
      instance
    );

    instance.data.nodes.should.have.length(20);
    instance.data.links.should.have.length(37);
  });

  it('should not draw graph when officers is empty', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ [] }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    should(instance.data.nodes).be.undefined();
    should(instance.data.links).be.undefined();
  });

  it('should call resizeGraph when fullscreen is changed', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    const resizeGraphSpy = spy(instance, 'resizeGraph');
    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        fullscreen={ true }
      />,
      instance
    );
    resizeGraphSpy.called.should.be.true();
  });

  it('should call updateSelectedOfficerId when clicking on a graph node', function () {
    const updateSelectedOfficerIdStub = stub();
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateSelectedOfficerId={ updateSelectedOfficerIdStub }
      />
    );
    const graphNode = instance.data.nodes[0];
    instance.handleNodeClick(graphNode);
    updateSelectedOfficerIdStub.should.be.calledWith(graphNode.uid);
  });

  it('should call _updateSelectedNode when componentDidUpdate', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        selectedOfficerId={ 11580 }
      />,
      instance
    );

    instance.selectedNodeLabel.box.should.have.length(1);
    const selectedNodeLabel = findDOMNode(instance).getElementsByClassName('selected-node-label')[0];
    findDOMNode(selectedNodeLabel).textContent.should.eql('John Hart');

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        selectedOfficerId={ 8138 }
      />,
      instance
    );

    findDOMNode(selectedNodeLabel).textContent.should.eql('Glenn Evans');
  });

  it('should call _updateSelectedEdge when componentDidUpdate', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        timelineIdx={ listEvent.length - 1 }
      />
    );

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        selectedEdge={ { sourceUid: 2675, targetUid: 24157, coaccusedCount: 2 } }
        timelineIdx={ listEvent.length - 1 }
      />,
      instance
    );

    instance.selectedEdgeLabel.box.should.have.length(1);
    const selectedEdgeLabel = findDOMNode(instance).getElementsByClassName('selected-edge-label')[0];
    findDOMNode(selectedEdgeLabel).textContent.should.eql('2 coaccusals');

    instance = reRender(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        selectedEdge={ { sourceUid: 22861, targetUid: 30466, coaccusedCount: 3 } }
        timelineIdx={ listEvent.length - 1 }
      />,
      instance
    );

    findDOMNode(selectedEdgeLabel).textContent.should.eql('3 coaccusals');
  });

  it('should call this.tip.show if isSelectedNode is false', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    const showTipStub = stub(instance.tip, 'show');
    instance.handleMouseover({ fullName: 'Glenn Evans', id: 8138 });
    showTipStub.should.be.called();
  });

  it('should not call this.tip.show if isSelectedNode is true', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );
    const showTipStub = stub(instance.tip, 'show');
    instance.handleMouseover({ fullName: 'Glenn Evans', id: 8138, isSelectedNode: true });
    showTipStub.should.not.be.called();
  });

  it('should call updateSelectedEdge when clicking on an edge', function () {
    const updateSelectedEdgeStub = stub();
    const currentEdge = {
      source: {
        uid: 8138,
        fullName: 'Glenn Evans',
      },
      target: {
        uid: 4269,
        fullName: 'Johnny Cavers',
      },
    };
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateSelectedEdge={ updateSelectedEdgeStub }
      />
    );
    instance.handleEdgeClick(currentEdge);
    updateSelectedEdgeStub.should.be.calledWith({ sourceUid: 8138, targetUid: 4269 });
  });

  it('should add & remove edge-hover class to edge and corresponding nodes when mouseover and mouseout', function () {
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
      />
    );

    let hoveredEdge = instance.data.links[0];
    instance.handleEdgeMouseover(hoveredEdge);

    findDOMNode(instance).getElementsByClassName('link edge-hover').should.have.length(1);
    findDOMNode(instance).getElementsByClassName('node edge-hover').should.have.length(2);

    instance.handleEdgeMouseout();

    findDOMNode(instance).getElementsByClassName('link edge-hover').should.have.length(0);
    findDOMNode(instance).getElementsByClassName('node edge-hover').should.have.length(0);
  });

  it('should call updateSortedOfficerIds', function () {
    const updateSortedOfficerIdsSpy = spy();
    instance = renderIntoDocument(
      <SocialGraph
        officers={ officers }
        coaccusedData={ coaccusedData }
        listEvent={ listEvent }
        updateSortedOfficerIds={ updateSortedOfficerIdsSpy }
      />
    );

    const expectedSortedOfficerIds = [
      3663, 21194, 4269, 31945, 30466, 14045, 4881, 30209, 28805, 12176,
      22861, 8138, 15956, 11580, 2671, 2675, 24157, 22297, 2171, 12737
    ];
    updateSortedOfficerIdsSpy.should.be.calledWith(expectedSortedOfficerIds);
  });
});
