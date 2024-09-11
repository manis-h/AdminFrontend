import { HomeIcon, LayoutDashboardIcon, User, Wallet } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userSignout } from "../Redux/Auth/action";
import logo from "./Assets/5.png";

export default function SideBar() {
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(userSignout());
    };
    return (
        <div
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
            style={{ width: 250 }}
        >
            <Link
                to="/"
                className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
                <div className="imagelogo">
                    {/* <img className='imagelogo' height={"90px"} src={logo} alt='loogo'/> */}
                </div>
            </Link>
            <hr />
            <ul className="nav nav-pills flex-column mb-auto">
                <li className="nav-item">
                    <NavLink
                        to="/"
                        className="nav-link  text-white"
                        activeClassName="active"
                        aria-current="page"
                    >
                        <HomeIcon />
                        Home
                    </NavLink>
                </li>
                {/* <li>
                        <NavLink to="/dashboard" className="nav-link text-white" activeClassName="active">
                            <LayoutDashboardIcon />
                            Dashboard
                        </NavLink>
                    </li> */}

                <li>
                    <NavLink
                        to="/withdrawal"
                        exact
                        className="nav-link text-white"
                        activeClassName="active"
                    >
                        <Wallet />
                        Deposit & Withdrawl
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admins"
                        exact
                        className="nav-link text-white"
                        activeClassName="active"
                    >
                        <Wallet />
                        Bank Accounts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/betresult"
                        exact
                        className="nav-link text-white"
                        activeClassName="active"
                    >
                        <Wallet />
                        Result
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/betresultfive"
                        exact
                        className="nav-link text-white"
                        activeClassName="active"
                    >
                        <Wallet />
                        Result 5 Mint
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/users"
                        exact
                        className="nav-link text-white"
                        activeClassName="active"
                    >
                        <User />
                        Registered Users
                    </NavLink>
                </li>
            </ul>
            <hr />
            <div className="dropdown">
                <Link
                    to="#"
                    className="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <img
                        src="https://github.com/mdo.png"
                        alt=""
                        width={32}
                        height={32}
                        className="rounded-circle me-2"
                    />
                    <strong>Rahul</strong>
                </Link>
                <ul
                    className="dropdown-menu dropdown-menu-dark text-small shadow"
                    aria-labelledby="dropdownUser1"
                >
                    <li onClick={handleSignout}>
                        <Link className="dropdown-item" to="#">
                            Sign out
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}
