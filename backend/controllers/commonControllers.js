
const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const { db } = require("../database");
const { Student } = require("../database/schemas/Students");

// get all documents common data controller
const getCommonDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName} = req.body;
  try {
    const result = await db.collection(collectionName).find().sort({ createdAt: 'desc' }).toArray();
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// get one document common data controller
const getOneDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName,id} = req.body;
  try {
    const result = await db.collection(collectionName).findOne({_id:ObjectId(id)});
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// insert one document common data controller
const insertOneDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName,doc} = req.body;
  try {
    const result = await db.collection(collectionName).insertOne(doc);
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// update one document common data controller
const updateCommonDataController = asyncHandler(async(req,res,callback)=>{
  const {collectionName, id, updateTo} =req.body;
  console.log(req.body)
  try {
        const filter = { _id: ObjectId(id) };
        const updateDoc = {
          $set: updateTo
        };
    
    const result = await db
      .collection(collectionName)
      .updateOne(filter, updateDoc);
    return res.json(result);
  } catch (error) {
    return callback(error)
  }
})


// delete one document common data controller
const deleteCommonDataController = asyncHandler(async(req,res,callback)=>{
  const {collectionName, id} =req.body;
  console.log(req.body)
  try {
    
    const query = {_id:ObjectId(id)};
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      res.json(result)
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // await ;
  }
})
  
  module.exports = {
    getCommonDataController,
    updateCommonDataController,
    deleteCommonDataController,
    getOneDataController,
    insertOneDataController
  };
  