import { createBrowserRouter } from "react-router-dom";
// Page Import
import App from "../../App";
import Manager from "../../pages/manager";
import Employee from "../../pages/employee";
import ViewDetails from "../../pages/viewDetails";
import Home from "../../pages/home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "manager",
    element: <Manager />,
  },
  {
    path: "employee",
    element: <Employee />,
  },
  {
    path: "viewDetails",
    element: <ViewDetails />,
  },
]);

export default router;
