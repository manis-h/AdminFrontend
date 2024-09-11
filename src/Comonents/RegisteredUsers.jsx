import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Table, Form } from "react-bootstrap";
import SideBar from "./SideBar";

const RegisteredUsers = () => {
    const { token } = useSelector((store) => store.AuthReducer);
    const [users, setUsers] = useState([]);

    const getAccounts = useCallback(async () => {
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
    }, [token]);

    useEffect(() => {
        getAccounts();
    }, [getAccounts]);

    const handleSwitchChange = async (userId, currentStatus) => {
        try {
            const updatedUsers = users.map((user) =>
                user.userId === userId
                    ? { ...user, status: !currentStatus }
                    : user
            );

            // Only update the state if there's a legitimate change
            setUsers((prevUsers) => {
                const isSame =
                    JSON.stringify(prevUsers) === JSON.stringify(updatedUsers);
                if (!isSame) {
                    return updatedUsers;
                }
                return prevUsers; // No change, so don't trigger a re-render
            });

            const response = await axios.put(
                `http://localhost:4000/registered-users/${userId}/status`,
                { status: !currentStatus },
                {
                    headers: {
                        Authorization: ` ${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );

            // Update the state with the full list of users
            setUsers(response.data);
        } catch (error) {
            console.error("Error updating status:", error);
            // Roll back the state update in case of an error
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.userId === userId
                        ? { ...user, status: currentStatus }
                        : user
                )
            );
        }
    };

    // Log `users` state after it changes
    useEffect(() => {
        // console.log("Updated users:", users);
    }, [users]); // Only logs when `users` changes

    return (
        <div className="d-flex">
            <SideBar />
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
                                    <td>
                                        <Form>
                                            <Form.Check
                                                type="switch"
                                                id={`user-status-switch-${user._id}`}
                                                checked={user.status} // Set the switch based on the user's status
                                                onChange={(e) =>
                                                    handleSwitchChange(
                                                        user._id,
                                                        user.status
                                                    )
                                                } // Handle toggling
                                            />
                                        </Form>
                                        {/* {user.status == true
                                            ? "Active"
                                            : "Inactive"} */}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default RegisteredUsers;
