import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { Table, Form } from "react-bootstrap";
import SideBar from "./SideBar";
import Swal from "sweetalert2";

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

    const handleUserClick = (user) => {
        Swal.fire({
            title: "User Details",
            html: `
                <table style="width:100%; border-collapse:collapse;">
                    <tr style="height: 50px; border-bottom: 1px solid #ccc;">
                        <td style="font-weight:bold; text-align:left; padding-right:10px;">Username:</td>
                        <td style="text-align:left;">${user.userName}</td>
                    </tr>
                    <tr style="height: 50px; border-bottom: 1px solid #ccc;">
                        <td style="font-weight:bold; text-align:left; padding-right:10px;">Name:</td>
                        <td style="text-align:left;">${user.name}</td>
                    </tr>
                    <tr style="height: 50px; border-bottom: 1px solid #ccc;">
                        <td style="font-weight:bold; text-align:left; padding-right:10px;">Points:</td>
                        <td style="text-align:left;">${user.points}</td>
                    </tr>
                    <tr style="height: 50px; border-bottom: 1px solid #ccc;">
                        <td style="font-weight:bold; text-align:left; padding-right:10px;">Email:</td>
                        <td style="text-align:left;">${user.email}</td>
                    </tr>
                </table>
            `,
            confirmButtonText: "Close",
            willOpen: () => {
                document
                    .getElementById("main-content")
                    .classList.add("blur-background");
            },
            willClose: () => {
                document
                    .getElementById("main-content")
                    .classList.remove("blur-background");
            },
        });
    };

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
        <div className="d-flex" id="main-content">
            <SideBar />
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) &&
                            users.map((user, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleUserClick(user)}
                                >
                                    <td>{user.userName}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
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
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                            />
                                        </Form>
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
