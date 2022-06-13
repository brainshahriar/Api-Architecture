import React, { useEffect, useState,useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Register: React.FC = () => {
    let navigate = useNavigate();

    const [postValue,setValue]=useState({
        title:"",
        description:""
    })

    const handleData = (e:any)=>{
        const  {name,value}=e.target;
        setValue((val)=>{
            return {
                ...val,
                [name]:value
            }
        })
    }

    const [image,setImage]=useState<any>({})

    const handleSubmit=(e:any)=>{
        e.preventDefault();
        let formTable = new FormData();
        if(postValue.title){
            formTable.append("title",postValue.title);
        }
        if(postValue.description){
            formTable.append("description",postValue.description);
        }
        if(image){
            formTable.append("image",image);
        }

        const createTable = async () =>{
            await axios({
                method:"post",
                url:"http://localhost:8000/api/user/post",
                data:formTable,
                headers:{
                    "Content-Type": `multipart/form-data`,
                },
            })
        }

        createTable();
        alert("Inserted")

        // var dirtyFormID = 'myform';
        // var resetForm:any= document.getElementById(dirtyFormID);
        // resetForm.reset();
        
        // setValue({
        //     title: "",
        //     description: "",
        //   })
        //   setImage({})

          navigate('/home')
    }
  return (
    <>
      <div className="container">
        <Navbar />
        <NavLink to="/">home</NavLink>
        <form
          className="mt-4"
          id="myform"
          onSubmit={handleSubmit}
        >
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                onChange={handleData}
              />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                className="form-control"
                onChange={handleData}
                cols={30}
                rows={5}
              ></textarea>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Image</label>
              <input
           
                type="file"
                name="image"
                onChange={(e:any) => setImage(e.target.files[0])}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
