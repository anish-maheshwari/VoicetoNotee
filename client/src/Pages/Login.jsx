

// import React, { useState } from "react";
// import { Form, Link, useNavigation } from "react-router-dom";
// import { redirect } from "react-router-dom";
// import { customFetch } from "../Utills/customFetch";
// import { toast } from "react-toastify";
// export const action = async ({ request }) => {
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData); // Extract email and password correctly

//   try {
//     const response = await fetch("http://localhost:5100/api/v1/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials: "include", // Include cookies automatically
//       body: JSON.stringify(data), // Use `data`, not undefined variables
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }

//     const result = await response.json(); // Parse JSON response

//     toast.success("Login successful");
//     return redirect("/dashboard");
//   } catch (error) {
//     console.error("Login Error:", error.message);
//     toast.error("Something went wrong!");
//     return { error: error.message }; // Return an error message instead of the object
//   }
// };


// const LoginPage = () => {
//   const navigation = useNavigation();
//   const isSubmitting = navigation.state === "submitting";

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
//         <h2 className="text-2xl font-bold text-center mb-6">Login to AI Notes</h2>

//         <Form method="post" className="space-y-4">
//           <div>
//             <label htmlFor="email" className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               placeholder="Enter your email"
//               defaultValue="test@test23.com"
//               required
//             />
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               className="w-full p-3 mt-2 border border-gray-300 rounded-md"
//               placeholder="Enter your password"
//               defaultValue="test@9400"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 disabled:bg-gray-500"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? "Logging in..." : "Login"}
//           </button>
//         </Form>

//         <p className="mt-4 text-center">
//           Don't have an account?{" "}
//           <Link to="/register" className="text-blue-600 hover:text-blue-700">
//             Register here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from "react";
import { Form, Link, useNavigation } from "react-router-dom";
import { redirect } from "react-router-dom";
import { customFetch } from "../Utills/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {

  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successful');
    return redirect('/dashboard');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};


const LoginPage = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login to AI Notes</h2>

        <Form method="post" className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
              defaultValue="test@test23.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-3 mt-2 border border-gray-300 rounded-md"
              placeholder="Enter your password"
              defaultValue="test@9400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-700 disabled:bg-gray-500"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </Form>

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:text-blue-700">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;



