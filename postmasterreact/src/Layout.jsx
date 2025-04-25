import { Outlet, NavLink } from "react-router-dom";
import { useContext } from "react";
import { ContextError } from './ContextError';

export default function Layout() {

    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);

    let errorMessage = '';

    if (isErrorExist) {
        errorMessage = (
            <div>
                {error && <p style={{ color: 'red' }}>Error: {error}</p>}
            </div>
        );
    }

    return (
        <>
        <header>
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="logo"
            >
                <path d="m20.215 2.387-8.258 10.547-2.704-3.092a1 1 0 1 0-1.506 1.316l3.103 3.548a1.5 1.5 0 0 0 2.31-.063L21.79 3.62a1 1 0 1 0-1.575-1.233zM20 11a1 1 0 0 0-1 1v6.077c0 .459-.021.57-.082.684a.364.364 0 0 1-.157.157c-.113.06-.225.082-.684.082H5.923c-.459 0-.57-.022-.684-.082a.363.363 0 0 1-.157-.157c-.06-.113-.082-.225-.082-.684V5.5a.5.5 0 0 1 .5-.5l8.5.004a1 1 0 1 0 0-2L5.5 3A2.5 2.5 0 0 0 3 5.5v12.577c0 .76.082 1.185.319 1.627.224.419.558.753.977.977.442.237.866.319 1.627.319h12.154c.76 0 1.185-.082 1.627-.319.42-.224.754-.558.978-.977.236-.442.318-.866.318-1.627V12a1 1 0 0 0-1-1z"/>
            </svg>
            <NavLink
                to="/"
            >
                <h1>ToDo</h1>
            </NavLink>
        </header>
        <main>
            {/* <NavLink to="/">Home</NavLink>
            <NavLink to="add-todo">Add New ToDo</NavLink>
            <NavLink to="edit-todo">Edit ToDo</NavLink> */}
            <Outlet />
            {errorMessage}
        </main>
        <footer>
            <p className="text-1">© Copyright 2025 ToDo by <strong>Deniz Çetin & Aylin Akyol</strong></p>
        </footer>
        </>
    )
}