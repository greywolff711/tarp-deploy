import React,{useState,useEffect} from 'react'

function ViewRole({id}) {
    // console.log(id)
    const [doctor,setDoctor]=useState();
    const [inpatient,setInpatient]=useState();
    const [outpatient,setOutpatient]=useState();
    const [room,setRoom]=useState();
    useEffect(()=>{
        fetch(`https://pure-reef-02809.herokuapp.com/api/inpatient/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setInpatient(val);
        })
        fetch(`https://pure-reef-02809.herokuapp.com/api/doctor/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setDoctor(val);
        })
        fetch(`https://pure-reef-02809.herokuapp.com/api/outpatient/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            // console.log(val);
            setOutpatient(val);
        })
        fetch(`https://pure-reef-02809.herokuapp.com/api/rooms/${id}`, {
            method: "GET",
        }).then((data) => data.json() ).then((val) => {
            console.log(val);
            setRoom(val);
        })
    },[])
  return (
    <h6>{(doctor!=undefined)?doctor.name:((inpatient!=undefined)?inpatient.name:(outpatient!=undefined)?outpatient.name:(room!=undefined)?room.block+" "+room.roomNo:"Invalid ID")}</h6>
  )
}

export default ViewRole