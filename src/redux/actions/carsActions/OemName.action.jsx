
import axios from "axios";
import baseUrl from "../../../baseUrl";
const token = localStorage.getItem("Protectedtoken");


export function oemName(){
    
    return async (dispatch,getState)=>{
       
                 const Response = await axios({
            method: "GET",
            url: baseUrl + "api/admin-service/rental/car/common/oem",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
         
          dispatch({type:"OEM_NAME",payload:Response.data.data})
    }


}