import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";

const Home: React.FC = () => {
  const [userData, setuserData] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/user/getall")
      .then((result) => {
        setuserData(result.data.result);
        console.log(result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  


  return (
    <>
      <div className="mt-5">
        <div className="container">
          <Navbar />
          <div className="add_btn mt-2 mb-2">
            <Link to="/register" className="btn btn-primary">
              Add data
            </Link>
          </div>
          <table className="table">
            <thead>
              <tr className="table-dark">
                <th scope="col">id</th>
                <th scope="col">Title</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userData &&
                userData.map((element, id) => {
                  return (
                    <tr>
                      <th scope="row">{id + 1}</th>
                      <td>{element.title}</td>
                      <td>dsfsdf</td>
                      <td>
                        <img
                          alt=""
                          style={{ height: "100px", width: "100px" }}
                          src={`http://localhost:8000/public/${element?.image}`}
                        />
                      </td>
                      <td className="d-flex justify-content-between">
                        <Link to="">
                          {" "}
                          <button className="btn btn-success">View</button>
                        </Link>
                        <Link className="btn btn-primary" to="">
                          {" "}
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            const confirmBox = window.confirm(
                              "Do you really want to delete " + element.title
                            );
                            if (confirmBox === true) {
                              // deleteRecord(element._id)
                            }
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
