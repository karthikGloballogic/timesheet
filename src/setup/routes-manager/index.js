import { createBrowserRouter } from "react-router-dom";
// Page Import
import App from "../../App";
import Manager from "../../pages/manager";
import Employee from "../../pages/employee";
import ViewDetails from "../../pages/viewDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
