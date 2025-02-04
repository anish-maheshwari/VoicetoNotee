
// import { Form, redirect, useNavigation, Link } from 'react-router-dom';

// import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
// import { FormRow, Logo } from "../components";
// // import {customFetch} from "../utills/customFetch.js"
// import axios from 'axios';
// import { toast } from 'react-toastify';

// // export const action = async ({ request }) => {
// //     const formData = await request.formData();
// //     const data = Object.fromEntries(formData);
// //     try {
// //       await customFetch.post('/auth/register', data);
// //       toast.success('Registration successful');
// //       return redirect('/login');
// //     } catch (error) {
// //       toast.error(error?.response?.data?.msg);
// //       return error;
// //     }
// //   };

// const Register = ()=>{
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === 'submitting';
//     return (
// <Wrapper>
// <Form method='post' className='form'>
//         <Logo />
//         <h4>Register</h4>
//       <FormRow type="text" labeltext="Name" name="name" />
//       <FormRow type="text" labeltext="Last-Name" name="lastName" />
//       <FormRow type="text" labeltext="Location" name="location" />
//       <FormRow type="email" labeltext="Email" name="email" />
//       <FormRow type="password" labeltext="Pasword" name="password" />
   
//         <button type='submit' className='btn btn-block' disabled={isSubmitting}>
//           {isSubmitting ? 'submitting...' : 'submit'}
//         </button>
//         <p>Already a member?
//         <Link to="/Login" className="member-btn">Login</Link>
//         </p>
//     </Form>

// </Wrapper>

//     );
// };

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { redirect } from "react-router-dom";

// export const action = async ({ request }) => {
//   const formData = new FormData(request.formData());
//   const userData = Object.fromEntries(formData);
//   console.log(userData);


//   const response = await fetch("http://localhost:5100/api/v1/auth/register", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(userData),
//   });

//   if (!response.ok) {
//     return { error: "Registration failed. Please try again." };
//   }

//   return redirect("/login"); // Redirect to login page after successful registration
// };

// const RegisterPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleRegister = (e) => {
//     e.preventDefault();
//     // Validate the input
//     if (!name || !email || !password) {
//       setError("All fields are required");
//       return;
//     }
//     setError("");

//     // Perform registration (you can integrate API call here)
//     console.log("Registration successful!");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
//         {error && <p className="text-red-500 text-center mb-4">{error}</p>}
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label htmlFor="name" className="block text-gray-700">Name</label>
//             <input
//               type="text"
//               id="name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               placeholder="Enter your name"
//             />
//           </div>

//           <div className="mb-4">
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               placeholder="Enter your email"
//             />
//           </div>

//           <div className="mb-6">
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               placeholder="Enter your password"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700"
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-center">
//           Already have an account?{" "}
//           <Link to="/login" className="text-blue-600 hover:text-blue-700">
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default RegisterPage;
import React, { useState } from "react";
import { Form, Link, redirect } from "react-router-dom";
import {customFetch} from "../Utills/customFetch"
import axios from 'axios';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await customFetch.post('/auth/register', data);
      toast.success('Registration successful');
      return redirect('/login');
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return error;
    }
  };
const RegisterPage = () => {
  const [error, setError] = useState("");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Use react-router Form component here to bind to the action */}
        <Form method="post" className="space-y-6">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"  // Make sure 'name' matches the backend field
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"  // Make sure 'email' matches the backend field
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"  // Make sure 'password' matches the backend field
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700"
          >
            Register
          </button>
        </Form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
