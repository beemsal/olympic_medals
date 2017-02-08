import React from 'react';
import assert from 'assert';
import {
  GOLD,
  SILVER,
  BRONZE,
  MedalListContainer
} from '../app/MedalListContainer';

describe('MedalListContainer', function() {

  const MEDAL_WINNERS = [
    {
      "athlete": "KOGO, Micah",
      "country": "KEN",
      "sex": "Men",
      "event": "10000m",
      "medal": "Bronze"
    },
    {
      "athlete": "BEKELE, Kenenisa",
      "country": "ETH",
      "sex": "Men",
      "event": "10000m",
      "medal": "Gold"
    },
    {
      "athlete": "SIHINE, Sileshi",
      "country": "ETH",
      "sex": "Men",
      "event": "10000m",
      "medal": "Silver"
    },
    {
      "athlete": "FLANAGAN, Shalane",
      "country": "USA",
      "sex": "Women",
      "event": "10000m",
      "medal": "Bronze"
    },
    {
      "athlete": "DIBABA, Tirunesh",
      "country": "ETH",
      "sex": "Women",
      "event": "10000m",
      "medal": "Gold"
    },
    {
      "athlete": "DIX, Walter",
      "country": "USA",
      "sex": "Men",
      "event": "100m",
      "medal": "Bronze"
    }
  ];

  it('aggregates and sorts a list of medal winners', function() {
    const component = new MedalListContainer();
    const medalDetails = component.aggregateMedals(MEDAL_WINNERS);

    assert.equal(Object.keys(medalDetails).length, 3, "There should be three entries in the object.");

    const medals = component.sortMedals(medalDetails);
    const eth_medals = medals[0];
    const ken_medals = medals.pop();

    // confirm sort order
    assert.equal(eth_medals.country, "ETH", "there should be three medals for ETH at the top of the list");
    assert.equal(eth_medals.total, 3, "there should be three medals for ETH at the top of the list");
    assert.equal(eth_medals[GOLD], 2, "there should be two gold medals for ETH at the top of the list");
    assert.equal(eth_medals[SILVER], 1, "there should be one silver medal for ETH at the top of the list");
    assert.equal(eth_medals[BRONZE], 0, "there should be zero bronze medals for ETH at the top of the list");

    assert.equal(ken_medals.country, "KEN", "there should be medals for KEN at the bottom of the list");
    assert.equal(ken_medals.total, 1, "there should be one medal for KEN at the bottom of the list");
    assert.equal(ken_medals[GOLD], 0, "there should be zero gold medals for ETH at the top of the list");
    assert.equal(ken_medals[SILVER], 0, "there should be zero silver medals for ETH at the top of the list");
    assert.equal(ken_medals[BRONZE], 1, "there should be one bronze medal for ETH at the top of the list");
  })
});



