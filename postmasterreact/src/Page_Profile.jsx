import {useState, useEffect, useContext} from "react";
import { ContextUser } from './ContextUser';
import { NavLink } from 'react-router-dom';

export default function Page_Profile() {

    const { user, setIsUserExist } = useContext(ContextUser);

    const [formDatas, setFormDatas] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
    });

    useEffect(()=>{
        setFormDatas(user);
    },[user])

    function handleLogout(){
        localStorage.removeItem('accesToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('accesToken');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('last_login');
        localStorage.removeItem('is_superuser');
        localStorage.removeItem('is_active');
        setIsUserExist(false);
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
                    defaultValue={formDatas.username != undefined ? formDatas.username : ''}
                />
            </div>
            <div className="input-group">
                <label htmlFor="first_name">First Name:</label>
                <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    className="textinput"
                    defaultValue={formDatas.first_name != undefined ? formDatas.first_name : ''}
                />
            </div>
            <div className="input-group">
                <label htmlFor="last_name">Last Name:</label>
                <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    className="textinput"
                    defaultValue={formDatas.last_name != undefined ? formDatas.last_name : ''}
                />
            </div>
            <div className="input-group">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="textinput"
                    defaultValue={formDatas.email != undefined ? formDatas.email : ''}
                />
            </div>
        </form>
        <NavLink to="/login"><button onClick={handleLogout}>Logout</button></NavLink>
        </>
    );

    return (
        <>
        <h1 className="title">Profile</h1>
        {htmlContent}
        </>
    )
}