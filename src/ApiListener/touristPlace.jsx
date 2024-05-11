import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function getTouristPlace(currentpage) {
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + "api/admin-service/tourist/place/list",
    //   params: { page: currentpage },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function deleteTouristPlace(id) {
  
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + `api/admin-service/tourist/place/delete?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function addTouristPlace(value) {
  try {
    const Response = await axios({
      method: "POST",
      url: baseUrl + "api/admin-service/tourist/place/add",
      data: value,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function editTouristPlace(id){
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + `api/admin-service/tourist/place/search/by/id?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
   return Response.data.data
  } catch (response) {
    console.log(response);
  }
}
