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
  verifyToken,
  getUserId,
  getDocumentsByIdController,
  getDocumentsByFilterController,
  findTutorsPaymentDetails
} = require("../controllers/commonControllers");
const { findUserRole, findUserPermissions } = require("../middlewares/auth.middleware");
const router = express.Router();


router.route("/getOneData").post(getOneDataController);
router.route("/getData").post(findUserPermissions,getCommonDataController);
router.route("/insertData").post(findUserPermissions,insertOneDataController);
router.route("/updateData").post(findUserPermissions,updateCommonDataController);
router.route("/deleteData").delete(findUserPermissions, deleteCommonDataController);
router.route("/getTotalDocument").post(findUserPermissions,getTotalCountDataController);
router.route("/getOneModalTotalCount").post(findUserPermissions,getOneModalTotalCount);
router.route("/getAllDocuments").post(findUserPermissions,getModalAllDocumentsController);
router.route("/signup").post(signupNewUserController);
router.route("/login").post(loginUserController);
router.route("/getDocumentsById").post(findUserPermissions,getDocumentsByIdController);
router.route("/verifyToken").post(findUserPermissions,verifyToken);
router.route("/getUserId").post(findUserPermissions,getUserId);

router.route("/getDocumentsById").post(findUserPermissions,getDocumentsByIdController);
router.route("/getDocumnetsByFilter").post(findUserPermissions,getDocumentsByFilterController);
router.route("/getPaymentsDetails").post(findTutorsPaymentDetails);

module.exports = router;
