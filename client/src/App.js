import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import "./styles/App.module.scss";

import LoginPage from './page/common/Login';
import RegisterPage from './page/common/Register';
import UserDashboard from './page/dashboard/User.dashboard'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/Login" element={<LoginPage />}></Route>
        <Route path="/Register" element={<RegisterPage />}></Route>
        <Route path="/user" element={<UserDashboard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
