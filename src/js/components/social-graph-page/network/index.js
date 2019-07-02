import React, { Component, PropTypes } from 'react';
import { isEmpty, noop, startCase, toLower } from 'lodash';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import cx from 'classnames';

import styles from './network.sass';
import RightPaneSection from 'components/social-graph-page/network/right-pane-section';
import sliderStyles from 'components/common/slider.sass';
import { showIntercomLauncher } from 'utils/intercom';
import MainTabs from 'components/social-graph-page/main-tabs';
import PreviewPane from 'components/social-graph-page/network/preview-pane';
import AnimatedSocialGraphContainer from 'containers/social-graph-page/animated-social-graph-container';


const COMPLAINT_ORIGIN_VALUES = ['ALL', 'CIVILIAN', 'OFFICER'];
const COMPLAINT_ORIGIN_CIVILIAN = 'CIVILIAN';
const DEFAULT_THRESHOLD_VALUE = 2;

export default class NetworkGraph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complaintOrigin: COMPLAINT_ORIGIN_CIVILIAN,
      thresholdValue: DEFAULT_THRESHOLD_VALUE,
      sortedOfficerIds: [],
    };
    this.handleSelectComplaintOrigin = this.handleSelectComplaintOrigin.bind(this);
    this.handleChangeThresholdValue = this.handleChangeThresholdValue.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.renderPreviewPane = this.renderPreviewPane.bind(this);
    this.updateSortedOfficerIds = this.updateSortedOfficerIds.bind(this);
  }

  componentDidMount() {
    showIntercomLauncher(false);
    this.fetchGraphData();
    window.addEventListener('mousedown', this.handleClickOutside);
  }

  componentDidUpdate(prevProps, prevState) {
    const { complaintOrigin, thresholdValue } = this.state;
    if (prevState.thresholdValue !== thresholdValue || prevState.complaintOrigin !== complaintOrigin) {
      this.fetchGraphData();
    }
  }

  componentWillUnmount() {
    showIntercomLauncher(true);
    window.removeEventListener('mousedown', this.handleClickOutside);
  }

  handleClickOutside(event) {
    const {
      updateSelectedOfficerId,
      updateSelectedEdge,
      updateSelectedCrid,
      selectedOfficerId,
      selectedEdge,
      selectedCrid,
    } = this.props;
    if (!event.target.closest('.officer-preview-link, .edge-coaccusals-preview-link, .cr-preview-link')) {
      if (selectedOfficerId) {
        updateSelectedOfficerId(null);
      }
      if (selectedCrid) {
        updateSelectedCrid(null);
      } else {
        if (selectedEdge) {
          updateSelectedEdge(null);
        }
      }
    }
  }

  fetchGraphData() {
    const {
      requestSocialGraphNetwork,
      requestSocialGraphAllegations,
      requestSocialGraphOfficers,
      officerIds,
      unitId,
      pinboardId,
    } = this.props;
    const { complaintOrigin, thresholdValue } = this.state;
    let requestParams;
    if (!isEmpty(pinboardId)) {
      requestParams = {
        'pinboard_id': pinboardId, 'threshold': thresholdValue, 'complaint_origin': complaintOrigin
      };
    } else if (!isEmpty(unitId)) {
      requestParams = { 'unit_id': unitId, 'threshold': thresholdValue, 'complaint_origin': complaintOrigin };
    } else if (!isEmpty(officerIds)) {
      requestParams = {
        'officer_ids': officerIds,
        'threshold': thresholdValue,
        'complaint_origin': complaintOrigin
      };
    }

    if (requestParams) {
      requestSocialGraphNetwork(requestParams);
      requestSocialGraphAllegations(requestParams);
      requestSocialGraphOfficers(requestParams);
    }
  }

  handleSelectComplaintOrigin(value) {
    this.setState({ complaintOrigin: value });
  }

  handleChangeThresholdValue(value) {
    this.setState({ thresholdValue: value });
  }

  updateSortedOfficerIds(officerIds) {
    this.setState({ sortedOfficerIds: officerIds });
  }

  renderPreviewPane() {
    const {
      networkPreviewPaneData,
      changeNetworkTab,
      currentNetworkTab,
      showTimelineTab,
      location,
      onTrackingAttachment,
      updateSelectedCrid,
    } = this.props;

    const { sortedOfficerIds } = this.state;

    if (!isEmpty(networkPreviewPaneData)) {
      return (
        <PreviewPane
          { ...networkPreviewPaneData }
          location={ location }
          onTrackingAttachment={ onTrackingAttachment }
          updateSelectedCrid={ updateSelectedCrid }
        />
      );
    } else {
      return (
        <RightPaneSection
          changeNetworkTab={ changeNetworkTab }
          currentTab={ currentNetworkTab }
          showTimelineTab={ showTimelineTab }
          location={ location }
          sortedOfficerIds={ sortedOfficerIds }
        />
      );
    }
  }

  render() {
    const { title, currentMainTab, changeMainTab, pinboardId, } = this.props;
    const { complaintOrigin } = this.state;

    return (
      <div className={ styles.networkGraph }>
        <div className='left-section'>
          {
            pinboardId && (
              <a className='back-to-pinboard-link' href={ `/pinboard/${pinboardId}/` }>← Back to pinboard</a>
            )
          }
          <MainTabs changeTab={ changeMainTab } currentTab={ currentMainTab }/>
          <div className='social-graph-title'>{ title }</div>
          <div className='coaccusals-threshold-slider-container'>
            <p className='coaccusals-threshold-text'>Minimum Coaccusal Threshold</p>
            <Slider
              step={ 1 }
              min={ 1 }
              max={ 4 }
              defaultValue={ 2 }
              value={ this.state.thresholdValue }
              onChange={ this.handleChangeThresholdValue }
              className={ cx(sliderStyles.slider, 'coaccusals-threshold-slider') }
            />
          </div>
          <div className='complaint-origin'>
            <div className='complaint-origin-label'>
              Complaint Origin
            </div>
            {
              COMPLAINT_ORIGIN_VALUES.map(complaintOriginValue => {
                const uniqKey = `complaint-origin-${complaintOriginValue.toLowerCase()}`;
                return (
                  <div
                    className={
                      cx('complaint-origin-option-container', uniqKey)
                    }
                    key={ uniqKey }
                  >
                    <a
                      className={
                        cx('complaint-origin-option', { 'selected': complaintOrigin === complaintOriginValue })
                      }
                      onClick={ () => {
                        this.handleSelectComplaintOrigin(complaintOriginValue);
                      } }
                    >
                      { startCase(toLower(complaintOriginValue)) }
                    </a>
                  </div>
                );
              })
            }
          </div>

        </div>
        <div className='graph-container'>
          <AnimatedSocialGraphContainer updateSortedOfficerIds={ this.updateSortedOfficerIds } />
        </div>
        <div className='right-section'>
          {
            this.renderPreviewPane()
          }
        </div>
        <div className='clearfix'/>
      </div>
    );
  }
}

