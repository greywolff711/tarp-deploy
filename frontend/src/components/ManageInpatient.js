
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const ManageInpatient = () => {
  const location = useLocation();
  // console.log(location);
  const l = window.location.pathname.replace(/^\/([^\/]*).*$/, '$1');
  // console.log(l);  
  const [inpatient,setInpatient]=useState([]);
  useEffect(()=>{
    fetch(`https://pure-reef-02809.herokuapp.com/api/inpatient/`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
      setInpatient(val);
      console.log(val);
    })
  },[inpatient])
  const deleteInpatient=(id)=>{
    console.log(`https://pure-reef-02809.herokuapp.com/api/inpatient/${id}`);
    fetch(`https://pure-reef-02809.herokuapp.com/api/inpatient/${id}`, {
        method: "DELETE",
        headers: {
            // 'x-auth-token':JSON.parse(localStorage.user).token,
        }
    }).then((data) => data.json() ).then((val) => {
        console.log(val);
    })
}
  // const data ={
    
  //       "Inpatient" :[
  //         {
  //           "id":"122",
  //           "name":"John",
  //           "last_name":"Doe",
  //           "email":"j@gmail.com",
  //           "age":"25",
  //           "bed":"5",
  //           "contact":"1234567890",
  //           "address":"Xyz-street"
  //         },
  //         {
  //           "id":"123",
  //           "name":"Jack",
  //           "last_name":"black",
  //           "email":"jb@gmail.com",
  //           "age":"27",
  //           "bed":"4",
  //           "contact":"1244567890",
  //           "address":"Xyz-street"
  //         },
  //         {
  //           "id":"124",
  //           "name":"Jennny",
  //           "last_name":"Day",
  //           "email":"jd@gmail.com",
  //           "age":"26",
  //           "bed":"3",
  //           "contact":"1234557890",
  //           "address":"Xyz-street"
  //         },
  //         {
  //           "id":"122",
  //           "name":"John",
  //           "last_name":"Doe",
  //           "email":"j@gmail.com",
  //           "age":"25",
  //           "bed":"2",
  //           "contact":"1234567890",
  //           "address":"Xyz-street"
  //         },
  //         {
  //           "id":"122",
  //           "name":"John",
  //           "last_name":"Doe",
  //           "email":"j@gmail.com",
  //           "age":"25",
  //           "bed":"1",
  //           "contact":"1234567890",
  //           "address":"Xyz-street"
  //         },
  //       ]
  //     }
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            

            <div className="w-full px-6 py-6 mx-auto">


                <div className="flex flex-wrap -mx-3">
                <div className="flex-none w-full max-w-full px-3">
                    <div className="relative flex flex-col min-w-0 mb-6 break-words bg-white pb-6 border-1 border-black border-solid shadow-soft-xl rounded bg-clip-border">
                    <div className="p-2 pb-0 mb-0 bg-white border-1 border-b-solid rounded border-black">
                        <h6 className="text-2xl uppercase">Inpatients</h6>
                        <br/>
                        <Link to={"/"+l+"/AddInpatient"} className="font-semibold leading-tight text-xs rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">ADD</Link>
                    </div>
                    <br/>
                    <div className="flex-auto px-0 pt-0 pb-2">
                        <div className="p-0 overflow-x-auto">
                        <table className="items-center w-full mb-0 align-top border-black text-grey-700">
                            <thead className="align-bottom">
                            <tr>
                                {/* <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">ID</th> */}
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Name</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Login Count</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Email</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Age</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Gender</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Booked Rooms</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Phone Number</th>
                                <th className="px-2 py-3 font-bold text-left uppercase align-middle bg-transparent border-b border-gray-200 shadow-none text-m border-b-solid tracking-none whitespace-nowrap text-grey-400 opacity-70">Address</th>
                                <th className="px-2 py-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none text-m tracking-none whitespace-nowrap text-grey-400 opacity-70"></th>
                            </tr>
                            </thead>
                            <tbody>
                            {inpatient.map((item, i) => (
                            
                                //  <td>{item.name}</td> 
                                
                               
                                <tr>
                                    {/* <td className="p-0 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <div className="flex px-2 py-1">
                                        <div className="flex flex-col justify-center">
                                        <h6 className="mb-0 leading-normal text-sm">{item._id}</h6>
                                        </div>
                                    </div>
                                    </td> */}
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.name}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.count}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.email}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.age}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.gender}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.bookedRooms}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.phone}</h6>
                                    </td>
                                    <td className="p-2 align-middle bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <h6 className="mb-0 leading-normal text-sm">{item.address}</h6>
                                    </td>
                                    <td className="p-2 bg-transparent border-b whitespace-nowrap shadow-transparent">
                                    <Link to={"/"+l+"/EditInpatient"} state={{ id:item._id} }className="mr-2 font-semibold leading-tight text-xs rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white"> Edit </Link>
                                    <button className="font-semibold leading-tight text-xs rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white" onClick={()=>deleteInpatient(item._id)}> Delete </button>
                                    </td>
                                </tr>
                            
                          ))}
                            </tbody>
                        </table>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            

        </div>
  );
}

export default ManageInpatient;



