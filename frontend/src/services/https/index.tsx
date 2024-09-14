import { UsersInterface } from "../../interfaces/IUser";
import { SignInInterface } from "../../interfaces/SignIn";
import { LeaveRequestInterface } from "../../interfaces/ILeaveRequest"; // Assuming you have this interface
import axios from "axios";

const apiUrl = "http://localhost:8000";
const Authorization = localStorage.getItem("token");
const Bearer = localStorage.getItem("token_type");

const requestOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `${Bearer} ${Authorization}`,
  },
};

// User Functions
async function SignIn(data: SignInInterface) {
  return await axios
    .post(`${apiUrl}/signin`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsers() {
  return await axios
    .get(`${apiUrl}/users`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetUsersById(id: string) {
  return await axios
    .get(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateUsersById(id: string, data: UsersInterface) {
  return await axios
    .put(`${apiUrl}/user/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteUsersById(id: string) {
  return await axios
    .delete(`${apiUrl}/user/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateUser(data: UsersInterface) {
  return await axios
    .post(`${apiUrl}/signup`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

// Leave Request Functions
async function GetLeaveRequests() {
  return await axios
    .get(`${apiUrl}/leaverequests`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function GetLeaveRequestById(id: string) {
  return await axios
    .get(`${apiUrl}/leaverequest/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function UpdateLeaveRequestById(id: string, data: LeaveRequestInterface) {
  return await axios
    .put(`${apiUrl}/leaverequest/${id}`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function DeleteLeaveRequestById(id: string) {
  return await axios
    .delete(`${apiUrl}/leaverequest/${id}`, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

async function CreateLeaveRequest(data: LeaveRequestInterface) {
  return await axios
    .post(`${apiUrl}/leaverequest`, data, requestOptions)
    .then((res) => res)
    .catch((e) => e.response);
}

export {
  SignIn,
  GetUsers,
  GetUsersById,
  UpdateUsersById,
  DeleteUsersById,
  CreateUser,
  GetLeaveRequests,
  GetLeaveRequestById,
  UpdateLeaveRequestById,
  DeleteLeaveRequestById,
  CreateLeaveRequest,
};
