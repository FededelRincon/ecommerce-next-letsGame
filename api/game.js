import { BASE_PATH } from '../utils/constants'

export async function getLastGamesApi(limit) {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItem = `_sort=createdAt:desc`;
        // const url = `${BASE_PATH}/algo/games?${limitItems}&${sortItem}`; //bad
        const url = `${BASE_PATH}/games?${limitItems}&${sortItem}`; //good

        const response = await fetch(url);
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}


export async function getGamesPlatformApi (platform, limit) {
    try {
        const url = `${BASE_PATH}/games?platform.url=${platform}&_limit=${limit}&_sort=createdAt:desc`;

        const response = await fetch(url);
        const result = await response.json();
        
        return result;

    } catch (error) {
        console.log(error);
        return null;
    }
}