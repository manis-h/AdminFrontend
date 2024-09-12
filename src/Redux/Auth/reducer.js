import Cookies from "js-cookie";
import * as types from "./actionTypes";

const initialState = {
    isAuth: Cookies.get("isAuth") || false,
    isAdmin: Cookies.get("isUserAdmin") || false,
    token: Cookies.get("token") || "",
    isLoading: false,
    isError: false,
    message: "",
    userName: Cookies.get("userName") || "",
    email: Cookies.get("email") || "",
    isResetPassword: Cookies.get("isResetPassword") || false,
};

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case types.USER_LOGIN_REQUEST:
            return { ...state, isLoading: true };

        case types.USER_LOGIN_SUCCESS:
            // Extract necessary user information from the payload
            const { user, token } = payload;

            // Set cookies for user information
            Cookies.set("userName", user.userName);
            Cookies.set("token", token);
            Cookies.set("isAuth", true);
            Cookies.set(
                "isUserRole",
                user.userRole === "admin" || user.userRole === "Admin"
            );
            Cookies.set("email", user.email);

            return {
                ...state,
                isLoading: false,
                isAuth: true,
                isAdmin: user.role === "admin",
                token: token,
                userName: user.userName,
                email: user.email,
                isError: false,
            };

        case types.USER_RESET_PASSWORD:
            Cookies.set("isResetPassword", true);

            return {
                ...state,
                isResetPassword: true,
            };

        case types.USER_LOGIN_FAILURE:
            Cookies.remove("isAuth");
            Cookies.remove("userName");
            Cookies.remove("token");
            Cookies.remove("isUserRole");
            Cookies.remove("email");

            return {
                ...state,
                isLoading: false,
                isError: true,
                isAuth: false,
                isAdmin: false,
                token: "",
                userName: "",
                email: "",
            };

        case types.USER_SIGNOUT_SUCCESS:
            Cookies.remove("isAuth");
            Cookies.remove("userName");
            Cookies.remove("token");
            Cookies.remove("isUserRole");
            Cookies.remove("email");

            return {
                ...state,
                isAuth: false,
                isLoading: false,
                isError: false,
                isAdmin: false,
                token: "",
                userName: "",
                email: "",
            };

        default:
            return state;
    }
};

export { reducer };
