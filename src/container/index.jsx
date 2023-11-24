import React, { useEffect, useState } from "react";
import { MoonLoader, PulseLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { get } from "../utils/get";
import { post } from "../utils/post";

export default function Index() {
   const [name, setName] = useState("");
   const [sector, setSector] = useState("");
   const [terms, setTerms] = useState(false);
   const [err, setErr] = useState({ level: "", msg: "" });

   const [options, setOptions] = useState([]);

   const [loading, setLoading] = useState(false);

   useEffect(() => {
      getOptions();
   }, []);

   const getOptions = async () => {
      try {
         const res = await get("/get/sectors");
         setOptions(res.sectors);
         console.log(res);
      } catch (error) {
         console.log(error);
      }
   };
   const validateForm = () => {
      // This function takes the forms states and checks if their empty
      // if they're empty, it the set an error state.

      const inputs = { name, sector, terms };

      if (inputs.name === "") {
         setErr({ level: 1, msg: "Please Insert your name" });
         return false;
      } else if (inputs.sector === "") {
         setErr({ level: 2, msg: "Please select sector" });
         return false;
      } else if (terms === false) {
         setErr({ level: 3, msg: "Kindly Accept Terms " });
         return false;
      } else {
         setErr({ level: "", msg: "" });
         return true;
      }
   };

   const handleSubmit = async (e) => {
      e.preventDefault();

      // validate input fields
      const isValid = validateForm();
      if (isValid) {
         try {
            setLoading(true);
            const data = { sector, name };
            const res = await post("/post/data", data);
            setLoading(false);
            console.log(res);
            toast.success(res.message);
         } catch (error) {
            console.log(error);
         }
      }
   };
   return (
      <div className=" h-[100vh] flex items-center justify-center">
         <div className="col-lg-4 col-md-8 leading-9">
            <form className="shadow p-3 rounded-lg" onSubmit={handleSubmit}>
               <ToastContainer theme="dark" />
               <div className="heading mb-4 leading-4">
                  <span className="text-xl font-medium">
                     Please enter your name and pick the Sectors you are
                     currently involved in.
                  </span>
               </div>
               <div className="form-group mb-3">
                  <span>Name</span>
                  <input
                     type="text"
                     className={`form-control ${
                        err.level === 1 && "border-red-500"
                     }`}
                     value={name}
                     onChange={(e) => {
                        setName(e.target.value);
                     }}
                  />
                  <div className="err-wrap text-red-500">
                     {err.level === 1 && err.msg}
                  </div>
               </div>

               <div className="form-group mb-3">
                  <span>Sector</span>
                  <select
                     className={`form-select ${
                        err.level === 2 && "border-red-500"
                     }`}
                     value={sector}
                     onChange={(e) => {
                        setSector(e.target.value);
                     }}
                  >
                     <option value="" defaultChecked>
                        Select Sector
                     </option>
                     {options.map((opt, index) => (
                        <option value={opt.Value} key={index}>
                           {" "}
                           {opt.Text}{" "}
                        </option>
                     ))}
                  </select>
                  <div className="err-wrap text-red-500">
                     {err.level === 2 && err.msg}
                  </div>
               </div>
               <div className="form-group">
                  <input
                     type="checkbox"
                     value={terms}
                     onChange={(e) => setTerms(e.target.checked)}
                     //  required
                  />{" "}
                  <span>Accept Terms</span>
                  <div className="err-wrap text-red-500">
                     {err.level === 3 && err.msg}
                  </div>
               </div>
               <div className="btn-wrap">
                  <button
                     type="submit"
                     className="border-collapse bg-blue-500 p-2 rounded-pill w-full text-light hover:bg-blue-600"
                  >
                     {loading ? (
                        <PulseLoader size={10} color={"#fff"} />
                     ) : (
                        "Save"
                     )}
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
}
