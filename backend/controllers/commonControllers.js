const asyncHandler = require("express-async-handler");
const { ObjectId } = require("mongodb");
const { Promise, Schema } = require("mongoose");

const { db } = require("../database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenExpireIn = {
  expiresIn: "1h",
};
const { convertToObjectIDs } = require("../utils/controllers.utils");

// get number of documents common data controller
const getCommonDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName, pageNumber, nPerPage } = req.body;
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
  try {
    const result = await db.collection(collectionName).countDocuments();
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// get modal all documents
const getModalAllDocumentsController = asyncHandler(
  async (req, res, callback) => {
    const { collectionName } = req.body;
    try {
      const result = await db.collection(collectionName).find().toArray();
      if (result) {
        return res.json(result);
      }
    } catch (e) {
      throw e;
    }
  }
);

// get one document common data controller
const getOneDataController = asyncHandler(async (req, res, callback) => {
  const { collectionName } = req.body;

  const id = req.body.doc;
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
  try {
    const { collectionName, doc } = req.body;
    for (let data of Object.keys(doc)) {
      if (data.toLowerCase().includes("id")) {
        doc[data] = ObjectId(doc[data]);
      }
    }

    const result = await db.collection(collectionName).insertOne(doc);
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// update one document common data controller
const updateCommonDataController = asyncHandler(async (req, res, callback) => {
  try {
    const { collectionName, id, updateTo } = req.body;
    const madeUpdateTo = convertToObjectIDs(updateTo);
    const filter = { _id: ObjectId(id) };
    const updateDoc = {
      $set: madeUpdateTo,
    };

    const result = await db
      .collection(collectionName)
      .updateOne(filter, updateDoc);
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

// update one document common data controller
const updateCommonDataControllerWithSet = asyncHandler(
  async (req, res, callback) => {
    const { collectionName, id, updateTo } = req.body;

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
  }
);

// delete one document common data controller
const deleteCommonDataController = asyncHandler(async (req, res, callback) => {
  try {
    const { collectionName, id } = req.query;
    const query = { _id: ObjectId(id) };
    const result = await db.collection(collectionName).deleteOne(query);
    if (result.deletedCount === 1) {
      res.json(result);
    } else {
      console.log("No documents matched the query. Deleted 0 documents.");
    }
  } finally {
    // await ;
  }
});

const getTotalCountDataController = asyncHandler(async (req, res) => {
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
});

const signupNewUserController = asyncHandler(async (req, res, callback) => {
  const { collectionName } = req.body;

  const name = req.body.doc.name;
  const email = req.body.doc.email;
  const position = req.body.doc.position;
  const phoneNumber = req.body.doc.phoneNumber;
  const address = req.body.doc.address;
  const password = req.body.doc.password;
  const permissions = req.body.doc.permissions;
  const role = req.body.doc.role;

  try {
    const result = await db
      .collection(collectionName)
      .findOne({ phoneNumber: phoneNumber });

    if (result) {
      return res.json({
        signup: false,
        result: result,
      });
    } else {
      const hashedPassword = await bcrypt.hash(password, 8);
      const token = jwt.sign({ _id: phoneNumber }, "secretcode");

      const newDoc = {
        name,
        email,
        position,
        phoneNumber,
        address,
        hashedPassword,
        permissions,
        role,
      };

      const newUser = await db.collection(collectionName).insertOne(newDoc);
      return res.json({ signup: true, result: newUser, token: token });
    }
  } catch (err) {
    return callback(err);
  }
});

const loginUserController = asyncHandler(async (req, res, callback) => {
  try {
    const { collectionName, doc } = req.body;
    if (process.env.LOGIN_CODE == req.body.doc.code) {
      const result = await db
        .collection(collectionName)
        .findOne({ phoneNumber: doc.phoneNumber });
      if (result) {
        const validHashedPassword = await bcrypt.compare(
          doc.password,
          result.hashedPassword
        );
        if (validHashedPassword) {
          const token = jwt.sign(
            { _id: result._id },
            "secretcode",
            tokenExpireIn
          );
          return res.json({
            token: token,
            login: true,
            result: result,
          });
        } else {
          return res.json({
            login: false,
            result: result,
          });
        }
      } else {
        return res.json({
          login: false,
          result: result,
        });
      }
    } else {
      return res.json({
        code: false,
      });
    }
  } catch (err) {
    return callback(err);
  }
});

const verifyToken = asyncHandler(async (req, res, next) => {
  try {
    const token = req.body.token;
    if (token === null) {
      return res.json({
        login: false,
      });
    }
    const userData = jwt.verify(token, "secretcode", function (err, decoded) {
      if (err) {
        return res.json({
          login: false,
        });
      } else {
        return res.json({
          login: true,
        });
      }
    });
  } catch (e) {
    throw e;
  }
});

const getUserId = asyncHandler(async (req, res, callback) => {
  const { collectionName, doc } = req.body;

  try {
    const result = await db
      .collection(collectionName)
      .findOne({ _id: ObjectId(doc) });
    return res.json(result);
  } catch (error) {
    return callback(error);
  }
});

const getDocumentsByIdController = asyncHandler(async (req, res, callback) => {
  try {
    const { collectionName, id, filter } = req.body;
    const madeFilter = convertToObjectIDs(filter ? filter : {});
    const result = await db
      .collection(collectionName)
      .find(madeFilter)
      .toArray();
    if (result) {
      return res.json(result);
    }
  } catch (err) {
    throw err;
  }
});

const getDocumentsByFilterController = asyncHandler(async (req, res) => {
  try {
    const { collectionName, filter, aggregateArray, returnAs, filterType } =
      req.body;
    const result = await db
      .collection(collectionName)
      .aggregate(aggregateArray)
      .toArray();
    if (result) {
      const list = result.map((value, index) => {
        return value[returnAs][0];
      });
      if (filterType === "normal") {
        return res.json(list);
      } else {
        return res.json(result);
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// find the tutors payments details
const findTutorsPaymentDetails = asyncHandler(async (req, res) => {
  try {
    const { data } = req.body;
    for (let obj of Object.keys(data)) {
      if (obj.toLowerCase().includes("ids")) {
        const list = [];
        for (let id of data[obj]["$in"]) {
          list.push(ObjectId(id));
        }
        data[obj]["$in"] = list;
      }
    }
    const assignedCoursesFilter = {};
    if (data.courseIds) assignedCoursesFilter.courseId = data.courseIds;
    if (data.tutorIds) assignedCoursesFilter.tutorId = data.tutorIds;
    if (data.paymentStatus)
      assignedCoursesFilter.paymentStatus = data.paymentStatus;

    const studentsPaymentFilter = {};
    if (data.month) {
      studentsPaymentFilter.month = data.month;
    } else {
      studentsPaymentFilter.month = {
        $in: [
          "Baishakh",
          "Jestha",
          "Ashadh",
          "Shrawan",
          "Bhadau",
          "Asoj",
          "Kartik",
          "Mangsir",
          "Poush",
          "Magh",
          "Falgun",
          "Chaitra",
        ],
      };
    }

    // const assignedCoursesFilter = {};
    const assginedCourses = await db
      .collection("assignedCourses")
      .aggregate([
        {
          $match: assignedCoursesFilter,
        },
        {
          $lookup: {
            from: "enrolledCourses",
            localField: "_id",
            foreignField: "assignedCourseId",
            as: "enrolledCourses",
          },
        },
        {
          $lookup: {
            from: "studentsCoursePayment",
            localField: "_id",
            foreignField: "assignedCourseId",
            as: "studentsPayment",
            let: { month: "studentsPayment.month" },
            pipeline: [
              {
                $match: {
                  month: studentsPaymentFilter.month,
                },
              },
            ],
          },
        },
      ])
      .toArray();
    return res.json(assginedCourses);
  } catch (error) {
    console.log(error);
  }
});
module.exports = {
  getCommonDataController,
  updateCommonDataController,
  deleteCommonDataController,
  getOneDataController,
  insertOneDataController,
  calulateDateDataController,
  getTotalCountDataController,
  getOneModalTotalCount,
  getModalAllDocumentsController,
  signupNewUserController,
  loginUserController,
  getDocumentsByIdController,
  verifyToken,
  getUserId,
  getDocumentsByIdController,
  getDocumentsByFilterController,
  findTutorsPaymentDetails,
};

// {
//   $lookup: {
//     from: "tutorsCoursePayment",
//     localField: "_id",
//     foreignField: "assignedCourseId",
//     as: "tutorPayment",
//   },
// },
// {$match:{
//   "tutorPayment.month": {$in:["Baishakh"]}
// }}
