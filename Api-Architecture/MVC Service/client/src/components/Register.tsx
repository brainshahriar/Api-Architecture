import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Register: React.FC = () => {
  return (
    <>
      <div className="container">
        <Navbar />
        <NavLink to="/">home</NavLink>
        <form
          className="mt-4"
          id="myform"
        >
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Title</label>
              <input
                type="text"
                //   value={inpval.title}
                name="title"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3 col-lg-12 col-md-12 col-12">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                //   value={inpval.description}
                className="form-control"
                id=""
                cols={30}
                rows={5}
              ></textarea>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Image</label>
              <input
                type="file"
                name="image"
                // onChange={(e) => setImage(e.target.files[0])}
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
