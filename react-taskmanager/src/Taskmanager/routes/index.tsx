import Login from "../pages/Login";
import MyTasks from "../pages/MyTasks";
import Tasks from "../pages/Tasks";
import ViewUsers from "../pages/ViewUsers";
import AddRoles from "../pages/AddRolesToUser";
import ViewUserInfo from "../pages/ViewUserInfo";
import RemoveRoles from "../pages/RemoveRolesFromUser";
import ViewRoles from "../pages/ViewRoles";
import CreateRole from "../pages/CreateRole";

const routes = [
  {
    path: "/login",
    showOnMenu: false,
    isPublic: true,
    name: "Login",
    index: true,
    element: <Login />,
  },

  {
    path: "/home",
    showOnMenu: true,
    name: "Home",
    index: true,
    element: <Tasks />,
    roles: ["Users", "Managers", "Leaders"],
  },

  {
    path: "/my-tasks",
    showOnMenu: true,
    name: "My Tasks",
    index: true,
    element: <MyTasks />,
    roles: ["users"],
  },

  {
    path: "/users",
    showOnMenu: true,
    name: "Users",
    index: true,
    element: <ViewUsers />,
    roles: ["users"],
  },

  {
    path: "/userinformation/:userId",
    showOnMenu: false,
    name: "Users Information",
    index: true,
    element: <ViewUserInfo />,
    roles: ["users"],
  },
  {
    path: "/addroles/:userId",
    showOnMenu: false,
    name: "Add Roles",
    index: true,
    element: <AddRoles />,
    roles: ["users"],
  },
  {
    path: "/removeroles/:userId",
    showOnMenu: false,
    name: "Remove Roles",
    index: true,
    element: <RemoveRoles />,
    roles: ["users"],
  },
  {
    path: "/roles",
    showOnMenu: true,
    name: "View Roles",
    index: true,
    element: <ViewRoles />,
    roles: ["users"],
  },
  {
    path: "/createroles",
    showOnMenu: false,
    name: "Create Roles",
    index: true,
    element: <CreateRole />,
    roles: ["users"],
  },
];
export default routes;
