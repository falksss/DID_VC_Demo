require("dotenv").config();
const { verifyCredential } = require("did-jwt-vc");
const { Resolver } = require("did-resolver");
const { getResolver } = require("ethr-did-resolver");
const { ethers } = require("ethers");

//const INFURA_KEY = process.env.INFURA_KEY;
const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

//const rpcUrl = `https://sepolia.infura.io/v3/${INFURA_KEY}`;
const rpcUrl = `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_KEY}`;

const registryAddress = "0x03d5003bf0e79C5F5223588F347ebA39AfbC3818";

const providerConfig = {
    networks: [
        {
            name: 'sepolia',
            rpcUrl: rpcUrl,
            registry: registryAddress // Update this if using custom registry
        }
    ]
};

const didResolver = new Resolver(getResolver(providerConfig));

// Paste your JWT from previous step here
const jwt = "eyJhbGciOiJFUzI1NkstUiIsInR5cCI6IkpXVCJ9.eyJ2YyI6eyJAY29udGV4dCI6WyJodHRwczovL3d3dy53My5vcmcvMjAxOC9jcmVkZW50aWFscy92MSJdLCJ0eXBlIjpbIlZlcmlmaWFibGVDcmVkZW50aWFsIiwiVW5pdmVyc2l0eURlZ3JlZUNyZWRlbnRpYWwiXSwiY3JlZGVudGlhbFN1YmplY3QiOnsiaWQiOiJkaWQ6ZXRocjoweGEzN0E1NUZBYTVBMzExRDFFMTM3RmM2NzViNjZENUZmYkIwYkVDZmUiLCJzdWJqZWN0Ijp7Im5hbWUiOiJTZWd1cmV0YXQgZW4gWGFyeGVzIChTWCkiLCJncmFkZSI6IjEwIiwiZGF0ZSI6IjIwMjUtMDUtMjkifX19LCJzdWIiOiJkaWQ6ZXRocjoweGEzN0E1NUZBYTVBMzExRDFFMTM3RmM2NzViNjZENUZmYkIwYkVDZmUiLCJuYmYiOjE3NDg1NDk5MDQsImlzcyI6ImRpZDpldGhyOnNlcG9saWE6MHhGNmIxNWQ2ZTkxZjFkRmIwMDYzQzc2NjZERjNhRjkzODc3MDcxMzQ4In0.PTuVmm0G_0OpxT9D7AwicpeZPbIKFf900Dolh7Rm91Uw-1q-CLSUTFQnrmqlDGyRPqiZR4lgtOo4WY8SCJveCwE"; // replace with actual VC JWT

async function verify() {
    const result = await verifyCredential(jwt, didResolver);
    console.log("✅ Verified VC:", result.verifiableCredential);
}

verify();
