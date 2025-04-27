import Request_Body from "../Request_Body"
import { useState } from "react";

export default function Page_Home() {
    const options = ["post", "get", "put", "patch", "delete"];
    const [requestBody, setRequestBody] = useState("");
    const [requestType, setRequestType] = useState("post");
    const [url, setUrl] = useState("");

    function handleSelectChange(e){
        setRequestType(e.target.value);
        console.log("Seçilen değer:", e.target.value);
    };

    async function handleButtonClick() {
        console.log("İstek tipi:", requestType);
        console.log("URL:", url);
        console.log("Request Body:", requestBody);
        
    }
    return (
        <div className="request-options">
            <label htmlFor="request">Request Option:</label>
            <select id="request" name="request" value={requestType} 
            onChange={handleSelectChange}>
                {options.map((option) => (
                    <option key={option} value={option}>
                        {option.toUpperCase()}
                    </option>
                ))}
            </select>

            <label htmlFor="url">Url:</label>
            <input type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button onClick={handleButtonClick}>Make Request</button>
            <Request_Body requestBody={requestBody} setRequestBody={setRequestBody}/>
        </div>
    )
}