import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";
import Categories from "./Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../constants";

function CategoryPage (){
    const navigate = useNavigate();
    const param = useParams();
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false); // State to track whether search is active or not
    useEffect(() => {
        const url = API_URL + '/get-products?catName=' + param.catName;
        axios.get(url)
        .then((res) => {
            if(res.data.product){
                setProducts(res.data.product);
                setFilteredProducts(res.data.product); // Initialize filtered products with all products
            }
        })
        .catch((err) => {
            alert('server err');
        })
    }, [param]);

    const handlesearch = (value) => {
        setSearch(value);
        setIsSearch(value !== ''); // Set isSearch to true if search query is not empty
    }

    const handleClick = () => {
        const url = API_URL + '/search?search=' + search + '&loc=' + localStorage.getItem('userLoc');
        axios.get(url)
        .then((res) => {
            console.log(res.data);
            setFilteredProducts(res.data.product);
        })
        .catch((err) => {
            alert('server err');
        });
    }

    const handleCategory = (value) => {
        const filteredProducts = products.filter(item => item.category.trim() === value.trim());
        setFilteredProducts(filteredProducts);
        setIsSearch(false); // Set isSearch to false when selecting a category
    };
    
    const handleLike = (productId) => {
        const userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = {userId, productId};
        axios.post(url, data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            alert('server err');
        });
    }
    const handleProduct = (id) => {
        navigate('/product/' + id);
    }
    return(
        <div>
            <Header search={search} handlesearch={handlesearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory}/>           
            <div className="d-flex justify-content-center flex-wrap">
                {isSearch && filteredProducts.length === 0 && <h5>No Results Found</h5>}
                {filteredProducts && filteredProducts.length > 0 &&
                    filteredProducts.map((item, index) => {
                        return(
                            <div onClick={() => handleProduct(item._id)} className="card m-3" key={item._id}>
                                <div className="incon-container">
                                    <FaHeart className="icon" onClick={() => handleLike(item._id)}/>
                                </div>
                                <img height="150px" width="300px" src={API_URL + '/' + item.pimage} alt="" />
                                <h3 className="m-2 price-text">₹ {item.price}</h3>
                                <p className="m-2">{item.pname} | {item.category}</p>
                                <p className="m-2 text-success">{item.pdesc}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
}
export default CategoryPage;
