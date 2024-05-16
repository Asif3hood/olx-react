import { useState } from "react";
import Header from "./Header";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";

function Login(){
    const navigate = useNavigate()
    const [username, setusername]= useState('');
    const [password, setpassword] = useState('');

    const handleapi = () => {
 
        const url = API_URL + '/login';
        const data = {username,password};
        axios.post(url,data)
            .then((res)=>{
                console.log(res);
                if(res.data.message){
                    alert(res.data.message);
                    if(res.data.token){
                        localStorage.setItem('token', res.data.token);
                        localStorage.setItem('userId', res.data.userId);
                        navigate("/");
                    }
                }
    
            })
            .catch((err)=>{
                console.log(err);
                alert("SERVER ERROR");
            })
    
        }

    return(
        <div>
            <Header />
            <div className="m-3 p-3">
            <h3>Welcome to Login page....</h3>
            <br />
            USERNAME
            <input className="form-control" type="text" value={username} onChange={(e) => {
                setusername(e.target.value);
            }} />
            <br />
            PASSWORD
            <input className="form-control" type="text" value={password} onChange={(e) =>{
                setpassword(e.target.value);
            }} />
            <br />
            <button className="btn btn-primary mr-3" onClick={handleapi} >Login</button>
            <Link className="m-3" to="/signup"> SIGNUP</Link>
            </div>
        </div>
    );
}
export default Login ;