NetworkGraph.propTypes = {
  requestSocialGraphNetwork: PropTypes.func,
  requestSocialGraphAllegations: PropTypes.func,
  requestSocialGraphOfficers: PropTypes.func,
  officerIds: PropTypes.string,
  unitId: PropTypes.string,
  pinboardId: PropTypes.string,
  title: PropTypes.string,
  changeNetworkTab: PropTypes.func,
  changeMainTab: PropTypes.func,
  showTimelineTab: PropTypes.bool,
  currentMainTab: PropTypes.string,
  currentNetworkTab: PropTypes.string,
  selectedOfficerId: PropTypes.number,
  selectedEdge: PropTypes.object,
  updateSelectedOfficerId: PropTypes.func,
  updateSelectedEdge: PropTypes.func,
  location: PropTypes.object,
  networkPreviewPaneData: PropTypes.object,
  onTrackingAttachment: PropTypes.func,
  updateSelectedCrid: PropTypes.func,
  selectedCrid: PropTypes.string,
};

NetworkGraph.defaultProps = {
  requestSocialGraphNetwork: noop,
  requestSocialGraphAllegations: noop,
  requestSocialGraphOfficers: noop,
  updateSelectedOfficerId: noop,
  updateSelectedEdge: noop,
  updateSelectedCrid: noop,
};
