import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import { authenticate, isAuth } from "../../helper";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const [loginData, setloginData] = useState({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;

    setloginData((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post("http://localhost:5000/user/login", {
        email: loginData.email,
        password: loginData.password,
      })
      .then((response) => {
        authenticate(response, () => {
          setloginData({ email: "", password: "" });
          isAuth() && history.push("/");
        });
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.response);
      });
  };

  return (
    <>
      {loading && <span className="_it4vx _72fik"></span>}
      <div className="register_container">
        <div
          className="register_left_container"
          style={{ backgroundImage: `url(${"/images/wave.png"})` }}
        >
          <img src="/images/bg.svg" alt="Background" />
        </div>
        <div className="register_right_container">
          <img src="/images/avatar.svg" alt="Avatar" />
          <h2>Welcome To CSV COVERTER</h2>
          <form action="" autoComplete="off">
            <div className="form_group">
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                required
                onChange={inputChangeHandler}
                value={loginData.email}
              />
              <label htmlFor="email" className="label_name">
                <span className="content_name">Email</span>
              </label>
            </div>
            <div className="form_group">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={inputChangeHandler}
                value={loginData.password}
              />
              <label htmlFor="password" className="label_name">
                <span className="content_name">Password</span>
              </label>
            </div>
            <Link to="/register" className="account_already">
              Don't hav account ?
            </Link>

            <button type="submit" onClick={formSubmitHandler}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
