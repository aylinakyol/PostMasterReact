import Request_Body from "../Request_Body"
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { sendRequest } from "../BaseFunctions";

export default function Page_Home() {
    const location = useLocation();

    const options = ["post", "get", "put", "patch", "delete"];
    const [requestBody, setRequestBody] = useState("");
    const [requestHeader, setRequestHeader] = useState("");
    const [requestType, setRequestType] = useState("post");
    const [url, setUrl] = useState("");
    const [responseData, setResponseData] = useState("");
    const [params, setParams] = useState("");


    useEffect(() => {
        console.log("location:", location)
        const requestUrl = location.state?.requestUrl;
        if(requestUrl){
            console.log(requestUrl);
            setUrl(requestUrl);
        }else{
            setUrl("http://");
            setResponseData("");
        }
    }, [location]);

    function handleUrl(e){
        setUrl(e.target.value);
    }

    function handleSelectChange(e){
        setRequestType(e.target.value);
    }

    async function handleButtonClick() {
        analyzeUrl();
        await sendRequest(
            url,
            requestType,
            requestHeader,
            requestBody,
            setResponseData,
        );
        saveRequest();
    }

    function saveRequest(){
        const requestData = {
            requestType,
            url,
            requestBody,
            requestHeader,
        };

        const existingData = localStorage.getItem("requests");
        const requests = existingData ? JSON.parse(existingData) : [];
    
        requests.push(requestData);

        if (requests.length > 4) {
            requests.shift();
        }
    
        localStorage.setItem("requests", JSON.stringify(requests));
        console.log("Request kaydedildi:", requestData);
    }

    function analyzeUrl() {
        if(params !== ''){
            let queryString = new URLSearchParams(params).toString();
            console.log(`${url}?${queryString}`);
            setUrl(`${url}?${queryString}`);
        }
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
            <input type="text" id="url" name="url" value={url} onChange={handleUrl} className="input-url"/>

            <button onClick={handleButtonClick} className="request-button">Make Request</button>

            <Request_Body 
                requestBody={requestBody} 
                setRequestBody={setRequestBody} 
                requestHeader={requestHeader} 
                setRequestHeader={setRequestHeader} 
                setParams={setParams}  
            />

            {responseData && (
                <pre className="pre-output">
                    {JSON.stringify(responseData, null, 2)}
                </pre>
            )}
        </div>
    );
}