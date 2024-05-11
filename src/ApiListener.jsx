import axios from "axios";
import baseUrl from "./baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function addArticle(fromData) {
  console.log(token);
  try {
    const Response = await axios({
      method: "post",
      url: baseUrl + "api/admin-service/article/add",
      data: fromData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function addTourPkg(fromData) {
  try {
    const Response = await axios({
      method: "post",
      url: baseUrl + "api/admin-service/tour/package/add",
      data: fromData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function getDraftArtical(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/article/list/draft",
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

export async function getDraftTour(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/tour/package/list/draft",
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

export async function getPublishedArtical(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/article/list/publish",
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

export async function getPublishedTour(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/tour/package/list/publish",
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

export async function getDeleteArtical(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/article/delete",
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function getDeleteTour(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/tour/package/delete",
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function CreateFeaturedTour(featuredId) {
  try {
    const Response = await axios({
      method: "post",
      url: baseUrl + "api/admin-service/tour/package/create/feature",
      params: { id: featuredId },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function getFeaturedArticle() {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/article/list/feature",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function getFeaturedTour(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/tour/package/list/feature",
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

export async function removeFeaturedArticle(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/article/remove/feature",
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function removeFeaturedTour(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/tour/package/remove/feature",
      params: { id: id },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}
