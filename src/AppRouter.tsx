import { Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import AppLayout from "./layout/AppLayout";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import Blank from "./pages/Blank";
import Calendar from "./pages/Calendar";
import BarChart from "./pages/Charts/BarChart";
import LineChart from "./pages/Charts/LineChart";
import Home from "./pages/Dashboard/Home";
import FormElements from "./pages/Forms/FormElements";
import OrdersManagement from "./pages/OrderManagement/OrdersManagement";
import NotFound from "./pages/OtherPage/NotFound";
import ProductsManagement from "./pages/ProductManagement/ProductsManagement";
import AccountManagement from "./pages/StaffManagement/Account/AccountManagement";
import StaffProfile from "./pages/StaffManagement/StaffProfile";
import TaskManagement from "./pages/StaffManagement/Task/TaskManagement";
import BasicTables from "./pages/Tables/BasicTables";
import Alerts from "./pages/UiElements/Alerts";
import Avatars from "./pages/UiElements/Avatars";
import Badges from "./pages/UiElements/Badges";
import Buttons from "./pages/UiElements/Buttons";
import Images from "./pages/UiElements/Images";
import Videos from "./pages/UiElements/Videos";
import UserProfiles from "./pages/UserProfiles";
import UsersManagement from "./pages/UsersManagement";
import { useAuthStore } from "./store/authStore";

function AppRouter() {
  const { userInfo } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (!window.location.pathname.includes("signin")) {
        const check = !userInfo ? true : false;
        console.log(!!check);
        if (check) {
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Authentication failed", error);
    }
  }, [userInfo, navigate]);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollToTop />
      <Routes>
        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          <Route index path="/" element={<Home />} />
          <Route
            index
            path="/orders-management"
            element={<OrdersManagement />}
          />

          <Route
            index
            path="/products-management"
            element={<ProductsManagement />}
          />

          <Route
            index
            path="/staffs-management"
            element={<UsersManagement />}
          />

          <Route
            index
            path="/account-management"
            element={<AccountManagement />}
          />

          <Route index path="/staffs/:id" element={<StaffProfile />} />

          <Route index path="/tasks" element={<TaskManagement />} />

          {/* Others Page */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />

          {/* Forms */}
          <Route path="/form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="/basic-tables" element={<BasicTables />} />

          {/* Ui Elements */}
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Auth Layout */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
