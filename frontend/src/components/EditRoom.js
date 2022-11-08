
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState,useEffect}from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditRoom = () => {
    const [rooms,setRooms]=useState([]);
    const location = useLocation()
    const { id } = location.state
    // console.log(id)
    const [formData,setFormData]=useState({
        patient:'',
        room:'',
        from:'',
        price:'',
        paid:'true'
    });
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
    }
    useEffect(()=>{
        fetch(`http://localhost:5000/api/rooms`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
          setRooms(val);
        })
    },[])
    const onsubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
    fetch(`http://localhost:5000/api/bookedRoom/${id}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
        })
    }
    const data ={
        "Room" :[
          {
            "id":"1",
            "patient":"John",
            "room":"21",
            "from":"22-09-2022",
            "to":"23-09-2022",
            "price":"450",
            "paid":"True"
          }
        ]
      }
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             {data.Room.map((item, i) => (
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
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-patient">
                            Patient
                            </label>
                            <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-patient" type="text" 
                            placeholder={item.patient}
                            name='patient'
                            onChange={(e)=>onchange(e)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-room">
                            Room
                        </label>
                        {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-room" type="text" 
                        placeholder={item.room}
                        name='room'
                        onChange={(e)=>onchange(e)}
                        /><br/> */}
                        <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-paid" type="text" 
                            name='room'
                            onChange={(e)=>onchange(e)}
                            >
                                {/* <option value="true">True</option>
                                <option value="false">False</option> */}
                                {rooms.map(item=>
                                    <option value={item._id}>{item.block} {item.roomNo}</option>
                                )}
                        </select><br/>
                    </div>

                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-from-date">
                            From
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-from-date" type="date" 
                        placeholder={item.from}
                        name='from'
                        onChange={(e)=>onchange(e)}
                        /><br/>
                    </div>
                    {/* <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-to-date">
                            To
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-to-date" type="date" 
                        placeholder={item.to}/><br/>
                    </div> */}

                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-price">
                            Price
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-price" type="text" 
                        placeholder={item.price}
                        name='price'
                        onChange={(e)=>onchange(e)}
                        /><br/>
                    </div>
                    
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-paid">
                            Paid
                            </label>
                            <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                            leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-paid" type="text" 
                            placeholder={item.paid}
                            name='paid'
                            onChange={(e)=>onchange(e)}
                            >
                                <option value="true">True</option>
                                <option value="false">False</option>
                            </select>
                            
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

export default EditRoom;



