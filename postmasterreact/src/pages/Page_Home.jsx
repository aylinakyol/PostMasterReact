import Request_Body from "../Request_Body"
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page_Home() {
    const location = useLocation();

    const options = ["post", "get", "put", "patch", "delete"];
    const [requestBody, setRequestBody] = useState("");
    const [requestHeader, setRequestHeader] = useState("");
    const [requestType, setRequestType] = useState("post");
    const [url, setUrl] = useState("");
    const [responseData, setResponseData] = useState("");


    useEffect(() => {
        console.log("location:", location)
        const requestUrl = location.state?.requestUrl;
        if(requestUrl){
            console.log(requestUrl);
            setUrl(requestUrl);
        }else{
            setUrl("");
        }
    }, [location]);


    function handleSelectChange(e){
        setRequestType(e.target.value);
        console.log("Seçilen değer:", e.target.value);
    }

    async function handleButtonClick() {
        sendRequest();
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
    
    async function sendRequest() {
        try {
            let requestOptions = {
                method: requestType,
                headers:{
                    'Content-Type': 'application/json',
                    ...requestHeader
                },
            }
            if (requestType !== "get") {
                let parsedBody;
                try {
                parsedBody = JSON.parse(requestBody);
                requestOptions.body = JSON.stringify(parsedBody)
                } catch (e) {
                console.error('Geçersiz JSON:', e);
                return;
                }
            }
            const response = await fetch(url, requestOptions);
            const contentType = response.headers.get('content-type');

            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            const output = {
                success: true,
                status: response.status,
                data: data
            };
        
            console.log(output);
            setResponseData(output);
        } catch (error) {
            const output = {
                success: false,
                error: error.message
            };

            console.error('Fetch Error:', error);
            setResponseData(output);
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
            <input type="text" id="url" name="url" value={url} onChange={(e) => setUrl(e.target.value)} />
            <button onClick={handleButtonClick}>Make Request</button>
            <Request_Body requestBody={requestBody} setRequestBody={setRequestBody} requestHeader={requestHeader} setRequestHeader={setRequestHeader}/>
            {responseData && (
                <pre className="pre-output">
                    {JSON.stringify(responseData, null, 2)}
                </pre>
            )}
        </div>
    );
}