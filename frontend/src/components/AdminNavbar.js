import React from 'react'
import pictblack from "./logos/main_logo_black.svg";
import { Link } from "react-router-dom";
const AdminNavabar = () => {
    return (
        <nav className="bg-gray-100 relative flex flex-wrap items-center justify-between px-2 py-2 mx-0 transition-all shadow-none duration-250 ease-soft-in lg:flex-nowrap lg:justify-start">
            <div className="flex items-center justify-between w-full px-4 py-1 mx-auto flex-wrap-inherit">
                <nav className="text-xl">
                    <ul>
                        <li>
                            <img className="object-cover ml-[690px] w-25 h-20" src={pictblack} alt="project_logo" />
                        </li>
                        <li className="object-cover ml-[615px]">
                            Hospital Management System
                        </li>
                    </ul>
                    <br />
                    <ul className="flex">
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                            <Link to="/admin/ManageDoctor">Doctors</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                            <Link to="/admin/ManageInpatient">Inpatient</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                             <Link to="/admin/ManageOutpatient">Outpatient</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                            <Link to="/admin/ManageReceptionist">Receptionist</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                            <Link to="/admin/ManageAppointments">Appointments</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white" href="">
                            <Link to="/admin/ManageInventory">Inventory</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white">
                            <Link to="/admin/ManagePharmacist">Pharmacist</Link>
                        </li>
                        <li className="mt-0.5 w-full rounded border-black border-2 bg-white text-black py-3 mr-2 text-xl flex justify-center place-items-center whitespace-nowrap px-4 transition duration-300 hover:bg-black hover:text-white">
                            <Link to="/admin/ManageBill">Billing</Link>
                        </li>
                        <li className="ml-[305px]">
            
                        </li>
                        <li>
                        <Link to="/login">
                            <button className="rounded bg-white border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white">LOGOUT</button>
                        </Link>
                        </li>
                    </ul>

                </nav>

            </div>
        </nav>
    )
}

export default AdminNavabar