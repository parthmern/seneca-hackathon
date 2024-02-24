import { Client, Account, Databases} from "appwrite" ;




const client = new Client();



client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('65d90fa2ebbe6879f698') // Your project ID
;


const database = new Databases(client);
const account = new Account(client); 

export {client, account, database};





// client.setEndpoint('https://cloud.appwrite.io/v1', '65d90fa2ebbe6879f698'); 
// 5981ec78c146f4fbe12470360c52b06074f53dbbcc65daad8fae0a360df01215b8c1cee9866caf3f495a5a5b63042202dd4b1a4e75c9d0a59af862a248ade9ceb3913b3e0e683a9cc7ebc9ed8243103c89d64dd9324f0cab73da9228272ef52f602e65b36ba10207a1c98ad819a13d897d9f2bf82d725819467dd47f6cd5847b