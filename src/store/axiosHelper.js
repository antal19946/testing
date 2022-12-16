// import { resetAuthToken } from '../commons';
// import settings from '../settings';

var axios = require('axios');
// const baseUrl = settings.api_url
const baseUrl = 'http://13.244.149.36:8080/'

function getResponse(response) {
    if (response && response.data) {
        if ((response.status === 401 || response.status === 403)) {
            // resetAuthToken()
            // if (window.location.pathname.indexOf('login') === -1) {
            //     // window.location.href = '/auth/login'
            // }
        }
        if (response && response.status === 500) {
            return {
                status: 500,
                data: { message: "something went wrong ", error: {} }
            }
        }
        return {
            status: response.status,
            data: response.data,
        }
    } else {
        return {
            status: 500,
            data: {
                message: "something went wrong "
            }
        }
    }
}

// export function getToken() {
//     return window.localStorage.getItem('token')
// }

export const axiosPost = (config, callback) => {
    const { url, reqBody, header } = config
    // const authorization = getToken();
    // if (!authorization && !config.skipAuth) {

    //     // window.location.href = '/auth/login'
    //     return;
    // }
    axios.post(url, reqBody, { headers: { ...header, }, baseURL: baseUrl })
        .then(response => {
            callback(getResponse(response))
        })
        .catch(err => {
            callback(getResponse(err.response))
        })
}

export const axiosPut = (config, callback) => {
    const { url, reqBody, header } = config
    // const authorization = getToken();
    // if (!authorization && !config.skipAuth) {
    //     // window.location.href = '/auth/login'
    //     return;
    // }
    axios.put(url, reqBody, { headers: { ...header, }, baseURL: baseUrl })
        .then(response => {
            callback(getResponse(response))
        })
        .catch(err => {
            callback(getResponse(err.response))
        })
}

export const axiosDelete = (config, callback) => {
    const { url, header, reqBody } = config
    // const authorization = getToken();
    // if (!authorization && !config.skipAuth) {
    //     // window.location.href = '/auth/login'
    //     return;
    // }
    axios.delete(url, { headers: { ...header, }, baseURL: baseUrl })
        .then(response => {
            callback(getResponse(response))
        })
        .catch(err => {
            callback(getResponse(err.response))
        })
}

export const axiosGet = (config, callback) => {
    const { header } = config
    // const authorization = getToken();
    // if (!authorization && !config.skipAuth) {
    //     // window.location.href = '/auth/login'
    //     return;
    // }
    axios.get(config.url, { headers: { ...header, }, baseURL: baseUrl })
        .then(response => {
            callback(getResponse(response))
        })
        .catch(err => {
            callback(getResponse(err.response))
        })
}