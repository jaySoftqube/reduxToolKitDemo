import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeTeacher } from "./utils/teacherSlice";

const TeacherData = () => {
  const teacherDetailFromRTK = useSelector(
    (store) => store.teacherData.teacherDetails
  );
  const dispatch = useDispatch();
  console.log("teacherDetailFromRTK:::", teacherDetailFromRTK);

  return (
    <div>
      <div
        className="d-flex justify-content-end mt-5 gap-4"
        style={{ marginRight: "5%" }}
      >
        <Link to="/" className="btn btn-primary">
          Go To Student Page
        </Link>
        <Link to="/add-teacher" className="btn btn-primary">
          Add Teacher
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
            {teacherDetailFromRTK.length > 0 ? (
              teacherDetailFromRTK.map((student, index) => (
                <tr key={index}>
                  <td>{student.fName}</td>
                  <td>{student.lName}</td>
                  <td
                    className="text-danger cursor-pointer"
                    onClick={() => {
                      dispatch(removeTeacher(index));
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
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeacherData;
