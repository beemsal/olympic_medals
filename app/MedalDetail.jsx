import React, { PropTypes } from 'react';

import {
  GOLD,
  SILVER,
  BRONZE
} from './MedalListContainer';

const MedalDetail = ({ medalDetail }) => (
  <tr>
    <td className="country">{medalDetail.country}</td>
    <td className="total">{medalDetail.total}</td>
    <td className="gold">{medalDetail[GOLD]}</td>
    <td className="silver">{medalDetail[SILVER]}</td>
    <td className="bronze">{medalDetail[BRONZE]}</td>
  </tr>
);


MedalDetail.propTypes = {
  medalDetail: PropTypes.shape({
    country: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
  }).isRequired
};

export default MedalDetail;
