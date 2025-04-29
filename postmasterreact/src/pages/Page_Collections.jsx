import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Page_Collections() {
    const [requests, setRequests] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedData = localStorage.getItem("requests");
        if (storedData) {
            setRequests(JSON.parse(storedData));
        }
    }, []);

    const requestList = requests.map((request, index) => (
        <li key={index}>
            {request.requestType} - {request.url}<br />
            Body: {JSON.stringify(request.requestBody, null, 2)}<br />
            <button onClick={() => handleCollection(request)}>Go to Request</button>
        </li>
    ));

    function handleCollection(request){
        navigate('/', { state: { requestUrl: request.url } });
    }

    return (
        <div className="input-header">
            <h2>Collections</h2>
            <ul>{requestList}</ul>
        </div>
    );
}
