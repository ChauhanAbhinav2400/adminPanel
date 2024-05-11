
import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function getCategory(count) {
    
    try {
      const Response = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/category/list?page=${count}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Response.data.data.content;
    } catch (response) {
      console.log(response);
    }
  }



export async function addCategory(value) {
    
    try {
      const Response = await axios({
        method: "POST",
        url: baseUrl + `api/admin-service/category/add`,
        data:value,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Response;
    } catch (response) {
      console.log(response);
    }
  }



  export async function deleteCategory(id) {
    
    try {
      const Response = await axios({
        method: "DELETE",
        url: baseUrl + `api/admin-service/category/delete?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Response;
    } catch (response) {
      console.log(response);
    }
  }


  export async function editCategory(id){
    try {
      const Response = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/tags/search/by/id?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
     
      return Response.data.data
    } catch (response) {
      console.log(response);
    }
  }