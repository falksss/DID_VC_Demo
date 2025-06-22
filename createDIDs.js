require('dotenv').config();
const { ethers } = require("ethers");
const { EthrDID } = require("ethr-did");

//const INFURA_KEY = process.env.INFURA_KEY;

const ALCHEMY_KEY = process.env.ALCHEMY_KEY;
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const provider = new ethers.JsonRpcProvider(rpcUrl);

// Your private key from MetaMask
const universityKey = process.env.UNIVERSITY_PRIVATE_KEY;
const wallet = new ethers.Wallet(universityKey, provider);


const registryAddress = "0x03d5003bf0e79C5F5223588F347ebA39AfbC3818";
// Instantiate DID
const did = new EthrDID({
    identifier: wallet.address,
    privateKey: universityKey,
    provider,
    chainNameOrId: 'sepolia',
    rpcUrl: rpcUrl,
    registry: registryAddress
});

// Publish an attribute to Sepolia (e.g., public profile)
async function registerDIDAttribute() {
    const txHash = await did.setAttribute(
        'did/pub/Ed25519/veriKey/base64',
        Buffer.from('dummyvalue').toString('base64'),
        86400 // valid for 1 day
    );

    console.log("✅ Attribute set on-chain. TX hash:", txHash);
    console.log("🔗 View it on: https://sepolia.etherscan.io/tx/" + txHash);
}

registerDIDAttribute();
