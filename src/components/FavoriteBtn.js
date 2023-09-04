import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "../style/favoriteBtn.css";

function FavoriteBtn(props) {
    const [isFavorite, setIsFavorite] = useState(false);
    const idStock = props.idStock;
    const idUser = JSON.parse(localStorage.getItem("user")).id;

    useEffect(() => {
        axios.get(`/api/user/favorites/stock/${idStock}/user/${idUser}`)
            .then(response => {
                setIsFavorite(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [idStock, idUser]);

    const handleClick = () => {
        const method = isFavorite ? "delete" : "post";
        const url = `/api/user/favorites/stock/${idStock}/user/${idUser}`;

        axios[method](url)
            .then(response => {
                setIsFavorite(!isFavorite);
            })
            .catch(error => {
                console.error(error);
            });
    };

    return (
        <div className="favoriteBtn">
            <Button onClick={handleClick} variant={isFavorite ? "danger" : "success"}>
                {isFavorite ? "Remove from favorites" : "Add to favorites"}
            </Button>
        </div>
    );
}

export default FavoriteBtn;
