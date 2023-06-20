import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import StudentData from "./StudentData";
import TeacherData from "./TeacherData";
import Form from "./Form";
import { Provider } from "react-redux";
import store from "./utils/store";
import Chart from "./Chart";
import ClustredChart from "./ClustredChart";

const appRouter = createBrowserRouter([
  { path: "/", element: <StudentData /> },
  { path: "/teacherDetail", element: <TeacherData /> },
  { path: "/add-student", element: <Form /> },
  { path: "/add-teacher", element: <Form /> },
  { path: "/chart", element: <Chart /> },
  { path: "/clusteredChart", element: <ClustredChart /> },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter}></RouterProvider>
    </Provider>
  );
}

export default App;
