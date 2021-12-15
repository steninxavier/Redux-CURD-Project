import * as types from "./actionType";
import axios from "axios";

const getUsers = (users) =>({
    type: types.GET_USERS,
    payload: users,
});
const userDeleted=()=>({
 type: types.DELETE_USER
});
const userAdded=()=>({
    type: types.ADD_USER
   });

   const userUpdated=()=>({
    type: types.UPDATE_USER
   });

   const getUser=(user)=>({
    type: types.GET_SINGLE_USER,
    payload:user,
   });

export const loadUsers = ()=>{
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_API}`).then((response)=>{
            console.log(response.data);
            dispatch(getUsers(response.data));
        })
    }
}
export const deleteUser = (id)=>{
    return function (dispatch){
        axios.delete(`${process.env.REACT_APP_API}/${id}`).then((response)=>{
            console.log(response);
            dispatch(userDeleted());
            dispatch(loadUsers());
        })
    }
}
export const addUser = (user)=>{
    return function (dispatch){
        axios.post(`${process.env.REACT_APP_API}`,user).then((response)=>{
            console.log(response);
            dispatch(userAdded());
            dispatch(loadUsers());
        })
    }
}
export const getSingleUser = (id)=>{
    return function (dispatch){
        axios.get(`${process.env.REACT_APP_API}/${id}`)
        .then((response)=>{
            console.log(response.data);
            dispatch(getUser(response.data));
        })
    }
}
export const updateUser = (user,id)=>{
    return function (dispatch){
        axios.put(`${process.env.REACT_APP_API}/${id}`,user)
        .then((response)=>{
            console.log(response);
            dispatch(userUpdated());
        })
    }
}