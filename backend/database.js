const express = require("express");
const app = express();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect();
const db = client.db(process.env.DATABASE);
module.exports = { db };
