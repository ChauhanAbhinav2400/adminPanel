import axios from "axios";
import baseUrl from "../../baseUrl";

export const Logininfo = (userData) => {

  return async (dispatch, getstate) => {
    try {
      const body = { emailId: userData.emailId, password: userData.password };
      const resp = await axios({
        method: "POST",
        url: baseUrl + "admin/login",
        data: body,
      });
      console.log(resp.data);

      if (resp?.data?.data?.emailId === userData.emailId) {
        const loginTime = new Date().getTime();
        localStorage.setItem("Protectedtoken", resp.data.data.token);
        localStorage.setItem("userinfo", JSON.stringify(resp.data.data));
        localStorage.setItem("loginTime", loginTime.toString());
        setTimeout(() => {
          localStorage.removeItem("Protectedtoken");
          localStorage.removeItem("userinfo");
          localStorage.removeItem("loginTime");
          window.location.href = "/admin/login";
        }, 1740000);
        // 
        dispatch(addUser(resp?.data?.data));
        return "/admin";
      }

      if (resp?.data?.data?.emailId !== userData.emailId) {
       return "/admin/login";
      }
      if (resp?.data?.data?.password !== userData.password) {
        return "/admin/login";
       }
    } catch (err) {
      console.log(err);
    }
  };
};

const addUser = (value) => {
  return {
    type: "LOGIN_DATA",
    payload: value,
  };
};
