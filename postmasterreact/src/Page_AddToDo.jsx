import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { getOrPostData } from "./BaseFunctions";
import { ContextError } from './ContextError';

export default function Page_AddToDo() {

    const { setIsErrorExist, setError } = useContext(ContextError);
    
    const [formDatas, setFormDatas] = useState({
        description: "",
    });
    
    const navigate = useNavigate();
    
    const [responseData, setResponseData] = useState();

    function handleInputChange(e) {
        setFormDatas({
            ...formDatas,
            description: e.target.value,
        });
    }

    async function handleAdd() {
        if (await getOrPostData("http://127.0.0.1:8000/api/add-todo/", "POST", formDatas, setResponseData, setError, setIsErrorExist )) {
            navigate('/');
        }
    }

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
                    onChange={handleInputChange}
                />
            </div>
        </form>
        <button onClick={handleAdd}>Add</button>
        </>
    )

    return (
        <>
        <h1 className="title">Add ToDo</h1>
        {htmlContent}
        </>
    )
}