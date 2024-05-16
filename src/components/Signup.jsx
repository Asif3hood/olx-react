import { useState } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import API_URL from "../constants";
function Signup(){
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [email, setmail] = useState('');

    const handleapi = () => {
 
    const url = API_URL + '/signup';
    const data = {username,password,mobile,email};
    axios.post(url,data)
        .then((res)=>{
            if(res.data.message){
                alert("Signup Successful. ");
            }

        })
        .catch((err)=>{
            alert("SERVER ERROR");
        })

    }
    return(
        <div>
            <Header />
            <div className="p-3 m-3">
                <h3>Welcome to Signup Page....</h3>
                <br />
                USERNAME
                <input className="form-control" type="text" value={username} onChange={(e) => {
                    setusername(e.target.value);
                }} />
                <br />
                MOBILE
                <input className="form-control" type="text" value={mobile} onChange={(e) => {
                    setmobile(e.target.value);
                }} />
                <br />
                EMAIL
                <input className="form-control" type="text" value={email} onChange={(e) => {
                    setmail(e.target.value);
                }} />
                <br />
                PASSWORD
                <input className="form-control" type="text" value={password} onChange={(e) =>{
                    setpassword(e.target.value);
                }} />
                <br />
                <button className="btn btn-primary mr-3" onClick={handleapi}>SIGNUP</button>
                <Link className="m-3" to="/Login"> Login</Link>
            </div>
        </div>
    );
}
export default Signup ;