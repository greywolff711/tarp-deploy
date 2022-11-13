import pict from "./logos/main_logo_v2.svg";
import pictblack from "./logos/main_logo_black.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddPrescription = () => {
  const [formdata, setFormdata] = useState({
    doctor: "",
    patient: "",
    image: null,
    medicine: "",
    instructions: "",
  });

  const [med, setMed] = useState([]);
  const [medSearch, setmedSearch] = useState();
  const onsubmit = (e) => {
    // console.log(medSearch);
    fetch(`http://localhost:5000/api/medicine/${medSearch}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setMed(data);
        formdata["medicine"] = med[0].name;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onchange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    console.log(formdata);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formdata);
    let newFormData = new FormData();
    newFormData.append("doctor", formdata.doctor);
    newFormData.append("patient", formdata.patient);
    newFormData.append("image", formdata.image);
    newFormData.append("medicine", formdata.medicine);
    newFormData.append("instructions", formdata.instructions);
    fetch("http://localhost:5000/api/prescription/", {
      method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
      body: newFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="m-0 font-sans antialiased font-normal text-base leading-default bg-gray-100 text-grey-700">
      <div className="w-full px-6 py-6 mx-auto">
        <form
          className="flex flex-col justify-center place-items-center"
          onSubmit={submitHandler}
        >
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-patient"
            >
              Patient Phone Number
            </label>
            <input
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white"
              id="grid-patient"
              type="text"
              placeholder="John Doe"
              name="patient"
              onChange={(e) => onchange(e)}
            />
          </div>{" "}
          <br />
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-patient"
            >
              Doctor Phone Number
            </label>
            <input
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white"
              id="grid-patient"
              type="text"
              placeholder="John Doe"
              name="doctor"
              onChange={(e) => onchange(e)}
            />
          </div>{" "}
          <br />
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <form onClick={(e) => onsubmit(e)}>
              <input
                className="font-semibold leading-tight text-xs rounded border-black border-2 px-3 py-3 transition duration-300"
                placeholder="Enter Medicine"
                type="text"
                value={medSearch}
                onChange={(e) => setmedSearch(e.target.value)}
              />
              <button
                className="ml-2 font-semibold leading-tight text-xs rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white"
                type="button"
              >
                Search
              </button>
            </form>
          </div>
          <br />
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-medicines"
            >
              Medicines
            </label>
            <textarea
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white"
              id="grid-address"
              type="text"
              placeholder="Crocin 500mg"
              name="medicine"
              value={formdata.medicine}
              onChange={(e) => onchange(e)}
            />
          </div>{" "}
          <br />
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-instructions"
            >
              Instructions
            </label>
            <textarea
              rows="4"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white"
              id="grid-instructions"
              type="text"
              placeholder="Crocin: 1-0-1 after food"
              name="instructions"
              onChange={(e) => onchange(e)}
            />
          </div>
          <div className="w-full md:w-[30rem] px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="grid-medicines"
            >
              prescription image
            </label>
            <input
              type="file"
              className="appearance-none block w-full text-gray-700 border border-gray-200 
                        rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-gray-400 focus:bg-white"
              id="grid-address"
              placeholder="Crocin 500mg"
              name="image"
              onChange={(e) =>
                setFormdata({ ...formdata, image: e.target.files[0] })
              }
            />
          </div>{" "}
          <br />
          <br />
          <ul>
            <li>
              <Link
                to={-1}
                className="px-7 py-3 bg-white uppercase rounded border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white"
              >
                Back
              </Link>
              <button
                type="submit"
                className="ml-3 px-7 py-3 bg-white uppercase rounded  border-black border-2 px-3 py-3 transition duration-300 hover:bg-black hover:text-white"
              >
                Add
              </button>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
};

export default AddPrescription;
