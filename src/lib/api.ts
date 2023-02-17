export const APIEndPoint =
  "https://ikysu-humble-space-pancake-77gw7pg6jq6hx5jw-10000.preview.app.github.dev";

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
  const dealerListReponse = await req("GET", "/dealer");
  if (!dealerListReponse.status) {
    return dealerListReponse;
  } else {
    alert(`${dealerListReponse.status} | ${dealerListReponse.error}`);
    return false;
  }
}

export async function getClientList() {
  const clientListResponse = await req("GET", "/client");
  if (!clientListResponse.status) {
    return clientListResponse;
  } else {
    alert(`${clientListResponse.status} | ${clientListResponse.error}`);
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
