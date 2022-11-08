import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React, {useState} from "react";
import { Link } from "react-router-dom";

const EditPrescription = () => {
    const [formdata, setFormdata] = useState({
        patient: "",
        medicine: "",
        instructions: "",
        });
    const submitHandler = (e) => {
        e.preventDefault();
        console.log(formdata);
        fetch("http://localhost:5000/api/prescription/1", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        })

            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const data ={
    
        "Prescription" :[
          {
            "name":"John Doe",
            "medicine":"Crocin 500mg",
            "instructions":"0-1-1 after food"
          }
        ]
      }
  return (
        <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">

            <div className="w-full px-6 py-6 mx-auto">

             {data.Prescription.map((item, i) => (
                <form className="flex flex-col justify-center place-items-center" onSubmit={submitHandler}>
                    
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-patient">
                        Patient Name
                        </label>
                        <input rows = "4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-patient" type="text" 
                        placeholder={item.name} name="patient" value={formdata.patient} onChange={(e)=> {setFormdata({...formdata, patient:e.target.value})}}/>
                    </div> <br/>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-medicines">
                        Medicines
                        </label>
                        <textarea rows = "4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-address" type="text" 
                        placeholder={item.medicine} name="medicine" value={formdata.medicine} onChange={(e) => {setFormdata({...formdata, medicine:e.target.value})}}/>
                    </div> <br/>
                    <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-instructions">
                        Instructions
                        </label>
                        <textarea rows = "4" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white" id="grid-instructions" type="text" 
                        placeholder={item.instructions} name="instructions" value={formdata.instructions} onChange={(e) => {setFormdata({...formdata, instructions:e.target.value})}}/>
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

export default EditPrescription;