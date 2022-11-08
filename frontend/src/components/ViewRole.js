import React,{useState,useEffect} from 'react'

function ViewRole({id}) {
    // console.log(id)
    const [doctor,setDoctor]=useState();
    const [inpatient,setInpatient]=useState();
    const [outpatient,setOutpatient]=useState();
    const [room,setRoom]=useState();
    useEffect(()=>{
        fetch(`http://localhost:5000/api/inpatient/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setInpatient(val);
        })
        fetch(`http://localhost:5000/api/doctor/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setDoctor(val);
        })
        fetch(`http://localhost:5000/api/outpatient/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setOutpatient(val);
        })
        fetch(`http://localhost:5000/api/rooms/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
            setRoom(val);
        })
    },[])
  return (
    <h6>{(doctor!=undefined)?doctor.name:((inpatient!=undefined)?inpatient.name:(outpatient!=undefined)?outpatient.name:(room!=undefined)?room.roomNo:"Invalid ID")}</h6>
  )
}

export default ViewRole