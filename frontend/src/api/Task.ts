import { TaskDeletePayloadType, TaskPayloadType } from "../models/Task"
import { axiosClient } from "./axiosClient"

export const TaskApi = {
    getTask(userId:number){
        return axiosClient.post('/tasks', {userId})
    },
    addTask(payload:TaskPayloadType){
        return axiosClient.post('/create-task', payload)
    },
    deleteTask(payload:TaskDeletePayloadType){
        return axiosClient.post('/delete-task', payload)
    }
}