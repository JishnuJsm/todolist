import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from "@mui/icons-material/Login";
import { useAuthentication } from "./firebase/useAuthentication";

function Nav({
  currentUser,
  setCurrentUser,
  isDark,
  setIsDark,
  setLoginState
}) {
  const [isHover, setIsHover] = React.useState(false);

  const { logout } = useAuthentication();

  function handleMouseOver() {
    setIsHover(() => true);
  }

  function handleMouseOut() {
    setIsHover(() => false);
  }
  return (
    <nav>
      <h3>
        {isHover && currentUser !== null ? "😢" : "😊"} Hello! {currentUser}
      </h3>
      <div>
        <p style={{}} onClick={() => setIsDark(!isDark)}>
          {isDark ? "Light Mode" : "Dark Mode"}
        </p>
        {currentUser === null ||
          (currentUser === "User" && (
            <LoginIcon
              style={{
                cursor: "pointer",
                color: isHover ? "green" : isDark ? "white" : "#333"
              }}
              onClick={() => {
                setCurrentUser(null);
                let timer = setTimeout(() => {
                  setLoginState(true);
                  clearTimeout(timer);
                }, 500);
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          )) || (
            <LogoutIcon
              style={{
                cursor: "pointer",
                color: isHover ? "red" : isDark ? "white" : "#333"
              }}
              onClick={() => {
                logout();
                let timer = setTimeout(() => {
                  setLoginState(true);
                  setCurrentUser(null);
                  clearTimeout(timer);
                }, 1500);
              }}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            />
          )}
      </div>
    </nav>
  );
}

export default Nav;
