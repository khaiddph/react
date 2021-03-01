import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import axios from 'axios'
import { Icon } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

function Products({data , setClicked , setFormData,setProducts,dmid,setDmid}){
    const onClickHandler= (event,value , index) =>{
        setClicked(index);
        setFormData(value)
        console.log(value.categoryId)
        setDmid(value.categoryId)
    }
    const onDelete=(value,index) =>{
        const url='https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product/'+value.id;
        return axios({
            method: 'DELETE',
            url: url
        });

    }
    const deleteOnClick=(event,index,value) =>{
        const result= onDelete(value,index)
        result.then((response) =>{
            setProducts((oldState) =>{
                let newState =oldState.filter((value,idx) =>{
                    return idx==index ? false : true;
                });
                return newState
            });
        })
        .catch((error) =>{
            console.log(error)
        })
       
    }
    //onClick={(event) =>deleteOnClick(event,index,value)}
    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell >ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Prince</TableCell>
                        <TableCell>Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((value,index) => {
                        return (
                            <TableRow onClick = {(event)=>{onClickHandler(event,value,index)}} key={index}>
                                <TableCell>{value.id}</TableCell>
                                <TableCell>{value.name}</TableCell>
                                <TableCell>{value.prince}</TableCell>
                                <TableCell><DeleteIcon onClick={(event) =>deleteOnClick(event,index,value)} /></TableCell>
                                
                            </TableRow>
                        );
                    })
                    }
                </TableBody>
            </Table>
        </div>
    );
}
export default Products;