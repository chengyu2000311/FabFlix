import Socket from "./Socket";
import { baseUrl, idmEPs } from "../Config.json";
import Gateway from "./Gateway";
// eslint-disable-next-line 
async function login(email, password) {
    const payLoad = {
        email: email,
        password: password.split("")
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: idmEPs.loginEP, // Path of URL
        data: payLoad // Data to send in Body
    }

    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}
// eslint-disable-next-line 
async function register(email, password) {
    const payLoad = {
        email: email,
        password: password.split("")
    };

    const options = {
        baseURL: baseUrl, // Base URL
        url: idmEPs.registerEP, // Path of URL
        data: payLoad // Data to send in Body
    }
    const response = await Socket.POST(options);

    return await Gateway.getReport(response);
}

// eslint-disable-next-line 
export default {
    login, register
};
