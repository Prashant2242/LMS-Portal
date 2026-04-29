import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";
import {serverUrl} from "../App";
const ForgetPassword = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [loading, setLoading] = useState(false);

  //for step 1
  const sendOtp = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/auth/sendotp",
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
      setStep(2);
      toast.success(result.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  // step 2
  const verifyOTP = async () =>{
    setLoading(true)
    try{
       const  result = await axios.post(serverUrl + "/api/auth/verifyotp", {email , otp}, {withCredentials:true})
       console.log(result.data);
       setLoading(false);
       setStep(3);
       toast.success(result.data.message);

    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  } 

  //for step 3 
  const resetPassword = async () =>{
    setLoading(true)
    try{
      if (newPassword !== conPassword) {
        setLoading(false);
        return toast.error("Password is not matched");
      }
      
       const  result = await axios.post(serverUrl + "/api/auth/resetpassword", {email , password: newPassword}, {withCredentials:true})
       console.log(result.data);
       setLoading(false);
       navigate("/login")
       toast.success(result.data.message);

    }catch(error){
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  } 


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {/* step1 */}
      {step == 1 && (
        <div className="bg-white shadoe-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Forget Your Password
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Enter Your email address
              </label>
              <input
                id="email"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="your@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="w-full bg-black hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}
              onClick={sendOtp}
            >
              {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step2 */}
      {step == 2 && (
        <div className="bg-white shadoe-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Enter OTP
          </h2>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault} >
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                Please enter the 4-digit code sent to your email
              </label>
              <input
                id="otp"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="* * * *"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer" disabled={loading} onClick={verifyOTP}>
             {loading ? <ClipLoader size= {30} color='white'/> : "Verify OTP"}
            </button>
          </form>
          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}

      {/* step3 */}
      {step == 3 && (
        <div className="bg-white shadoe-md rounded-xl p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Reset Your Password
          </h2>
          <p className="text-sm text-gray-500 text-center mb-6">
            Enter a new password below to regain access to your account
          </p>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="***********"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="conpassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="conpassword"
                type="text"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[black]"
                placeholder="***********"
                required
                onChange={(e) => setConPassword(e.target.value)}
                value={conPassword}
              />
            </div>
            <button className="w-full bg-[black] hover:bg-[#4b4b4b] text-white py-2 px-4 rounded-md font-medium cursor-pointer" disabled={loading} onClick={resetPassword}> {loading ? <ClipLoader size={20} color="white" /> : "Reset Password" }
            </button>
          </form>
          <div
            className="text-sm text-center mt-4"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </div>
        </div>
      )}
    </div>
  );
};

export default ForgetPassword;
