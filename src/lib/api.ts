export const APIEndPoint =
  "https://vite-api.iky.su";

async function req(
  method: "POST" | "PUT" | "GET" | "DELETE",
  url: string,
  data: any = null
) {
  let status = 0,
    error = "Network error";
  try {
    const Response = await fetch(APIEndPoint + url, {
      method,
      body: data ? JSON.stringify(data) : null,
    });
    if (Response.status) status = Response.status;
    if (Response.statusText) error = Response.statusText;
    const Data = await Response.json();
    if (Data.statusCode) status = Data.statusCode;
    if (Data.error) error = Data.error;

    if (!Data.statusCode || Data.statusCode == 200) {
      return Data;
    } else {
      return { status, error };
    }
  } catch (error) {
    return { status, error };
  }
}

export async function getDealerList() {
  const dealerListReponse = await req("GET", "/dealer/list?limit=100");
  if (!dealerListReponse.status) {
    return dealerListReponse;
  } else {
    alert(`${dealerListReponse.status} | ${dealerListReponse.error}`);
    return false;
  }
}

export async function getDealer(id: number) {
  const dealerReponse = await req("GET", "/dealer?id="+id);
  if (!dealerReponse.status) {
    return dealerReponse;
  } else {
    alert(`${dealerReponse.status} | ${dealerReponse.error}`);
    return false;
  }
}


export async function getClientList() {
  const clientListResponse = await req("GET", "/client/list?limit=100");
  if (!clientListResponse.status) {
    return clientListResponse;
  } else {
    alert(`${clientListResponse.status} | ${clientListResponse.error}`);
    return false;
  }
}

export async function getClient(id: number) {
  const clientReponse = await req("GET", "/client?id="+id);
  if (!clientReponse.status) {
    return clientReponse;
  } else {
    alert(`${clientReponse.status} | ${clientReponse.error}`);
    return false;
  }
}

export async function getContractList() {
  const contractListResponse = await req("GET", "/contract");
  if (!contractListResponse.status) {
    return contractListResponse;
  } else {
    alert(`${contractListResponse.status} | ${contractListResponse.error}`);
    return false;
  }
}
