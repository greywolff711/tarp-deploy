// import style from  './addPatient.module.css';
import pict from "./logos/main_logo_v2.svg";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AddPatient = () => {
  const navigate = useNavigate();
  const [formData,setFormData]=useState({
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
  });

  
  const onchange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
    console.log(formData);
}

const onsubmit=(e)=>{
    e.preventDefault();
    fetch(`https://pure-reef-02809.herokuapp.com/api/outpatient/signup`, {
        method: "POST",
        headers: {
            // 'x-auth-token':JSON.parse(localStorage.user).token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    }).then((data) => data.json() ).then((val) => {
        console.log(val);
        navigate('/outpatient/1');
    })
}


  return (
    <div className="grid grid-cols-2 h-screen">
     <div className="flex justify-center flex-col items-center bg-[#121212] flex"><br/><br/>
        <h1 className="text-5xl text-white font-semibold mb-6">Welcome to HMS!</h1><br/>
        <img className="object-cover w-60 h-60" src = {pict} alt = "project_logo"/>
        <br/>
        <Link to="/login">
          <button className="inline-block px-7 py-3 bg-[#121212] border-white border-2 text-white font-medium rounded 
          shadow-md hover:bg-white hover:text-[#121212] uppercase hover:shadow-lg focus:shadow-lg 
          focus:outline-none focus:ring-0 active:bg-white active:shadow-lg transition duration-150 ease-in-out">
            Log in
          </button>
        </Link>

    </div>


    <div className="flex justify-center flex-col items-center">
        
        <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
          <br/>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                First Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
              py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" placeholder="John"
              name="name" onChange={e=>onchange(e)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                Last Name
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" 
              placeholder="Doe"/>
            </div>
          </div>
           <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                Email
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
              mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white" id="grid-email" type="text" placeholder="abc@xyz.com"
              name="email" onChange={e=>onchange(e)}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                Password
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
              leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" 
              placeholder="*******"
              name="password" onChange={e=>onchange(e)}
              />
            </div>
          </div>
          
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
                        Contact
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-contact" type="text" 
                        placeholder="1234567890" name="phone" onChange={e=>onchange(e)}/>
            </div> <br/>
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                Address
              </label>
              <textarea rows="4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
              rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-500 focus:bg-white" id="grid-address" type="text" 
              placeholder="xyz street"
              name="address" onChange={e=>onchange(e)}
              />
            </div> <br/>
            <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-gender">
                            Gender
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-gender" type="text" 
                            onChange={e=>onchange(e)} name='gender'>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>                           
              </div> <br/>
        
        
        <button type = "submit" className="inline-block px-7 py-3 bg-white border-[#121212] uppercase text-[#121212] hover:border-[#121212] 
        font-medium rounded hover:text-white shadow-md hover:bg-[#121212] border-white border-2 transition duration-150 ease-in-out">
          register
        </button>
        </form>
    </div>
    
   
</div>
  );
}

export default AddPatient;
