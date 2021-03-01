import {useState,useEffect} from 'react'
import axios from 'axios'
function Category(){
    const [listdm,setListdm]=useState([]);
    const [fom,setFom]=useState();
    const url='https://600e771a3bb1d100179df332.mockapi.io/category'
    useEffect(()=>{
        axios.get(url)
        .then(function(response){
            console.log(response);
            const {data}=response;
            setListdm(data)
        })
        .catch(function(error){
            console.log(error)
        })
    },[])
    return(
        <div>
            <div>
               
            </div>
            <ul>
                {
                listdm.map( function (value,index) {
                    return <li key={index}>{value.name}</li>
                })
            }
            </ul>
        </div>
    )
}
export default Category;