const express = require('express')
const app = express();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config({path: "../.env" });

console.log("this is ", process.env.NODE_ENV)
const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();
const db = client.db('development');
module.exports={db}