
import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function getTags(count) {
    
    try {
      const Response = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/tags/list?page=${count}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Response.data.data.content;
    } catch (response) {
      console.log(response);
    }
  }

//https://alxtrip.algodox.co.in/api/admin-service/tags/add

export async function addTags(value) {
    
    try {
      const Response = await axios({
        method: "POST",
        url: baseUrl + `api/admin-service/tags/add`,
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


  
  export async function deleteTag(id) {
    console.log(id);
    try {
      const Response = await axios({
        method: "DELETE",
        url: baseUrl + `api/admin-service/tags/delete?id=${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return Response.data;
    } catch (response) {
      console.log(response);
    }
  }


  export async function editTag(id){

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
  

