import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");


export async function primaryCategory(){
    
    const Response = await axios({
        method: "GET",
        url: baseUrl + "api/admin-service/category/list",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  return Response
     


}






export async function credits(){
   
    const Response = await axios({
        method: "GET",
        url: baseUrl + "api/admin-service/team/member/by/publisher",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  return Response
     


}




export async function tagsList(){
   
  const Response = await axios({
      method: "GET",
      url: baseUrl + "api/admin-service/tags/list",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(Response)
return Response
   


}
