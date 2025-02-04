// import { useState } from "react";
// import {
//   Card,
//   Typography,
//   List,
//   ListItem,
//   ListItemPrefix,
//   ListItemSuffix,
//   Chip,
// } from "@material-tailwind/react";
// import {
//   PresentationChartBarIcon,
//   ShoppingBagIcon,
//   UserCircleIcon,
//   Cog6ToothIcon,
//   InboxIcon,
//   PowerIcon,
//   Bars3Icon,  // Hamburger Icon for mobile view
// } from "@heroicons/react/24/solid";

// const DefaultSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true);  // Toggle sidebar visibility on mobile
//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

//   return (
//     <div className="flex">
//       {/* Hamburger Icon for Mobile */}
//       <div className="block lg:hidden p-4">
//         <button onClick={toggleSidebar} className="text-blue-gray-700">
//           <Bars3Icon className="h-6 w-6" />
//         </button>
//       </div>

//       {/* Sidebar */}
//       <Card
//         className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-all duration-300 transform lg:translate-x-0 ${
//           isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//         } lg:block absolute lg:relative bg-white z-50`}
//       >
//         <div className="mb-2 p-4">
//           <Typography variant="h5" color="blue-gray">
//             Sidebar
//           </Typography>
//         </div>
//         <List>
//           <ListItem>
//             <ListItemPrefix>
//               <PresentationChartBarIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Dashboard
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <ShoppingBagIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             E-Commerce
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <InboxIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Inbox
//             <ListItemSuffix>
//               <Chip
//                 value="14"
//                 size="sm"
//                 variant="ghost"
//                 color="blue-gray"
//                 className="rounded-full"
//               />
//             </ListItemSuffix>
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <UserCircleIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Profile
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <Cog6ToothIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Settings
//           </ListItem>
//           <ListItem>
//             <ListItemPrefix>
//               <PowerIcon className="h-5 w-5" />
//             </ListItemPrefix>
//             Log Out
//           </ListItem>
//         </List>
//       </Card>
//     </div>
//   );
// };

// export default DefaultSidebar;


import { Card, Typography, List, ListItem, ListItemPrefix, Chip } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, InboxIcon, UserCircleIcon, Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/solid";

const DefaultSidebar = ({ isOpen }) => {
  return (
    <Card
      className={`h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 transition-all duration-300 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:block absolute lg:relative bg-white z-50`}
    >
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ShoppingBagIcon className="h-5 w-5" />
          </ListItemPrefix>
          E-Commerce
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <InboxIcon className="h-5 w-5" />
          </ListItemPrefix>
          Inbox
          {/* Handle the suffix manually */}
          <div className="ml-auto">
            <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
          </div>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserCircleIcon className="h-5 w-5" />
          </ListItemPrefix>
          Profile
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <Cog6ToothIcon className="h-5 w-5" />
          </ListItemPrefix>
          Settings
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
};

export default DefaultSidebar;
