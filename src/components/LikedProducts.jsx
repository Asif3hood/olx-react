
import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";


function LikedProducts(){
    const navigate =useNavigate();

    const [products ,setproducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [search ,setsearch] = useState('');

    // useEffect(()=>{
    //     if(!localStorage.getItem('token')){
    //         navigate('/login');
    //     }
    // },[])

    useEffect(()=>{
       const url = API_URL + '/liked-products'; 
       const userID = localStorage.getItem('userId');      
        const data = {userId : userID} 
       axios.post(url,data)
       .then((res)=>{
        console.log(res.data.products);
        if(res.data.products){
            setproducts(res.data.products);
            setFilteredProducts(res.data.products); // Initialize filtered products with all products

        }
        })
        .catch((err) => {
            alert('server err');
            
        })
    },[])

    const handlesearch = (value)=>{
        setsearch(value);
    }

    const handleClick = () => {
        const filteredProducts = products.filter(item =>
            item.pname.toLowerCase().includes(search.toLowerCase()) ||
            item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
            item.category.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filteredProducts);
    }
    const handleCategory = (value) => {
        const filteredProducts = products.filter(item => item.category.trim() === value.trim());
        setFilteredProducts(filteredProducts);
    };
    
    const handleLike = (productId)=>{
        const userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = {userId,productId};
        axios.post(url,data)
       .then((res)=>{
            console.log(res);
        })
        .catch((err) => {
            alert('server err');
        })


    }

    return(
        <div>
            <Header search = {search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory ={handleCategory}/>
            <Link to="/add-product"> <button className="logout-btn ">ADD PRODUCT</button></Link>
           
            <div className="d-flex justify-content-center flex-wrap">
            {filteredProducts && filteredProducts.length > 0 &&
                filteredProducts.map((item,index)=>{
                    return(
                        <div className="card m-3" key={item._id}>
                            <div className="incon-container">
                            <FaHeart className="icon" style={{color:'red'}} onClick={()=>handleLike(item._id)}/>
                            </div>
                            <img height="200px" width="200px" src={API_URL + '/'+item.pimage} alt="" />
                           <p className="m-2">{item.pname} | {item.category}</p>
                           <p className="m-2 text-success">{item.pdesc}</p>
                           <h3 className="m-2 text-danger">{item.price}</h3>
                        </div>
                    )
                })
            }
            </div>
        </div>
    );
}

export default LikedProducts;