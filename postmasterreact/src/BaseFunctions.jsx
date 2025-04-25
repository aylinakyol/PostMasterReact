export async function getOrPostData(url, method, postDatas, setResponseData, setError, setIsErrorExist) {
    console.log("getOrPostData() Çalıştı");
    try {
        let accessToken = localStorage.getItem('accessToken');
        const headers = { 'Content-Type': 'application/json', };
        if (accessToken) { headers['Authorization'] = `Bearer ${accessToken}`; }
        
        let requestOptions = {
            method: method,
            headers: headers,
        }
        
        if (method == "POST") requestOptions.body = JSON.stringify(postDatas);
        const response = await fetch(url, requestOptions);
        if (response.ok) {
            const data = await response.json();
            console.log("Response Ok, Response Data JSON Format: ", data);
            if (data.access) {
                console.log("Biri refresh token yaptı, data.access: ", data.access);
                localStorage.setItem('accessToken', data.access);
            }
            await setResponseData(data);
            return true;
        } else {
            console.log("Response Not Ok, Response Data RAW Format: ", response);
            setResponseData(response);
            setIsErrorExist(true);
            if(response.headers.get('Content-Type').includes('application/json')) {
                const data = await response.json();
                if (data.code == "token_not_valid") {
                    console.log("token_not_valid");
                    let refreshToken = localStorage.getItem('refreshToken');
                    let postRefresh = {"refresh": refreshToken};
                
                    console.log("Refresh Token: ", refreshToken);
                    console.log("postRefresh: ", postRefresh);

                    if (await getOrPostData("http://127.0.0.1:8000/api/token/refresh/", "POST", postRefresh, setResponseData, setError, setIsErrorExist)) {
                        console.log("Refresh Token Mekanizması Çalıştı");
                        return true;
                    }
                }
                if(data.error) {
                    setError(data.error);
                    console.log("data.error: ", data.error);
                } else {
                    setError(data.detail);
                    console.log("data.detail: ", data.detail);
                }
            } else {
                console.log("Json Error Message Not Found");
                setError(response.status + " (" + response.statusText + ")" + " => " + response.url);
                console.log(response.status + " (" + response.statusText + ")" + " => " + response.url);
            }
            return false;
        }
    } catch (errorcontrol) {
        setIsErrorExist(true);
        setError(errorcontrol.message);
        console.log(errorcontrol.message);
        return false;
    }
}

export async function fetchUsertoStorage(responseData) {
    console.log("fetchUsertoStorage() Çalıştı");
    console.log("fetchUsertoStorage responseData: ", responseData);
    console.log("fetchUsertoStorage: responseData.username", responseData.username);
    localStorage.setItem('username', responseData.username);
    localStorage.setItem('email', responseData.email);
    localStorage.setItem('first_name', responseData.first_name);
    localStorage.setItem('last_name', responseData.last_name);
    localStorage.setItem('last_login', responseData.last_login);
    localStorage.setItem('is_superuser', responseData.is_superuser);
    localStorage.setItem('is_active', responseData.is_active);
}

export async function updateUserContextFromStorage(setUser, setIsUserExist, isUserInStorage, setIsUserInStorage) {
    console.log("updateUserContextFromStorage() Çalıştı");
    if (localStorage.getItem('username') == null || localStorage.getItem('username') == "" ) {
        setIsUserInStorage(false);
        console.log("updateUserContextFromStorage(): Storage'da username yok.");
    } else {
        console.log("localStorage.getItem('username'): ", localStorage.getItem('username'));
        await setUser({
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            first_name: localStorage.getItem('first_name'),
            last_name: localStorage.getItem('last_name'),
            last_login: localStorage.getItem('last_login'),
            is_superuser: localStorage.getItem('is_superuser'),
            is_active: localStorage.getItem('is_active'),
        });
        await setIsUserExist(true);
    }
}

export async function authUser(datas, setError, setIsErrorExist) {
    try {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(datas),
        };
        const response = await fetch("http://127.0.0.1:8000/api/token/", requestOptions);
        if (response.ok) {
            const data = await response.json();
            // console.log("Response Ok");
            console.log(data);
            let refreshToken = await data.refresh;
            let accessToken = await data.access;
            console.log("Refresh Token: ", refreshToken);
            console.log("Access Token: ", accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('accessToken', accessToken);
            return true;
        } else {
            console.log("Response Not Ok");
            console.log(response);
            setIsErrorExist(true);
            if(response.headers.get('Content-Type').includes('application/json')) {
                const messageData = await response.json();
                // console.log("Json Error Message Found");
                if(messageData.error) {
                    setError(messageData.error);
                    console.log(messageData.error);
                } else {
                    setError(messageData.detail);
                    console.log(messageData.detail);
                }
            } else {
                // console.log("Json Error Message Not Found");
                setError(response.status + " (" + response.statusText + ")" + " => " + response.url);
                console.log(response.status + " (" + response.statusText + ")" + " => " + response.url);
            }
            return false;
        }
    } catch (errorcontrol) {
        setIsErrorExist(true);
        // console.log("authUser Try Catch");
        setError(errorcontrol.message);
        return false;
    }
}

// Oturum açık olsun olmasın Context User tarafından sürekli çağrılır.
export async function getUser(setUser, setIsUserExist, setError, setIsErrorExist) {
    if (!await refreshTokenFunc(setError, setIsErrorExist, true)) {
        await setIsUserExist(false);
        return false;
    }
    try {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            }
        };
        const response = await fetch("http://127.0.0.1:8000/api/get-user/", requestOptions);
        if (response.ok) {
            setIsErrorExist(false);
            let data = await response.json()
            await setUser({
                username: data.username,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                last_login: data.last_login,
                is_superuser: data.is_superuser,
                is_active: data.is_active,
            });
            await setIsUserExist(true);
            console.log(data);
            return true;
        } else {
            await setIsUserExist(false);
            setIsErrorExist(true);
            if(response.headers.get('Content-Type').includes('application/json')) {
                const messageData = await response.json();
                console.log("Json Error Message Found");
                if (messageData.code == "token_not_valid") {
                    console.log(messageData.code);
                    // Refresh token mekanizması buraya yazılacak
                    if (await refreshTokenFunc(setError, setIsErrorExist, false)) {
                        if (await getUser(setUser, setIsUserExist, setError, setIsErrorExist)) {
                            return true;
                        }
                        return false;
                    }
                }
                if(messageData.error) {
                    setError(messageData.error);
                    console.log(messageData.error);
                } else {
                    setError(messageData.detail);
                    console.log(messageData.detail);
                }
            } else {
                console.log(response.status + " (" + response.statusText + ")" + " => " + response.url);
                setError(response.status + " (" + response.statusText + ")" + " => " + response.url);
            }
            return false;
        }
    } catch (errorcontrol) {
        await setIsUserExist(false);
        setIsErrorExist(true);
        console.log("getUser Try Catch");
        console.log(errorcontrol.message);
        setError(errorcontrol.message);
        return false;
    }
}