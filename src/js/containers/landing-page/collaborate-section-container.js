import { connect } from 'react-redux';

import CollaborateSection from 'components/landing-page/collaborate-section';
import { updateLandingPage, turnOnSectionEditMode, turnOffSectionEditMode, COLLABORATE } from 'actions/landing-page';


const mapDispatchToProps = {
  onSaveForm: updateLandingPage,
  turnOnSectionEditMode: turnOnSectionEditMode.bind(null, COLLABORATE),
  turnOffSectionEditMode: turnOffSectionEditMode.bind(null, COLLABORATE)
};

function mapStateToProps(state, ownProps) {
  return {
    fields: state.landingPage.collaborateSection.fields,
    sectionEditModeOn: state.landingPage.collaborateSection.editModeOn
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CollaborateSection);
