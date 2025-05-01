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
        <li className="request-item" key={index}>
            <p>Request Type: {request.requestType.toUpperCase()}</p><br />
            <p>Url: {request.url}</p><br />
            <p>Header: {request.requestHeader}</p><br />
            <p>Body: {JSON.stringify(request.requestBody, null, 2)}</p>
            <button onClick={() => handleCollection(request)}>Go to Request</button>
        </li>
    ));

    function handleCollection(request){
        navigate('/', { state: { requestUrl: request.url } });
    }

    return (
        <div className="collection-list">
            <h2>Collections</h2>
            <ul>{requestList}</ul>
        </div>
    );
}
