import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { size } from 'lodash';


export async function isFavoriteApi(idUser, idGame, logout) {
    try {
        // const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
        // const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
        // const url = `${BASE_PATH}/favorites?user=${idUser}&game=${idGame}`;
        const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}&game=${idGame}`;
        // const url = `${BASE_PATH}/favorites`;

        return await authFetch(url, null, logout);

    } catch (error) {
        console.log(error);
        return null;
    }
};

export async function addFavoriteApi(idUser, idGame, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idGame, logout);
        if (size(dataFound)>0 || null) {
            return "este juego ya lo tienes en favoritos"
        } else {
            const url = `${BASE_PATH}/favorites`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json"
                },
                // body: JSON.stringify({ user: idUser })
                body: JSON.stringify({ users_permissions_user: idUser, game: idGame })
            }
            const result = await authFetch(url, params, logout);
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteFavoriteApi(idUser, idGame, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idGame, logout);
        if (size(dataFound)>0 || null) {
            // const url = `${BASE_PATH}/favorites`;
            const url = `${BASE_PATH}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json"
                },
            }
            const result = await authFetch(url, params, logout);
            return result;

        } else {
            return "No puedes quitas si no estas registrado"
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getFavoriteApi(idUser, logout) {
    try {
        // const url = `${BASE_PATH}/favorites?user=${idUser}`;
        const url = `${BASE_PATH}/favorites?users_permissions_user=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result;


    } catch (error) {
        console.log(error);
        return null;
    }
}







