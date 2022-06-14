import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";
import axios from "axios";
const createObjectURL = require("create-object-url");

const Register: React.FC = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const imageRef = useRef<HTMLInputElement>(null);
  const [defaultData, setDefaultData] = useState<any>({});
  const [imgPreview, setImgPreview] = useState<any>("");

  const [postValue, setValue] = useState({
    title: "",
    description: "",
  });

  const getData = async () => {
    await axios
      .get(`http://localhost:8000/api/user/getall/${id}`)
      .then((result) => {
        setDefaultData(result.data.result);
        setImgPreview(result.data.result?.image);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
  }, [id]);
  // console.log(defaultData && defaultData);
  const handleData = (e: any) => {
    const { name, value } = e.target;
    setValue((val) => {
      return {
        ...val,
        [name]: value,
      };
    });
  };

  const [image, setImage] = useState<any>({});

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let formTable = new FormData();
    if (postValue.title) {
      formTable.append("title", postValue.title);
    }
    if (postValue.description) {
      formTable.append("description", postValue.description);
    }
    if (image) {
      formTable.append("image", image);
    }

    const createTable = async () => {
      await axios({
        method: "post",
        url: "http://localhost:8000/api/user/post",
        data: formTable,
        headers: {
          "Content-Type": `multipart/form-data`,
        },
      });
    };

    createTable();
    alert("Inserted");

    // var dirtyFormID = 'myform';
    // var resetForm:any= document.getElementById(dirtyFormID);
    // resetForm.reset();

    // setValue({
    //     title: "",
    //     description: "",
    //   })
    //   setImage({})

    navigate("/home");
  };
  return (
    <>
      <div className="container">
        <Navbar />
        <NavLink to="/">home</NavLink>
        <form className="mt-4" id="myform" onSubmit={handleSubmit}>
          <div className="row">
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Title</label>
              <input
                defaultValue={defaultData && defaultData.title}
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
                defaultValue={defaultData && defaultData.description}
                className="form-control"
                onChange={handleData}
                cols={30}
                rows={5}
              ></textarea>
            </div>
            <div className="mb-3 col-lg-6 col-md-6 col-12">
              <label className="form-label">Image</label>
              <div
                className="image-div"
                onClick={() => imageRef.current?.click()}
              >
                {imgPreview ? (
                  <img
                    className="previewImg"
                    src={
                      typeof imgPreview === "object"
                        ? createObjectURL(imgPreview)
                        : `http://localhost:8000/public/${imgPreview}`
                    }
                    alt=""
                  />
                ) : (
                  <p>Selet Image</p>
                )}
              </div>
              <input
                type="file"
                name="image"
                style={{ display: "none" }}
                ref={imageRef}
                onChange={(e: any) => {
                  setImage(e.currentTarget.files[0]);
                  setImgPreview(e.currentTarget.files[0]);
                }}
                className="form-control"
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
