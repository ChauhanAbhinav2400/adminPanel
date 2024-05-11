import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function getVendor(count) {
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + `api/admin-service/vendor/list?page=${count}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function addVendor(formData) {
  
  try {
    const Response = await axios({
      method: "POST",
      url: baseUrl + `api/admin-service/vendor/add`,
      data:formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
     
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function deleteVendor(id) {
  
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + `api/admin-service/vendor/delete?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}



export async function editVendor(id) {
  
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + `api/admin-service/vendor/search/by/id?id=${5}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
      
    return Response;
  } catch (response) {
    console.log(response);
  }
}