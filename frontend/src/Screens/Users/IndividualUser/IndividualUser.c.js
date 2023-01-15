import React, { useState } from "react";
import { toast } from "react-toastify";
import { updateData } from "../../../actions/homeActions";
import { IndividualUserP } from "./IndividualUser.p";

export const IndividualUserC = ({ user }) => {
  // data
  const list = [
    {
      permission: "read",
      access:
        user?.permissions.findIndex((p) => p === "read") === -1 ? false : true,
    },
    {
      permission: "write",
      access:
        user?.permissions.findIndex((p) => p === "write") === -1 ? false : true,
    },
    {
      permission: "update",
      access:
        user?.permissions.findIndex((p) => p === "update") === -1
          ? false
          : true,
    },
    {
      permission: "delete",
      access:
        user?.permissions.findIndex((p) => p === "delete") === -1
          ? false
          : true,
    },
  ];
  const [permissionsArray, setPermissionsArray] = useState(list);
  // functions
  const handlePermissionChange = (argPermission) => {
    const newList = [];
    for (let permission of permissionsArray) {
      if (argPermission.permission == permission.permission) {
        permission.access = !permission.access;
        newList.push(permission);
      } else {
        newList.push(permission);
      }
    }
    setPermissionsArray(newList);
  };

  const handleOnUpdatePermission = async () => {
    const list = [];
    for (let permission of permissionsArray) {
      if (permission.access) {
        list.push(permission.permission);
      }
    }
    user.permissions = list;
    const updatedData = await updateData({
      url: "/api/commonRoute/updateData",
      id: user._id,
      collectionName: "users",
      updatedTo: user,
      checkPermission: "update",
      userId: localStorage.getItem("userId"),
    });
    if (updatedData)
      toast.success("Permissions updated successfully", { autoClose: 5000 });
  };
  return (
    <IndividualUserP
      user={user}
      handlePermissionChange={handlePermissionChange}
      permissionsArray={permissionsArray}
      handleOnUpdatePermission={handleOnUpdatePermission}
    ></IndividualUserP>
  );
};
