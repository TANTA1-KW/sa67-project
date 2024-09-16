import { lazy } from "react";
import { RouteObject } from "react-router-dom";
import Loadable from "../components/third-patry/Loadable";
import FullLayout from "../layout/FullLayout";

// Lazy loading components
const MainPages = Loadable(lazy(() => import("../pages/authentication/Login")));
const EmployeePage = Loadable(lazy(() => import("../pages/employee")));
const CreateEmployee = Loadable(lazy(() => import("../pages/employee/create")));
const EditEmployee = Loadable(lazy(() => import("../pages/employee/edit")));
const ProfilePage = Loadable(lazy(() => import("../pages/profile"))); // เพิ่มเส้นทางไปหน้าโปรไฟล์


const AdminRoutes = (isLoggedIn: boolean): RouteObject => {
  return {
    path: "/",
    element: isLoggedIn ? <FullLayout /> : <MainPages />,
    children: [
      // Employee routes
      {
        path: "employee", // Base route for employee-related views
        element: <EmployeePage />,
        children: [
          {
            path: "", // Default child route
            element: <EmployeePage />,
          },
          {
            path: "create",
            element: <CreateEmployee />,
          },
          {
            path: "edit/:id", // Dynamic route for editing specific employee
            element: <EditEmployee />,
          },
        ],
      },
      // Profile route
      {
        path: "profile", // เส้นทางสำหรับหน้าโปรไฟล์
        element: <ProfilePage />,
      },
    ],
  };
};

export default AdminRoutes;
