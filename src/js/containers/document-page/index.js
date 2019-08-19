import { connect } from 'react-redux';
import { omit } from 'lodash';

import DocumentPage from 'components/document-page';
import {
  documentSelector,
  getTitleEditModeOn,
  getTagsEditModeOn,
  getTextContentEditModeOn,
  getTagsErrorMessages,
  documentEditableFieldsSelector,
} from 'selectors/document-page';
import { updateDocument } from 'actions/document-page';
import { isSignedIn } from 'selectors/log-out';
import {
  turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode,
  turnOnDocumentTagsEditMode,
  turnOffDocumentTagsEditMode,
  turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode
} from 'actions/document-page';


function mapStateToProps(state, ownProps) {
  const documentAttrs = documentSelector(state);
  return {
    ...ownProps,
    ...documentAttrs,
    editableFields: documentEditableFieldsSelector(state),
    titleEditModeOn: getTitleEditModeOn(state),
    tagsEditModeOn: getTagsEditModeOn(state),
    textContentEditModeOn: getTextContentEditModeOn(state),
    isSignedIn: isSignedIn(state),
    tagsErrorMessages: getTagsErrorMessages(state),
  };
}

const mapDispatchToProps = {
  onSaveForm: updateDocument,
  turnOnDocumentPageTitleEditMode: turnOnDocumentPageTitleEditMode,
  turnOffDocumentPageTitleEditMode: turnOffDocumentPageTitleEditMode,
  turnOnDocumentTagsEditMode: turnOnDocumentTagsEditMode,
  turnOffDocumentTagsEditMode: turnOffDocumentTagsEditMode,
  turnOnDocumentTextContentEditMode: turnOnDocumentTextContentEditMode,
  turnOffDocumentTextContentEditMode: turnOffDocumentTextContentEditMode,
};

const editWrapperStateProps = (stateProps, dispatchProps, ownProps) => {
  return {
    ...ownProps,
    ...omit(stateProps, ['editableFields', 'titleEditModeOn', 'tagsEditModeOn', 'textContentEditModeOn']),
    ...omit(dispatchProps, [
      'onSaveForm',
      'turnOnDocumentPageTitleEditMode',
      'turnOffDocumentPageTitleEditMode',
      'turnOnDocumentTagsEditMode',
      'turnOffDocumentTagsEditMode',
      'turnOnDocumentTextContentEditMode',
      'turnOffDocumentTextContentEditMode'
    ]),
    titleEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.titleEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentPageTitleEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentPageTitleEditMode
    },
    tagsEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.tagsEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentTagsEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentTagsEditMode
    },
    textContentEditWrapperStateProps: {
      fields: stateProps.editableFields,
      sectionEditModeOn: stateProps.textContentEditModeOn,
      onSaveForm: dispatchProps.onSaveForm,
      turnOnSectionEditMode: dispatchProps.turnOnDocumentTextContentEditMode,
      turnOffSectionEditMode: dispatchProps.turnOffDocumentTextContentEditMode
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps, editWrapperStateProps)(DocumentPage);
