import { baseUrl, gatewayEPs, pollLimit } from "../Config.json";
import Socket from "./Socket";

// eslint-disable-next-line 
async function getReport(response) {
  let noContent = 204;

  if (response.status !== noContent)
    return response;

  const props = {
    headers: {
      transaction_id: response.headers["transaction_id"]
    },
    baseURL: baseUrl,
    url: gatewayEPs.reportEP,
  };

  for (let i = 0; i < pollLimit; i++) {
    const response = await Socket.GET(props);
    console.log(response);
    if (response.status !== noContent) {
      /************************************************
            TODO More Robust checking for response
      ************************************************/
      return response;
    } else await timeOut();
  }


  /************************************************
        TODO Better missing response management
  ************************************************/
  return undefined;
}

// eslint-disable-next-line 
async function getReportForPayPal(response) {
  let noContent = 204;

  if (response.status !== noContent)
    return response;

  const props = {
    headers: {
      transaction_id: response.headers["transaction_id"]
    },
    baseURL: baseUrl,
    url: gatewayEPs.reportEP,
  };

  for (let i = 0; i < pollLimit; i++) {
    const response = await Socket.GET(props);
    console.log(response);
    if (response.status !== noContent) {
      /************************************************
            TODO More Robust checking for response
      ************************************************/
      return response;
    } else await timeOutForPayPal();
  }


  /************************************************
        TODO Better missing response management
  ************************************************/
  return undefined;
}

// eslint-disable-next-line 
async function timeOut() {
  return new Promise(resolve => {
    let pollingTimeoutMilliSeconds = 200;
    setTimeout(() => resolve(), pollingTimeoutMilliSeconds);
  });
}

// eslint-disable-next-line 
async function timeOutForPayPal() {
  return new Promise(resolve => {
    let pollingTimeoutMilliSeconds = 3000;
    setTimeout(() => resolve(), pollingTimeoutMilliSeconds);
  });
}

// eslint-disable-next-line 
export default {
  getReport, getReportForPayPal
};