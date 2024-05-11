import axios from "axios";
import baseUrl from "../../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export function getArticleById(id) {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const resp = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/article/search/by/id`,
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { id: id },
      });
      console.log(resp.data.data);
      dispatch({
        type: "GET_ARTICLE_BY_ID",
        payload: resp.data.data,
      });
    } catch (error) {
      console.error("Error fetching Article by id:", error);
    }
  };
}

export function getDraftArticleById(id) {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const resp = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/article/get/draft/by/id`,
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { id: id },
      });
      console.log(resp.data.data);
      dispatch({
        type: "GET_ARTICLE_BY_ID",
        payload: resp.data.data,
      });
    } catch (error) {
      console.error("Error fetching Draft Article by id:", error);
    }
  };
}

export function getTourById(id) {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const resp = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/tour/package/search/by/id`,
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { id: id },
      });
      console.log(resp.data.data);
      dispatch({
        type: "GET_TOUR_BY_ID",
        payload: resp.data.data,
      });
    } catch (error) {
      console.error("Error fetching Tour Package by id:", error);
    }
  };
}

export function getDraftTourById(id) {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const resp = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/tour/package/get/draft/by/id`,
        headers: {
          Authorization: "Bearer " + token,
        },
        params: { id: id },
      });
      console.log(resp.data.data);
      dispatch({
        type: "GET_TOUR_BY_ID",
        payload: resp.data.data,
      });
    } catch (error) {
      console.error("Error fetching Draft Tour Package by id:", error);
    }
  };
}

export function getCarRentalById(id) {
  return async (dispatch, getState) => {
    console.log(id);
    try {
      const resp = await axios({
        method: "GET",
        url: baseUrl + `api/admin-service/rental/car/search/by/id`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { id: id },
      });
      console.log(resp.data.data);
      dispatch({
        type: "GET_RENTAL_CAR_BY_ID",
        payload: resp.data.data,
      });
    } catch (error) {
      console.error("Error fetching Rental Car by id:", error);
    }
  };
}
