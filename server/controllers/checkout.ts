import BaseCtrl from './base';
import Advertisement from '../models/ads';
import Customer from '../models/customers';
import {el} from '@angular/platform-browser/testing/src/browser_util';
import RulesSchema from '../models/rules';
import {st} from '@angular/core/src/render3';

export let Checkout = (() => {
  let rules;
  let maxPremium, pricePremium, netPremium;
  let maxStandout, priceStandout, netStandout;
  let maxClassic, priceClassic, netClassic;


  function init(ruleList) {
    pricePremium = 394.99;
    priceStandout = 322.99;
    priceClassic = 269.99;
    rules = ruleList;
  }

  function add(adType, number) {
    if (adType === 'Premium') {
      maxPremium = netPremium = number;
    } else if (adType === 'Classic') {
      maxClassic = netClassic = number;
    } else if (adType === 'Standout') {
      maxStandout = netStandout = number;
    }
  }

  function total(): Number {

    if (netStandout > 0) {

      console.log('\n\n===========================================\n');
      console.log('Total Standout deals : ' + maxStandout + '\n');
      const standoutDeals = rules.filter((rule) => rule.type === 'DEAL' && rule.adType === 'Standout');
      if (standoutDeals.length > 0) {
        const deal = standoutDeals[0];
        console.log('Deal min  : ' + deal.min + '     Deal for : ' + deal.for);
        netStandout = (netStandout % deal.min) + (Math.floor(netStandout / deal.min) * deal.for);
      }

      const standoutDrops = rules.filter((rule) => rule.type === 'PRICE_DROP' && rule.adType === 'Standout');
      if (standoutDrops.length > 0) {
        const drop = standoutDrops[0];
        console.log('Drop min  : ' + drop.min + '     Price    : ' + drop.price);
        if (netStandout >= drop.min) {
          priceStandout = drop.price;
        }
      }

      console.log('Final Num : ' + netStandout + '     Price : ' + priceStandout + '\n');
    }

    if (netClassic > 0) {

      console.log('\n\n===========================================\n');
      console.log('Total Classic deals : ' + maxClassic + '\n');
      const classicDeals = rules.filter((rule) => rule.type === 'DEAL' && rule.adType === 'Classic');
      if (classicDeals.length > 0) {
        const deal = classicDeals[0];
        console.log('Deal min  : ' + deal.min + '     Deal for : ' + deal.for);
        netClassic = (netClassic % deal.min) + (Math.floor(netClassic / deal.min) * deal.for);
      }

      const classicDrops = rules.filter((rule) => rule.type === 'PRICE_DROP' && rule.adType === 'Classic');
      if (classicDrops.length > 0) {
        const drop = classicDrops[0];
        console.log('Drop min  : ' + drop.min + '     Price    : ' + drop.price);
        if (netClassic >= drop.min) {
          priceClassic = drop.price;
        }
      }

      console.log('Final Num : ' + netClassic + '     Price : ' + priceClassic + '\n');
    }

    if (netPremium > 0) {

      console.log('\n\n===========================================\n');
      console.log('Total Premium deals : ' + maxPremium + '\n');
      const premiumDeals = rules.filter((rule) => rule.type === 'DEAL' && rule.adType === 'Premium');
      if (premiumDeals.length > 0) {
        const deal = premiumDeals[0];
        console.log('Deal min  : ' + deal.min + '     Deal for : ' + deal.for);
        netPremium = (netPremium % deal.min) + (Math.floor(netPremium / deal.min) * deal.for);
      }

      const premiumDrops = rules.filter((rule) => rule.type === 'PRICE_DROP' && rule.adType === 'Premium');
      if (premiumDrops.length > 0) {
        const drop = premiumDrops[0];
        console.log('Drop min  : ' + drop.min + '     Price    : ' + drop.price);
        if (netPremium >= drop.min) {
          pricePremium = drop.price;
        }
      }

      console.log('Final Num : ' + netPremium + '     Price : ' + pricePremium + '\n');
    }

    console.log('\n\n===========================================\n');
    return (netPremium * pricePremium) + (netStandout * priceStandout) + (netClassic * priceClassic);
  }

  return {
    init: init,
    add: add,
    total: total
  };
})();
