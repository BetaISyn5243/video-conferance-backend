import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Main from "../pages/main";
import CreateRoom from "../pages/create_room";
import JoinRoom from "../pages/join_room";
import Call from "../pages/call";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
  },  {
    path: "/login",
    element: <Login/>,
  },  {
    path: "/register",
    element: <Register/>,
  },  {
    path: "/home",
    element: <Home/>,
  },
  {
    path:"/create-room",
    element: <CreateRoom/>,
  },
  {
    path:"/join-room",
    element: <JoinRoom/>,
  },
  {
    path:"/call/:callId",
    element: <Call/>,
  },
  {
    path:"/end-call",
    element: <Home/>,
  }
]);