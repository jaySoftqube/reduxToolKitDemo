import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./App.css";
import { removeStudent } from "./utils/studentSlice";

const StudentData = () => {
  const studentDetailFromRTK = useSelector(
    (store) => store.studentData.studentDetails
  );
  const dispatch = useDispatch();
  console.log("studentDetailFromRTK:::", studentDetailFromRTK);

  return (
    <div>
      <div
        className="d-flex justify-content-end mt-5 gap-4"
        style={{ marginRight: "5%" }}
      >
        <Link to="/teacherDetail" className="btn btn-primary">
          Go To Teacher Page
        </Link>
        <Link to="/add-student" className="btn btn-primary">
          Add Student
        </Link>
      </div>

      <div className="d-flex justify-content-center mt-5">
        <table className="table w-25">
          <thead>
            <tr>
              <th scope="col">FirstName</th>
              <th scope="col">LastName</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {studentDetailFromRTK.length > 0 ? (
              studentDetailFromRTK.map((student, index) => (
                <tr key={index}>
                  <td>{student.fName}</td>
                  <td>{student.lName}</td>
                  <td
                    className="text-danger cursor-pointer"
                    onClick={() => {
                      dispatch(removeStudent(index));
                    }}
                  >
                    Delete
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center" colSpan={3}>
                  No Data Found
                </td>
              </tr>
            )}
            {/* <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentData;
