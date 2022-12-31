import { IndividualUserP } from "./IndividualUser.p";

export const IndividualUserC = ({ user }) => {

// data
const permissionsArray = [
    {permission:"read", access:false},
    {permission:"write", access:false},
    {permission:"read", access:false},
    {permission:"read", access:false},
] 
// functions
const handlePermissionChange = (permission)=>{

}
  return <IndividualUserP user={user} handlePermissionChange={handlePermissionChange}></IndividualUserP>;
};
