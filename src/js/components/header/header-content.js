import { browserHistory } from 'react-router';
import React, { PropTypes } from 'react';

import {
  ROOT_PATH,
  COLLAB_PATH,
  FAQ_PATH,
  STORIES_PATH
} from 'utils/constants';
import { editMode } from 'utils/edit-path';
import ClosableNavLink from 'components/closable-nav-link';
import PropsRerender from 'components/common/higher-order/props-rerender';
import ResponsiveFixedWidthComponent from 'components/responsive/responsive-fixed-width-component';
import HoverableLink from 'components/common/hoverable-link';

import {
  navWrapperStyle, navStyle, logoWrapperStyle, logoStyle,
  navWrapperCompactStyle, logoWrapperCompactStyle, hoverableLinkStyle
} from './header-content.style';

export const links = [
  {
    name: 'Reporting',
    href: '/' + STORIES_PATH
  },
  {
    name: 'FAQ',
    href: '/' + FAQ_PATH
  },
  {
    name: 'Collaborate',
    href: '/' + COLLAB_PATH
  }
];

class HeaderContent extends React.Component {
  goToBasePath() {
    const { editModeOn } = this.context;

    let href = ROOT_PATH;
    if (editModeOn) {
      href = editMode(href);
    }
    browserHistory.push(href);
  }

  render() {
    const { compact, pathname } = this.props;
    const { editModeOn } = this.context;

    return (
      <ResponsiveFixedWidthComponent>
        <div style={ compact ? navWrapperCompactStyle : navWrapperStyle }>
          <HoverableLink href='//beta.cpdb.co'
            style={ hoverableLinkStyle }>
            Data
          </HoverableLink>
          { links.map((link, ind) => {
            let href = link.href;
            if (editModeOn) {
              href = editMode(href);
            }
            return (
              <ClosableNavLink
                key={ ind } style={ navStyle } href={ href } showCloseBtn={ compact && href === pathname }
                onClickClose={ this.goToBasePath.bind(this) }>
                { link.name }
              </ClosableNavLink>
            );
          }) }
        </div>
        <div style={ compact ? logoWrapperCompactStyle : logoWrapperStyle }>
          <HoverableLink className='test--header-logo' to={ ROOT_PATH } style={ logoStyle }>
            CPDP
          </HoverableLink>
        </div>
      </ResponsiveFixedWidthComponent>
    );
  }
}

HeaderContent.propTypes = {
  compact: PropTypes.bool,
  pathname: PropTypes.string
};

HeaderContent.contextTypes = {
  editModeOn: PropTypes.bool
};

export default PropsRerender(HeaderContent);
