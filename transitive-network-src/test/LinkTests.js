const CreditNetwork = artifacts.require("./CreditNetwork.sol");
const fees = 1;
const curId = 1;
const ulim = 100;

contract('CreditNetwork', function(accounts) {
    it("Node Registration for Link creation", async function() {
        let instance = await CreditNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        try {
            await instance.createLink(curId, B, ulim, true, fees, { from: A });
        } catch (error) {
            try {
                await instance.createLink(curId, A, ulim, true, fees, { from: B });
            } catch (error) {
                return true;
            }
            throw new Error("Require the link origin to be registered");
        }
        throw new Error("Require the link terminal to be registered");
    });

    it("Create a Link", async function() {
        let instance = await CreditNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        try {
            await instance.addNode({ from: A });
            await instance.addNode({ from: B });
            await instance.createLink(curId, A, ulim, true, fees, { from: B });
        } catch (error) {
            console.log(error);
            throw new Error("First registration should have succeeded");
        }
    });

    it("Default link value sanity check", async function() {
        let instance = await CreditNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        try {
            let linkAB = await instance.viewLink(A, B, curId);
            let linkABInfo = await instance.linkInfo(linkAB);
            assert.equal(A, linkABInfo[0], "From Address must be correct");
            assert.equal(B, linkABInfo[1], "To Address must be correct");
            assert.equal(0, linkABInfo[2].toNumber(), "Current Value should always start from 0");
            assert.equal(ulim, linkABInfo[3].toNumber(), "Upper Limit is not correctly");
            assert.equal(true, (linkABInfo[4].toNumber() & 1) == 1, "Rippling To Bit Flag should be set");
            assert.equal(false, (linkABInfo[4].toNumber() & 2) == 2, "Default rippling flag must be false");
            assert.equal(0, linkABInfo[5].toNumber(), "Default unset fees must be zero");
            assert.equal(fees, linkABInfo[6].toNumber(), "Fees must be set properly");
            assert.equal(curId, linkABInfo[7].toNumber(), "CurrencyID should be 1");
        } catch (error) {
            throw error;
        }
    });

    it("Update a Link Value (Creator)", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        try {
            let linkAB = await instance.viewLink(A, B, curId);
            let linkABInfoBefore = await instance.linkInfo(linkAB);
            await instance.updateLink(linkAB, ulim * 2, false, fees * 2, { from: B });
            let linkABInfoAfter = await instance.linkInfo(linkAB);
            assert.equal(linkABInfoBefore[0], linkABInfoAfter[0], "From address has been changed");
            assert.equal(linkABInfoBefore[1], linkABInfoAfter[1], "To address has been changed");
            assert.equal(linkABInfoBefore[2].toNumber(), linkABInfoAfter[2].toNumber(), "Current Value must not be changed");
            assert.equal(linkABInfoAfter[3].toNumber(), ulim * 2, "Upper limit not updated correctly");
            assert.equal(linkABInfoBefore[4].toNumber() & 2, linkABInfoAfter[4].toNumber() & 2, "Do not change the rippling bit for From");
            console.log(((linkABInfoAfter[4].toNumber() & 1)));
            assert.equal(false, (linkABInfoAfter[4].toNumber() & 1) == 1, "Rippling flag must be disabled for To");
            assert.equal(linkABInfoBefore[5].toNumber(), linkABInfoAfter[5].toNumber(), "Do not change the fees for Link Origin");
            assert.equal(linkABInfoAfter[6].toNumber(), fees * 2, "Fees not updated properly");
            assert.equal(linkABInfoBefore[7].toNumber(), linkABInfoAfter[7].toNumber(), "Do not change the currency ID");
        } catch (error) {
            console.log(error);
            throw new Error("Updating the link for the Terminal Node failed");
        }
    });

    it("Update a Link Value (Origin)", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        try {
            let linkAB = await instance.viewLink(A, B, curId);
            let linkABInfoBefore = await instance.linkInfo(linkAB);
            await instance.updateLink(linkAB, ulim * 2, true, fees * 2, { from: A });
            let linkABInfoAfter = await instance.linkInfo(linkAB);
            assert.equal(linkABInfoBefore[0], linkABInfoAfter[0], "From address has been changed");
            assert.equal(linkABInfoBefore[1], linkABInfoAfter[1], "To address has been changed");
            assert.equal(linkABInfoBefore[2].toNumber(), linkABInfoAfter[2].toNumber(), "Current Value must not be changed");
            assert.equal(linkABInfoBefore[3].toNumber(), linkABInfoAfter[3].toNumber(), "Upper limit must not be updated");
            assert.equal(linkABInfoBefore[4].toNumber() & 1, linkABInfoAfter[4].toNumber() & 1, "Do not change the rippling bit for To");
            assert.equal(true, (linkABInfoAfter[4].toNumber() & 2) == 2, "Rippling flag must be enabled for From");
            assert.equal(fees * 2, linkABInfoAfter[5].toNumber(), "Fees not updated properly");
            assert.equal(linkABInfoBefore[6].toNumber(), linkABInfoAfter[6].toNumber(), "Do not change the fees for From");
            assert.equal(linkABInfoBefore[7].toNumber(), linkABInfoAfter[7].toNumber(), "Do not change the currency ID");
        } catch (error) {
            console.log(error);
            throw new Error("Updating the link for the Origin Node failed");
        }
    });

    it("Try Creating a Link a second time", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        try {
            await instance.createLink(curId, A, ulim, true, fees, { from: B });
        } catch (error) {
            return true;
        }
        throw new Error("CreateLink: duplicate links created");
    });

    it("Third person Link update", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        let C = accounts[2];
        try {
            let linkAB = await instance.viewLink(A, B, curId);
            await instance.updateLink(linkAB, ulim * 2, true, fees * 2, { from: C });
        } catch (error) {
            return true;
        }
        throw new Error("Third party must not be allowed to update links");
    });

    it("Self Links are not allowed", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        try {
            await instance.createLink(curId, A, ulim, true, fees, { from: A });
        } catch (error) {
            return true;
        }
        throw new Error("Self links must not be allowed");
    });

    it("CreateLink from the other direction is allowed", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        try {
            await instance.createLink(curId, B, ulim, true, fees, { from: A });
        } catch (error) {
            throw new Error("Link from A->B and B->A are two distinct links");
        }
    });

    it("Lowering of upperlimit below currentValue", async function() {
        let instance = await CreditNetwork.deployed();
        let A = accounts[0];
        let B = accounts[1];
        try {
            let linkAB = await instance.viewLink(A, B, curId);
            await instance.creditNetworkPay(B, 5, [linkAB], [], [], [], { from: A });
        } catch (error) {
            throw new Error("Payment failed");
        }
        try {
            await instance.updateLink(linkAB, 1, true, fees * 2, { from: B });
        } catch (error) {
            return true;
        }
        throw new Error("Upper limit lowered below current value");
    });
})