const TransitiveNetwork = artifacts.require("./TransitiveNetwork.sol");

contract('TransitiveNetwork', function([A, B, C, D, E, F, G]) {
    it("Check if we can add a node", async function() {
        let TransitiveNet = await TransitiveNetwork.deployed();

        var addNodeGasCost = await TransitiveNet.addNode.estimateGas({ from: A });
        console.log("AddNode: ", addNodeGasCost);

        await TransitiveNet.addNode({ from: A });
        await TransitiveNet.addNode({ from: B });
        await TransitiveNet.addNode({ from: C });
        await TransitiveNet.addNode({ from: D });
        await TransitiveNet.addNode({ from: E });
        await TransitiveNet.addNode({ from: F });
        await TransitiveNet.addNode({ from: G });

        var createLinkGasCost = await TransitiveNet.createLink.estimateGas(1, A, 100, true, 1, { from: B });
        console.log("CreateLink: ", createLinkGasCost);

        await TransitiveNet.createLink(1, A, 100, true, 1, { from: B });
        await TransitiveNet.createLink(1, B, 100, true, 1, { from: C });
        await TransitiveNet.createLink(1, C, 100, true, 1, { from: D });
        await TransitiveNet.createLink(1, D, 100, true, 1, { from: E });
        await TransitiveNet.createLink(1, E, 100, true, 1, { from: F });
        await TransitiveNet.createLink(1, F, 100, true, 1, { from: G });

        let linkAB = await TransitiveNet.viewLink(A, B, 1);
        let linkBC = await TransitiveNet.viewLink(B, C, 1);
        let linkCD = await TransitiveNet.viewLink(C, D, 1);
        let linkDE = await TransitiveNet.viewLink(D, E, 1);
        let linkEF = await TransitiveNet.viewLink(E, F, 1);
        let linkFG = await TransitiveNet.viewLink(F, G, 1);

        var updateLinkGasCost = await TransitiveNet.updateLink.estimateGas(linkAB, 100, true, 1, { from: A });
        console.log("UpdateLink: ", updateLinkGasCost);

        await TransitiveNet.updateLink(linkAB, 100, true, 1, { from: A });
        await TransitiveNet.updateLink(linkBC, 100, true, 1, { from: B });
        await TransitiveNet.updateLink(linkCD, 100, true, 1, { from: C });
        await TransitiveNet.updateLink(linkDE, 100, true, 1, { from: D });
        await TransitiveNet.updateLink(linkEF, 100, true, 1, { from: E });
        await TransitiveNet.updateLink(linkFG, 100, true, 1, { from: F });

        var H0C0 = await TransitiveNet.creditNetworkPay.estimateGas(B, 10, [linkAB], [], [], [], { from: A });
        var H1C0 = await TransitiveNet.creditNetworkPay.estimateGas(C, 10, [linkAB, linkBC], [], [], [], { from: A });
        var H2C0 = await TransitiveNet.creditNetworkPay.estimateGas(D, 10, [linkAB, linkBC, linkCD], [], [], [], { from: A });
        var H3C0 = await TransitiveNet.creditNetworkPay.estimateGas(E, 10, [linkAB, linkBC, linkCD, linkDE], [], [], [], { from: A });
        var H4C0 = await TransitiveNet.creditNetworkPay.estimateGas(F, 10, [linkAB, linkBC, linkCD, linkDE, linkEF], [], [], [], { from: A });
        var H5C0 = await TransitiveNet.creditNetworkPay.estimateGas(G, 10, [linkAB, linkBC, linkCD, linkDE, linkEF, linkFG], [], [], [], { from: A });
        console.log("H0C0: ", H0C0);
        console.log("H1C0: ", H1C0);
        console.log("H2C0: ", H2C0);
        console.log("H3C0: ", H3C0);
        console.log("H4C0: ", H4C0);
        console.log("H5C0: ", H5C0);

        await TransitiveNet.createLink(2, A, 100, true, 1, { from: B });
        await TransitiveNet.createLink(2, B, 100, true, 1, { from: C });
        await TransitiveNet.createLink(2, C, 100, true, 1, { from: D });
        await TransitiveNet.createLink(2, D, 100, true, 1, { from: E });
        await TransitiveNet.createLink(2, E, 100, true, 1, { from: F });
        await TransitiveNet.createLink(2, F, 100, true, 1, { from: G });

        let ClinkAB = await TransitiveNet.viewLink(A, B, 2);
        let ClinkBC = await TransitiveNet.viewLink(B, C, 2);
        let ClinkCD = await TransitiveNet.viewLink(C, D, 2);
        let ClinkDE = await TransitiveNet.viewLink(D, E, 2);
        let ClinkEF = await TransitiveNet.viewLink(E, F, 2);
        let ClinkFG = await TransitiveNet.viewLink(F, G, 2);

        await TransitiveNet.updateLink(ClinkAB, 100, true, 1, { from: A });
        await TransitiveNet.updateLink(ClinkBC, 100, true, 1, { from: B });
        await TransitiveNet.updateLink(ClinkCD, 100, true, 1, { from: C });
        await TransitiveNet.updateLink(ClinkDE, 100, true, 1, { from: D });
        await TransitiveNet.updateLink(ClinkEF, 100, true, 1, { from: E });
        await TransitiveNet.updateLink(ClinkFG, 100, true, 1, { from: F });

        var addOfferGasCost = await TransitiveNet.addOffer.estimateGas(linkAB, ClinkBC, 1, 1, { from: B });
        console.log("AddOffer: ", addOfferGasCost);
        await TransitiveNet.addOffer(linkAB, ClinkBC, 1, 1, { from: B });
        let OfferB = await TransitiveNet.getOfferBy(B, linkAB, ClinkBC);
        var cancelOfferGasCost = await TransitiveNet.cancelOffer.estimateGas(OfferB, { from: B });
        console.log("CancelOffer: ", cancelOfferGasCost);
        await TransitiveNet.cancelOffer(OfferB, { from: B });

        await TransitiveNet.addOffer(linkAB, ClinkBC, 1, 1, { from: B });
        await TransitiveNet.addOffer(linkBC, ClinkCD, 1, 1, { from: C });
        await TransitiveNet.addOffer(linkCD, ClinkDE, 1, 1, { from: D });
        await TransitiveNet.addOffer(linkDE, ClinkEF, 1, 1, { from: E });
        await TransitiveNet.addOffer(linkEF, ClinkFG, 1, 1, { from: F });

        var H1C1 = await TransitiveNet.creditNetworkPay.estimateGas(C, 10, [linkAB, ClinkBC], [], [], [], { from: A });
        var H2C1 = await TransitiveNet.creditNetworkPay.estimateGas(D, 10, [linkAB, ClinkBC, ClinkCD], [], [], [], { from: A });
        var H3C1 = await TransitiveNet.creditNetworkPay.estimateGas(E, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE], [], [], [], { from: A });
        var H4C1 = await TransitiveNet.creditNetworkPay.estimateGas(F, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE, ClinkEF], [], [], [], { from: A });
        var H5C1 = await TransitiveNet.creditNetworkPay.estimateGas(G, 10, [linkAB, ClinkBC, ClinkCD, ClinkDE, ClinkEF, ClinkFG], [], [], [], { from: A });

        console.log("H1C1: ", H1C1);
        console.log("H2C1: ", H2C1);
        console.log("H3C1: ", H3C1);
        console.log("H4C1: ", H4C1);
        console.log("H5C1: ", H5C1);
    });
})
