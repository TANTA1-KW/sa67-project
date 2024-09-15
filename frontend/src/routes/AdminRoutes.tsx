import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";

// Existing imports
const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));

// New imports for employee routes
const EmployeePage = Loadable(lazy(() => import("../pages/employee")));
const CreateEmployee = Loadable(lazy(() => import("../pages/employee/create")));
const EditEmployee = Loadable(lazy(() => import("../pages/employee/edit")));

const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      
      // New employee routes
      {
        path: "employee", // Use relative path
        element: <EmployeePage />, // Default route for /employee
        children: [
          {
            path: "", // Default child route for /employee
            element: <EmployeePage />,
          },
          {
            path: "create", // Route for /employee/create
            element: <CreateEmployee />,
          },
          {
            path: "edit/:id", // Route for /employee/edit/:id
            element: <EditEmployee />,
          },
        ],
      },
    ],
  };
};

export default AdminRoutes;
