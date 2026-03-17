import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const STATIC_OTP = '1234';

const VerifyOTPPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const savedPhone = JSON.parse(localStorage.getItem('onboarding_phone') || '{}');

    const handleSubmit = () => {
        const enteredOtp = otp.join('');

        if (!savedPhone?.isStaticLogin || savedPhone?.phone !== '7223077890') {
            setError('Start again with the demo phone number.');
            navigate('/phone-input');
            return;
        }

        if (enteredOtp !== STATIC_OTP) {
            setError('Use OTP 1234 to continue.');
            return;
        }

        login({
            id: 'demo-user',
            phone: savedPhone.phone,
            countryCode: savedPhone.countryCode || '+91',
            authType: 'static-otp',
        });

        setError('');
        navigate('/profile-details');
    };

    const handleChange = (index, value) => {
        if (isNaN(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

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

            <div className="w-full max-w-[280px] rounded-3xl bg-[#F7F1FF] border border-[#E9DDFE] px-4 py-3 text-center text-[14px] text-[#5A2DB9] mb-8">
                Demo OTP: <span className="font-bold">{STATIC_OTP}</span>
            </div>

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

            {error && (
                <p className="text-[13px] text-red-500 mb-5 text-center">
                    {error}
                </p>
            )}

            {/* Submit Button */}
            <button
                onClick={handleSubmit}
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
