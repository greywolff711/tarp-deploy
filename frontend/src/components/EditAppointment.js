
import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const EditAppointment = () => {
    const location = useLocation()
    const { id } = location.state;
    const [formData,setFormData]=useState({
        from:"",
        // from:"",
        // to:"",
        timing:"",
        symptoms:"",
        patient:"",
        doctor:"",
        paid:"",
    });
    // console.log(id)
    const [data,setData]=useState([]);
    const [timeoptions,setTimeOptions]=useState([]);
    const timingarr=["09:00-10:00","10:00-11:00","11:00-12:00","13:00-14:00","14:00-15:00","15:00-16:00"];
    const onchange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
        console.log(formData);
        if(e.target.name==="from"){
            let from=e.target.value;
            fetch(`https://pure-reef-02809.herokuapp.com/api/appointment/slottime`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({from})
            }).then((data) => data.json()).then((val) => {
                setTimeOptions(timingarr.filter(x=>!val.includes(x)));
                let timing;
                if(timingarr.filter(x=>!val.includes(x)).length===1)timing=timingarr.filter(x=>!val.includes(x))[0];
                // console.log(timingarr.filter(x=>!val.includes(x)))
                setFormData({...formData,"timing":timing,"from":e.target.value});
            });
            // setFormData({...formData,"from":e.target.value})
        }
        // }
    }
    useEffect(()=>{
        fetch(`https://pure-reef-02809.herokuapp.com/api/appointment/app/${id}`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
          setData(val);
          console.log(val);
        })
    },[])
    console.log(data);
    const onsubmit=(e)=>{
        e.preventDefault();
        console.log(formData);
        fetch(`https://pure-reef-02809.herokuapp.com/api/appointment/${id}`, {
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
    // const data ={
    //     "Appointments" :[
    //       {
    //         "id":"1",
    //         "date":"24-09-2022",
    //         "from":"9:15",
    //         "to":"10:30",
    //         "symptoms":"fever, cold, cough",
    //         "patient":"John",
    //         "doctor":"James",
    //         "receptionist":"Jack",
    //         "paid":"True"
    //       }
    //     ]
    // }
    const item=data;
  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

    <div className="w-full px-6 py-6 mx-auto">

    
        <form className="flex flex-col justify-center place-items-center" onSubmit={e=>onsubmit(e)}>
            
        <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-date">
                    Date
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-date" type="date" 
                placeholder={"24-09-2022"} name="from" onChange={e=>onchange(e)}/><br/>
            </div>
            <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-slots">
                    Slots
                    </label>
                    <select className="block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-slots" type="text" 
                    placeholder="False" name="timing" onChange={e=>onchange(e)}> 
                        {/* <option value="1">09:00-10:00</option>
                        <option value="2">10:00-11:00</option>
                        <option value="3">11:00-12:00</option> */}
                        {timeoptions.map(item=><option>{item}</option>)}
                    </select>
            </div> <br/><br/>
            {/* <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-from-time">
                    From
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-from-time" type="time" placeholder="9:15" name="from" onChange={e=>onchange(e)}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-to-time">
                    To
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-to-time" type="time" 
                    placeholder="10:30" name="to" onChange={e=>onchange(e)}/>
                </div> 
            </div> */}
            <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-symptoms">
                Symptoms
                </label>
                <textarea rows="3" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-symptoms" type="text" 
                placeholder="Fever, cold, cough" name="symptoms" onChange={e=>onchange(e)}/>
            </div> <br/>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-patient">
                    Patient
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-patient" type="text" placeholder="John" name="patient" onChange={e=>onchange(e)}/>
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-doctor">
                    Doctor
                    </label>
                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-doctor" type="text" 
                    placeholder="James" name="doctor" onChange={e=>onchange(e)}/>
                </div> 
            </div>
           
            {/* <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-receptionist">
                Receptionist
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-receptionist" type="text" placeholder="Jack" name="" onChange={e=>onchange(e)}/>
            </div> */}
               
            
            <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-paid">
                    Paid
                    </label>
                    <select className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 
                    leading-tight focus:outline-none focus:bg-white focus:border-gray-400" id="grid-paid" type="text" 
                    placeholder="False" name="paid" onChange={e=>onchange(e)}> 
                        <option value="true">True</option>
                        <option value="false">False</option>
                    </select>
                    
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

export default EditAppointment;



