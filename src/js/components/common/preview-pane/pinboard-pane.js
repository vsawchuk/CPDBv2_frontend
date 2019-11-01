import React, { Component, PropTypes } from 'react';
import pluralize from 'pluralize';

import {
  NewWidgetWrapper,
  TitleWidget,
  ListWidget,
  OneLineListWidget,
} from 'components/common/preview-pane/widgets';
import styles from './pinboard-pane.sass';


export default class PinboardPane extends Component {
  render() {
    const {
      id,
      title,
      fullCreatedAt,
      description,
      officersCount,
      allegationsCount,
      trrsCount,
      recentOfficers,
      recentAllegations,
      recentTrrs,
    } = this.props;

    return (
      <NewWidgetWrapper
        className={ styles.pinboardPane }
        callToAction={ { url: `/pinboard/${id}`, text: 'View Pinboard' } }
        yScrollable={ true }
        isClickable={ false }
      >
        <TitleWidget title={ title } subtitle={ description }/>
        <OneLineListWidget
          items={ [
            { title: 'Created at', text: fullCreatedAt },
          ] }
        />
        <ListWidget
          key={ `pinboard-${id}-officer` }
          title={ `${pluralize('Pinned officer', officersCount, true )}` }
          items={ recentOfficers }
          collapsable={ true }
        />
        <ListWidget
          key={ `pinboard-${id}-allegation` }
          title={ `${pluralize('Pinned allegation', allegationsCount, true )}` }
          items={ recentAllegations }
          showAvatar={ false }
          collapsable={ true }
        />
        <ListWidget
          key={ `pinboard-${id}-trr` }
          title={ `${pluralize('Pinned TRR', trrsCount, true )}` }
          items={ recentTrrs }
          showAvatar={ false }
          collapsable={ true }
        />
      </NewWidgetWrapper>
    );
  }
}

PinboardPane.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  fullCreatedAt: PropTypes.string,
  description: PropTypes.string,
  officersCount: PropTypes.number,
  allegationsCount: PropTypes.number,
  trrsCount: PropTypes.number,
  recentOfficers: PropTypes.array,
  recentAllegations: PropTypes.array,
  recentTrrs: PropTypes.array,
};
