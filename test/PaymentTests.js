const TransitiveNetwork = artifacts.require("./TransitiveNetwork.sol");
var linkAB;
contract('TransitiveNetwork', function(accounts) {
    it("Single Link Payment", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        try {
            await instance.addNode({ from: A });
            await instance.addNode({ from: B });
            await instance.createLink(1, A, 100, true, 1, { from: B });
            linkAB = await instance.viewLink(A, B, 1);
            await instance.updateLink(linkAB, 100, true, 1, { from: A });
        } catch (error) { throw error; }
        try {
            await instance.creditNetworkPay(B, 2, [linkAB], [], [], [], { from: A });
        } catch (error) {
            assert.fail("Payment failed");
        }
    });

    it("Verifying correctness of Single link Payment", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];

        let linkABInfoBefore = await instance.linkInfo(linkAB);
        try {
            await instance.creditNetworkPay(B, 5, [linkAB], [], [], [], { from: A });
        } catch (error) {}
        let linkABInfoAfter = await instance.linkInfo(linkAB);
        assert.equal(linkABInfoBefore[2].toNumber() + 5, linkABInfoAfter[2].toNumber(), "Link Value Updated Correctly");
    });

    it("If Ripple Flags are respected", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        try {
            await instance.updateLink(linkAB, 100, false, 1, { from: A });
        } catch (error) { throw error; }
        try {
            await instance.creditNetworkPay(A, 5, [linkAB], [], [], [], { from: B });
            assert.fail("A->B link; Pay B->A with A rippling flag disabled fails");
        } catch (error) {}
        try {
            await instance.updateLink(linkAB, 100, false, 1, { from: B });
        } catch (error) { throw error; }
        try {
            await instance.creditNetworkPay(B, 5, [linkAB], [], [], [], { from: A });
            assert.fail("A->B link; Pay A->B with B rippling flag disabled fails");
        } catch (error) {}
        await instance.updateLink(linkAB, 100, true, 1, { from: B });
        await instance.updateLink(linkAB, 100, true, 1, { from: A });
    });

    it("Three Link Payment Single Currency", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];
        D = accounts[3];

        var linkBC, linkCD;
        try {

            await instance.addNode({ from: C });
            await instance.addNode({ from: D });

            await instance.createLink(1, B, 100, true, 1, { from: C });
            await instance.createLink(1, C, 100, true, 1, { from: D });

            linkBC = await instance.viewLink(B, C, 1);
            linkCD = await instance.viewLink(C, D, 1);

            await instance.updateLink(linkBC, 100, true, 1, { from: B });
            await instance.updateLink(linkCD, 100, true, 1, { from: C });
        } catch (error) {
            throw error;
        }
        try {
            await instance.creditNetworkPay(D, 10, [linkAB, linkBC, linkCD], [], [], [], { from: A });
        } catch (error) {
            assert.fail("Three Link Payment failed");
        }
    });

    it("Verifying correctness of three link payment", async function() {
        let instance = await TransitiveNetwork.deployed();

        A = accounts[0];
        B = accounts[1];
        C = accounts[2];
        D = accounts[3];

        try {
            let linkBC = await instance.viewLink(B, C, 1);
            let linkCD = await instance.viewLink(C, D, 1);

            let linkABInfoBefore = await instance.linkInfo(linkAB);
            let linkBCInfoBefore = await instance.linkInfo(linkBC);
            let linkCDInfoBefore = await instance.linkInfo(linkCD);

            await instance.creditNetworkPay(D, 10, [linkAB, linkBC, linkCD], [], [], [], { from: A });

            let linkABInfoAfter = await instance.linkInfo(linkAB);
            let linkBCInfoAfter = await instance.linkInfo(linkBC);
            let linkCDInfoAfter = await instance.linkInfo(linkCD);

            var total = 10;
            assert.equal(linkABInfoBefore[2].toNumber() + total, linkABInfoAfter[2].toNumber());
            total -= linkABInfoBefore[6].toNumber();
            assert.equal(linkBCInfoBefore[2].toNumber() + total, linkBCInfoAfter[2].toNumber());
            total -= linkBCInfoBefore[6].toNumber();
            assert.equal(linkCDInfoBefore[2].toNumber() + total, linkCDInfoAfter[2].toNumber());
        } catch (error) {
            throw error;
        }

    });

    it("if we can use any direction of the link", async function() {
        let instance = await TransitiveNetwork.deployed();
        try {
            let linkBC = await instance.viewLink(B, C, 1);
            let linkCD = await instance.viewLink(C, D, 1);

            let linkABInfoBefore = await instance.linkInfo(linkAB);
            let linkBCInfoBefore = await instance.linkInfo(linkBC);
            let linkCDInfoBefore = await instance.linkInfo(linkCD);

            await instance.creditNetworkPay(A, 10, [linkCD, linkBC, linkAB], [], [], [], { from: D });

            let linkABInfoAfter = await instance.linkInfo(linkAB);
            let linkBCInfoAfter = await instance.linkInfo(linkBC);
            let linkCDInfoAfter = await instance.linkInfo(linkCD);

            var total = 10;
            assert.equal(linkCDInfoBefore[2].toNumber() - total, linkCDInfoAfter[2].toNumber());
            total -= linkCDInfoBefore[7].toNumber();
            assert.equal(linkBCInfoBefore[2].toNumber() - total, linkBCInfoAfter[2].toNumber());
            total -= linkBCInfoBefore[7].toNumber();
            assert.equal(linkABInfoBefore[2].toNumber() - total, linkABInfoAfter[2].toNumber());
        } catch (error) {
            assert.fail("We should be able to use the links in reverse");
        }
    });

    it("Cross Currency Single Conversion Payment", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];

        try {
            await instance.createLink(2, B, 100, true, 1, { from: C });
            let XlinkBC = await instance.viewLink(B, C, 2);
            await instance.updateLink(XlinkBC, 100, true, 1, { from: B });
            await instance.addOffer(linkAB, XlinkBC, 1, 1, { from: B });
            await instance.creditNetworkPay(C, 10, [linkAB, XlinkBC], [], [], [], { from: A });
        } catch (error) {
            assert.fail("Cross Currency Single Conversion Payment failed");
        }
    });

    it("Cross Currency Three Conversion Payment", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];
        D = accounts[3];
        E = accounts[4];

        try {
            await instance.addNode({ from: E });
            await instance.createLink(3, C, 100, true, 1, { from: D });
            await instance.createLink(4, D, 100, true, 1, { from: E });

            let linkBC = await instance.viewLink(B, C, 2);
            let linkCD = await instance.viewLink(C, D, 3);
            let linkDE = await instance.viewLink(D, E, 4);

            await instance.updateLink(linkCD, 100, true, 1, { from: C });
            await instance.updateLink(linkDE, 100, true, 1, { from: D });

            await instance.addOffer(linkBC, linkCD, 1, 1, { from: C });
            await instance.addOffer(linkCD, linkDE, 1, 1, { from: D });

            await instance.creditNetworkPay(E, 10, [linkAB, linkBC, linkCD, linkDE], [], [], [], { from: A });
        } catch (error) {
            throw error;
            '['
        }
    });

    it("Cancel offer in a cross currency Payment must fail", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];
        D = accounts[3];
        E = accounts[4];

        var linkBC, linkCD, linkDE;
        try {
            linkBC = await instance.viewLink(B, C, 2);
            linkCD = await instance.viewLink(C, D, 3);
            linkDE = await instance.viewLink(D, E, 4);

            let offerDE = await instance.getOfferBy(D, linkCD, linkDE);
            await instance.cancelOffer(offerDE, { from: D });
        } catch (error) {
            throw error;
        }
        try {
            await instance.creditNetworkPay(E, 10, [linkAB, linkBC, linkCD, linkDE], [], [], [], { from: A });
        } catch (error) {
            return true;
        }
        assert.fail("Payment should not have succeeded");
    });

    it("Payment with integer values flowing with rational conversion rates", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];

        try {
            let linkBC = await instance.viewLink(B, C, 2);
            let offerB = await instance.getOfferBy(B, linkAB, linkBC);
            await instance.cancelOffer(offerB, { from: B });
            await instance.addOffer(linkAB, linkBC, 6, 7, { from: B });
            // 6 units of cur 1 is equal to 7 units in cur 2
            let linkABInfoBefore = await instance.linkInfo(linkAB);
            let linkBCInfoBefore = await instance.linkInfo(linkBC);

            await instance.creditNetworkPay(C, 20, [linkAB, linkBC], [], [], [], { from: A });

            let linkABInfoAfter = await instance.linkInfo(linkAB);
            let linkBCInfoAfter = await instance.linkInfo(linkBC);

            assert.equal(linkABInfoBefore[2].toNumber() + 20, linkABInfoAfter[2].toNumber(), "Input Link Updation failed");
            assert.equal(linkBCInfoBefore[2].toNumber() + 22, linkBCInfoAfter[2].toNumber(), "Output Link Updation failed");
        } catch (error) {
            throw error;
        }
    });
})
