import { Outlet, useNavigate } from "react-router-dom";
import useUserData from "./useUserData";
import { useAuth } from "./useAuth";

import "../index.css";

const Layout = () => {
  const userData = useUserData();
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRedirectToAdmin = () => {
    navigate("/admin");
  };

  const handleRedirectToHome = () => {
    navigate("/home");
  };

  return (
    <div>
      <header>
        <h1 onClick={handleRedirectToHome}>RSS-Parser</h1>
        <div></div>
        {auth.token ? (
          <div className="welcome">
            <span className="welcome-link" onClick={handleRedirectToAdmin}>
              Welcome {userData}!
            </span>
            <button onClick={auth.signOut}>Sign Out</button>
          </div>
        ) : (
          <div className="welcome">
            <button onClick={handleSignIn}>Sign In</button>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
};

export default Layout;
