import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto focus next input
        if (value !== '' && index < 3) {
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
            inputRefs[index - 1].current.focus();
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-6 font-sans max-w-[420px] mx-auto shadow-2xl border-x border-gray-100">

            {/* Title */}
            <h2 className="text-[34px] font-bold text-black mb-2 text-center font-sans tracking-tight">
                Verify
            </h2>

            {/* Subtitle */}
            <p className="text-[15px] text-gray-500 text-center mb-10 leading-relaxed font-medium">
                Please enter the 4-digit code<br />
                sent to your number
            </p>

            {/* OTP Input Group */}
            <div className="flex space-x-4 mb-10">
                {otp.map((digit, index) => (
                    <input
                        key={index}
                        ref={inputRefs[index]}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-[56px] h-[56px] border-[1.5px] border-[#733FE0] rounded-full text-center text-[22px] font-medium text-black outline-none focus:shadow-md transition-all caret-transparent"
                    />
                ))}
            </div>

            {/* Submit Button */}
            <button
                onClick={() => navigate('/profile-details')}
                className="w-[200px] bg-[#733FE0] text-white font-medium h-[54px] rounded-[27px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all mb-6"
            >
                Submit
            </button>

            {/* Resend Action */}
            <button className="text-[16px] font-bold text-black hover:opacity-70 transition-opacity">
                Resend OTP
            </button>
        </div>
    );
};

export default VerifyOTPPage;
