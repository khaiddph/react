import axios from 'axios'
import {useState,useEffect} from 'react'
import './home.css'
import TextField from '@material-ui/core/TextField';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
function Home(){
    
    const [products, setProducts] = useState([]);
    const [dmid,setDmid]=useState(-1);
    const [listdm,setListdm]=useState([]);
    const [search,setSearch]=useState('');
    const [cart,setCart]=useState([])
    const [total,setTotal]=useState(0);
    const [show,setShow]=useState('')
    const [page,setPage]=useState(1);
    const addtocart=(value)=>{
      setCart([...cart,value]);
      console.log([...cart,value])
    }
    const cartitem=cart.map((value,index)=>{
      return(
      <div key={index}>
        {value.name} : {value.prince}
        <button>remove</button>
      </div>
      )
    });
    const removetocart= (value)=>{
      
    }
    useEffect(()=>{
      totall()
    },[cart])
    const totall=()=>{
      let sum=0
      for(let i=0;i<cart.length;i++){
        sum += parseInt(cart[i].prince)
      }
      return(
      setTotal(sum)
      )
    }
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
    },[]);
    const  onChangeHandler=(event)=>{
      setSearch(event.target.value)
      console.log(event.target.value)
    }
    let urls='https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product?search='+search;
    useEffect(()=>{
      axios.get(urls)
      .then((response) => {
        console.log(response)
        const { data } = response
        setProducts(data)
      })
        .catch((error) => {
          console.log(error)
        })
    },[search])
    
    let urlps = 'https://600e771a3bb1d100179df332.mockapi.io/category/'+dmid+'/product';
          useEffect(() => {
            if(dmid<1){
              return
            }
            setDmid(1);
            const limit=5;
            const phantrang=urlps + '?limit=' +limit +'&page='+page 
            axios({
              method: 'GET',
              url: phantrang,
            }).then((response) => {
              //console.log(response)
              const { data } = response
              setProducts(data)
            })
              .catch((error) => {
                console.log(error)
              })
        
          }, [page,dmid]);
          const dmOnchange=(event)=>{
            setDmid(event.target.value);
            console.log(event.target.value)
            setPage(1)
        }
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
          return(
              <div>
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
                  <TextField className='search_Field' name='search' onChange={onChangeHandler} label="Name"  variant="outlined"/>
                </div>
                <div className='oder'>
              <div className='product'>
                {
                 products.map(function(value,index){
                    return (
                        <div key={index} className='product_item'>
                        <img className='img-fluid' src={value.image}/>
                        <p>{value.name}</p>
                        <p>{value.prince}</p>
                        <button type='submit' onClick={()=>addtocart(value)}>add</button>
                        </div>
                    )
                 })
                  }
              </div>
              
              <div >
              <ShoppingCartIcon onClick={()=>setShow([cartitem])} />
              {show}
               Tổng tiền : {total}
              </div>
              </div>
              <div>
              <button onClick={back}>back</button>
                 <button>{page}</button>
                 <button onClick={next}>next</button>
              </div>
              </div>
          )
}
export default Home;