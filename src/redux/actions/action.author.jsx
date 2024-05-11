import axios from "axios";
const token = localStorage.getItem("Protectedtoken");

export function getAuthorList() {
  return async (dispatch, getState) => {
    const resp = await axios({
      method: "GET",
      url: "https://alxtrip.algodox.co.in/api/admin-service/author/list",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    dispatch({
      type: "AUTHOR_DATA",
      payload: resp.data.data,
    });
  };
}
