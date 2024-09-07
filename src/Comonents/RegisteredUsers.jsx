import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const RegisteredUsers = () => {
    const { token } = useSelector((store) => store.AuthReducer);
    const [users, setUsers] = useState([]);

    const getAccounts = async () => {
        const { data } = await axios.get(
            "http://localhost:4000/registered-users",
            {
                headers: {
                    Authorization: ` ${token}`, // Attaches the authorization token to the request headers
                },
            }
        );
        if (Array.isArray(data)) {
            setUsers(data);
        } else {
            console.error("Unexpected data format:", data);
            setUsers([]);
        }
    };
    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <div>
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) &&
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>{user.name}</td>
                                    <td>{user.Email}</td>
                                    <td>Active</td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default RegisteredUsers;
