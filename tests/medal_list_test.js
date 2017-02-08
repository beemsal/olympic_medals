import React from 'react';
import assert from 'assert';
import {
  GOLD,
  SILVER,
  BRONZE,
} from '../app/MedalListContainer';
import MedalList from '../app/MedalList';

describe('MedalListContainer', function() {

  const MEDAL_DETAILS = [
    {
      "country": "USA",
      [GOLD]: 10,
      [SILVER]: 10,
      [BRONZE]: 10,
      "total": 30
    },
    {
      "country": "ETH",
      [GOLD]: 10,
      [SILVER]: 0,
      [BRONZE]: 10,
      "total": 20
    },
    {
      "country": "KEN",
      [GOLD]: 0,
      [SILVER]: 5,
      [BRONZE]: 0,
      "total": 5
    },
  ];

  it('filters list of medal winners', function() {
    const component = new MedalList();
    let filteredMedalDetails;

    // no filter
    filteredMedalDetails = component.getFilteredMedalDetails(MEDAL_DETAILS)
    assert.equal(filteredMedalDetails.length, 3);
    assert.deepEqual(filteredMedalDetails.reduce(function(group, current){
      group.push(current.country);
      return group;
    }, []), ['USA', 'ETH', 'KEN'])

    // gold
    component.state.filter = GOLD;
    filteredMedalDetails = component.getFilteredMedalDetails(MEDAL_DETAILS)
    assert.equal(filteredMedalDetails.length, 2);
    assert.deepEqual(filteredMedalDetails.reduce(function(group, current){
      group.push(current.country);
      return group;
    }, []), ['USA', 'ETH'])

    // silver
    component.state.filter = SILVER;
    filteredMedalDetails = component.getFilteredMedalDetails(MEDAL_DETAILS)
    assert.equal(filteredMedalDetails.length, 2);
    assert.deepEqual(filteredMedalDetails.reduce(function(group, current){
      group.push(current.country);
      return group;
    }, []), ['USA', 'KEN'])

    // bronze
    component.state.filter = BRONZE;
    filteredMedalDetails = component.getFilteredMedalDetails(MEDAL_DETAILS)
    assert.equal(filteredMedalDetails.length, 2);
    assert.deepEqual(filteredMedalDetails.reduce(function(group, current){
      group.push(current.country);
      return group;
    }, []), ['USA', 'ETH'])

  })
});