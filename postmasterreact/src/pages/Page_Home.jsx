import Request_Body from "../Request_Body"

export default function Page_Home() {
    return (
        <div className="request-options">
            <label for="request">Request Option:</label>
            <select id="request" name="request">
                <option value="post">POST</option>
                <option value="get">GET</option>
                <option value="put">PUT</option>
                <option value="patch">PATCH</option>
                <option value="delete">DELETE</option>
            </select>
            <label for="url">Url:</label>
            <input type="text" id="url" name="url" />
            <button>Make Request</button>
            <Request_Body />
        </div>
    )
}