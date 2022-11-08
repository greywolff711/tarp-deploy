
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditInventory = () => {
    const location = useLocation()

    const { id } = location.state
    console.log(id)
    const [data,setData]=useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/api/medicine/${id}`,{headers:{'Content-Type':'application/json','x-auth-token':JSON.parse(localStorage.user).token}}).then((data) => data.json() ).then((val) => {
          setData(val);
          console.log(val)
        })
        },[])
        const [formData,setFormData]=useState({
            name:'',
            count:'',
            description:''
        });

        const onchange=(e)=>{
            setFormData({...formData,[e.target.name]:e.target.value});
            console.log(formData);
        }
        const onsubmit=(e)=>{
            
            e.preventDefault();
            console.log(formData);
        fetch(`http://localhost:5000/api/medicine/${id}`, {
                method: "POST",
                headers: {
                    // 'x-auth-token':JSON.parse(localStorage.user).token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }).then((data) => data.json() ).then((val) => {
                console.log(val);
                console.log('qwe');
            })
            // console.log("hi2")
        }
    // const data ={
    
    //     "Inventory" :[
    //       {
    //         "id":"1",
    //         "name":"Crocin",
    //         "count":"250",
    //         "description":"Fever, Headache"
    //       }
    //     ]
    //   }
    const item=data;
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             
                <form className="flex flex-col justify-center place-items-center" onSubmit={(e)=>onsubmit(e)}>
                    
                    <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-id">
                            ID
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded 
                            py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-id" type="text" value={item._id}/>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-name">
                            Name
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-name" type="text" 
                            placeholder={item.name}
                            name="name" onChange={(e)=>onchange(e)}
                            />
                        </div>
                    </div>
                    
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-count">
                        Quantity
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-count" type="text" 
                        placeholder={item.count}
                        name="count" onChange={(e)=>onchange(e)}
                        /><br/>
                    </div>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-decription">
                        Description
                        </label>
                        <textarea rows="4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-description" type="text" 
                        placeholder={item.description}
                        name="description" onChange={(e)=>onchange(e)}
                        />
                    </div> <br/>
                
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

export default EditInventory;



