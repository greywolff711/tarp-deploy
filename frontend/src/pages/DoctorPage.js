import React from 'react'
import { useLocation } from 'react-router-dom'
import AddAppointment from '../components/AddAppointment'
import AddInpatient from '../components/AddInpatient'
import AddPrescription from '../components/AddPrescription'
// import AddAppointment from '../components/AddAppointment'
import DoctorNavbar from '../components/DoctorNavbar'
import EditAppointment from '../components/EditAppointment'
import EditDoctor from '../components/EditDoctor'
import EditInpatient from '../components/EditInpatient'
import EditPrescription from '../components/EditPrescription'
import Footer from '../components/Footer'
import ManageAppointments from '../components/ManageAppointments'
import ManageInpatient from '../components/ManageInpatient'
import ManageOutpatient from '../components/ManageOutpatient'
import ManagePrescription from '../components/ManagePrescription'
import TodaySchedule from '../components/TodaySchedule'
function DoctorPage() {
    const location = useLocation()
    // console.log(location.pathname)

    const findComponent = () => { 
        if(location.pathname === "/doctor/ManageAppointments"){
            return <ManageAppointments />
        }
        else if(location.pathname === "/doctor/ManageInpatient" ){
            return <ManageInpatient />
        }
        else if(location.pathname === "/doctor/AddInpatient"){
          return <AddInpatient />
        }
        else if(location.pathname === "/doctor/EditInpatient"){
          return <EditInpatient />
        }
        else if(location.pathname === "/doctor/ManageOutpatient" ){
          return <ManageOutpatient />
        }
        else if(location.pathname === "/doctor/EditDoctor" ){
          return <EditDoctor />
        }
        else if(location.pathname === "/doctor/ManagePrescription" ){
          return <ManagePrescription />
        }
        else if(location.pathname === "/doctor/EditPrescription" ){
          return <EditPrescription />
        }
        else if(location.pathname === "/doctor/AddPrescription" ){
          return <AddPrescription />
        }
        else if(location.pathname === "/doctor/AddAppointment" ){
          return <AddAppointment />
        }
        else if(location.pathname === "/doctor/ManageAppointments" ){
          return <ManageAppointments />
        }
        else if(location.pathname === "/doctor/EditAppointment" ){
          return <EditAppointment />
        }
        else if(location.pathname === "/doctor/TodaySchedule" ){
          return <TodaySchedule />
        }
        

      //   else if(location.pathname === "/doctor/AddAppointment" ){
      //     return <AddAppointment />
      // }
    }
  return (
    <>
        <DoctorNavbar />
        {findComponent()}
        <Footer />
    </>
  )
}

export default DoctorPage