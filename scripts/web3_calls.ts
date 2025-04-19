import {SuiClient, getFullnodeUrl} from"@mysten/sui/client";
import {fromBase64} from "@mysten/sui/utils";
import {Ed25519KeyPair} from "@mysten/sui/keypairs/ed25519";


const client = new SuiClient({
    url: getFullnodeUrl("devnet")
});

const priKey = "AFDLx/fuqv6Wjr9PsRrYXlLPJLx5MMVkYmZLuIHvH216"
const privKeyArr = Array.from(fromBase64(priKey));
const scheme = privKeyArr.shift();
const keypair = Ed2
if(scheme === 0){

}
console.log(privKeyArr, privKeyArr.length);

const read_chain = async ()=>{
    const response = await client.getOwnedObjects({
        owner: ""
    })
}