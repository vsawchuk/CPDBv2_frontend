import React from 'react';
import {
  renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedDOMComponentsWithClass, Simulate,
} from 'react-addons-test-utils';

import { unmountComponentSuppressError } from 'utils/test';
import CRCard from 'components/pinboard-page/cards/cr-card';
import ItemUnpinButton from 'components/pinboard-page/item-unpin-button';
import { findDOMNode } from 'react-dom';


describe('CRCard component', function () {
  let instance;

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render ItemUnpinButton component and body correctly', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<CRCard item={ item }/>);

    findRenderedComponentWithType(instance, ItemUnpinButton);
    findRenderedDOMComponentWithClass(instance, 'cr-incident-date').textContent.should.eql('10-10-2010');
    findRenderedDOMComponentWithClass(instance, 'cr-category').textContent.should.eql('Use Of Force');
  });

  it('should render card map with style if point of item is not null', function () {
    const item = { point: { 'lat': 1.0, 'lon': 1.0 } };
    instance = renderIntoDocument(<CRCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'cr-card-map');
    scryRenderedDOMComponentsWithClass(instance, 'empty-map').should.have.length(0);
  });

  it('should not render card map with style if point of item is null', function () {
    const item = { point: null };
    instance = renderIntoDocument(<CRCard item={ item }/>);

    findRenderedDOMComponentWithClass(instance, 'cr-card-map');
    findRenderedDOMComponentWithClass(instance, 'empty-map');
  });

  it('should fade in when added', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<CRCard item={ item } isAdded={ true }/>);

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('hide');
    instanceDom.className.should.containEql('fade-in');
  });

  it('should fade out when removed', function () {
    const item = {
      incidentDate: '10-10-2010',
      category: 'Use Of Force',
    };
    instance = renderIntoDocument(<CRCard item={ item }/>);
    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);

    Simulate.click(findDOMNode(unpinButton));

    const instanceDom = findDOMNode(instance);
    instanceDom.className.should.containEql('fade-out');
  });
});
