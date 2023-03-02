export const APIEndPoint = "https://vite-api.iky.su";

async function req(
  method: "POST" | "PUT" | "GET",
  url: string,
  data: any = null
) {
  let status = 0,
    error = "Network error";
  try {
    const Response = await fetch(APIEndPoint + url, {
      method,
      body: data ? JSON.stringify(data) : null,
      headers: {
        "content-type": "application/json",
      },
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

async function lr(method: any, url: string, data: any = undefined) {
  const response = await req(method, url, data);
  if (!response.status) {
    return response;
  } else {
    alert(`${response.status} | ${response.error}`);
    return false;
  }
}

export async function updateDealer(data: any) {
  return lr("POST", "/dealer", data);
}

export async function addDealer(data: any) {
  return lr("PUT", "/dealer", data);
}

export async function getDealerList() {
  return lr("GET", "/dealer/list");
}

export async function getDealer(id: number) {
  return lr("GET", "/dealer?id=" + id);
}

export async function updateClient(data: any) {
  return lr("POST", "/client", data);
}

export async function addClient(data: any) {
  return lr("PUT", "/client", data);
}

export async function getClientList() {
  return lr("GET", "/client/list");
}

export async function getClient(id: number) {
  return lr("GET", "/client?id=" + id);
}

export async function updateContract(data: any) {
  return lr("POST", "/contract", data);
}

export async function addContract(data: any) {
  return lr("PUT", "/contract", data);
}

export async function getContractList() {
  return lr("GET", "/contract/list");
}

export async function getContract(id: number) {
  return lr("GET", "/contract?id=" + id);
}
