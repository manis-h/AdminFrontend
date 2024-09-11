import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import SideBar from "./SideBar";

const Withdrawl = () => {
    const { token } = useSelector((store) => store.AuthReducer);

    const [transactions, setTransactions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedTransaction1, setSelectedTransaction1] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const [amount, setAmount] = useState({
        addChip: 0,
        status: "A",
    });

    const [filteredStatus, setFilteredStatus] = useState(
        () => localStorage.getItem("filteredStatus") || "A"
    );
    const [filteredData, setFilteredData] = useState(transactions);

    const handleSubmit = async (page, filteredStatus) => {
        try {
            const { data } = await axios.get(
                `http://localhost:4000/transaction-logs?page=${page}&status=${filteredStatus}`,
                {
                    headers: {
                        Authorization: `${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );
            console.log(data.data);
            setTransactions(data.data);
            console.log(transactions);
            setTotalPages(data.totalPages);
            setCurrentPage(data.currentPage);
            // You can handle data here, such as setting state or other side effects
        } catch (error) {
            console.error("Error fetching data:", error); // Logs any errors that occur during the API call
            toast.error("Failed to fetch user list", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    console.log(transactions);

    useEffect(() => {
        handleSubmit(currentPage, filteredStatus);
    }, [currentPage, filteredStatus]);

    useEffect(() => {
        if (filteredStatus === "All") {
            console.log(transactions);
            setFilteredData(transactions);
        } else {
            setFilteredData(
                transactions.filter((item) => item.status === filteredStatus)
            );
        }
        localStorage.setItem("filteredStatus", filteredStatus);
    }, [filteredStatus, transactions]); // Depend on filteredStatus

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedTransaction(null);
        setShowModal1(false);
        setSelectedTransaction1(null);
    };

    const handleViewClick = (transaction) => {
        setSelectedTransaction(transaction);
        setShowModal(true);
    };

    const handleViewClick1 = (transaction) => {
        setSelectedTransaction1(transaction);
        setShowModal1(true);
    };

    const handleAmountChange = (e) => {
        const { name, value } = e.target;
        console.log(`Name: ${name}, Value: ${value}`); // Debug log
        setAmount({
            ...amount,
            [name]: +value,
        });
    };

    const handleFilterChange = (status) => {
        setFilteredStatus(status);
        if (status === "All") {
            setFilteredData(transactions);
        } else {
            setFilteredData(
                transactions.filter((item) => item.status === status)
            );
        }
    };

    // const handleAmountChange = (e) => {
    //     const { name, value } = e.target;
    //     setAmount({
    //       ...amount,
    //       [name]: +value,
    //     });
    // };

    const handleWithdrawl = async (id) => {
        try {
            // Send a PATCH request to update the status
            const response = await axios.patch(
                `http://localhost:4000/transaction-log/${id}`,
                { status: "C" },
                {
                    headers: {
                        Authorization: `${token}`,
                    },
                }
            );

            console.log("Withdrawl Response:", response.data);

            // Check if the response contains the updated transaction
            console.log(response);

            toast.success("Updated successfully");
            handleCloseModal();
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const handleAmountSubmit = async (e, id) => {
        e.preventDefault(); // Prevents default form submission behavior
        try {
            const response = await axios.patch(
                `http://localhost:4000/transaction-log/${id}`,
                amount,
                {
                    headers: {
                        Authorization: `${token}`, // Attaches the authorization token to the request headers
                    },
                }
            );

            // Find the updated transaction in the response
            const updatedTransaction = response.data;

            // Update the specific transaction in the list
            setTransactions(
                transactions.map((transaction) =>
                    transaction._id === id ? updatedTransaction : transaction
                )
            );

            toast.success("Balance Updated successfully", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            handleCloseModal();
            handleSubmit();
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to fetch Balance details", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    return (
        <div className="d-flex">
            <SideBar />
            <div className="custom-table w-100">
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th>Amount</th>
                            <th>UTR Number</th>
                            <th>Type</th>
                            <th>
                                Status &nbsp;
                                {/* Dropdown filter on click */}
                                <select
                                    onChange={(e) =>
                                        handleFilterChange(e.target.value)
                                    }
                                    value={filteredStatus}
                                >
                                    <option value="All">All</option>
                                    <option value="P">Pending</option>
                                    <option value="C">Cancelled</option>
                                    <option value="A">Allocated</option>
                                </select>
                            </th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData &&
                            filteredData.map((transaction, index) => (
                                <tr key={index}>
                                    {console.log(transaction)}
                                    <td>{transaction?.user_id}</td>
                                    <td>{transaction.amount}</td>
                                    <td>{transaction.unique_transaction_id}</td>
                                    <td>{transaction.type}</td>
                                    <td>{transaction.status}</td>
                                    <td>{transaction.created_at}</td>
                                    <td>
                                        <Button
                                            className="btn-view"
                                            onClick={() =>
                                                handleViewClick(transaction)
                                            }
                                        >
                                            View
                                        </Button>
                                        {transaction.type === "D" ? (
                                            <Button
                                                className="btn-approve"
                                                onClick={() =>
                                                    handleViewClick1(
                                                        transaction
                                                    )
                                                }
                                            >
                                                +Amount
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                        {transaction.type === "W" ? (
                                            <Button
                                                className="btn-decline"
                                                onClick={() =>
                                                    handleWithdrawl(
                                                        transaction._id
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </Table>
                {/* Pagination controls */}
                <div>
                    {Array.from(
                        { length: totalPages },
                        (_, index) => index + 1
                    ).map((pageNumber) => (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={pageNumber === currentPage}
                        >
                            {pageNumber}
                        </button>
                    ))}
                </div>
            </div>

            {/* modal view  */}
            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Transaction Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTransaction && (
                        <>
                            <p>
                                <strong>Name:</strong>{" "}
                                {selectedTransaction.account_holder_name}
                            </p>
                            <p>
                                <strong>Bank:</strong>{" "}
                                {selectedTransaction.account_ifsc_code}
                            </p>
                            <p>
                                <strong>AC No:</strong>{" "}
                                {selectedTransaction.account_ifsc_code}
                            </p>

                            <p>
                                <strong>Amount:</strong>{" "}
                                {selectedTransaction.amount.toFixed(2)}
                            </p>
                            <p>
                                <strong>IFSC:</strong>{" "}
                                {selectedTransaction.account_ifsc_code}
                            </p>
                            <p>
                                <strong>Number:</strong>{" "}
                                {selectedTransaction.user_id.contactNumber}
                            </p>
                            <p>
                                <strong>Email:</strong>{" "}
                                {selectedTransaction.user_id.email}
                            </p>
                            <p>
                                <strong>Balance:</strong>{" "}
                                {selectedTransaction.user_id.walletBalance}
                            </p>

                            <p>
                                <strong>UTR Number:</strong>{" "}
                                {selectedTransaction.unique_transaction_id}
                            </p>
                            <p>
                                <strong>Date:</strong>{" "}
                                {selectedTransaction.created_at}
                            </p>
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* add ammount
             */}
            <Modal show={showModal1} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Amounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedTransaction1?._id}

                    <Form>
                        <Form.Group controlId="amount">
                            <Form.Label>Amount </Form.Label>
                            <Form.Control
                                type="number"
                                name="addChip"
                                value={amount.addChip}
                                onChange={handleAmountChange}
                                placeholder="Enter amount"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button
                        variant="primary"
                        onClick={(e) =>
                            handleAmountSubmit(e, selectedTransaction1?._id)
                        }
                    >
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Withdrawl;
