import LoginImg from './login.avif';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';

function Login() {
    return (
        <motion.div 
            className="flex h-screen"
            initial={{ opacity: 0, x: 100 }}  
            animate={{ opacity: 1, x: 0 }}    
            exit={{ opacity: 0, x: -100 }}    
            transition={{ duration: 0.6, ease: "easeInOut" }} 
        >
            <div className="w-1/2 flex justify-center items-center bg-gray-100">
                <img src={LoginImg} alt="Login" className="max-w-[80%] h-auto rounded-lg shadow-lg" />
            </div>

            <div className="w-1/2 flex flex-col justify-center items-center p-10 bg-white shadow-lg">
                <h2 className="text-3xl font-[900] text-gray-800 mb-6">
                    Welcome to Code<span className="text-[#5f27cd]">Cracker</span>
                </h2>
                
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="w-[80%] p-3 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
                />
                
                <input 
                    type="password" 
                    placeholder="Enter your password" 
                    className="w-[80%] p-3 mb-4 bg-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5f27cd]"
                />
                
                <button className="w-[80%] p-3 bg-[#5f27cd] text-white rounded-md font-semibold transition hover:bg-[#4820a8] hover:cursor-pointer">
                    Login
                </button>

                <p className="relative top-2">
                    New to CodeCracker? <a href="/signup" className="text-[#341f97]">Signup</a>
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
        </motion.div>
    );
}

export default Login;
