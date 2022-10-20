const express = require("express");
const {
  getCommonDataController,
  updateCommonDataController,
  deleteCommonDataController,
  getOneDataController,
  insertOneDataController,
  getTotalCountDataController,
  calulateDateDataController,
} = require("../controllers/commonControllers");
const router = express.Router();

router.route("/getOneData").post(getOneDataController);
router.route("/getData").post(getCommonDataController);
router.route("/insertData").post(insertOneDataController);
router.route("/updateData").post(updateCommonDataController);
router.route("/deleteData").delete(deleteCommonDataController);
router.route("/getTotalCount").post(getTotalCountDataController);
router.route("/calculateDate").post(calulateDateDataController);
module.exports = router;
