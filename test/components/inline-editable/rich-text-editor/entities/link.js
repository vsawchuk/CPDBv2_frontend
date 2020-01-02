import React from 'react';
import { mount } from 'enzyme';
import { stub } from 'sinon';
import { Entity } from 'draft-js';

import MoreLink from 'components/common/more-link';
import { TABLET, DESKTOP, EXTRA_WIDE } from 'components/responsive/responsive-style-component';
import { ENTITY_LINK } from 'utils/constants';
import Link from 'components/inline-editable/rich-text-editor/entities/link';


describe('Link component', function () {
  it('should render MoreLink element while not in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: false,
    };
    const getStub = stub(Entity, 'get');
    getStub.withArgs(entityKey).returns({ getData: () => { return { url }; } });

    const wrapper = mount(
      <Link entityKey={ entityKey }/>,
      { context: context },
    );
    const moreLinkElement = wrapper.find(MoreLink).at(0);
    moreLinkElement.prop('href').should.eql(url);
    getStub.restore();
  });

  it('should render span element while in edit mode', function () {
    const entityKey = 'entityKey';
    const url = 'url';
    const context = {
      editModeOn: true,
    };
    const getStub = stub(Entity, 'get');
    getStub.withArgs(entityKey).returns({ getData: () => { return { url }; } });

    const wrapper = mount(
      <Link entityKey={ entityKey }/>,
      { context: context },
    );

    wrapper.find('span').exists().should.be.true();
    getStub.restore();
  });

  it('should apply style from context', function () {
    const style = { a: 'b' };
    const context = {
      draftEntityStyle: {
        [ENTITY_LINK]: style,
      },
    };
    stub(Entity, 'get').returns({ getData: () => { return { url: 'url' }; } });
    const wrapper = mount(
      <Link/>,
      { context: context }
    );
    const moreLinkElement = wrapper.find(MoreLink).at(0);
    moreLinkElement.prop('style').should.equal(style);
    Entity.get.restore();
  });

  it('should apply responsive style from context', function () {
    const style = { 'c': 'd' };
    const context = {
      draftEntityStyle: {
        [ENTITY_LINK]: {
          [TABLET]: style,
          [DESKTOP]: style,
          [EXTRA_WIDE]: style,
        },
      },
    };
    stub(Entity, 'get').returns({ getData: () => { return { url: 'url' }; } });
    const wrapper = mount(
      <Link/>,
      { context: context }
    );
    const moreLinkElement = wrapper.find(MoreLink).at(0);
    moreLinkElement.prop('style').should.equal(style);
    Entity.get.restore();
  });
});
