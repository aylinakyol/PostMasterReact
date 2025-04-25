import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getOrPostData } from "./BaseFunctions";
import { ContextError } from './ContextError';

export default function Page_ToDos() {
    const [toDoList, setToDoList] = useState([]);
    const [searchInput, setSearchInput] = useState([]);
    const [completedFilter, setCompletedFilter] = useState([]);
    const [searchQuery, setSearchQuery] = useState(" ");

    const [isLoading, setIsLoading] = useState(true);
    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);

    const [responseData, setResponseData] = useState();

    const navigate = useNavigate();
    let loadingMessage;

    if (isLoading) {
        loadingMessage = (
            <div>
                <p style={{ color: 'red' }}>Page is loading...</p>
            </div>
        );
    }

    useEffect(()=>{
        if (getOrPostData("http://127.0.0.1:8000/api/get-todos", "GET", "message", setToDoList, setError, setIsErrorExist)) {
            setIsLoading(false);
            console.log("useEffect getOrPostData True Döndü");
        }
    },[])

    useEffect(()=>{
    },[isLoading]);

    useEffect(()=>{
        setCompletedFilter(toDoList);
    },[toDoList]);

    useEffect(()=>{
        setSearchInput(completedFilter);
    },[completedFilter]);

    function handleSearch(e) {
        setSearchQuery(e.target.value);
        const filteredList = completedFilter.filter((todo) => todo.description.toLowerCase().includes(e.target.value));
        setSearchInput(filteredList);
    }

    async function handleToggle(e) {
        if (await getOrPostData('http://127.0.0.1:8000/api/toggle-completed/' + e.target.id + '/', "POST", "message", setResponseData, setError, setIsErrorExist)) {
            getOrPostData("http://127.0.0.1:8000/api/get-todos", "GET", "message", setToDoList, setError, setIsErrorExist);
        }
    }

    async function handleDeleteClick(e) {
        if(confirm("Do you really want to delete?")) {
            if (await getOrPostData('http://127.0.0.1:8000/api/delete-todo/' + e.currentTarget.id + '/', "POST", {message: "delete",}, setResponseData, setError, setIsErrorExist)) {
                getOrPostData("http://127.0.0.1:8000/api/get-todos", "GET", "message", setToDoList, setError, setIsErrorExist)
            }
        }
    }

    function filterCompleted(e) {
        const mockEvent = {
            target: {
              value: ''
            },
        };
        if(e.target.checked){
            const filteredList = completedFilter.filter((todo) => !todo.completed);
            setCompletedFilter(filteredList);
            handleSearch(mockEvent);
        } else{
            setCompletedFilter(toDoList);
            handleSearch(mockEvent);
        }
    }

    function handleProfile(){
        navigate('profile/');
    }

    const toDos = searchInput.map((todo) => (
        <div className="todo" key={todo.id}>
            <p key={todo.id} className={todo.completed ? "stroke" : ""}>
                {todo.description + " (" + todo.completed + ")"}
            </p>
            <NavLink to={"edit-todo/" + todo.id}>
                <svg
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon"
                >
                    <path d="M8.56078 20.2501L20.5608 8.25011L15.7501 3.43945L3.75012 15.4395V20.2501H8.56078ZM15.7501 5.56077L18.4395 8.25011L16.5001 10.1895L13.8108 7.50013L15.7501 5.56077ZM12.7501 8.56079L15.4395 11.2501L7.93946 18.7501H5.25012L5.25012 16.0608L12.7501 8.56079Z"/>
                </svg>
            </NavLink>
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="icon"
                id={todo.id}
                onClick={handleDeleteClick}
            >
                <path d="M22,5H17V2a1,1,0,0,0-1-1H8A1,1,0,0,0,7,2V5H2A1,1,0,0,0,2,7H3.117L5.008,22.124A1,1,0,0,0,6,23H18a1,1,0,0,0,.992-.876L20.883,7H22a1,1,0,0,0,0-2ZM9,3h6V5H9Zm8.117,18H6.883L5.133,7H18.867Z" />
            </svg>
            <input id={todo.id} type="checkbox" {...(todo.completed && { defaultChecked: true })} onChange={handleToggle}/>
        </div>
    ));

    const htmlContent = (
        <>
        <input className="searchbar" type="search" placeholder="Search.." value={searchQuery} onChange={handleSearch} />
        <div className="filter-group">
            <NavLink
                to="add-todo"
            >
                <button>Add ToDo</button>
            </NavLink>
            <div className="checkbox-group">
                <label htmlFor="completed">Hide Completed</label>
                <input type="checkbox" id="completed" onChange={filterCompleted}/>
            </div>
        </div>
        {toDos}
        </>
    );

    return (
        <>
            <h1 className="title">ToDos</h1>
            <button onClick={handleProfile}>Profile</button>
            {isErrorExist ? '' : (isLoading ? loadingMessage : htmlContent)}
        </>
    )
}