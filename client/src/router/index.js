import { Navigate } from "react-router-dom";

import Home from "../pages/Home/index.jsx";
import Login from "../pages/Login/index.jsx";
import NotFound from "../pages/NotFound/index.jsx";

const routes = [
    { path: "/", element: <Navigate to="/home" /> },
    { path: "/home", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
];

export default routes;
