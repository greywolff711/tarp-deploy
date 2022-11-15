import React,{useState,useEffect} from 'react'
import { useLocation } from 'react-router-dom'
import AddInventory from '../components/AddInventory'
import EditInventory from '../components/EditInventory'
import EditPharmacist from '../components/EditPharmacist'
import Footer from '../components/Footer'
import ManageInventory from '../components/ManageInventory'
import PharmacistNavbar from '../components/PharmacistNavbar'
import ViewPrescription from '../components/ViewPrescription'
function PharmacistPage() {
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
      fetch(`http://localhost:5000/api/prescription/`,{headers:{'Content-Type':'application/json'}}).then((data) => data.json() ).then((val) => {
        setprescription(val);
        console.log(val);
      })
  },[])
    const findComponent = () => { 
        if(location.pathname === "/pharmacist/ManageInventory"){
            return <ManageInventory />
        }
        else if(location.pathname === "/pharmacist/EditPharmacist" ){
          return <EditPharmacist />
        }
        else if(location.pathname === "/pharmacist/EditInventory" ){
          return <EditInventory />
        }
        else if(location.pathname === "/pharmacist/AddInventory" ){
          return <AddInventory />
      }
      else if(location.pathname === "/pharmacist/ViewPrescription" ){
        return <ViewPrescription data={prescription}/>
      }
        // else if(location.pathname === "/admin/ViewPrescription" ){
        //     return <pres />
        // }
    }
  return (
    <>
        <PharmacistNavbar />
        {findComponent()}
        <Footer />
    </>
  )
}

export default PharmacistPage