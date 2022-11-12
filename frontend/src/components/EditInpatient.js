
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditInpatient = () => {
    const location = useLocation()
    const { id } = location.state;
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        age:"",
        phone:"",
        address:"",
        bookedRooms:""
    });
    const onsubmit=(e)=>{
        e.preventDefault();
        // console.log(`http://localhost:5000/api/doctor/update/${id}`)
        fetch(`http://localhost:5000/api/inpatient/update/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
        })
    }
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    }
    const data ={
    
        "Inpatient" :[
          {
            "id":"122",
            "name":"John",
            "last_name":"Doe",
            "email":"j@gmail.com",
            "password":"********",
            "age":"25",
            "bed":"123",
            "contact":"1234567890",
            "address":"Xyz-street"
          }
        ]
      }
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             {data.Inpatient.map((item, i) => (
                <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-id">
                            ID
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-id" type="text" value={item.id}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                            Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-name" type="text" 
                            placeholder={item.name+' '+item.last_name}
                            name='name' onChange={(e)=>onchange(e)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-email" type="text" placeholder={item.email}
                            name='email' onChange={(e)=>onchange(e)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-password" type="password" 
                            placeholder={item.password}
                            name='password' onChange={(e)=>onchange(e)}
                            />
                        </div> 
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-age">
                            Age
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-age" type="text" 
                            placeholder={item.age}
                            name='age' onChange={(e)=>onchange(e)}
                            />
                        </div> 
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
                            Contact
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-contact" type="text" placeholder={item.contact}
                            name='phone' onChange={(e)=>onchange(e)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-bed">
                            Bed
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-bed" type="text" 
                        placeholder={item.bed}
                        name='bookedRooms' onChange={(e)=>onchange(e)}
                        />
                    </div> <br/>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                        Address
                        </label>
                        <textarea rows="4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-address" type="text" 
                        placeholder={item.address}
                        name='address' onChange={(e)=>onchange(e)}
                        />
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
             ))}
                        
                    </div>

        </div>
  );
}

export default EditInpatient;



