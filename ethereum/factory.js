import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  '0x6528dda3065D4907715eE3BbA25E69c242B3FE59'
);

export default instance;
