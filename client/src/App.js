import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import * as alertify from "alertifyjs";
import logo from './logo.svg';
import "./styles/App.module.scss";

import LoginPage from './page/common/Login';
import RegisterPage from './page/common/Register';
import UserDashboard from './page/dashboard/User.dashboard'

import ManageInventory from "./page/common/inventory/ManageInventory";
import AddItem from "./page/common/inventory/AddItem";
import ViewInventory from "./page/common/inventory/ViewInventory";
import EditItem from "./page/common/inventory/EditItem";

import DisplayReport from "./page/common/reports/DisplayReport";

import ManageVendor from "./page/common/vendors/ManageVendor";
import RegisterVendor from "./page/common/vendors/RegisterVendor";
import EditVendor from "./page/common/vendors/EditVendor";
import QRPageGenerator from "./page/common/inventory/QRPageGenerator";

import ManageUsers from "./page/user-profile/ManageUsers";
import RegisterUser from "./page/user-profile/RegisterUser";
import EditUser from "./page/user-profile/EditUser";


function Home() {
	return (
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<p>
				Edit <code>src/App.js</code> and save to reload.
			</p>
			<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
			>
				Learn React
			</a>
		</header>
	);
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {

    let mounted = true;
    if (mounted) {
      if (!["/login", "/register", "/img"].includes(location.pathname)) {
        try {
          const user = JSON.parse(localStorage.getItem("user"));
          console.log(user);
  
          if (user) {
            if (user.role === "admin") {
              if (!location.pathname.includes("/admin")) {
                navigate("/admin", { replace: true });
              }
            } 
  
            if (user.role === "user") {
  
              if (!location.pathname.includes("/user")) {
                navigate("/user", { replace: true });
              }
            }
  
          } else {
            alertify.error("You are not authorized");
            navigate("/login");
          }
  
        } catch (error) {
          console.log(error);
          localStorage.removeItem("user");
  
          alertify.error("Auth error");
          navigate("/login");
        }
      }
    }
    

    return () => mounted = false;
  }, [location, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Register" element={<RegisterPage />}></Route>
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<DisplayReport />} />

          <Route path="vendors" element={<ManageVendor/>}></Route>
          <Route path="/user/vendors/register" element={<RegisterVendor />}></Route>
          <Route path="/user/vendors/edit/:vendor_id" element={<EditVendor/>}/>

          <Route path="inventory" element={<ManageInventory/>}/>
          <Route path="/user/inventory/view/:vendor_id" element={<ViewInventory/>}/>
          <Route path="/user/inventory/edit/:item_id" element={<EditItem/>}/>
          <Route path="/user/inventory/view/qr-code/:item_id" element={<QRPageGenerator/>}/>
          <Route
            path="/user/inventory/add/:vendor_id"
            element={<AddItem/>}
          />
        </Route>
        <Route path="/admin" element={<UserDashboard/>}>
          <Route index element={<ManageUsers/>}/>
          <Route path="/admin/users/add-user" element={<RegisterUser/>}/>
          <Route path="/admin/users/edit/:user_id" element={<EditUser/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
