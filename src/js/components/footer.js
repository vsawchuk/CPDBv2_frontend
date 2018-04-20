import React, { PropTypes } from 'react';

import FooterNavLink from 'components/common/footer-nav-link';
import {
  wrapperStyle, linkStyle, linkWrapperStyle, sectionStyle, responsiveFixedWidthInnerStyle, invistStyle
} from './footer.style';
import ResponsiveFluidWidthComponent from 'components/responsive/responsive-fluid-width-component';
import NoRerender from 'components/common/higher-order/no-rerender';
import { imgUrl } from 'utils/static-assets';


class Footer extends React.Component {
  render() {
    const { openLegalDisclaimerModal, style } = this.props;
    const links = [
      {
        name: 'Legal',
        onClick: openLegalDisclaimerModal
      },
      {
        name: 'Github',
        externalHref: 'https://github.com/invinst/'
      },
      {
        name: 'Contact',
        onClick: () => { window.Intercom('show'); }
      }
    ];

    return (
      <div style={ { ...sectionStyle, ...style } }>
        <div style={ wrapperStyle }>
          <div style={ linkWrapperStyle }>
            <ResponsiveFluidWidthComponent>
              <div style={ responsiveFixedWidthInnerStyle }>
                { links.map((link, ind) => (
                  <FooterNavLink
                    style={ linkStyle }
                    key={ ind }
                    { ...link }
                  />
                )) }
                <img style={ invistStyle } src={ imgUrl('invist-logo.svg') } />
              </div>
            </ResponsiveFluidWidthComponent>
          </div>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  openLegalDisclaimerModal: PropTypes.func
};

export default NoRerender(Footer);
