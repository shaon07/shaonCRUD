import { ADD_API, DELETE_API, GET_API, UPDATE_API } from "../constant/apiConstant"

export const getApiAction = (data) =>{
    return {
        type : GET_API,
        payload :data
    }
}

export const deleteApiAction = (data) =>{
    return {
        type : DELETE_API,
        payload:data
    }
}
export const addApiAction = (data) =>{
    return {
        type : ADD_API,
        payload:data
    }
}

export const updateApiAction = (data) =>{
    return {
        type : UPDATE_API,
        payload:data
    }
}