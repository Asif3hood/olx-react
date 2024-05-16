import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import API_URL from "../constants";

function ProductDetails() {
  const { pId } = useParams();
  const [product, setProduct] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const url = `${API_URL}/get-product/${pId}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.product) {
          setProduct(res.data.product);
        }
      })
      .catch((err) => {
        console.error('Error fetching product:', err);
        alert('Failed to fetch product details');
      });
  }, [pId]);

  const handleContact = (addedBy) => {
    const url = `${API_URL}/get-user/${addedBy}`;
    axios
      .get(url)
      .then((res) => {
        if (res.data.user) {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error('Error fetching user:', err);
        alert('Failed to fetch user details');
      });
  };

  return (
    <>
      <Header />
      <h2>PRODUCT DETAILS:</h2>
      <div>
        {product && (
          <div className="d-flex justify-content-between flex-wrap">
            <div>
              <img
                width="400px"
                height="200px"
                src={`${API_URL}/${product.pimage}`}
                alt=""
              />
              <img
                width="400px"
                height="200px"
                src={`${API_URL}/${product.pimage2}`}
                alt=""
              />
              <h6>Product Description:</h6>
              <p>{product.pdesc}</p>
            </div>
            <div>
              <h3 className="m-2 price-text">₹ {product.price} /-</h3>
              <p className="m-2">{product.pname} | {product.category}</p>
              {
                product.addedBy && (
                  <button onClick={() => handleContact(product.addedBy)}>SHOW CONTACT DETAILS</button>
                )
              }
              {user && (
                <>
                  <h4>{user.username}</h4>
                  <h4>{user.email}</h4>
                  <h4>{user.mobile}</h4>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
