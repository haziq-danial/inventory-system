import { Routes, Route } from "react-router-dom";
import logo from './logo.svg';
import "./styles/App.module.scss";

import LoginPage from './page/common/Login';
import RegisterPage from './page/common/Register';
import UserDashboard from './page/dashboard/User.dashboard'

function Home() {
  return (
    <div className="App">
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
    </div>
  );
}

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
