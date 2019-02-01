var campaign = artifacts.require("./CampaignFactory.sol");
module.exports = function(deployer) {
   deployer.deploy(campaign);
};