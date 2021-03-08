import Socket from "./Socket";
import { baseUrl, moviesEPs } from "../Config.json";
import Gateway from "./Gateway";
// eslint-disable-next-line 
async function search(title, year, director, genre, Direction, Limit, Offset, Orderby, keyword) {

    if (keyword !== null && keyword !== "") {
        const options = {
            baseUrl: baseUrl,
            url: moviesEPs.browseEP+`/${keyword}`
        }

        const response = await Socket.GET(options);
        return await Gateway.getReport(response);
    }

    var paramList = []
    if (title !== null) paramList.push(['title', title]);
    if (year !== null) paramList.push(['year', year]);
    if (director !== null) paramList.push(['director', director]);
    if (genre !== null) paramList.push(['genre', genre]);
    if (Direction !== null ) paramList.push(['direction', Direction]);
    if (Limit !== null ) paramList.push(['limit', Limit]);
    if (Offset !== null ) paramList.push(['offset', Offset]);
    if (Orderby !== null ) paramList.push(['orderby', Orderby]);
    const params = new URLSearchParams(paramList);
    const options = {
        baseURL: baseUrl, // Base URL
        url: moviesEPs.searchEP, // Path of URL
        params: params
    }

    const response = await Socket.GET(options);

    return await Gateway.getReport(response);
}
// eslint-disable-next-line 
async function getMovieById(movie_id) {
    const options = {
        baseURL: baseUrl, // Base URL
        url: moviesEPs.getMovieById+`/${movie_id}`, // Path of URL
    }

    const response = await Socket.GET(options);
    return await Gateway.getReport(response);
}
// eslint-disable-next-line 
export default {
    search, getMovieById
};
