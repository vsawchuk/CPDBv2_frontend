import React from 'react';
import { findDOMNode } from 'react-dom';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  Simulate,
} from 'react-addons-test-utils';
import { stub, useFakeTimers, spy } from 'sinon';
import should from 'should';

import { unmountComponentSuppressError } from 'utils/test';
import RelevantCoaccusalCard, { RelevantCoaccusalCardWithUndo }
  from 'components/pinboard-page/relevant/relevant-coaccusals/relevant-coaccusal-card';
import StaticRadarChart from 'components/common/radar-chart';
import PlusButton from 'components/pinboard-page/relevant/common/plus-button';
import { UNDO_CARD_VISIBLE_TIME } from 'utils/constants';


describe('RelevantCoaccusalCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render enough content correctly', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 11 }
        complaintCount={ 22 }
        percentile={ {
          officerId: 123,
          year: 2015,
          items: [
            { axis: 'Use of Force Reports', value: 20.6, },
            { axis: 'Officer Allegations', value: 10.1, },
            { axis: 'Civilian Allegations', value: 52.5, },
          ],
          visualTokenBackground: '#ed7467',
        } }
      />
    );

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    radarChart.props.data.should.eql([
      { axis: 'Use of Force Reports', value: 20.6, },
      { axis: 'Officer Allegations', value: 10.1, },
      { axis: 'Civilian Allegations', value: 52.5, },
    ]);
    radarChart.props.width.should.eql(148);
    radarChart.props.height.should.eql(60);
    radarChart.props.radius.should.eql(28);
    radarChart.props.offsetTop.should.eql(2);
    radarChart.props.backgroundColor.should.eql('#ed7467');

    findRenderedDOMComponentWithClass(instance, 'light-text officer-card-rank').textContent.should.eql('Officer');
    findRenderedDOMComponentWithClass(
      instance, 'bold-text officer-card-name'
    ).textContent.should.eql('Jerome Finnigan');
    findRenderedDOMComponentWithClass(instance, 'coaccusal-count').textContent.should.eql('11 coaccusals');

    const plusButton = findRenderedComponentWithType(instance, PlusButton);
    Simulate.click(findDOMNode(plusButton));

    addItemInPinboardPageStub.should.calledOnce();
    addItemInPinboardPageStub.should.calledWith({
      type: 'OFFICER',
      id: '123',
      complaintCount: 22,
      fullName: 'Jerome Finnigan',
      rank: 'Officer',
      percentile: {
        items: [
          { axis: 'Use of Force Reports', value: 20.6 },
          { axis: 'Officer Allegations', value: 10.1 },
          { axis: 'Civilian Allegations', value: 52.5 }
        ],
        officerId: 123,
        visualTokenBackground: '#ed7467',
        year: 2015
      }
    });
  });

  it('should render pluralize coaccusalCount and handle no percentile data', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const radarChart = findRenderedComponentWithType(instance, StaticRadarChart);
    should(radarChart.props.data).be.undefined();
    radarChart.props.width.should.eql(148);
    radarChart.props.height.should.eql(60);
    radarChart.props.radius.should.eql(28);
    radarChart.props.offsetTop.should.eql(2);
    should(radarChart.props.backgroundColor).be.undefined();

    findRenderedDOMComponentWithClass(instance, 'light-text officer-card-rank').textContent.should.eql('Officer');
    findRenderedDOMComponentWithClass(
      instance, 'bold-text officer-card-name'
    ).textContent.should.eql('Jerome Finnigan');
    findRenderedDOMComponentWithClass(instance, 'coaccusal-count').textContent.should.eql('1 coaccusal');
  });

  it('should trigger addItemInPinboardPage when clicked on PlusButton', function () {
    const addItemInPinboardPageStub = stub();

    instance = renderIntoDocument(
      <RelevantCoaccusalCard
        addItemInPinboardPage={ addItemInPinboardPageStub }
        id={ 123 }
        fullName='Jerome Finnigan'
        rank='Officer'
        coaccusalCount={ 1 }
        percentile={ {} }
      />
    );

    const plusButton = findRenderedComponentWithType(instance, PlusButton);
    Simulate.click(findDOMNode(plusButton));

    addItemInPinboardPageStub.calledWith({
      type: 'OFFICER',
      id: '123',
      fullName: 'Jerome Finnigan',
      percentile: {},
      complaintCount: 1,
      rank: 'Officer'
    });
  });

  describe('RelevantCoaccusalCardWithUndo component', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render remove text correctly', function () {
      instance = renderIntoDocument(
        <RelevantCoaccusalCardWithUndo
          id={ 123 }
          fullName='Jerome Finnigan'
          rank='Officer'
          coaccusalCount={ 1 }
          percentile={ {} }
        />
      );
      const plusButton = findRenderedComponentWithType(instance, PlusButton);

      Simulate.click(findDOMNode(plusButton));

      findRenderedDOMComponentWithClass(instance, 'text').textContent.should.eql('Jerome Finnigan added.');
    });

    it('should not be reversed after the undo card disappears', function () {
      instance = renderIntoDocument(
        <RelevantCoaccusalCardWithUndo
          id={ 123 }
          fullName='Jerome Finnigan'
          rank='Officer'
          coaccusalCount={ 1 }
          percentile={ {} }
        />
      );

      const plusButton = findRenderedComponentWithType(instance, PlusButton);

      Simulate.click(findDOMNode(plusButton));

      clock.tick(UNDO_CARD_VISIBLE_TIME + 50);

      scryRenderedComponentsWithType(instance, RelevantCoaccusalCard).should.have.length(0);
    });
  });

  it('should handle on focus', function () {
    const focusItem = spy();

    instance = renderIntoDocument(
      <RelevantCoaccusalCardWithUndo
        id={ 123 }
        focusItem={ focusItem }
      />
    );

    const div = findRenderedDOMComponentWithClass(instance, 'officer-name-wrapper');

    Simulate.click(div);

    focusItem.calledWith({ type: 'OFFICER', 'id': 123 }).should.be.true();
  });
});