const CreditNetwork = artifacts.require("./CreditNetwork.sol");

contract('CreditNetwork', function([A, B, C, D, E, F, G]) {
    it("Check if we can add a node", async function() {
        let CreditNet = await CreditNetwork.deployed();

        var addNodeGasCost = await CreditNet.addNode.estimateGas({ from: A });
        console.log("AddNode: ", addNodeGasCost);

        await CreditNet.addNode({ from: A });
        await CreditNet.addNode({ from: B });
        await CreditNet.addNode({ from: C });
        await CreditNet.addNode({ from: D });
        await CreditNet.addNode({ from: E });
        await CreditNet.addNode({ from: F });
        await CreditNet.addNode({ from: G });

        var createLinkGasCost = await CreditNet.createLink.estimateGas(1, A, 100, true, 1, { from: B });
        console.log("CreateLink: ", createLinkGasCost);

        await CreditNet.createLink(1, A, 100, true, 1, { from: B });
        await CreditNet.createLink(1, B, 100, true, 1, { from: C });
        await CreditNet.createLink(1, C, 100, true, 1, { from: D });
        await CreditNet.createLink(1, D, 100, true, 1, { from: E });
        await CreditNet.createLink(1, E, 100, true, 1, { from: F });
        await CreditNet.createLink(1, F, 100, true, 1, { from: G });

        let linkAB = await CreditNet.viewLink(A, B, 1);
        let linkBC = await CreditNet.viewLink(B, C, 1);
        let linkCD = await CreditNet.viewLink(C, D, 1);
        let linkDE = await CreditNet.viewLink(D, E, 1);
        let linkEF = await CreditNet.viewLink(E, F, 1);
        let linkFG = await CreditNet.viewLink(F, G, 1);

        var updateLinkGasCost = await CreditNet.updateLink.estimateGas(linkAB, 100, true, 1, { from: A });
        console.log("UpdateLink: ", updateLinkGasCost);

        await CreditNet.updateLink(linkAB, 100, true, 1, { from: A });
        await CreditNet.updateLink(linkBC, 100, true, 1, { from: B });
        await CreditNet.updateLink(linkCD, 100, true, 1, { from: C });
        await CreditNet.updateLink(linkDE, 100, true, 1, { from: D });
        await CreditNet.updateLink(linkEF, 100, true, 1, { from: E });
        await CreditNet.updateLink(linkFG, 100, true, 1, { from: F });

        var H0C0 = await CreditNet.creditNetworkPay.estimateGas(B, 10, [linkAB], [], [], [], { from: A });
        var H1C0 = await CreditNet.creditNetworkPay.estimateGas(C, 10, [linkAB, linkBC], [], [], [], { from: A });
        var H2C0 = await CreditNet.creditNetworkPay.estimateGas(D, 10, [linkAB, linkBC, linkCD], [], [], [], { from: A });
        var H3C0 = await CreditNet.creditNetworkPay.estimateGas(E, 10, [linkAB, linkBC, linkCD, linkDE], [], [], [], { from: A });
        var H4C0 = await CreditNet.creditNetworkPay.estimateGas(F, 10, [linkAB, linkBC, linkCD, linkDE, linkEF], [], [], [], { from: A });
        var H5C0 = await CreditNet.creditNetworkPay.estimateGas(G, 10, [linkAB, linkBC, linkCD, linkDE, linkEF, linkFG], [], [], [], { from: A });
        console.log("H0C0: ", H0C0);
        console.log("H1C0: ", H1C0);
        console.log("H2C0: ", H2C0);
        console.log("H3C0: ", H3C0);
        console.log("H4C0: ", H4C0);
        console.log("H5C0: ", H5C0);

        await CreditNet.createLink(2, A, 100, true, 1, { from: B });
        await CreditNet.createLink(2, B, 100, true, 1, { from: C });
        await CreditNet.createLink(2, C, 100, true, 1, { from: D });
        await CreditNet.createLink(2, D, 100, true, 1, { from: E });
        await CreditNet.createLink(2, E, 100, true, 1, { from: F });
        await CreditNet.createLink(2, F, 100, true, 1, { from: G });

        let ClinkAB = await CreditNet.viewLink(A, B, 2);
        let ClinkBC = await CreditNet.viewLink(B, C, 2);
        let ClinkCD = await CreditNet.viewLink(C, D, 2);
        let ClinkDE = await CreditNet.viewLink(D, E, 2);
        let ClinkEF = await CreditNet.viewLink(E, F, 2);
        let ClinkFG = await CreditNet.viewLink(F, G, 2);

        await CreditNet.updateLink(ClinkAB, 100, true, 1, { from: A });
        await CreditNet.updateLink(ClinkBC, 100, true, 1, { from: B });
        await CreditNet.updateLink(ClinkCD, 100, true, 1, { from: C });
        await CreditNet.updateLink(ClinkDE, 100, true, 1, { from: D });
        await CreditNet.updateLink(ClinkEF, 100, true, 1, { from: E });
        await CreditNet.updateLink(ClinkFG, 100, true, 1, { from: F });

        var addOfferGasCost = await CreditNet.addOffer.estimateGas(linkAB, ClinkBC, 1, 1, { from: B });
        console.log("AddOffer: ", addOfferGasCost);
        await CreditNet.addOffer(linkAB, ClinkBC, 1, 1, { from: B });
        let OfferB = await CreditNet.getOfferBy(B, linkAB, ClinkBC);
        var cancelOfferGasCost = await CreditNet.cancelOffer.estimateGas(OfferB, { from: B });
        console.log("CancelOffer: ", cancelOfferGasCost);
        await CreditNet.cancelOffer(OfferB, { from: B });

        await CreditNet.addOffer(linkAB, ClinkBC, 1, 1, { from: B });
        await CreditNet.addOffer(linkBC, ClinkCD, 1, 1, { from: C });
        await CreditNet.addOffer(linkCD, ClinkDE, 1, 1, { from: D });
        await CreditNet.addOffer(linkDE, ClinkEF, 1, 1, { from: E });
        await CreditNet.addOffer(linkEF, ClinkFG, 1, 1, { from: F });

        var H1C1 = await CreditNet.creditNetworkPay.estimateGas(C, 10, [linkAB, ClinkBC], [], [], [], { from: A });
        var H2C1 = await CreditNet.creditNetworkPay.estimateGas(D, 10, [linkAB, ClinkBC, ClinkCD], [], [], [], { from: A });
        var H3C1 = await CreditNet.creditNetworkPay.estimateGas(E, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE], [], [], [], { from: A });
        var H4C1 = await CreditNet.creditNetworkPay.estimateGas(F, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE, ClinkEF], [], [], [], { from: A });
        var H5C1 = await CreditNet.creditNetworkPay.estimateGas(G, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE, ClinkEF, ClinkFG], [], [], [], { from: A });

        console.log("H1C1: ", H1C1);
        console.log("H2C1: ", H2C1);
        console.log("H3C1: ", H3C1);
        console.log("H4C1: ", H4C1);
        console.log("H5C1: ", H5C1);
    });
})