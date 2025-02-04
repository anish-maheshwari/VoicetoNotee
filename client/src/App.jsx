// import{createBrowserRouter,BrowserRouter,RouterProvider} from "react-router-dom";
// // import HomePage from "./Pages/HomePage.jsx";
// import HomePage, { loader as homeLoader, action as homeAction } from "./pages/HomePage";
// import RegisterPage from "./Pages/Register.jsx";
// import LoginPage from "./Pages/Login.jsx";
// import ErrorPage from "./Pages/ErrorPage.jsx";
// import FirstPage from "./Pages/FirstPage.jsx";




// const router = createBrowserRouter([

  
// { path:"/",
//   element: <FirstPage /> ,
//   errorElement:<ErrorPage />,
//   children:[
    
//     {
//       index:true,
//       element: <FirstPage/>
//     },]},


//     { path:"Dashboard",
//       element: <HomePage /> ,
//       loader: homeLoader,  // 🔹 Fetch notes before rendering HomePage
//       action: homeAction,  // 🔹 Handle form submissions (new notes)
//       children:[
//         {
//           path: "/edit/:id",
//           element: <EditNotePage />,
//           action: updateNote, // action for editing the note
//         },
//         {
//           path: "/create",
//           element: <EditNotePage />,
//           action: createNote, // action for creating the note
//         },
//         {
//           path: "/delete/:id",
//           action: deleteNote, // action for deleting the note
//         },
//       ]
    
//     },
// {
// path: 'register',
// element: <RegisterPage />,
// },
//     { path:"Login",
//       element: <LoginPage /> ,
    
//     }

// ])

// function App() {
//   return (
   
//     <RouterProvider router={router}/>
//   )
// }

// export default App




import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EditPage, { action as updateNote } from "./pages/EditPage";
import RegisterPage,{action as registerAction} from "./pages/Register";
import LoginPage,{action as loginAction}  from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import FirstPage from "./pages/FirstPage";
import TestPage from "./pages/TestPage";
import ManageChildren,{loader as ManageLoader} from "./pages/ManageChildren";
// In your index.js or App.js file
import axios from 'axios';

// Set global configuration for axios
axios.defaults.withCredentials = true;






const router = createBrowserRouter([
  {
    path :"test",
    element : <TestPage/>
  },
  {
    path: "/",
    element: <FirstPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <FirstPage />,
      },
   
    ],
  },
  {
    path: "dashboard",
    element: <ManageChildren />,// 🔹 Wrapper for nested routes
    loader : ManageLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      
      },
      {
        path: "edit/:id",
        element: <EditPage />,
        action: updateNote, // 🔹 Action for updating a note
      },
    ],
  },
  {
    path: "register",
    element: <RegisterPage />,
    action: registerAction,
  },
  {
    path: "login",
    element: <LoginPage />,
    action: loginAction,
    
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
