


import Products from './Products'
import React, { useEffect } from 'react';
import { useState } from 'react';
import AddProduct from './AddProduct';
import axios from 'axios'
function ListProduct(){
        const initvalue=[];
        const clickedValue = {
            id: '',
            name: '',
            prince: ''
          }
          const [listdm,setListdm]=useState([]);
          const [dmid,setDmid]=useState(-1);
          const [products, setProducts] = useState(initvalue);
          const [clicked, setClicked] = useState(-1);
          const [formData, setFormData] = useState(clickedValue);
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
          let urlpd = 'https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product';
          const [page,setPage]=useState(1);
          useEffect(() => {
            if(dmid<1){
              return;
            }
            const limit=10;
            const phantrang=urlpd + '?limit=' +limit +'&page='+page
            axios({
              method: 'GET',
              url: phantrang,
            }).then((response) => {
              console.log(response)
              const { data } = response
              setProducts(data)
            })
              .catch((error) => {
                console.log(error)
              })
        
          }, [page,dmid]);
          const next=function(){
            console.log('next');
            setPage(page+1);
          }
          const back=function(){
            console.log('back');
            if(page>1){
              setPage(page-1);
            }
            
          }
          const dmOnchange=(event)=>{
            setDmid(event.target.value);
            console.log(event.target.value)
        }
        return (
             <div>
               <select className='select_dm' onChange={dmOnchange}>
                  <option> Chọn danh mục</option>
                    {
                      listdm.map(function(value,index){
                        return (
                          <option key={index} value={value.id}>
                            {value.name}
                          </option>
                        )
                      })
                    }
                  </select>
                    <AddProduct products={products} setProduct={setProducts} clicked={clicked} setClicked={setClicked} setFormData={setFormData} formData={formData} dmid={dmid} setDmid={setDmid}
                    />
                    <Products data={products} setClicked={setClicked} setProducts={setProducts} setFormData={setFormData} dmid={dmid} setDmid={setDmid} />
                    <ul className='pt'>
                      <li className='pt_item' onClick={back}>trang trước</li>
                      <li className='pt_item'>{page}</li>
                      <li className='pt_item' onClick={next}>trang sau</li>
                    </ul>
                    
                    </div>    
        );
    
}
export default ListProduct;