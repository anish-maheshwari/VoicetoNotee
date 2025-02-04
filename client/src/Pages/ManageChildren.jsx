import { Outlet, redirect, useLoaderData } from 'react-router-dom';

import Navbar from "../Components/Navbar";
import { customFetch } from "../Utills/customFetch";
import Cookies  from "js-cookie";
import axios from 'axios';
import { createContext } from 'react';

// export const loader = async () => {
//   const { data } = await axios.get('http://localhost:5100/api/v1/users/admin/app-stats', {
//     withCredentials: true,  // Allow sending cookies with the request
//   });
//   return data;
// };


export const loader = async () => {
  try {
    const { data } = await customFetch('/users/admin/app-stats');
    return data;
  } catch (error) {
    return redirect('/error');
  }
};
const DasboardContext = createContext();


const ManageChildren = () => {
  const data = useLoaderData();

  return (
    < DasboardContext.Provider value={{data}}>{
    <div>
      <Navbar />
      <Outlet /> {/* 🔹 Renders child routes (HomePage, EditPage) */}
    </div>}
    </DasboardContext.Provider>
  );
};

export const useDashboardContext = ()=> useContext(DasboardContext);
export default ManageChildren;
