// import style1 from './login.module.css';
import pict from "./logos/main_logo_v2.svg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import React from "react";
// import { Link } from "react-router-dom";
// import { data } from "autoprefixer";

const Login = () => {
    const navigate = useNavigate();
    const [loginInput, setLoginInput] = useState({email: "", password: "", userType: "inpatient"})
    const loginHandler = (e) => {
        e.preventDefault()
        fetch(`https://pure-reef-02809.herokuapp.com/api/${loginInput.userType}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: loginInput.email, password: loginInput.password})
        }).then((data) => data.json() ).then((val) => {
            localStorage.setItem("user", JSON.stringify(val))
            console.log(val);
            if(loginInput.userType==='receptionist'){
                navigate('/receptionist/1');
            }
            if(loginInput.userType==='admin'){
                navigate('/admin/1');
            }
            if(loginInput.userType==='doctor'){
                navigate('/doctor/1');
            }
            if(loginInput.userType==='pharmacist'){
                navigate('/pharmacist/1');
            }
            if(loginInput.userType==='inpatient'){
                navigate('/inpatient/1');
            }
            if(loginInput.userType==='outpatient'){
                navigate('/outpatient/1');
            }
            if(loginInput.userType==='admin'){
                navigate('/admin/1');
            }
        })
    }
  return (
        <div className="grid grid-cols-2 h-screen">
    
            <div className="flex justify-center flex-col items-center">
                <br/><br/>
                <form className="flex flex-col justify-center place-items-center" onSubmit={loginHandler}>
                
                <h1 className="text-4xl font-semibold mb-6" style = {{color: "black"}}>Log in as {' '}
                <select  value={loginInput.userType} onChange={(e) => {setLoginInput({...loginInput, userType: e.target.value})}} className="text-4xl form-select inline-block px-3 py-1.5 text-base font-semibold bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-current focus:bg-white focus:outline-none active:text-grey-700">

                    {/* <option className="text-3xl">User</option> */}
                        <option className="text-3xl" value="inpatient">In Patient</option>
                        <option className="text-3xl" value="outpatient">Out Patient</option>
                        <option className="text-3xl" value="doctor">Doctor</option>
                        <option className="text-3xl" value="receptionist">Receptionist</option>
                        <option className="text-3xl" value="pharmacist">Pharmacist</option>
                        <option className="text-3xl" value="admin">Admin</option>
                </select> </h1>
                <br/>
                
                <input type = "text" placeholder = "Email" className ="block w-full px-4
                py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 
                rounded transition duration-300 ease-in-out m-0 focus:text-gray-700 focus:bg-[#dbf0fe] focus:border-[#dbf0fe] 
                focus:outline-none" value={loginInput.email} onChange={(e) => {setLoginInput({...loginInput, email: e.target.value})}}/><br/>
                
                <input type = "password" id = "password" placeholder="Password" className ="block w-full px-4
                py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 
                rounded transition duration-300 ease-in-out m-0 focus:text-gray-700 focus:bg-[#dbf0fe] focus:border-[#dbf0fe] 
                focus:outline-none" value={loginInput.password} onChange={(e) => {setLoginInput({...loginInput, password: e.target.value})}}/>
                <br/>
{/*                 
                <span>Forgot password? Click </span>
                <span id = "here"><a href = "about:blank">here</a></span> <br/> */}

               
                <br/><br/><br/><br/><br/>
                <button type = "submit" className="inline-block px-7 py-3 bg-white border-2 border-black text-black font-medium rounded shadow-md 
                hover:bg-black hover:shadow-lg hover:text-white hover:border-black focus:shadow-lg focus:outline-none focus:ring-0 
                active:bg-black active:shadow-lg transition duration-150 ease-in-out">
                    LOG IN
                </button>
                </form>
            </div>
            
            <div className="flex justify-center flex-col items-center bg-[#121212] flex"><br/><br/>
                <h1 className="text-5xl text-white font-semibold mb-6">Welcome to name!</h1><br/>
                <img className="object-cover w-60 h-60" src = {pict} alt = "project_logo"/>
                <br/>
                <Link to="/AddPatient">    <button className="inline-block px-7 py-3 bg-[#121212] border-white border-2 text-white font-medium rounded 
                    shadow-md hover:bg-white hover:text-black uppercase hover:shadow-lg focus:shadow-lg 
                    focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out">
                    Sign up as Patient
                    </button>
                </Link>
            </div>
    </div>
           
        
  );
};
  
export default Login;


