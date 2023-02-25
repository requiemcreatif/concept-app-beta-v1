import { BrowserRouter, Route, Routes } from "react-router-dom";
//Pages imports
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout/Layout";
import ProtectedPages from "./pages/ProtectedPages/ProtectedPages";
import Register from "./pages/Register/Register";
import User from "./pages/UserPage/User";
import Home from "./pages/Home/Home";
import AdvancedSearch from "./pages/AdvancedSearch/AdvancedSearch";
import AddCode from "./pages/AddCode/AddCode";
import SuccessBoard from "./pages/SuccessBoard/SuccessBoard";
//Dark mode

//Style
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedPages>
                <Layout />
              </ProtectedPages>
            }>
            <Route path="/" element={<Dashboard />} />
            <Route path="add-codes" element={<AddCode />} />
            <Route path="user" element={<User />} />
            <Route path="success-board" element={<SuccessBoard />} />
            <Route path="advanced-search" element={<AdvancedSearch />} />
          </Route>

          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
