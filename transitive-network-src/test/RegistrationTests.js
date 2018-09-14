const CreditNetwork = artifacts.require("./CreditNetwork.sol");

contract('CreditNetwork', function(accounts) {
    it("Register if not Registered", async function() {
        let instance = await CreditNetwork.deployed();
        A = accounts[0];
        try {
            let nodeStatus = await instance.checkNode.call(A);
            assert.equal(nodeStatus, false, "Unregistered nodes must return false when checked");
            await instance.addNode({ from: A });
            nodeStatus = await instance.checkNode.call(A);
            assert.equal(nodeStatus, true, "Node when checked must return true");
        } catch (error) {
            throw new Error("First registration should have succeeded");
        }

    });

    it("Fail Registration Second time", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        try {
            await instance.addNode({ from: A });
        } catch (error) {
            return true;
        }
        throw new Error("Second Registration should not have succeeded");
    });
})