import axios from "axios";
import baseUrl from "../../../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export function  modelName(oemName){
    console.log("ModelName action")
    return async (dispatch,getState)=>{
        const Response = await axios({
        method: "GET",
        url: baseUrl + "api/admin-service/rental/car/common/model",
        params: { oemName: oemName },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({type:"CAR_MODEL_NAME",payload:Response.data.data})
    }
}