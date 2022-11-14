const express = require("express");
const {
  getCommonDataController,
  updateCommonDataController,
  deleteCommonDataController,
  getOneDataController,
  insertOneDataController,
  getTotalCountDataController,
  getOneModalTotalCount,
  getModalAllDocumentsController,
  signupNewUserController,
  loginUserController,
} = require("../controllers/commonControllers");
const router = express.Router();

router.route("/getOneData").post(getOneDataController);
router.route("/getData").post(getCommonDataController);
router.route("/insertData").post(insertOneDataController);
router.route("/updateData").post(updateCommonDataController);
router.route("/deleteData").delete(deleteCommonDataController);
router.route("/getTotalDocument").post(getTotalCountDataController);
router.route("/getOneModalTotalCount").post(getOneModalTotalCount);
router.route("/getAllDocuments").post(getModalAllDocumentsController);
router.route("/signup").post(signupNewUserController);
router.route("/login").post(loginUserController);
module.exports = router;
