var TransitiveNetwork = artifacts.require("./TransitiveNetwork.sol");

module.exports = function(deployer) {
    deployer.deploy(TransitiveNetwork);
};
