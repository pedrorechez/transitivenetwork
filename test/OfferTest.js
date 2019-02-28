const TransitiveNetwork = artifacts.require("./TransitiveNetwork.sol");
const curId1 = 1
const curId2 = 2

contract('TransitiveNetwork', function(accounts) {
    it("Add a new offer", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];

        await instance.addNode({ from: A });
        await instance.addNode({ from: B });
        await instance.addNode({ from: C });

        await instance.createLink(curId1, A, 100, true, 1, { from: B });
        await instance.createLink(curId2, B, 100, true, 1, { from: C });

        linkAB = await instance.viewLink(A, B, 1);
        linkBC = await instance.viewLink(B, C, 2);

        await instance.updateLink(linkAB, 0, true, 1, { from: A });
        await instance.updateLink(linkBC, 0, true, 1, { from: B });

        try {
            await instance.addOffer(linkAB, linkBC, 1, 1, { from: B });
        } catch (error) {
            throw error;
        }
    });

    it("Others cannot cancel", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];
        try {
            linkAB = await instance.viewLink(A, B, curId1);
            linkBC = await instance.viewLink(B, C, curId2);

            offerB = await instance.getOfferBy(B, linkAB, linkBC);
        } catch (error) {
            throw error;
        }
        try {
            await instance.cancelOffer(offerB, { from: A });
        } catch (error) {
            return true;
        }
        throw new Error("Only the owner must be allowed to cancel his offer");
    });

    it("Cancel an offer", async function() {
        let instance = await TransitiveNetwork.deployed();
        A = accounts[0];
        B = accounts[1];
        C = accounts[2];

        linkAB = await instance.viewLink(A, B, curId1);
        linkBC = await instance.viewLink(B, C, curId2);

        offerB = await instance.getOfferBy(B, linkAB, linkBC);
        try {
            await instance.cancelOffer(offerB, { from: B });
        } catch (error) {
            throw error;
        }
    });
})
