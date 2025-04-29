import Request_Body from "../Request_Body"
import { useState, useEffect} from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Page_Home() {
    const location = useLocation();

    const options = ["post", "get", "put", "patch", "delete"];
    const [requestBody, setRequestBody] = useState("");
    const [requestType, setRequestType] = useState("post");
    const [url, setUrl] = useState("");

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
    };

    async function handleButtonClick() {
        const requestData = {
            requestType,
            url,
            requestBody
        };
    
        const existingData = localStorage.getItem("requests");
        const requests = existingData ? JSON.parse(existingData) : [];
    
        requests.push(requestData);
    
        localStorage.setItem("requests", JSON.stringify(requests));
    
        console.log("Request kaydedildi:", requestData);

        if (requests.length > 10) {
            requests.shift(); // en eskiyi siler
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
            <Request_Body requestBody={requestBody} setRequestBody={setRequestBody}/>
        </div>
    )
}