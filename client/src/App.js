import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import "./styles/App.module.scss";

import LoginPage from './page/common/Login';
import RegisterPage from './page/common/Register';
import UserDashboard from './page/dashboard/User.dashboard'

import ManageInventory from "./page/common/inventory/ManageInventory";
import AddItem from "./page/common/inventory/AddItem";
import ViewInventory from "./page/common/inventory/ViewInventory";

import DisplayReport from "./page/common/reports/DisplayReport";

import ManageVendor from "./page/common/vendors/ManageVendor";
import RegisterVendor from "./page/common/vendors/RegisterVendor";
import EditVendor from "./page/common/vendors/EditVendor";


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
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Register" element={<RegisterPage />}></Route>
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<DisplayReport />} />

          <Route path="vendors" element={<ManageVendor/>}></Route>
          <Route path="/user/vendors/register" element={<RegisterVendor />}></Route>

          <Route path="inventory" element={<ManageInventory/>}/>
          <Route path="/user/inventory/view/:vendor_id" element={<ViewInventory/>}/>
          <Route
            path="/user/inventory/add/:vendor_id"
            element={<AddItem/>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
