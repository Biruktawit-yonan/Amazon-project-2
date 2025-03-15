import React, { useContext, useState } from "react";
import classes from "./SignUp.module.css";
import Layout from "../../components/Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/Action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({
    signin: false,
    signup: false,
  });
  const navigate = useNavigate();
  const navStateData=useLocation();
  console.log(user);
  console.log(email, password);

  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name === "signin") {
      console.log(e.target.name);
      setLoading({ ...loading, signin: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });
          setLoading({...loading, signin:false})
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.massage);
          
          setLoading({ ...loading, signin: false });
          navigate();
        });
    } else {
      setLoading({ ...loading, signup: true });
      navigate("/");

      createUserWithEmailAndPassword(auth, email, password)
        .then((userinfo) => {
          console.log(userinfo);
          dispatch({
            type: Type.SET_USER,
            user: userinfo.user,
          });

          setLoading({ ...loading, signup: false });
        navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          console.log(err);
          setError(err.message);
          setLoading({ ...loading, signin: false });
        });
    }
  };
  return (
    <section className={classes.login}>
      <div>
        <Link to="/">
          <img
            src="https://pngimg.com/uploads/amazon/amazon_PNG12.png"
            alt="Amazon logo"
          />
        </Link>
      </div>
      <div className={classes.login__container}>
        <h1>Sign in</h1>

        {navStateData?.state?.msg && (
          <small
            style={{
              padding: "5px",
              textAlign: "center",
              color: "red",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form>
          <div>
            <label htmlFor="e-mail">E-mail</label>
            <br />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <div>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <button
            type="submit"
            name="signin"
            className={classes.btn__sin}
            onClick={authHandler}
          >
            {loading.signin ? <ClipLoader color="gray" /> : "sign in"}
          </button>
          <br />
          <br />
        </form>
        <p>
          By signing your agreement tto the amazon fake clone condtion of use
          &sale please see our privacy notice and our interest-based Ads notice
        </p>
        <br />
        <button
          type="submit"
          name="signup"
          className={classes.btn__creat}
          onClick={authHandler}
        >
          {loading.signup ? (
            <ClipLoader color="gray" />
          ) : (
            "create your amazon account"
          )}
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </section>
  );
}

export default Auth;
