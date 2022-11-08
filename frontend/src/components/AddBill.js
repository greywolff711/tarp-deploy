
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
const AddBill = () => {
    const [formData,setFormData]=useState({
        patient:"",
        query:"",
        status:"",
    });

    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    }

    const onsubmit=(e)=>{
        e.preventDefault();
        fetch(`https://pure-reef-02809.herokuapp.com/api/bill`, {
            method: "POST",
            headers: {
                'x-auth-token':JSON.parse(localStorage.user).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
        })
    }

  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

                <form className="flex flex-col justify-center place-items-center" onSubmit={e=>onsubmit(e)}>

                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                        Mobile
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-name" type="text" 
                        placeholder="1234567890" name="contact" onChange={e=>onchange(e)}/>
                    </div> <br/>

                {/* <div className="w-full md:w-[8rem] px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-consult">
                    Consultation
                    </label>
                    <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-consult" type="text" 
                    placeholder="no" name="consult" onChange={e=>onchange(e)}> 
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                    </select>   
                </div> <br/>     */}

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/3 px-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-consult">
                        Consultation
                        </label>
                        <select className="appearance-none block w-[120px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                        leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-consult" type="text" 
                        placeholder="no" name="consult" onChange={e=>onchange(e)}> 
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>    
                    </div> 
                    <div className="w-full md:w-1/3 px-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-test1">
                            Tests
                            </label>
                            <select className="appearance-none block w-[120px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-test1" type="text" 
                            placeholder="test1" name="test1" onChange={e=>onchange(e)}> 
                                <option value="none">None</option>
                                <option value="BT">Blood Test</option>
                                <option value="LFT">LFT</option>
                                <option value="COVID">COVID Test</option>
                            </select>  
                    </div>

                    <div className="w-full md:w-1/3 px-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-disease2">
                            X-rays
                            </label>
                            <select className="appearance-none block w-[120px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-xray" type="text" 
                            placeholder="no" name="xray" onChange={e=>onchange(e)}> 
                                <option value="none">None</option>
                                <option value="chest">Chest</option>
                                <option value="kidney">Kidney</option>
                                <option value="bones">Bones</option>
                            </select>  
                    </div>
                </div> <br/> 
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-cost">
                            Extra Charges
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-cost" type="text" 
                            placeholder="500" name="cost" onChange={e=>onchange(e)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-status">
                            Paid Status
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-status" type="text" placeholder="False" name="status" onChange={e=>onchange(e)}/>
                        </div>
                    </div>
                    
                <br/>
                <ul>
                    <li>
                        <Link to={-1} className="px-7 py-3 bg-white uppercase rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">
                            Back
                        </Link>
                        <button type = "submit" className="ml-3 px-7 py-3 bg-white uppercase rounded  border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">
                            Add
                        </button>
                    </li>
                </ul>          
                
                </form>
            </div>

        </div>
  );
}

export default AddBill;



