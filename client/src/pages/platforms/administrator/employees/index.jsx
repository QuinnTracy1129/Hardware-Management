import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBBtnGroup,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBTable,
} from "mdbreact";
import { BROWSE } from "../../../../services/redux/slices/administrator/employees";
import { useDispatch, useSelector } from "react-redux";
import { fullName } from "../../../../services/utilities";
import { Search } from "../../../widgets/search";
export default function Employees() {
  const { token } = useSelector(({ auth }) => auth),
    { collections } = useSelector(({ employees }) => employees),
    [employees, setEmployees] = useState([]),
    dispatch = useDispatch();

  useEffect(() => {
    dispatch(BROWSE({ token }));
  }, [token, dispatch]);

  useEffect(() => {
    setEmployees(collections);
  }, [collections, setEmployees]);

  return (
    <MDBCard>
      <MDBCardBody>
        <Search title={"Employee List"} />
        <MDBTable striped responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map(({ role, fullName: name, email }, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{fullName(name)}</td>
                  <td>{email}</td>
                  <td>{role}</td>
                  <td className="text-center">
                    <MDBBtnGroup>
                      <MDBBtn size="sm" rounded color="primary">
                        <MDBIcon icon="key" />
                      </MDBBtn>
                      <MDBBtn size="sm" rounded color="danger">
                        <MDBIcon icon="user-slash" />
                      </MDBBtn>
                    </MDBBtnGroup>
                  </td>
                </tr>
              ))
            ) : (
              <tr></tr>
            )}
          </tbody>
        </MDBTable>
      </MDBCardBody>
    </MDBCard>
  );
}
