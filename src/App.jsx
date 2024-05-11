import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import LoginPage from "./Account/login";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./home/home";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "./home/Dashboard";
import AddArticle from "./Article/addArticle";
import ArticleEdit from "./Article/article.edit";
import ArticleFeatured from "./Article/article.featured";
import DraftArticles from "./Article/article.draft";
import PublishArticle from "./Article/article.publish";
import DraftTour from "./Tour/tour.draft";
import PublishedTour from "./Tour/tour.published";
import AddTour from "./Tour/addTour";
import AddCar from "./RentalCar/addCar";
import FeaturedArticle from "./Article/article.featured";
import FeaturedTour from "./Tour/tour.featured";
import EditArticle from "./Article/article.edit";
import Team from "./Teams/team";
import AddTeamMember from "./Teams/addTeamMember";
import Vendor from "./Vendors/vendor";
import AddVendor from "./Vendors/addVendor";
import EditTour from "./Tour/tour.edit";
import FeaturedCar from "./RentalCar/car.featured";
import PublishCars from "./RentalCar/cars";
import AddCategory from "./Category/addCategory";
import Category from "./Category/category";
import ForgotPassword from "./Account/forgotPassword";
import ResetPassword from "./Account/resetPassword";
import AddTag from "./Tags/AddTag";
import Tag from "./Tags/tag";
import EditTeamMember from "./Teams/editTeamMember";
import EditCar from "./RentalCar/editCar";
import Publisher from "./Publisher/Publisher";
import AddPublisher from "./Publisher/AddPublisher";
import EditCategory from "./Category/editCategory";
import AuthProvider from "./Provider/authProvider";
import EditTag from "./Tags/editTag";
import EditVendor from "./Vendors/editVendor";
import TouristPlace from "./TouristPlace/touristPlace";
import AddTouristPlace from "./TouristPlace/addTouristPlace";
import EditTouristPlace from "./TouristPlace/editTouristPlace";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AuthProvider>
                  <Routes>
                    <Route path="/" element={<Home />}>
                      <Route index element={<Dashboard />} />
                      <Route path="/article/create" element={<AddArticle />} />
                      <Route
                        path="/article/edit/:id"
                        element={<EditArticle />}
                      />
                      <Route
                        path="/article/featured"
                        element={<FeaturedArticle />}
                      />
                      <Route
                        path="/article/draft"
                        element={<DraftArticles />}
                      />
                      <Route
                        path="/article/published"
                        element={<PublishArticle />}
                      />
                      <Route
                        path="/tour-package/create"
                        element={<AddTour />}
                      />
                      <Route
                        path="/tour-package/published"
                        element={<PublishedTour />}
                      />
                      <Route
                        path="/tour-package/draft"
                        element={<DraftTour />}
                      />
                      <Route
                        path="/tour-package/edit/:title"
                        element={<EditTour />}
                      />
                      <Route
                        path="/tour-package/featured"
                        element={<FeaturedTour />}
                      />
                      <Route path="/car-rental/create" element={<AddCar />} />

                      <Route path="/team/create" element={<Team />} />
                      <Route
                        path="/team/create/add-team-member"
                        element={<AddTeamMember />}
                      />
                      <Route
                        path="/team/create/edit-team-member/:id"
                        element={<EditTeamMember />}
                      />

                      <Route path="/category/create" element={<Category />} />
                      <Route
                        path="/category/create/add-category"
                        element={<AddCategory />}
                      />
                      <Route
                        path="/category/create/edit-category/:id"
                        element={<EditCategory />}
                      />

                      <Route
                        path="/publisher/create/"
                        element={<Publisher />}
                      />
                      <Route
                        path="/publisher/create/add-publisher"
                        element={<AddPublisher />}
                      />

                      <Route
                        path="/car-rental/featured"
                        element={<FeaturedCar />}
                      />
                      <Route
                        path="/car-rental/cars"
                        element={<PublishCars />}
                      />

                      <Route path="/team/create" element={<Team />} />
                      <Route
                        path="/team/create/add-team-member"
                        element={<AddTeamMember />}
                      />

                      <Route path="/tags/create/" element={<Tag />} />
                      <Route path="/tags/create/add-tag" element={<AddTag />} />
                      <Route
                        path="/tags/create/edit-tag/:id"
                        element={<EditTag />}
                      />

                      <Route path="/tourist-place/create" element={<TouristPlace/>} />
                      <Route path="/tourist-place/add-tourist-place" element={<AddTouristPlace/>} />
                      <Route
                        path="/tourist-place/add-tourist-place/:id"
                        element={<EditTouristPlace/>}
                      />

                      <Route
                        path="/car-rental/featured"
                        element={<FeaturedCar />}
                      />
                      <Route
                        path="/car-rental/cars"
                        element={<PublishCars />}
                      />

                      <Route
                        path="/car-rental/featured"
                        element={<FeaturedCar />}
                      />
                      <Route
                        path="/car-rental/cars"
                        element={<PublishCars />}
                      />

                      <Route
                        path="/car-rental/edit/:id"
                        element={<EditCar />}
                      />

                      <Route path="/vendor/create" element={<Vendor />} />
                      <Route
                        path="/vendor/create/add-vendor"
                        element={<AddVendor />}
                      />
                      <Route
                        path="/vendor/create/edit-vendor/:id"
                        element={<EditVendor />}
                      />
                      <Route
                        path="/team/create/edit-team-member/:id"
                        element={<EditTeamMember />}
                      />

                      <Route
                        path="/car-rental/featured"
                        element={<FeaturedCar />}
                      />
                      <Route
                        path="/car-rental/cars"
                        element={<PublishCars />}
                      />
                    </Route>
                  </Routes>
                </AuthProvider>
              </ProtectedRoute>
            }
          />
          <Route path="/admin/login" element={<LoginPage />} />
          <Route
            path="/admin/user/forgot-password"
            element={<ForgotPassword />}
          />
          <Route
            path="/admin/user/change-password/:id"
            element={<ResetPassword />}
          />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
