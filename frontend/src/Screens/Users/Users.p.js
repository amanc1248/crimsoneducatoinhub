import Table from "react-bootstrap/Table";
import { IndividualUserC } from "./IndividualUser/IndividualUser.c";

export const UsersP = ({users})=>{
    return <>   
        {users && 
        <div className="students__inside">
        <Table striped hover size="sm" className="table__list" responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Position</th>
              <th>Address</th>
              <th>Permissions</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => {
                return (
                  <IndividualUserC
                  key={index}
                    user={user}
                  />
                );
              })}
          </tbody>
        </Table>
      </div>
        }
    </>
}