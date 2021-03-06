import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import Header from './header';
import ShareableHeaderContainer from 'containers/headers/shareable-header/shareable-header-container';
import SummaryPageContainer from 'containers/unit-profile-page/summary-page';
import { pageWrapperStyle } from './unit-profile-page.style';


export default function UnitProfilePage(props) {
  const { unitName, summary, scrollPosition } = props;

  return (
    <React.Fragment>
      <Helmet>
        <title>{ `Unit ${unitName}` }</title>
      </Helmet>
      <ShareableHeaderContainer />
      <Header
        unitName={ unitName }
        unitDescription={ summary.description }
        scrollPosition={ scrollPosition }
      />
      <div style={ pageWrapperStyle }>
        <SummaryPageContainer unitName={ unitName } summary={ summary } />;
      </div>
    </React.Fragment>
  );
}

UnitProfilePage.propTypes = {
  unitName: PropTypes.string,
  summary: PropTypes.object,
  scrollPosition: PropTypes.string,
};

UnitProfilePage.defaultProps = {
  summary: {},
};
