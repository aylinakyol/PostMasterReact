import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ContextUser } from "./ContextUser";
import { ContextError } from "./ContextError";

export default function ProtectedRoute({ children }) {

    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);

    const { isUserExist, setIsUserExist, user, setUser } = useContext(ContextUser);

    const refreshToken = localStorage.getItem("refreshToken");

    console.log("Protected Route çalıştı");

    useEffect(() => {
        console.log("ProtectedRoute useEffect(isUserExist): ", isUserExist);
    }, [isUserExist]);

    if (isUserExist == undefined) {
        return <div>Loading...</div>;
    }

    if(!refreshToken) {
        console.log("Refresh Token is not ok!, redirecting to: Login Page");
        return <Navigate to='/login' replace />;
    }

    if(!isUserExist) {
        console.log("State user is not ok!, redirecting to: Login Page");
        return <Navigate to='/login' replace />;
    }

    return children;
}