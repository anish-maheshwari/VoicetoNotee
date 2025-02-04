import { Outlet, redirect, useLoaderData } from 'react-router-dom';

import Navbar from "../Components/Navbar";
import { customFetch } from "../Utills/customFetch";
import Cookies  from "js-cookie";
import axios from 'axios';

export const loader = async () => {
  const { data } = await axios.get('http://localhost:5100/api/v1/users/admin/app-stats', {
    withCredentials: true,  // Allow sending cookies with the request
  });
  return data;
};




const ManageChildren = () => {
  const data = useLoaderData();
console.log(data);
  return (
    <div>
      <Navbar />
      <Outlet /> {/* 🔹 Renders child routes (HomePage, EditPage) */}
    </div>
  );
};


export default ManageChildren;