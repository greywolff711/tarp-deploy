
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
        phone:"",
        cost:"",
        status:"",
    });
    const [con,setCon]=useState(true);
    const [test,setTest]=useState("None");
    const [xray,setXray]=useState("None");
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    }

    useEffect(()=>{
        // check thisssss!!!!!!!!!
        fetch(`https://pure-reef-02809.herokuapp.com/api/bill/${id}`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
        //   setData(val);
          console.log(val);
        })
    },[])
    // console.log(data);
    const onsubmit=(e)=>{
        e.preventDefault();
        // console.log(formData);
        let other_costs=0;
        if(con==true)other_costs+=100;//adding the consultation costs here
        if(test==="Blood test (Rs.100)")other_costs+=100;
        else if(test==="LFT (Rs.200)")other_costs+=200;
        else if(test==="COVID (Rs.300)")other_costs+=300;
        if(xray==="Chest (Rs.100)")other_costs+=100;
        if(xray==="Kidney (Rs.200)")other_costs+=200;
        if(xray==="Bones (Rs.300)")other_costs+=300;

        let total_cost=other_costs;
        let extra=formData['cost'];
        formData['cost']=Number(formData['cost'])+total_cost;
        // check thisssss!!!!!!!!!
        fetch(`https://pure-reef-02809.herokuapp.com/api/bill/${id}`, {
            method: "POST",
            headers: {
                // 'x-auth-token':JSON.parse(localStorage.user).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
            
        })
        let phone=formData.phone;
        let recordPOSTData={phone,"consultation":con,"tests":test,xray,extra};
        fetch(`https://pure-reef-02809.herokuapp.com/api/bill/recordEdit/${id}`, {
            method: "POST",
            headers: {
                // 'x-auth-token':JSON.parse(localStorage.user).token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(recordPOSTData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
            
        })
        // console.log("hi2")
    }
    // const item=data;
    return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             
                <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
                    
                    {/* <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
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
                    </div> */}
            <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                Mobile
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-name" type="text" 
                placeholder="1234567890" name="phone" onChange={e=>onchange(e)}/>
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
                        placeholder="no" name="consult" onChange={e=>setCon(e.target.value)}> 
                            <option value={true}>Yes (Rs.100)</option>
                            <option value={false}>No</option>
                        </select>
                    </div> 
                    <div className="w-full md:w-1/3 px-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-test1">
                            Tests
                            </label>
                            <select className="appearance-none block w-[120px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-test1" type="text" 
                            placeholder="test1" onChange={e=>setTest(e.target.value)}> 
                                <option value="None">None</option>
                                <option value="Blood Test (Rs.100)">Blood Test (Rs.100)</option>
                                <option value="LFT (Rs.200)">LFT (Rs.200)</option>
                                <option value="COVID (Rs.300)">COVID Test (Rs.300)</option>
                            </select>  
                    </div>

                    <div className="w-full md:w-1/3 px-6">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-disease2">
                            X-rays
                            </label>
                            <select className="appearance-none block w-[120px] bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-xray" type="text" 
                            placeholder="no" onChange={e=>setXray(e.target.value)}> 
                                <option value="None">None</option>
                                <option value="Chest (Rs.100)">Chest (Rs.100)</option>
                                <option value="Kidney (Rs.200)">Kidney (Rs.200)</option>
                                <option value="Bones (Rs.300)">Bones (Rs.300)</option>
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



