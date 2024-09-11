import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import SideBar from "./SideBar";

const AdminUsers = () => {
    const { token } = useSelector((store) => store.AuthReducer);
    const [admins, setAdmins] = useState([]);

    const getAccounts = async () => {
        const { data } = await axios.get("http://localhost:4000/admin-users", {
            headers: {
                Authorization: ` ${token}`, // Attaches the authorization token to the request headers
            },
        });
        console.log(data);

        if (Array.isArray(data)) {
            setAdmins(data);
        } else {
            console.error("Unexpected data format:", data);
            setAdmins([]);
        }
    };
    useEffect(() => {
        getAccounts();
    }, []);

    return (
        <div className="d-flex">
            <SideBar />
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>AdminId</th>
                            <th>Account Holder Name</th>
                            <th>Bank Name</th>
                            <th>Account Number</th>
                            <th>IFSC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(admins) &&
                            admins.map((admin, index) => (
                                <tr key={index}>
                                    <td>{admin.admin_id}</td>
                                    {Array.isArray(admin.accounts) &&
                                        admin.accounts.map((account, index) => (
                                            <>
                                                <td>
                                                    {
                                                        account.account_holder_name
                                                    }
                                                </td>
                                                <td>{account.bank_name}</td>
                                                <td>
                                                    {account.account_number}
                                                </td>
                                                <td>{account.ifsc}</td>
                                            </>
                                        ))}
                                </tr>
                            ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default AdminUsers;
