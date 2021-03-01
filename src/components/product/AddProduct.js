import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Products from './Products';
import axios from 'axios'
import { FormControl, Select } from '@material-ui/core';
import {useState,useEffect} from 'react'
function AddProduct({clicked , formData, setFormData, setProduct,products,setClicked,dmid,setDmid}){
    
    const onChangeHandler = (event) =>{
        const {value,name}=event.target;
        setFormData({
            ...formData,
            [name] : value
        });
    }
    const addProduct=()=>{
        let url='https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product';
        axios({
            method: 'POST',
            url: url,
            data:formData
        }).then((response)=>{
            console.log(response);
            const {data}=response
            setProduct([
                ...products,
                data
            ])
        }).catch((error)=>{
            console.log(error)
        })
    }
    const udProduct=() =>{
        let url='https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product/'+ products[clicked].id;
        axios({
            method: 'PUT',
            url: url,
            data:formData
        }).then((response)=>{
            console.log(response);
        }).catch((error)=>{
            console.log(error)
        })
    }
    const onSubmitHandler=(event) =>{
        event.preventDefault();
        console.log(formData,clicked);
        setProduct((oldState) =>{
            let newState;
            if(clicked != -1){
                udProduct();
                 newState=oldState.map((value,index) =>{
                    return index== clicked ? formData : value
                 });
            }else{
                addProduct();
                newState=[
                    ...products,
                    formData
                ]
            }
            return newState
        });
        
    }
    const clearOnClick = () =>{
        setClicked(-1);
        setFormData({
            name: '',
            prince: ''
        });
    }
    return (
       <form onSubmit={onSubmitHandler}  style ={{ marginTop : '10px' , textAlign : 'center'}} >
           <TextField name='name' onChange={onChangeHandler} label="Name" value={formData.name} fullWidth style={{ marginBottom :10 ,marginLeft:40}} variant="outlined"/>
           <TextField name ='prince' onChange={onChangeHandler} label="Prince" value={formData.prince} fullWidth style={{ marginBottom :10 ,marginLeft:40}} variant="outlined"/>
           <Button  style ={{ marginRight :'30px'}} type='submit'  variant="contained" color="primary">Submit</Button>
           <Button variant="contained" color="primary" onClick={clearOnClick}>Clear</Button>
       </form>
    )
}
export default AddProduct;