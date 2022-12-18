import { AuthPayload } from "../models/Auth";
import { axiosClient } from "./axiosClient";



export const AuthApi ={
    signup(payload:AuthPayload){
        return axiosClient.post("/signin", payload)
    },
    login(payload:AuthPayload){
        return axiosClient.post("/login", payload)
    }
}