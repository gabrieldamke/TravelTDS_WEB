import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Client } from "./ApiProvider";
import { GetApiUrl } from "../helpers/enviroment";

export default class ApiFactory {

    private static handleRequest = (config: AxiosRequestConfig) => {
        return config;
    }
    private static handleRequestError = (config: AxiosRequestConfig) => {
        return config;
    }
    private static handleResponse = (config: AxiosResponse) => {
        return config;
    }
    public static GetClient(): Client {
        const axiosInstance = axios.create()
        axiosInstance.interceptors.response.use(this.handleResponse)
        const client = new Client('https://localhost:7239', axiosInstance);
        return client;
    }
}