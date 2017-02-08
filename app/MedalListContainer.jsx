import React from 'react';
import fetch from 'isomorphic-fetch';

import MedalList from './MedalList';

export const GOLD = 'Gold';
export const SILVER = 'Silver';
export const BRONZE = 'Bronze';

export class MedalListContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      medalDetails: []
    };
  }

  /**
   * Request the medallist via a fetch request.
   *
   */
  componentWillMount() {
    fetch('./olympics_2008_medalists.json')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Bad response from server');
        }
        return response.json();
      })
      .then((medalList) => {
        const medalDetails = this.sortMedals(this.aggregateMedals(medalList));
        this.setState({ medalDetails });
      });
  }

  /**
   * Aggregate an medalList object into an
   * array of medal detail objects into
   * tallying the total number of medals won as well
   * as the number of gold, silver and bronze
   * medals individually.
   *
   * @param {array} - list of medal winners
   * @returns {object} - object of medal details indexed by country.
   */
  aggregateMedals = medalList => medalList.reduce((group, curr) => {
    const medalGroup = group;

    const {
      country,
      medal
    } = curr;

    if (!(country in medalGroup)) {
      medalGroup[country] = {
        [GOLD]: 0,
        [SILVER]: 0,
        [BRONZE]: 0,
        total: 0,
        country
      };
    }

    medalGroup[country][medal] += 1;
    medalGroup[country].total += 1;

    return medalGroup;
  }, {});

  /**
   * Sort medals by total medal count.
   *
   * @param {array} - medal detail objects
   * @returns {array} - array of medal details objects.
   */
  sortMedals = (medalDetails) => {
    const medals = [];

    Object.keys(medalDetails).forEach(k => medals.push(medalDetails[k]));

    medals.sort((a, b) => {
      if (a.total > b.total) {
        return -1;
      }

      if (a.total < b.total) {
        return 1;
      }

      return 0;
    });

    return medals;
  }

  render() {
    return (
      <div id="medal-list">
        <h1 className="title">2008 Olympic Medals by Country</h1>
        <MedalList {...this.state} />
      </div>
    );
  }
}
