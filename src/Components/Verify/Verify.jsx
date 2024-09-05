import React, { useState } from 'react';
import { BsFillShieldLockFill, BsTelephoneFill } from "react-icons/bs";
import OtpInput from 'otp-input-react';
import { CgSpinner } from "react-icons/cg";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { Toaster } from 'react-hot-toast'; 
import { auth } from "../../../firebase.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";


const Verify = () => {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            onSignup();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }

  function onSignup() {
    setLoading(true);
    onCaptchVerify();

    const appVerifier = window.recaptchaVerifier;

    const formatPh = "+" + ph;

    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success("OTP sent successfully!");
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }

  function onOTPVerify() {
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <>
      <section className='bg-[#03989e] flex items-center justify-center min-h-screen'>
        <div>
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {user ? (
            <h2 className="text-center text-white font-medium text-2xl">
              👍Login Success
            </h2>
          ) : (
            <div className='max-w-screen-md w-full'>
              <div className='w-full md:w-80 mx-auto flex flex-col gap-4 rounded-lg p-4'>
                <h1 className='text-center leading-normal text-white font-medium text-3xl mb-6'>
                  InnoBotHealth
                </h1>
                {showOTP ? (
                  <>
                    {/* OTP Verification Section */}
                    <div className='hidden md:flex flex-col items-center'>
                      <div className='bg-white text-[#03989e] w-fit mx-auto p-4 rounded-full'>
                        <BsFillShieldLockFill size={30} />
                      </div>
                      <label htmlFor='otp' className='font-bold text-xl text-white text-center'>
                        Enter your OTP
                      </label>
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        OTPLength={6}
                        otpType="number"
                        disabled={false}
                        autoFocus
                        className="otp-container "
                      />
                      <button onClick={onOTPVerify} className='bg-[#03989e]-400 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded'>
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Verify OTP</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Phone Verification Section */}
                    <div className='flex flex-col items-center'>
                      <div className='bg-white text-[#03989e] w-fit mx-auto p-4 rounded-full'>
                        <BsTelephoneFill size={30} />
                      </div>
                      <label htmlFor="" className="font-bold text-xl text-white text-center">
                        Verify your phone number
                      </label>
                      <PhoneInput country={"in"} value={ph} onChange={setPh} />
                      <button onClick={onSignup} className="bg-[#03989e]-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded">
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span>Send code via SMS</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Verify;
