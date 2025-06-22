require("dotenv").config();
const { createVerifiableCredentialJwt } = require("did-jwt-vc");
const { EthrDID } = require("ethr-did");
const { ethers } = require("ethers");

const INFURA_KEY = process.env.INFURA_KEY;
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_KEY}`);

const registryAddress = "0x03d5003bf0e79C5F5223588F347ebA39AfbC3818";

const university = new EthrDID({
    identifier: new ethers.Wallet(process.env.UNIVERSITY_PRIVATE_KEY).address,
    privateKey: process.env.UNIVERSITY_PRIVATE_KEY,
    provider,
    chainNameOrId: 'sepolia',
    rpcUrl: `https://sepolia.infura.io/v3/${INFURA_KEY}`,
    registry: registryAddress
});

// Fake student DID
const student = new EthrDID({
    identifier: "0xa37A55FAa5A311D1E137Fc675b66D5FfbB0bECfe"
});


/*
async function issueVC() {
    const vcPayload = {
        sub: student.did,
        nbf: Math.floor(Date.now() / 1000),
        vc: {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            type: ["VerifiableCredential", "UniversityDegreeCredential"],
            credentialSubject: {
                id: student.did,
                degree: {
                    type: "BachelorDegree",
                    name: "BSc in Computer Science"
                }
            }
        }
    };

    const jwt = await createVerifiableCredentialJwt(vcPayload, university);
    console.log("\n🎫 Verifiable Credential JWT:\n", jwt);
}
*/

async function issueVC() {
    const vcPayload = {
        sub: student.did,
        nbf: Math.floor(Date.now() / 1000),
        vc: {
            "@context": ["https://www.w3.org/2018/credentials/v1"],
            type: ["VerifiableCredential", "UniversityDegreeCredential"],
            credentialSubject: {
                id: student.did,
                subject: {
                    name: "Seguretat en Xarxes (SX)", // Name of the subject
                    grade: "10", // Grade or result
                    date: "2025-05-29" // Date of passing
                }
            }
        }
    };

    const jwt = await createVerifiableCredentialJwt(vcPayload, university);
    console.log("\n🎫 Verifiable Credential JWT:\n", jwt);
}

issueVC();
