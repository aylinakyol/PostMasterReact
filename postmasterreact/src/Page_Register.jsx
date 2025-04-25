import { useState, useContext, useEffect } from "react";
import { useNavigate, NavLink } from 'react-router-dom';
import { getOrPostData } from "./BaseFunctions"; 
import { ContextError } from './ContextError';
import { ContextUser } from './ContextUser';

export default function Page_Register() {

    const { setIsErrorExist, setError } = useContext(ContextError);
    const [confirmPassword, setConfirmPassword] = useState("");

    const { isUserExist } = useContext(ContextUser);

    const [responseData, setResponseData] = useState();

    const [formDatas, setFormDatas] = useState({
        username: "",
        password: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    const navigate = useNavigate();

    useEffect(()=>{
        if (isUserExist) {
            console.log("Kullanıcı var olduğu için Register Ana Sayfaya navigate ediliyor.")
            navigate('/');
        }
    },[isUserExist])
    
    function handleInputChange(event) {
        event.preventDefault();
        const { name, value } = event.target;

        setFormDatas({
            ...formDatas,
            [name]: value,
        });
    }

    function handleConfirmPassword(event){
        setConfirmPassword(event.target.value);
    }

    async function checkPasswordMatch() {
        if (formDatas.password !== confirmPassword) {
          setError("Password not matched!!");
          setIsErrorExist(true);
          return false;
        } else {
          setError("");
          return true;
        }
    }

    async function checkVoid(){
        for (const field in formDatas) {
            if (!formDatas[field]) {
              setError(`${field} cannot be empty`);
              setIsErrorExist(true);
              return false;
            } else {
              setError("");
            }
        }
        return true;

    }

    async function handleRegister() {
        if (await checkVoid() && await checkPasswordMatch()){
            if(await getOrPostData('http://127.0.0.1:8000/api/register/', "POST", formDatas, setResponseData, setError, setIsErrorExist)){
                navigate('/login');
            }
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
                    value={formDatas.username}
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
                    value={formDatas.password}
                    name="password"
                    className="textinput"
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="confirmPassword">Password-Retype:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    name="confirmPassword"
                    className="textinput"
                    onChange={handleConfirmPassword}
                />
            </div>
            <div className="input-group">
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    value={formDatas.first_name}
                    className="textinput"
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    value={formDatas.last_name}
                    className="textinput"
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formDatas.email}
                    className="textinput"
                    onChange={handleInputChange}
                    required
                />
            </div>
        </form>
        <button onClick={handleRegister}>Register</button>
        <NavLink to="/login">Already Have an Account?</NavLink>
        </>
    )

    return (
        <>
        <h1 className="title">Register</h1>
        {htmlContent}
        </>
    )
}