require("dotenv").config();
const { Resolver } = require("did-resolver");
const { getResolver } = require("ethr-did-resolver");

// 📌 Replace this with the DID you want to resolve:
const didToResolve = "did:ethr:sepolia:0xF6b15d6e91f1dFb0063C7666DF3aF93877071348";

//const INFURA_KEY = process.env.INFURA_KEY;
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

//const rpcUrl = `https://sepolia.infura.io/v3/${INFURA_KEY}`;
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`;

// Official ethr-did-registry address on Sepolia
const registryAddress = "0x03d5003bf0e79C5F5223588F347ebA39AfbC3818";

const providerConfig = {
    networks: [
        {
            name: "sepolia",
            rpcUrl: rpcUrl,
            registry: registryAddress
        },
    ],
};

const resolver = new Resolver(getResolver(providerConfig));

async function resolveDID() {
    try {
        const result = await resolver.resolve(didToResolve);
        console.log("✅ DID Document:");
        console.log(JSON.stringify(result.didDocument, null, 2));
    } catch (err) {
        console.error("❌ Error resolving DID:", err);
    }
}

resolveDID();
