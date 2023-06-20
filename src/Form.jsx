import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "./utils/studentSlice";
import { useNavigate } from "react-router-dom";
import { addTeacher } from "./utils/teacherSlice";

const Form = () => {
  const [formData, setFormData] = useState({ fName: "", lName: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormData = () => {
    if (window.location.href.includes("add-student")) {
      dispatch(addStudent(formData));
      navigate("/");
    } else {
      dispatch(addTeacher(formData));
      navigate("/teacherDetail");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">First Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter FirstName"
            value={formData.fName}
            onChange={(e) =>
              setFormData({ ...formData, fName: e.target.value })
            }
          />
        </div>
        <div className="form-group mt-3">
          <label htmlFor="exampleInputPassword1">Last Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter LastName"
            value={formData.lName}
            onChange={(e) =>
              setFormData({ ...formData, lName: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary mt-3"
          onClick={() => {
            handleFormData();
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
