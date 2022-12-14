
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState} from "react";
import { Link } from "react-router-dom";

const AddReceptionist = () => {
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        age:"",
        phone:"",
        address:"",
    });
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    }
    const onsubmit=(e)=>{
        e.preventDefault();
        fetch(`https://pure-reef-02809.herokuapp.com/api/receptionist/signup`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
        })
    }

    const [mobile, setmobile] = useState("");
    const [isError, setIsError] = useState(false);

  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

            
                <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                            Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-name" type="text" 
                            name="name"
                            onChange={(e)=>onchange(e)}
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-email">
                            Email
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-email" type="text" 
                            name="email"
                            onChange={(e)=>onchange(e)}/>
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                            Password
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-password" type="password" 
                            name="password"
                            onChange={(e)=>onchange(e)}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-age">
                            Age
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-age" type="text" name="age"
                            onChange={(e)=>onchange(e)}/>
                        </div>
                    </div>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-contact">
                        Contact
                        </label>
                        <div id="error" className="text-red-500"></div>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-contact" type="text" 
                        placeholder="1234567890" error={isError} value={mobile} name="phone"
                        onChange={(e) => {
                            setmobile(e.target.value);
                            if (/^[6-9]\d{9}$/gi.test(e.target.value)) {
                            document.getElementById("error").innerHTML = ""
                            console.log(e.target.value)
                            onchange(e);
                            }
                            else {
                            // console.log("ERROR")
                            setFormData({...formData,phone:""});
                            // console.log(formData);
                            document.getElementById("error").innerHTML="*";
                            }
                        }}
                        />
                    </div> <br/>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-address">
                        Address
                        </label>
                        <textarea rows = "4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-address" type="text" 
                        name="address"
                        onChange={(e)=>onchange(e)}/>
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

export default AddReceptionist;



