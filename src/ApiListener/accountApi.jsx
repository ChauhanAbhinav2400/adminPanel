import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function forgotPassword(email) {
  const Response = await axios({
    method: "POST",
    url: baseUrl + "admin/user/forgot-password",
    params: { emailId: email },
  });
  return Response;
}

export async function resetPassword(id, password) {
  const Response = await axios({
    method: "PUT",
    url: baseUrl + "admin/user/reset-password",
    params: { id: id, password: password },
  });
  return Response.data;
}
