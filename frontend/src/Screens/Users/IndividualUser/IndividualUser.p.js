export const IndividualUserP = ({user, handlePermissionChange})=>{
    return <tr>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.designation}</td>
        <td>{user?.permissions.map((permission, index)=>{
            return <div key={index}>
                <label htmlFor={permission.permission}>
                    {permission.permission}
                    <input type="checkbox" checked={permission.access} value={permission.permission} onChange={
                        ()=>{
                            handlePermissionChange(permission);
                        }
                    }/>
                </label>
            </div>
        })}</td>
    </tr>
    }