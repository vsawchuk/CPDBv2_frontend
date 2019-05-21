import React from 'react';
import { findDOMNode } from 'react-dom';

import { renderIntoDocument,
  findRenderedComponentWithType,
  findRenderedDOMComponentWithClass,
  scryRenderedComponentsWithType,
  scryRenderedDOMComponentsWithClass,
  Simulate
} from 'react-addons-test-utils';
import { spy, useFakeTimers } from 'sinon';

import { unmountComponentSuppressError } from 'utils/test';
import OfficerCardComponent from 'components/pinboard-page/cards/officer-card';
import { OfficerCard } from 'components/pinboard-page/pinned-type';
import ItemUnpinButton from 'components/pinboard-page/cards/item-unpin-button';


describe('withUndoCard higher-order component', function () {
  let instance;
  const item = {
    type: 'OFFICER',
    isPinned: false,
    id: 123,
    rank: 'Officer as Detective',
    fullName: 'James David',
    complaintCount: '10',
  };

  afterEach(function () {
    unmountComponentSuppressError(instance);
  });

  it('should render wrapped component', function () {
    instance = renderIntoDocument(
      <OfficerCard item={ item } />
    );

    scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(1);
    scryRenderedDOMComponentsWithClass(instance, 'undo-card').should.have.length(0);
  });

  it('should render undo card when user click remove', function () {
    instance = renderIntoDocument(
      <OfficerCard item={ item } />
    );

    const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
    Simulate.click(findDOMNode(unpinButton));

    scryRenderedDOMComponentsWithClass(instance, 'undo-card').should.have.length(1);
    scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(0);
  });

  context('animation', function () {
    let clock;

    beforeEach(function () {
      clock = useFakeTimers();
    });

    afterEach(function () {
      clock.restore();
    });

    it('should render nothing when user click unpin but not undo', function () {
      const removeItemInPinboardPage = spy();
      instance = renderIntoDocument(
        <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage }/>
      );

      const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
      Simulate.click(findDOMNode(unpinButton));

      clock.tick(1050);

      scryRenderedComponentsWithType(instance, OfficerCardComponent).should.have.length(0);
      scryRenderedDOMComponentsWithClass(instance, 'undo-card').should.have.length(0);
    });

    it('should trigger to remove item 1s after click on remove button', function () {
      const removeItemInPinboardPage = spy();

      instance = renderIntoDocument(
        <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage } />
      );

      const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
      Simulate.click(findDOMNode(unpinButton));

      clock.tick(1050);

      removeItemInPinboardPage.should.be.calledWith({
        type: 'OFFICER',
        id: 123
      });
    });

    it('should cancel remove item if click on undo button', function () {
      const removeItemInPinboardPage = spy();

      instance = renderIntoDocument(
        <OfficerCard item={ item } removeItemInPinboardPage={ removeItemInPinboardPage } />
      );

      const unpinButton = findRenderedComponentWithType(instance, ItemUnpinButton);
      Simulate.click(findDOMNode(unpinButton));

      const undoButton = findRenderedDOMComponentWithClass(instance, 'undo-button');
      Simulate.click(undoButton);

      clock.tick(1050);

      removeItemInPinboardPage.should.not.be.called();
    });
  });
});
