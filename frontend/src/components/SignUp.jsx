import SignupImg from "./signup.jpg";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";
import preloaderGIF from "./loader.gif";
import {useNavigate} from 'react-router-dom';

function Signup() {
    const BACKEND_URL = import.meta.env.VITE_REACT_APP_BACKEND_URL;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [preloader, setPreloader] = useState(false);
    const navigate = useNavigate();

    const checkEmail = (example) => {
        const regex = /^[a-zA-Z][a-zA-Z0-9]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
        return regex.test(example);
    };

    const checkPassword = (example) => {
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(example);
    };

    const handleSignUp = async () => {
        try {
            if (!name || !email || !password) return;
            if (!checkEmail(email)) {
                alert("Invalid Email format");
                return;
            } else if (!checkPassword(password)) {
                alert(
                    "Invalid Password format, Password must contain at least one uppercase, one lowercase, and one special character"
                );
                return;
            }

            setPreloader(true);

            const response = await axios.post(`${BACKEND_URL}/signup`, {
                name,
                email,
                password,
            });

            const data = response.data;
            setPreloader(false);
            console.log(data.already_present);

            if (data.already_present) {
                alert("User already exists");
                return;
            } else {
                alert("User added successfully");
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            setPreloader(false);
        }
    };

    return (
        <motion.div
            className="flex h-screen relative"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
        >
            {preloader && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
                    <img src={preloaderGIF} alt="Loading..." className="w-16 h-16" />
                </div>
            )}

            <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-lg">
                <h2 className="text-3xl font-[900] text-gray-800 mb-6">
                    Join Code<span className="text-[#5f27cd]">Cracker</span>
                </h2>

                <input
                    type="text"
                    placeholder="Enter your name"
                    className="w-[80%] p-3 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-[80%] p-3 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Create a password"
                    className="w-[80%] p-3 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-[80%] p-3 bg-[#5f27cd] text-white rounded-md font-semibold transition hover:bg-[#4820a8] hover:cursor-pointer"
                    onClick={handleSignUp}
                    disabled={preloader}
                >
                    Signup
                </button>

                <p className="relative top-2">
                    Already have an account?{" "}
                    <a href="/login" className="text-[#341f97]">
                        Login
                    </a>
                </p>

                <div className="flex items-center w-[80%] my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-4 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                <button className="w-[80%] p-3 flex items-center justify-center bg-white border border-gray-400 rounded-md font-semibold text-gray-700 transition hover:bg-gray-100 hover:cursor-pointer">
                    <FcGoogle className="text-2xl mr-2" /> Continue with Google
                </button>
            </div>

            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <img
                    src={SignupImg}
                    alt="Signup"
                    className="max-w-[80%] h-auto rounded-lg shadow-lg"
                />
            </div>
        </motion.div>
    );
}

export default Signup;
