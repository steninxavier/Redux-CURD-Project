import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
import { addUser } from '../redux/actions';

function AddUser() {

    const[state,setState]= useState({
       name:"",
       email:"",
       contact:"",
       address:""

    });
    const[error,setError] = useState("");
    const{name,email,contact,address}= state;
    const histroy= useHistory();
    const dispatch= useDispatch();
    const handleInputChange= (e)=>{
      let{ name,value}=e.target;
      setState({...state,[name]: value})
    };

    const handleSubmit =(e)=>{
      e.preventDefault();
      if(!name || !address || !email || !contact){
        setError("please input all inputs")
      }
      else{
        dispatch(addUser(state));
        histroy.push("/");
        setError("");
      }
    }
    return (
        <div>
             <Button variant="contained" color="primary" type="submit" onClick={()=> histroy.push("/")}>
            Go back
          </Button>
        
        <div align="center">
           

            <h2>ADD  USER</h2>
            {<h4 style={{color:"red"}}>{error} </h4>}
            <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField id="standard-basic" onChange={handleInputChange} label="name" name="name" value={name} type="text" /><br/>
      <TextField id="standard-basic" onChange={handleInputChange} label="email" name="email" value={email} type="text" /><br/>
      <TextField id="standard-basic" onChange={handleInputChange} label="contact" name="contact" value={contact} type="tel" /><br/>
      <TextField id="standard-basic" onChange={handleInputChange}  label="address" name="address" value={address} type="text" /><br/>
      <Button variant="contained" color="secondary" type="submit" style={{width:"20px", height:"30px"}}>
            Submit
          </Button>
      
    </Box>
        </div></div>
    )
}

export default AddUser
