import React from 'react'
import AdminNavbar from '../components/AdminNavbar'
import Footer from '../components/Footer'
import ManageDoctor from '../components/ManageDoctor'
import EditPharmacist from '../components/EditPharmacist'
import { useLocation } from 'react-router-dom'
import ManageInpatient from '../components/ManageInpatient'
import ManageOutpatient from '../components/ManageOutpatient'
import ManagePharmacist from '../components/ManagePharmacist'
import ManageReceptionist from '../components/ManageReceptionist'
import ManageAppointments from '../components/ManageAppointments'
import ManageInventory from '../components/ManageInventory'
import EditDoctor from '../components/EditDoctor'
import EditInpatient from '../components/EditInpatient'
import EditOutpatient from '../components/EditOutpatient'
import EditReceptionist from '../components/EditReceptionist'
import EditAppointment from '../components/EditAppointment'
import EditInventory from '../components/EditInventory'
import AddDoctor from '../components/AddDoctor'
import AddInpatient from '../components/AddInpatient'
import AddOutpatient from '../components/AddOutpatient'
import AddReceptionist from '../components/AddReceptionist'
import AddAppointment from '../components/AddAppointment'
import AddInventory from '../components/AddInventory'
import AddPharmacist from '../components/AddPharmacist'
import AddBill from '../components/AddBill'
import ManageBill from '../components/ManageBill'
import EditBill from '../components/EditBill'

// import AddAppointment from '../components/AddAppointment'
const AdminPage = () => {
    const location = useLocation()
    console.log(location.pathname)

    const findComponent = () => { 
        if(location.pathname === "/admin/ManagePharmacist"){
            return <ManagePharmacist />
        }
        else if(location.pathname === "/admin/ManageDoctor" ){
            return <ManageDoctor />
        }
        else if(location.pathname === "/admin/ManageInpatient" ){
            return <ManageInpatient />
        }
        else if(location.pathname === "/admin/ManageOutpatient" ){
            return <ManageOutpatient />
        }
        else if(location.pathname === "/admin/ManageReceptionist" ){
            return <ManageReceptionist />
        }
        else if(location.pathname === "/admin/ManageInventory" ){
            return <ManageInventory />
        }
        else if(location.pathname === "/admin/ManageAppointments" ){
            return <ManageAppointments />
        }
        else if(location.pathname === "/admin/EditDoctor" ){
            return <EditDoctor />
        }
        else if(location.pathname === "/admin/EditInpatient" ){
            return <EditInpatient />
        }
        else if(location.pathname === "/admin/EditOutpatient" ){
            return <EditOutpatient />
        }
        else if(location.pathname === "/admin/EditReceptionist" ){
            return <EditReceptionist />
        }
        else if(location.pathname === "/admin/EditAppointment" ){
            return <EditAppointment />
        }
        else if(location.pathname === "/admin/EditInventory" ){
            return <EditInventory />
        }
        else if(location.pathname === "/admin/EditPharmacist" ){
            return <EditPharmacist />
        }
        else if(location.pathname === "/admin/AddDoctor" ){
            return <AddDoctor />
        }
        else if(location.pathname === "/admin/AddInpatient" ){
            return <AddInpatient />
        }
        else if(location.pathname === "/admin/AddOutpatient" ){
            return <AddOutpatient />
        }
        else if(location.pathname === "/admin/AddReceptionist" ){
            return <AddReceptionist />
        }
        else if(location.pathname === "/admin/AddAppointment" ){
            return <AddAppointment />
        }
        else if(location.pathname === "/admin/AddInventory" ){
            return <AddInventory />
        }
        else if(location.pathname === "/admin/AddPharmacist" ){
            return <AddPharmacist />
        }
        else if(location.pathname === "/admin/AddBill" ){
            return <AddBill />
        }
        else if(location.pathname === "/admin/ManageBill" ){
            return <ManageBill />
        }
        else if(location.pathname === "/admin/EditBill" ){
            return <EditBill />
        }
        // else if(location.pathname === "/AddAppointment" ){
        //     return <AddAppointment />
        // }
    }
  return (
    <>
    <AdminNavbar />
    {findComponent()}
    <Footer />
    </>
  )
}

export default AdminPage