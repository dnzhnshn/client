import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../index';

axios.defaults.baseURL = 'http://localhost:4000/api/';

const sleep=()=> new Promise(resolve=>setTimeout(resolve,500));
const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(async(response: AxiosResponse) => {
    await sleep();
    return response;
}, (err) => {
    const { data, status } = err.response;
    switch (status) {
        case 400:
            if (data.errors) {
                const modelStateErrors: String[] = [];
                for (const key in data.errors) {
                    if (data.errors)
                        modelStateErrors.push(data.errors[key]);
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title)
            break;
        case 500:
            history.push({
                pathname: '/server-error'                
            })
            history.location.state = data;
            break;
        case 404:
            toast.error(data.title)
            break;
        case 401:
            toast.error(data.title)
            break;
        default:
            break;
    }
    return Promise.reject(err.response);
})

const request = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}
const catalog = {
    list: () => request.get('ProductControler'),
    details: (id: number) => request.get(`ProductControler/${id}`)
}
const testError = {
    get400Error: () => request.get('Buggy/not-found'),
    get404Error: () => request.get('Buggy/bad-request'),
    get401Error: () => request.get('Buggy/Unauthorized'),
    get500Error: () => request.get('Buggy/server-error'),
    getValidationError: () => request.get('Buggy/validation-error'),
}
const agent = {
    catalog, testError
}

export default agent;