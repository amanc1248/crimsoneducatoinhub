import Button from "react-bootstrap/Button";

export const IndividualUserP = ({user, handlePermissionChange, permissionsArray, handleOnUpdatePermission})=>{
    return <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.position}</td>
        <td>{user.address}</td>
        <td>
            <div>
                <div className="">
                {permissionsArray.map((permission, index)=>{
            return <div key={index} className="individualPermission">
                <label htmlFor={permission.permission}>
                    {permission.permission}
                    <input type="checkbox" id={permission.permission} checked={permission.access} value={permission.permission} onChange={
                        ()=>{
                            handlePermissionChange(permission);
                        }
                    }/>
                </label>
            </div>
        })}
                </div>
                <Button
            variant="success"
            size="sm"
            className="button__size"
            onClick={()=>{
                handleOnUpdatePermission(user._id);
            }}
          >
            Approve
          </Button>
            </div>
        </td>
        <td>
            
        </td>
    </tr>
    }