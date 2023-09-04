import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "./ProtectedRoute";
import MainMenu from "../pages/MainMenu";
import Stock from "../pages/Stock";
import Favorites from "../pages/Favorites";
import Settings from "../pages/Settings";
import { useCurrentUser } from "../provider/CurrentUserProvider";
import Admin from "../pages/Admin";
import Compare from "../pages/Compare";

function MyRoutes() {
   const {currentUser} = useCurrentUser();
   const isLoggedIn = currentUser ? true : false;
   const isAdmin = currentUser && currentUser.userType === "ADMIN" ? true : false;

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ProtectedRoute redirectPath="/login" isAllowed={isLoggedIn} />}>
                    {<Route path="/" element={<MainMenu />} />}
                    <Route path="/stock/:symbol" element={<Stock />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/compare" element={<Compare />} />
                </Route>
                <Route element={<ProtectedRoute redirectPath="/" isAllowed={!isLoggedIn} />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route element={<ProtectedRoute redirectPath="/" isAllowed={isAdmin} />}>
                    <Route path="/admin" element={<Admin/>} />
                </Route>
                <Route path="*" element={<h1>Page not found</h1>} />
            </Routes>
        </BrowserRouter>
    );
};

export default MyRoutes;