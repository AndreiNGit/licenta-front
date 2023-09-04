import React from "react";
import AppNavbar from "../components/AppNavbar";
import Footer from "../components/Footer";
import "../style/favorites.css";
import axios from "axios";
import { useEffect, useState } from "react";
import CategoryList from "../components/CategoryList";

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        axios.get("/api/user/"+ user.id +"/favorites", {
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            setFavorites(response.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, []);


    return <div>
        <AppNavbar />
        <CategoryList categoryData={{name: "Favorites", stocks: favorites}} />
        <div className="footerDiv">
            <Footer />
        </div>
    </div>;
}

export default Favorites;