
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
const EditBill = () => {
    const location = useLocation()
    const { id } = location.state;
    const [formData,setFormData]=useState({
        date:new Date(),
        from:"",
        to:"",
        symptoms:"",
        patient:"",
        doctor:""
    });
    // console.log(id)
    const [data,setData]=useState([]);
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        
    }
    useEffect(()=>{
        // check thisssss!!!!!!!!!
        fetch(`http://localhost:5000/api/bill/${id}`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
          setData(val);
          console.log(val);
        })
    },[])
    console.log(data);
    const onsubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        // check thisssss!!!!!!!!!
        fetch(`http://localhost:5000/api/bill/${id}`, {
            method: "POST",
            headers: {
                // 'x-auth-token':JSON.parse(localStorage.user).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
            
        })
        // console.log("hi2")
    }
    const item=data;
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             
                <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
                    
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                        Name
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-name" type="text" 
                        placeholder={item.name} name="name" onChange={e=>onchange(e)}/>
                    </div> <br/>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-cost">
                            Amount
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-cost" type="text" 
                            placeholder={item.cost} name="cost" onChange={e=>onchange(e)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-status">
                            Paid Status
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-status" type="text" placeholder={item.status} name="status" onChange={e=>onchange(e)}/>
                        </div>
                    </div>

                
                <br/>
                <ul>
                    <li>
                        <Link to={-1} className="px-7 py-3 bg-white uppercase rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">
                            back
                        </Link>
                        <button type = "submit" className="ml-3 px-7 py-3 bg-white uppercase rounded  border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">
                            update
                        </button>
                    </li>
                </ul>          
                
                </form>
        


            </div>

        </div>
  );
}

export default EditBill;



