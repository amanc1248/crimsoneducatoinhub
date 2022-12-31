import React, {useState, useEffect} from 'react';
import { UsersP } from "./Users.p"

export const UsersC = ()=>{
    const [users, setUsers] = useState([]);
    const data = [{name:"AMan Chaudhayr", phoneNumber:"123456", email:"email.com", permissions:["read", "write", "update", "delete"], designation:"CEO"}]
    useEffect(() => {
      setUsers(data)
    }, [])
    
    return <UsersP users={users}></UsersP>
}