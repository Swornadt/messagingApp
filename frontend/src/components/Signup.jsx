import React, { useState } from "react";
import styles from "../Signup.module.css"
import messenger_logo from "../messenger_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { USER_API_ENDPOINT } from "../utils/constant";

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const navigate = useNavigate();
  const handleCheckBox = (gender) => {
    setUser({ ...user, gender });
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const res = await axios.post(
        `${USER_API_ENDPOINT}/register`,
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
        if (res.data.success) {
          navigate("/login");
          toast.success("Please sign in to continue");
        }
      setUser({
        fullName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className={styles.wrapper}>
      <div className="min-w-96 mx-auto">
        <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
          <div className="flex items-center justify-center pb-1">
            <img src={messenger_logo} alt="messenger_logo" className="w-1/5" />
          </div>
          <div className="lg:text-3xl text-xl text-gray-200 font-semibold text-center">
            <h1> Connect with your favorite people.</h1>
            <h2 className="pt-2"> Sign Up.</h2>
          </div>
          <div className="flex items-center justify-center p-10">
            <form onSubmit={onSubmitHandler} action="">
              <div className="p-2 m-1 w-full input input-bordered h-10">
                <input
                  type="text"
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  placeholder="Full Name"
                  className="rounded-md"
                />
              </div>
              <div className="p-2 m-1 w-full input input-bordered h-10">
                <input
                  type="text"
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Username"
                  className="rounded-md"
                />
              </div>
              <div className="p-2 m-1 w-full input input-bordered h-10">
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Email"
                  className="rounded-md"
                />
              </div>
              <div className="p-2 m-1 w-full input input-bordered h-10">
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Password"
                  className="rounded-md"
                />
              </div>
              <div className="p-2 m-1 w-full input input-bordered h-10">
                <input
                  type="password"
                  value={user.confirmPassword}
                  onChange={(e) =>
                    setUser({ ...user, confirmPassword: e.target.value })
                  }
                  placeholder="Confirm Password"
                  className="rounded-md"
                />
              </div>
              <div className="flex items-center my-4">
                <div className="flex items-center">
                  <p> Male </p>
                  <input
                    type="checkbox"
                    checked={user.gender === "Male"}
                    onChange={() => handleCheckBox("Male")}
                    defaultChecked
                    className="checkbox mx-2"
                  />
                </div>
                <div className="flex items-center">
                  <p> Female </p>
                  <input
                    type="checkbox"
                    checked={user.gender === "Female"}
                    onChange={() => handleCheckBox("Female")}
                    className="checkbox mx-2"
                  />
                </div>
              </div>
              <Link to="/login">Already have an account ?</Link>
              <div>
                <button
                  type="submit"
                  className="btn btn-block btn-sm mt-2 border border-slate-700"
                >
                  {" "}
                  Sign Up{" "}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
