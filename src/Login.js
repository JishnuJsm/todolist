import React, { useEffect, useState } from "react";
import { useAuthContext } from "./firebase/useAuthContext";
import { useAuthentication } from "./firebase/useAuthentication";

function Login({ setLoginState, setCurrentUser }) {
  const [isNewUser, setIsNewUser] = useState(false);
  const [validationError, setValidationError] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signup, error, login } = useAuthentication();
  const { isLogin } = useAuthContext();

  console.log(isLogin, "login Status");

  useEffect(() => {
    if (isLogin) {
      setLoginState(false);
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setValidationError(null);
    } else {
      if (error) {
        if (error === "Firebase: Error (auth/user-not-found).") {
          setValidationError("User Not Found");
        }
        if (error === "Firebase: Error (auth/invalid-email).") {
          setValidationError("Invalid Email !");
        }
        if (
          error ===
          "Firebase: Password should be at least 6 characters (auth/weak-password)."
        ) {
          setValidationError("Password should be at least 6 characters !");
        }
      }
    }
  }, [isLogin, error]);

  useEffect(() => {
    if (validationError) {
      if (firstName) {
        setValidationError(null);
      } else if (lastName) {
        setValidationError(null);
      } else if (email) {
        setValidationError(null);
      } else if (password) {
        setValidationError(null);
      }
    }
  }, [email, password, firstName, lastName]);

  function handleSignup() {
    console.log("Signup Called");
    if (!firstName) {
      setValidationError("FirstName Should not be Empty");
      return;
    } else if (!lastName) {
      setValidationError("LastName Should not be Empty");
      return;
    } else if (!email) {
      setValidationError("Email Should not be Empty");
      return;
    } else if (!password) {
      setValidationError("Password Should not be Empty");
      return;
    } else setValidationError(null);
    signup({ email, password, firstName, lastName });
  }

  function handleLogin() {
    console.log("Login Called");
    if (!email) {
      setValidationError("Email Should not be Empty");
      return;
    } else if (!password) {
      setValidationError("Password Should not be Empty");
      return;
    } else setValidationError(null);
    login({ email, password });
  }

  console.log("Error", error);
  return (
    <div className="loginpage">
      <div className="formContainer">
        <div className="formdiv">
          <div className="formtitlediv">
            <h2
              className="formtitle"
              style={{ borderBottom: isNewUser ? "" : "3px solid coral" }}
            >
              LOGIN
            </h2>
            <h2
              className="formtitle"
              style={{ borderBottom: isNewUser ? "3px solid coral" : "" }}
            >
              SIGNUP
            </h2>
          </div>
          {(isNewUser && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="loginform"
              style={{ width: "90%", height: "60%" }}
            >
              <div
                className="inputdiv"
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "10px",
                  margin: "20px 0"
                }}
              >
                <div style={{ width: "45%" }}>
                  <label className="formlabel">FIRSTNAME</label>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div style={{ width: "45%" }}>
                  <label className="formlabel">LASTNAME</label>
                  <input
                    className="forminput"
                    type="text"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="inputdiv">
                <label className="formlabel">EMAIL</label>
                <input
                  className="forminput"
                  type="email"
                  placeholder="xyz@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputdiv">
                <label className="formlabel">PASSWORD</label>
                <input
                  className="forminput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="buttondiv">
                <button
                  onClick={(e) => handleSignup(e)}
                  className="loginButton"
                >
                  SignUp
                </button>
              </div>
              {validationError && (
                <div className="errortab">
                  <p>{validationError}</p>
                </div>
              )}
            </form>
          )) || (
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="loginform"
              style={{ width: "90%", height: "60%" }}
            >
              <div className="inputdiv">
                <label className="formlabel">EMAIL</label>
                <input
                  className="forminput"
                  type="email"
                  placeholder="xyz@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="inputdiv">
                <label className="formlabel">PASSWORD</label>
                <input
                  className="forminput"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="buttondiv">
                <button
                  type="submit"
                  className="loginButton"
                  onClick={(e) => handleLogin(e)}
                >
                  Login
                </button>
              </div>
              {validationError && (
                <div className="errortab">
                  <p>{validationError}</p>
                </div>
              )}
            </form>
          )}

          <p
            onClick={() => {
              setLoginState(false);
              setCurrentUser("User");
            }}
            style={{
              fontSize: "0.9rem",
              color: "wheat",
              cursor: "pointer",
              position: "relative",
              top: "10px"
            }}
          >
            Login as guest
          </p>
          <div className="formfooter">
            <p style={{ fontSize: "1rem" }}>New User</p>
            <label className="switch">
              <input
                type="checkbox"
                onChange={(e) => {
                  setIsNewUser(e.target.checked);
                  setFirstName("");
                  setLastName("");
                  setEmail("");
                  setPassword("");
                  setValidationError(null);
                }}
              />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
