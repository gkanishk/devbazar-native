import axios, { AxiosInstance, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { store } from "../app/store";

let axiosClient: AxiosInstance;

const getAxiosClient = (accessToken: string) => {
    axiosClient = axios.create({
        baseURL: 'https://gkanishk-devbazar-be.vercel.app',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    });
    return axiosClient;
}

export { getAxiosClient }

const useAxios = (method: 'GET' | 'POST' | 'DELETE' | 'PUT', url: string, body: Record<string, any> = {}, params: Record<string, any> = {}) => {
    const [response, setResponse] = useState<AxiosResponse | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const accessToken = store.getState().user.accessToken;

    useEffect(() => {
        (async () => {
            try {
                switch (method) {
                    case 'GET':
                        let response = await getAxiosClient(accessToken).get(url, { params })
                        setResponse(response);
                        setIsLoading(false);
                        break;
                    case 'POST':
                        response = await getAxiosClient(accessToken).post(url, body)
                        setResponse(response);
                        setIsLoading(false);
                        break;
                    case 'PUT':
                        response = await getAxiosClient(accessToken).put(url, body)
                        setResponse(response);
                        setIsLoading(false);
                        break;
                    case 'DELETE':
                        response = await getAxiosClient(accessToken).delete(url)
                        setResponse(response);
                        setIsLoading(false);
                        break;
                    default:
                        break;
                }
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        })()
    }, [])

    return { response, error, isLoading }

}
export default useAxios;