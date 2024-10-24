import React, {useState} from 'react';
import styles from '../Signin.module.css';
import messenger_logo from '../messenger_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { USER_API_ENDPOINT } from '../utils/constant';

const Signin = () => {
    const [user, setUser] = useState({
        email:"",
        password:"",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
              `${USER_API_ENDPOINT}/login`,
              user,
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
              toast.success("User logged in successfully");
                navigate("/");
                dispatch(setAuthUser(res.data));
            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
          setUser({
            email: "",
            password: "",
          })
        };
    return (
        <div className={styles.wrapper}>
            <div className="min-w-96 mx-auto">
                <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
                    <div className="flex items-center justify-center pb-1">
                        <img
                            src={messenger_logo}
                            alt="messenger_logo"
                            className="w-1/5"
                        />
                    </div>
                    <div className="lg:text-3xl text-xl text-gray-200 font-semibold text-center">
                        <h1> Connect with your favorite people.</h1>
                        <h2 className="pt-2"> Login.</h2>
                    </div>
                    <div className="flex items-center justify-center p-10">
                        <form onSubmit={onSubmitHandler} action="">
                            <div className="p-2 m-1 w-full input input-bordered h-10">
                                <input 
                                    type="email" 
                                    onChange={(e)=>setUser({...user,email: e.target.value})}
                                    placeholder="Email" 
                                    className="rounded-md"/>
                            </div>
                            <div className="p-2 m-1 w-full input input-bordered h-10">
                                <input 
                                    type="password" 
                                    onChange={(e)=>setUser({...user,password: e.target.value})}
                                    placeholder="Password" 
                                    className="rounded-md"/>
                            </div>
                            <Link to="/register">
                                Don't have an account ?
                            </Link>
                            <div>
                                <button className="btn btn-block btn-sm mt-2 border border-slate-700"> Log In </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Signin;
