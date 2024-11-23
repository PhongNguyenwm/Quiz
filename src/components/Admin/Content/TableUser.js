import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { getListUsers } from "../../../services/apiService";

const TableUser = (props) => {
  const [listUsers, setListUsers] = useState([]);

  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    const res = await getListUsers();
    if (res.data.EC === 0) {
      setListUsers(res.data.DT);
    }
  };

  return (
    <div className="table-user-container">
      <Table bordered hover className="text-center">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((item, index) => {
              return (
                <tr key={`table-user-${index}`}>
                  <td>{index + 1}</td>
                  <td>{item.email}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td className="d-flex flex-start">
                    <button className="btn btn-info">View</button>
                    <button className="btn btn-warning mx-3">Update</button>
                    <button className="btn btn-danger">Delete</button>
                  </td>
                </tr>
              );
            })}
          {listUsers && listUsers.length === 0 && (
            <tr className="text-center">
              <td colSpan={"5"}>Data not found!</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default TableUser;
