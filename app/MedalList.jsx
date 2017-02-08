import React, { PropTypes } from 'react';

import {
  GOLD,
  SILVER,
  BRONZE
} from './MedalListContainer';
import MedalDetail from './MedalDetail';
import MedalFilterButton from './MedalFilterButton';

export default class MedalList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: null
    };
  }

  /**
   * Set the filter based on the active status flag.
   * If not active, clear the filter.
   *
   * @param {boolen} - active flag
   * @param {string} - filter to set
   */
  setFilter = (active, filter) => {
    if (active) {
      this.setState({ filter });
      return;
    }

    this.setState({ filter: null });
  }

  /**
   * Filter the medal details list, showing only
   * those countries with one or more medals of type
   * filter.
   *
   * @param {array} - medalDetails
   * @returns {array} - filtered list
   */
  getFilteredMedalDetails = (medalDetails) => {
    const {
      filter
    } = this.state;

    if (!filter) {
      return medalDetails;
    }

    return medalDetails.filter(medalDetail => medalDetail[filter] > 0);
  }

  render() {
    const {
      filter
    } = this.state;

    const {
      medalDetails
    } = this.props;

    return (
      <div>
        <h4 className="pull-left">Show Countries With: </h4>
        <div className="pull-left btn-group medal-filter" role="group">
          <MedalFilterButton
            clearActive={filter !== GOLD}
            onClick={active => this.setFilter(active, GOLD)}
          >
            <div>
              <div className="medal gold" />
              <span className="medal-label">Gold</span>
            </div>
          </MedalFilterButton>
          <MedalFilterButton
            clearActive={filter !== SILVER}
            onClick={active => this.setFilter(active, SILVER)}
          >
            <div>
              <div className="medal silver" />
              <span className="medal-label">Silver</span>
            </div>
          </MedalFilterButton>
          <MedalFilterButton
            clearActive={filter !== BRONZE}
            onClick={active => this.setFilter(active, BRONZE)}
          >
            <div>
              <div className="medal bronze" />
              <span className="medal-label">Bronze</span>
            </div>
          </MedalFilterButton>
        </div>
        <table className="table table-condensed table-hover table-bordered">
          <thead>
            <tr>
              <th>Country</th>
              <th>Total Medals</th>
              <th><div className="medal gold" /><span className="medal-label">Gold</span></th>
              <th><div className="medal silver" /><span className="medal-label">Silver</span></th>
              <th><div className="medal bronze" /><span className="medal-label">Bronze</span></th>
            </tr>
          </thead>
          <tbody>
            { this.getFilteredMedalDetails(medalDetails).map(medalDetail =>
              <MedalDetail key={medalDetail.country} medalDetail={medalDetail} />
            ) }
          </tbody>
        </table>
      </div>
    );
  }
}

MedalList.propTypes = {
  medalDetails: PropTypes.arrayOf(PropTypes.shape({
    country: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  })).isRequired
};
