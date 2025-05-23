import { Outlet, NavLink , useNavigate} from "react-router-dom";
import { useContext } from "react";
import { ContextError } from './ContextError';
import Page_Home from "./pages/Page_Home";
import SideBar from "./components/SideBar";

export default function Layout() {
    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);
    const navigate = useNavigate();

    let errorMessage = '';

    if (isErrorExist) {
        errorMessage = (
            <div>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>
        );
    }

    return (
        <div className="layout">
        <header>
            <svg
                viewBox="0 0 30 30"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
            >
                <path d="M18.053,12.267l4.76,7.467.373.56,1.12-.653-.373-.56-4.76-7.467L18.8,10.96l-1.12.653.373.653Zm-5.227-.747-4.76,7.467-.373.56,1.12.653.373-.467,4.76-7.467.373-.56L13.2,10.96l-.373.56Z" 
                /><path d="M16,13.107A4.979,4.979,0,0,0,20.947,8.16,5.061,5.061,0,0,0,16,3.12a4.979,4.979,0,0,0-4.947,4.947A5.061,5.061,0,0,0,16,13.107ZM16,11.8a3.644,3.644,0,0,1-3.64-3.64,3.64,3.64,0,1,1,7.28,0A3.644,3.644,0,0,1,16,11.8Z" 
                /><path d="M25.053,28.88a4.947,4.947,0,1,0-4.947-4.947A4.979,4.979,0,0,0,25.053,28.88Zm0-1.307a3.644,3.644,0,0,1-3.64-3.64,3.64,3.64,0,1,1,7.28,0A3.644,3.644,0,0,1,25.053,27.573Z" 
                /><path d="M6.947,28.88a4.947,4.947,0,1,0,0-9.893,4.947,4.947,0,1,0,0,9.893Zm0-1.307a3.644,3.644,0,0,1-3.64-3.64,3.706,3.706,0,0,1,3.64-3.64,3.706,3.706,0,0,1,3.64,3.64A3.644,3.644,0,0,1,6.947,27.573Z" 
                /><circle cx="6.947" cy="23.933" r="1.68"/>
            </svg>
            <NavLink
                to="/"
            >
                <h1>Post Master</h1>
            </NavLink>
        </header>
        <main className="main">
            <SideBar />
            <Outlet />
            {errorMessage}
        </main>
        <footer>
            <p className="text-1">© Copyright 2025 PostMaster by <strong>Aylin Akyol</strong></p>
        </footer>
        </div>
    )
}