import React, { PropTypes } from 'react';

export default class MedalFilterButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false
    };
  }

  componentWillReceiveProps(props) {
    const {
      clearActive
    } = props;

    if (clearActive) {
      this.setState({ active: false });
    }
  }

  buttonClick = () => {
    let {
      active
    } = this.state;

    const {
      onClick
    } = this.props;

    active = !active;
    this.setState({ active }, () => onClick(active));
  }

  render() {
    const {
      active
    } = this.state;

    const {
      baseClass,
      children
    } = this.props;

    let className = baseClass;
    if (active) {
      className += ' active';
    }

    return (
      <button type="button" {...{ className }} onClick={this.buttonClick}>
        { children }
      </button>
    );
  }
}

MedalFilterButton.propTypes = {
  baseClass: PropTypes.string,
  children: React.PropTypes.element.isRequired,
  clearActive: React.PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

MedalFilterButton.defaultProps = {
  baseClass: 'btn btn-default'
};

