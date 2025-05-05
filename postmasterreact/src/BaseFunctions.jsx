export async function sendRequest(url, requestType, requestHeader, requestBody, setResponseData) {
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
                const output = {
                    success: false,
                    error: e.message
                };
                setResponseData(output);
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
