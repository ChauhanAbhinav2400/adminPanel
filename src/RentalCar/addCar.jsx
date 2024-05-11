import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud, FiTrash2 } from "react-icons/fi";
import ImageLibrary from "../Imagelibrary/ImageLibrary";
import { useDispatch, useSelector } from "react-redux";
import { addCar } from "../ApiListener/carRentalApi";
import { oemName } from "../redux/actions/carsActions/OemName.action";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { carTransmission } from "../ApiListener/carRentalApi";
import { carFuelTypes } from "../ApiListener/carRentalApi";
import { cityList } from "../ApiListener/carRentalApi";
import { getCarModelByOemName } from "../ApiListener/carRentalApi";

function AddCar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const image = useSelector((state) => state.imageReducer.imageCar);
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [transmission, setTransmission] = useState([]);
  const [CityList, setCityList] = useState([]);
  const [carModels, setCarModels] = useState([]);
  const [fuelName, setCarFuelType] = useState([]);
  const token = React.useContext(AuthContext);
  console.log("New Way for Token : "+token);

  const [formData, setFormData] = useState({
    id: 0,
    vendorId: userInfo.vendorId,
    publisherId: userInfo.publisherId,
    cityNm: "",
    oemNm: "",
    modelNm: "",
    imgUrl: "",
    noOfPsgnr: null,
    noOgLgage: null,
    fuelName: "",
    isAirCondition: null,
    transmission: "",
    noOfDoors: null,
    minKm: null,
    perKmPrice: null,
    discount: null,
    isActive: 1,
  });

  useEffect(() => {
    console.log(image);
    if (image) {
      setFormData({ ...formData, imgUrl: image.imgUrl });
    }
  }, [image]);
  const dispatch = useDispatch();
  const OemName = useSelector((state) => state.OemNameReducer.OemName);

  const handleonChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const selectValue = (e) => {
    console.log(e);
  };
  const handleCloseImageLibrary = () => {
    console.log("handleCloseImageLibrary");
    setShow(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    addCar(formData)
      .then((response) => {
        if (response.data.id > 0) {
          toast.success("Rental Car Added Successfully");
          navigate("/admin/car-rental/cars");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    dispatch(oemName());
    carTransmission().then((resp) => {
      setTransmission(resp);
    });
  }, []);

  useEffect(() => {
    cityList().then((resp) => {
      setCityList(resp);
    });
  }, []);

  useEffect(() => {
    carFuelTypes().then((resp) => {
      setCarFuelType(resp);
    });
  }, []);

  useEffect(() => {
    if (formData.oemNm != undefined && formData.oemNm !== "") {
      getCarModelByOemName(formData.oemNm)
        .then((response) => {
          console.log(response.data.id);
          if (response) {
            setCarModels(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [formData.oemNm]);

  useEffect(() => {
    dispatch(oemName());
    // dispatch(modelName());
    carTransmission().then((resp) => {
      setTransmission(resp);
    });
    cityList().then((resp) => {
      setCityList(resp);
    });
  }, []);

  return (
    <div className="bg-[#f4f6fa] w-full flex flex-col overflow-y-auto ">
      <div className="w-full px-4">
        <h4 className="p-4 font-bold h-[85px] text-[2rem]">Add Rental Car</h4>
        <form className="flex flex-col w-full gap-4 " onSubmit={handleSubmit}>
          <div className="flex w-full h-full justify-center  items-center">
            <div className="h-full w-[95%]  mt-8">
              <div className="w-full flex flex-col md:flex-row ">
                <div className=" full flex flex-col  w-full">
                  <label
                    htmlFor="carname"
                    className="font-bold w-full mb-[12px]"
                  >
                    Oem Name
                  </label>
                  <select
                    name="oemNm"
                    onChange={handleonChange}
                    required
                    className="w-full text-[#67748b] outline-none p-[0.8rem] rounded-[0.3rem] border-primary border font-semibold  "
                    id="oemNm"
                  >
                    <option>--Select OEM--</option>
                    {OemName.map((item, index) => {
                      return <option key={index}>{item.oemName}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div className="flex flex-col md:justify-center md:items-center md:flex-row my-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div className="md:w-3/6 flex flex-col  w-full   ">
                  <div className="w-full flex flex-col  ">
                    <label htmlFor="modalname" className="font-bold mb-[12px]">
                      Car Model
                    </label>

                    <select
                      onChange={handleonChange}
                      name="modelNm"
                      required
                      className="p-[0.8rem] text-[#67748b] outline-none rounded-[0.3rem] border-primary border font-semibold "
                      id="modelNm"
                      placeholder="Modal Name"
                    >
                      <option>--Select Car Model--</option>
                      {carModels.map((item, index) => {
                        return <option>{item.modelNm}</option>;
                      })}
                    </select>
                  </div>

                  <div className=" flex flex-col w-full mt-6">
                    <label htmlFor="cityname" className="font-bold mb-[12px]">
                      City
                    </label>
                    <select
                      onChange={handleonChange}
                      name="cityNm"
                      required
                      className="p-[0.8rem] text-[#67748b] outline-none rounded-[0.3rem] border-primary border font-semibold"
                      id="cityNm"
                      placeholder="City Name"
                    >
                      <option>--Select City--</option>
                      {CityList.map((item, index) => {
                        return <option>{item.cityNm}</option>;
                      })}
                    </select>
                  </div>
                </div>

                <div className="w-full md:w-[48%] flex flex-col   ">
                  <label
                    htmlFor="selectimage"
                    className="font-bold mb-[12px]   "
                  >
                    Select Image
                  </label>
                  <div
                    className=" border-2 border-dashed border-primary rounded-xl flex justify-center items-center w-full  bg-white max-md:ml-0 max-md:w-full"
                    style={{
                      minHeight: "166px",
                      backgroundImage: `url(${formData.imgUrl})`,
                    }}
                  >
                    {!formData.imgUrl ? (
                      <div
                        className=" h-full  flex-col flex justify-center  w-full items-center"
                        onClick={() => setShow(!show)}
                      >
                        <div className="text-center cursor-pointer ">
                          <FiUploadCloud size={25} />
                        </div>
                        <div className="text-primary text-[13px] sm:text-lg font-medium text-center ">
                          <p>Upload a high-resolution Image</p>
                        </div>
                      </div>
                    ) : (
                      <button
                        className=" absolute left-0 top-8 w-8 h-8 flex justify-center items-center border border-dashed border-white  hover:bg-red  hover:text-white text-xl bg-blue text-white  rounded-full "
                        onClick={() => setFormData({ ...formData, imgUrl: "" })}
                      >
                        <p className="self-center pb-1">x</p>
                      </button>
                    )}

                    {show ? (
                      <ImageLibrary
                        isOpen={show}
                        onClose={handleCloseImageLibrary}
                        type="ADD_CAR_IMAGE"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:justify-center md:items-center md:flex-row mb-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div className=" w-full md:w-3/6 flex flex-col ">
                  <label htmlFor="noOgLgage" className="font-bold mb-[12px]">
                    Number Of Luggage
                  </label>
                  <input
                    type="number"
                    onChange={handleonChange}
                    name="noOfLgage"
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="noOfLgage"
                    placeholder="No. Of Luggage"
                    value={formData.noOgLgage}
                  />
                </div>
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="noofdoors" className="font-bold mb-[12px]">
                    Number Of Doors
                  </label>
                  <input
                    type="number"
                    onChange={handleonChange}
                    name="noOfDoors"
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="carname8"
                    placeholder="No. Of Doors"
                    value={formData.noOfDoors}
                  />
                </div>
                <div className="w-full md:w-3/6 flex flex-col  ">
                  <label
                    htmlFor="noofpassenger"
                    className="font-bold mb-[12px]"
                  >
                    Number Of Passenger
                  </label>

                  <input
                    name="noOfPsgnr"
                    type="number"
                    onChange={handleonChange}
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="noOfPsgnr"
                    placeholder="No. Of Passenger"
                    value={formData.noOfPsgnr}
                  />
                </div>
              </div>

              <div className="flex flex-col md:justify-center md:items-center md:flex-row  mb-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="aircodition" className="font-bold mb-[12px]">
                    Air Condition
                  </label>
                  <select
                    onChange={handleonChange}
                    name="isAirCondition"
                    required
                    className="p-[0.8rem] text-[#67748b] outline-none rounded-[0.3rem] border-primary border font-semibold"
                    id="isAirCondition"
                  >
                    <option>--Select Air Condition--</option>
                    <option value={1}>Y</option>
                    <option value={0}>N</option>
                  </select>
                </div>
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="transmission" className="font-bold mb-[12px]">
                    Transmission
                  </label>
                  <select
                    className="p-[0.8rem] text-[#67748b] outline-none  rounded-[0.3rem] border-primary border  font-semibold "
                    id="transmission"
                    onChange={handleonChange}
                    required
                    name="transmission"
                    placeholder="Transmission"
                    value={formData.transmission}
                  >
                    <option>--Select Transmission--</option>
                    {transmission.map((item, index) => {
                      return <option key={index}>{item.transmission}</option>;
                    })}
                  </select>
                </div>
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="fueltype" className="font-bold mb-[12px]">
                    Fuel Type
                  </label>
                  <select
                    className="p-[0.8rem] text-[#67748b] outline-none  rounded-[0.3rem] border-primary border  font-semibold "
                    id="fuelName"
                    onChange={handleonChange}
                    required
                    name="fuelName"
                    placeholder="Fuel Type"
                    value={formData.fuelName}
                  >
                    <option>--Select Fuel Type--</option>
                    {fuelName.map((item, index) => {
                      return <option key={index}>{item.fuelName}</option>;
                    })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col md:justify-center md:items-center md:flex-row mb-4 space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <div className="w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="minkm" className="font-bold mb-[12px]">
                    Min Km
                  </label>
                  <input
                    type="number"
                    onChange={handleonChange}
                    name="minKm"
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="carname9"
                    placeholder="Min/Km"
                    value={formData.minKm}
                  />
                </div>
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="price/km" className="font-bold mb-[12px]">
                    Price/km
                  </label>
                  <input
                    type="number"
                    onChange={handleonChange}
                    name="perKmPrice"
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="perKmPrice"
                    placeholder="Price/Km"
                    value={formData.perKmPrice}
                  />
                </div>
                <div className=" w-3/6 flex flex-col max-md:w-full">
                  <label htmlFor="Discount" className="font-bold mb-[12px]">
                    Discount
                  </label>
                  <input
                    type="number"
                    onChange={handleonChange}
                    name="discount"
                    required
                    className="p-[0.8rem] outline-none rounded-[0.3rem] border-primary border  font-semibold "
                    id="discount"
                    placeholder="Discount"
                    value={formData.discount}
                  />
                </div>
              </div>

              <div className="py-4 flex justify-start">
                <input
                  className="p-[0.8rem] outline-none rounded-[0.3rem] hover:bg-[#004aac]  text-[#004aac] w-[20%] hover:text-white border-[#004aac] border-2  font-bold btn"
                  id="carname12"
                  type="submit"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCar;
