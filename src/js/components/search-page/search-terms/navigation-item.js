import React, { PropTypes, Component } from 'react';

import Hoverable from 'components/common/higher-order/hoverable';
import { itemStyle } from './navigation-item.style';


class NavigationItem extends Component {
  render() {
    const { text, hovering, onClick } = this.props;
    return (
      <span
        style={ itemStyle(hovering) }
        key={ text }
        onClick={ onClick }>
        { text }
      </span>
    );
  }
}

NavigationItem.propTypes = {
  text: PropTypes.string,
  hovering: PropTypes.bool,
  onClick: PropTypes.func
};

export default Hoverable(NavigationItem);
