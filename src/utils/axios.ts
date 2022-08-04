import axios from "axios";

export default function(apiURI: string) {
    const axiosInstance = axios.create({
        baseURL: apiURI,
        withCredentials: true
    });

    axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
            return Promise.reject((error.response && error.response.data) || 'Something went wrong')
    });
    return axiosInstance;
}
