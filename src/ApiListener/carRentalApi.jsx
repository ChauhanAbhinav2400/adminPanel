import axios from "axios";
import baseUrl from "../baseUrl";
const token = localStorage.getItem("Protectedtoken");

export async function addCar(formData) {
  try {
    const Response = await axios({
      method: "post",
      url: baseUrl + "api/admin-service/rental/car/add",
      data: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCars(currentpage) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/rental/car/publish",
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

export async function deleteRentalCar(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/rental/car/delete",
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

export async function getFeaturedCar() {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/rental/car/featured",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function removeFeaturedCar(id) {
  try {
    const Response = await axios({
      method: "DELETE",
      url: baseUrl + "api/admin-service/rental/car/remove/feature",
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

export async function carTransmission() {
  const Response = await axios({
    method: "GET",
    url: baseUrl + "api/admin-service/rental/car/common/transmission-type",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Response.data.data;
}

export async function cityList() {
  const Response = await axios({
    method: "GET",
    url: baseUrl + "api/admin-service/city/list",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return Response.data.data;
}

export async function getCarModelByOemName(oemName) {
  try {
    const Response = await axios({
      method: "get",
      url: baseUrl + "api/admin-service/rental/car/common/model",
      params: { oemName: oemName },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return Response.data;
  } catch (response) {
    console.log(response);
  }
}

export async function carFuelTypes() {
  const Response = await axios({
    method: "GET",
    url: baseUrl + "api/admin-service/rental/car/common/fuel-types",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return Response.data.data;
}
