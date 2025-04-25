import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from "react";
import { getOrPostData } from './BaseFunctions';
import { ContextError } from './ContextError';

export default function Page_EditToDo() {
    const [toDo, setToDo] = useState([]);

    const [formDatas, setFormDatas] = useState({
        description: "",
        completed: false,
    });

    const [loading, setLoading] = useState(true);
    const { isErrorExist, setIsErrorExist, error, setError } = useContext(ContextError);

    const { id } = useParams();
    const navigate = useNavigate();

    const [responseData, setResponseData] = useState();

    useEffect(()=>{
        if (getOrPostData("http://127.0.0.1:8000/api/get-todo/" + id + '/', "GET", "message", setToDo, setError, setIsErrorExist)) {
            setLoading(false);
        }
    },[])

    useEffect(()=>{
        setFormDatas({
            ...formDatas,
            description: toDo.description,
            completed: toDo.completed
        });
    },[toDo])

    async function handleDelete() {
        console.log();
        if(confirm("Do you really want to delete?")) {
            if (await getOrPostData('http://127.0.0.1:8000/api/delete-todo/' + id + '/', "POST", formDatas, setResponseData, setError, setIsErrorExist)) {
                navigate('/');
            }
        }
    }

    function handleInputChange(e) {
        setFormDatas({
            ...formDatas,
            description: e.target.value
        });
    }

    function handleCheckbox(e) {
        setFormDatas({
            ...formDatas,
            completed: e.target.checked
        });
    }

    async function handleSave() {
        console.log(formDatas);
        if (await getOrPostData('http://127.0.0.1:8000/api/update-todo/' + toDo.id + '/', "POST", formDatas, setResponseData, setError, setIsErrorExist)) {
            navigate('/');
        }
    }

    const loadingMessage = (
        <div>
            <p style={{ color: 'red' }}>Page is loading...</p>
        </div>
    );

    const htmlContent = (
        <>
        <form>
            <div className="input-group">
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    className="textinput"
                    defaultValue={toDo.description != undefined ? toDo.description : ''}
                    onChange={handleInputChange}
                />
            </div>
            <div className="input-group">
                <label htmlFor="completed">Completed:</label>
                <input 
                    className="checkbox"
                    type="checkbox" {...(toDo.completed && { defaultChecked: true })}
                    onChange={handleCheckbox}
                />
            </div>
        </form>
        <div className="input-group">
            <button 
                onClick={handleSave}
            >
                Save
            </button>
            <button 
                onClick={handleDelete}
            >
                Delete
            </button>
        </div>
        </>
    )

    return (
        <>
        <h1 className="title">Edit ToDo</h1>
        {isErrorExist ? '' : (loading ? loadingMessage : htmlContent)}
        </>
    )
}