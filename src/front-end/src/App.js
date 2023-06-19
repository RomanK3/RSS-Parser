import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import AdminUI from "./components/AdminUI";
import Home from "./components/Home";
import Login from "./components/Login";
import ProtectedRouteAdmin from "./components/ProtectedRouteAdmin";
import { ProvideAuth } from "./components/useAuth";
import { UserDataProvider } from "./components/useUserData";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <ProvideAuth>
          <UserDataProvider>
            <Routes>
              <Route element={<Layout />}>
                <Route element={<ProtectedRouteAdmin />}>
                  <Route path="/admin" element={<AdminUI />} />
                </Route>
                <Route index path="/home" element={<Home />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<p>Path not resolved</p>} />
            </Routes>
          </UserDataProvider>
        </ProvideAuth>
      </BrowserRouter>
    </div>
  );
};

export default App;
