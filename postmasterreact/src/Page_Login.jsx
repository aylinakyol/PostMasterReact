import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { authUser, fetchUsertoStorage, getOrPostData, updateUserContextFromStorage } from "./BaseFunctions";
import { ContextError } from './ContextError';
import { ContextUser } from './ContextUser';
import { NavLink } from "react-router-dom";

export default function Page_Login() {

    const navigate = useNavigate();

    let refreshToken = localStorage.getItem("refreshToken");

    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);

    const { isUserExist, setIsUserExist, user, setUser } = useContext(ContextUser);

    const [formDatas, setFormDatas] = useState({
        username: "",
        password: "",
    });

    const [isUserInStorage, setIsUserInStorage] = useState(true);

    useEffect(()=>{
        if (isUserExist && refreshToken) {
            console.log("Ana Sayfaya navigate ediliyor.")
            navigate('/');
        }
    },[isUserExist, refreshToken])

    function handleInputChange(event) {
        const { name, value } = event.target;
        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    }

    const [responseData, setResponseData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        last_login: "",
        is_superuser: false,
        is_active: false,
    });

    useEffect(() => {
        console.log("useEffect: fetchUsertoStorage Çalıştı.");
        fetchUsertoStorage(responseData);
        updateUserContextFromStorage(setUser, setIsUserExist, isUserInStorage, setIsUserInStorage);
    }, [responseData]);

    async function handleLogin() {
        console.log(formDatas);
        if (await authUser(formDatas, setError, setIsErrorExist)) {
            await getOrPostData("http://127.0.0.1:8000/api/get-user/", "GET", "message", setResponseData, setError, setIsErrorExist);

            refreshToken = localStorage.getItem("refreshToken");
        }
    }

    const htmlContent = (
        <>
        <form>
            <div className="input-group">
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="textinput"
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    className="textinput"
                    onChange={handleInputChange}
                />
            </div>
        </form>
        <button onClick={handleLogin}>Login</button>
        <NavLink to="/register">Don't Have an Account?</NavLink>
        </>
    )

    return (
        <>
        <h1 className="title">Login</h1>
        {htmlContent}
        </>
    )
}