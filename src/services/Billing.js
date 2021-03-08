import Socket from "./Socket";
import { baseUrl, billingEPs } from "../Config.json";
import Gateway from "./Gateway";

// eslint-disable-next-line
async function insertIntoCart(email, movie_id, quantity) {
    const payLoad = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
          
    }

    const options = {
        baseURL: baseUrl,
        url: billingEPs.cartInset,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReport(response);
}
// eslint-disable-next-line
async function retrieveCart(email) {
    const payLoad = {
        email: email
    }

    const options = {
        baseUrl : baseUrl,
        url: billingEPs.retrieveCart,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReport(response);
}
// eslint-disable-next-line
async function deleteTheItem(email, movie_id) {
    const payLoad = {
        email: email,
        movie_id: movie_id
    }

    const options = {
        baseUrl : baseUrl,
        url: billingEPs.deleteCart,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReport(response);
}
// eslint-disable-next-line
async function checkOut(email) {
    const payLoad = {
        email: email
    }

    const options = {
        baseUrl : baseUrl,
        url: billingEPs.placeOrder,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReportForPayPal(response);
}
// eslint-disable-next-line
async function completeOrder(token, PayerID) {

    const options = {
        baseUrl : baseUrl,
        url: billingEPs.completeOrder+`?token=${token}&PayerID=${PayerID}`
    }

    const response = await Socket.GET(options);
    return await Gateway.getReportForPayPal(response);
}
// eslint-disable-next-line
async function retrieveOrder(email) {
    const payLoad = {
        email: email
    }

    const options = {
        baseUrl: baseUrl,
        url: billingEPs.retrieveOrder,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReportForPayPal(response);

}

// eslint-disable-next-line
async function updateQuantity(email, movie_id, quantity) {
    const payLoad = {
        email: email,
        movie_id: movie_id,
        quantity: quantity
    }

    const options = {
        baseUrl: baseUrl,
        url: billingEPs.updateCart,
        data: payLoad
    }

    const response = await Socket.POST(options);
    return await Gateway.getReport(response);
}
// eslint-disable-next-line
export default {
    insertIntoCart, retrieveCart, deleteTheItem, checkOut, completeOrder, retrieveOrder, updateQuantity
};
