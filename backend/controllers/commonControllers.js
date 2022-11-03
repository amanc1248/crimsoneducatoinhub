const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const { Promise } = require("mongoose");

const { db } = require("../database");
const courseModel = require("../schemas/Course");

// get all documents common data controller
const getCommonDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName,pageNumber,nPerPage } = req.body;
  try {
    const result = await db
      .collection(collectionName)
      .find()
      .sort({ date: "desc" })
      .skip(pageNumber > 0 ? (pageNumber - 1) * nPerPage : 0)
      .limit(nPerPage)
      .toArray();
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// get one model total count
const getOneModalTotalCount = asyncHandler(async (req, res, callback) => {
  const { collectionName } = req.body;
  console.log("here========>",collectionName)
  try {
    const result = await db
      .collection(collectionName)
      .countDocuments();
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});


// get one document common data controller
const getOneDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName, id } = req.body;
  try {
    const result = await db
      .collection(collectionName)
      .findOne({ _id: ObjectId(id) });
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// insert one document common data controller
const insertOneDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName, doc } = req.body;
  try {
    const result = await db.collection(collectionName).insertOne(doc);
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// update one document common data controller
const updateCommonDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName, id, updateTo } = req.body;
  console.log(req.body);
  try {
    const filter = { _id: ObjectId(id) };
    const updateDoc = {
      $set: updateTo,
    };

    const result = await db
      .collection(collectionName)
      .updateOne(filter, updateDoc);
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// delete one document common data controller
const deleteCommonDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName, id } = req.query;
  console.log(req.query);
  try {
    const query = { _id: ObjectId(id) };
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      res.json(result);
      console.log("Successfully deleted one document.");
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // await ;
  }
});

const getTotalCountDataController = asyncHandler(async (req, res) => {
  console.log(req.body.collectionNames)
  await Promise.all(
    req.body.collectionNames.map((collectionName) => {
      return db.collection(collectionName).countDocuments();
    })
  )
    .then((result) => {
      res.send(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

const calulateDateDataController = asyncHandler(async (req, res) => {
  const date = new Date();
  // console.log(date);
});

module.exports = {
  getCommonDataController,
  updateCommonDataController,
  deleteCommonDataController,
  getOneDataController,
  insertOneDataController,
  calulateDateDataController,
  getTotalCountDataController,
  getOneModalTotalCount
};