import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { map, isEqual, filter } from 'lodash';
import { scaleLinear } from 'd3-scale';
import memoize from 'memoize-one';

import Popup from 'components/common/popup';
import StaticRadarChart from 'components/common/radar-chart';
import RadarExplainer from './explainer';
import { hasEnoughRadarChartData } from 'utils/radar-chart';
import HoverableEditWrapper from 'components/inline-editable/hoverable-edit-wrapper';
import EditWrapperStateProvider from 'components/inline-editable/edit-wrapper-state-provider';
import RichTextEditable from 'components/inline-editable/editable-section/rich-text-editable';
import * as IntercomTracking from 'utils/intercom-tracking';
import * as tracking from 'utils/tracking';
import styles from './radar-chart.sass';
import { PrintModeContext } from 'contexts';


export default class AnimatedRadarChart extends Component {
  constructor(props, context) {
    super(props);
    this.interval = 20;
    this.velocity = 0.1;
    this.timer = null;

    const transitionValue = context.printMode ? Math.max(this.animatedData().length - 1, 0) : 0;
    this.state = {
      transitionValue: transitionValue,
      showExplainer: false,
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.data, prevProps.data)) {

      /* istanbul ignore next */
      if (this.timer) {
        this.stopTimer();
      }
      this.startTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }

  memoizeAnimatedData = memoize((data) => filter(data, item => hasEnoughRadarChartData(item.items)));

  animatedData() {
    const { data } = this.props;
    return this.memoizeAnimatedData(data);
  }

  openExplainer = () => {
    const { officerId } = this.props;

    tracking.trackOpenExplainer(officerId);
    IntercomTracking.trackOpenExplainer(officerId);

    this.endAnimation();
    this.setState({ showExplainer: true });
  };

  closeExplainer = () => {
    this.setState({ showExplainer: false });
    this.startAnimation();
  };

  animate = () => {
    const maxValue = this.animatedData().length - 1;
    this.setState({
      transitionValue: Math.min(this.state.transitionValue + this.velocity, maxValue),
    });
    if (this.state.transitionValue >= maxValue) {
      this.stopTimer();
    }
  };

  startTimer() {
    if (this.animatedData().length > 1 && !this.timer) {
      this.timer = setInterval(() => this.animate(), this.interval);
    }
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  getCurrentTransitionData = () => {
    const { transitionValue } = this.state;
    const animatedData = this.animatedData();

    if (animatedData.length < 2)
      return animatedData[0];

    const index = Math.min(Math.floor(transitionValue) + 1, animatedData.length - 1);

    const previousData = animatedData[index - 1].items;

    const color = scaleLinear()
      .domain([0, 1])
      .range([animatedData[index - 1].visualTokenBackground, animatedData[index].visualTokenBackground]);

    const backgroundColor = color(transitionValue - (index - 1));

    return {
      ...animatedData[index],
      items: map(animatedData[index].items, (d, i) => ({
        ...d,
        value: (d.value - previousData[i].value) * (transitionValue - (index - 1)) + previousData[i].value,
      })),
      visualTokenBackground: backgroundColor,
    };
  };

  startAnimation() {
    if (this.timer) {
      this.stopTimer();
    }

    this.setState({ transitionValue: 0 });
    this.startTimer();
  }

  endAnimation() {
    if (this.timer) {
      this.stopTimer();
    }
    const maxValue = this.animatedData().length - 1;
    this.setState({ transitionValue: maxValue });
    this.startTimer();
  }

  render() {
    const { transitionValue, showExplainer } = this.state;
    const {
      data,
      isRequesting,
      triangleEditWrapperStateProps,
      scaleEditWrapperStateProps,
      noDataRadarChartEditWrapperStateProps,
      noDataPopup,
    } = this.props;

    if (isRequesting)
      return <div className={ styles.radarChart }/>;

    const itemData = this.getCurrentTransitionData();
    if (itemData) {
      return (
        <div className={ styles.radarChart }>
          <div
            onClick={ this.openExplainer }
            className='officer-radar-chart-placeholder'
          >
            <StaticRadarChart
              textColor={ itemData.textColor }
              backgroundColor={ itemData.visualTokenBackground }
              fadeOutLegend={ transitionValue >= (this.animatedData().length - 1) }
              legendText={ itemData.year }
              data={ itemData.items }
              showSpineLinePoint={ true }
              showGrid={ true }
              gridOpacity={ 0.25 }
              showAxisTitle={ true }
              showValueWithSuffix={ true }
            />
            <div className='open-explainer-button no-print'>
              <span className='radar-chart-question-mark'>?</span>
            </div>
          </div>
          { showExplainer && (
            <div className='radar-chart-overlay'>
              <RadarExplainer
                closeExplainer={ this.closeExplainer }
                radarChartData={ data }
                triangleEditWrapperStateProps={ triangleEditWrapperStateProps }
                scaleEditWrapperStateProps={ scaleEditWrapperStateProps }
              />
            </div>
          )
          }
        </div>
      );
    } else {
      return (
        <div className={ styles.radarChart }>
          <StaticRadarChart/>
          <div className='no-data-radar-chart-text'>
            <EditWrapperStateProvider { ...noDataRadarChartEditWrapperStateProps }>
              <HoverableEditWrapper>
                <RichTextEditable
                  className='test--no-data-text'
                  placeholder='no data radar chart text'
                  fieldname='no_data_explain_text'
                  lastBlockChild={
                    noDataPopup && <Popup key='no-data-radar-chart' { ...noDataPopup } className='radar-chart-popup' />
                  }
                />
              </HoverableEditWrapper>
            </EditWrapperStateProvider>
          </div>
        </div>
      );
    }
  }
}

AnimatedRadarChart.contextType = PrintModeContext;

AnimatedRadarChart.propTypes = {
  officerId: PropTypes.number,
  data: PropTypes.array,
  isRequesting: PropTypes.bool,
  triangleEditWrapperStateProps: PropTypes.object,
  scaleEditWrapperStateProps: PropTypes.object,
  noDataRadarChartEditWrapperStateProps: PropTypes.object,
  noDataPopup: PropTypes.object,
};
