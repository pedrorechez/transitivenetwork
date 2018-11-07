var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var CreditNetwork = artifacts.require("./transitive-network.sol");

module.exports = function(deployer) {
    deployer.deploy(TransitiveNetwork);
};
