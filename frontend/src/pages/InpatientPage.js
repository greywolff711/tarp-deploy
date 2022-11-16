import React,{useState,useEffect} from 'react'
import Footer from '../components/Footer'
import { useLocation } from 'react-router-dom'
import InpatientNavabar from '../components/InpatientNavbar'
import EditInpatient from '../components/EditInpatient'
import RaiseQuery from '../components/RaiseQuery'
import RoomDetail from '../components/RoomDetail'
import AddQuery from '../components/AddQuery'
import AddQueryP from '../components/AddQueryP'
import ViewPrescription from '../components/ViewPrescription'
import ViewAppointment from '../components/ViewAppointment'
import AddAppointmentPatient from '../components/AddAppointmentPatient'
import AddInpatient from '../components/AddInpatient'

const InpatientPage = () => {
    const location = useLocation()
    console.log(location.pathname)
    const [prescription,setprescription]=useState([]);
    // let data ={
    //   "Prescription" :[
    //     {
    //       "patient":"John Doe",
    //       "doctor":"Doe John",
    //       "medicine":"Crocin 500mg",
    //       "instructions":"0-1-1 after food"
    //     }
    //     ]
    // }
    useEffect(()=>{
      fetch(`https://pure-reef-02809.herokuapp.com/api/prescription/`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
        setprescription(val);
        // console.log(val);
      })
    },[])
    const findComponent = () => { 
        if(location.pathname === "/inpatient/EditInpatient"){
            return <EditInpatient />
        }
        else if(location.pathname === "/inpatient/RaiseQuery"){
          return <RaiseQuery />
        }
                else if(location.pathname === "/inpatient/RoomDetail"){
          return <RoomDetail />
        }
        else if(location.pathname === "/inpatient/AddQuery" ){
          return <AddQuery />
        }
        else if(location.pathname === "/inpatient/ViewPrescription" ){
          return <ViewPrescription data={prescription}/>
        }
        else if(location.pathname === "/inpatient/ViewAppointment" ){
          return <ViewAppointment  />
        }
        else if(location.pathname === "/inpatient/AddAppointmentPatient" ){
          return <AddAppointmentPatient/>
        }
        // else if(location.pathname === "/admin/ManageDoctor" ){
        //     return <ManageDoctor />
    }
  return (
    <>
    <InpatientNavabar />
    {findComponent()}
    <Footer />
    </>
  )
}

export default InpatientPage