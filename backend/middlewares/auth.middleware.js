const { db } = require("../database");
const { ObjectId } = require("mongodb");

const findUserRole = async (req, res, next) => {
  try {
    const { _id } = req.body;
    const userRole  = await db.collection("users").find({ _id: ObjectId(_id)},{role:true});
    if(userRole==='admin')return true;
    return false;
  } catch (error) {}
};

const findUserPermissions = async (req, res, next) => {
    try {
      let userId;
      let checkPermission;
      if(req.method==='DELETE'){
         userId = req.query.userId;
         checkPermission="delete"
      }else{
         userId= req.body.userId ;
         checkPermission =  req.body.checkPermission ;
      }
        const userPermissions = await db.collection("users").findOne({ _id: ObjectId(userId) }, { permissions: true });
        const permissionAccess = userPermissions.permissions.findIndex((p) => p===checkPermission)===-1?false:true;
        if(permissionAccess){
            next();
        }else{
        return res.status(401).send({ error:"UNAUTHORIZED"});
        }
    } catch (error) {
        return res.status(400);
    }
}
module.exports = { findUserRole, findUserPermissions };
