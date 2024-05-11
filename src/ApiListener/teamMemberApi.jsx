import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function getTeamMembers(currentpage) {
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + "api/admin-service/team/member/by/publisher",
      params: { page: currentpage },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function deleteTeamMember(id) {
  console.log(id);
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + `api/admin-service/team/member/delete?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function addTeamMembers(value) {
  try {
    const Response = await axios({
      method: "POST",
      url: baseUrl + "api/admin-service/team/member/add",
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

export async function editTeamMember(id){
  try {
    const Response = await axios({
      method: "GET",
      url: baseUrl + `api/admin-service/team/member/search/by/id?id=${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
   
   return Response.data.data
  } catch (response) {
    console.log(response);
  }
}
