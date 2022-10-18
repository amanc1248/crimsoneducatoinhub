const express = require('express')
const app = express();
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://amanchy:mwFt0EM6SGYaMXmn@cluster0.ewqa1p1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();
const db = client.db('crimsoneduction');
module.exports={db}