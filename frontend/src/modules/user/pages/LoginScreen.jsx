import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Import assets from local folder
import centerImage from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import avatarTopRed from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import avatarRightBeard from '../assets/a4e07912a9df7e2f14bba65dd13433a5d9fc0f9b.png';
import avatarBottomRightSmall from '../assets/9bd108315ddebf58571ec9fe25c0a6d5d63096ba.png';
import avatarBottomDark from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';
import avatarLeftDenim from '../assets/cb6000111458728947d5516dee724f449f4d81e2.png';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [isSignUp, setIsSignUp] = useState(false);

    const handlePhoneLoginClick = () => {
        navigate('/phone-input');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-4 pb-6 px-6 font-sans overflow-hidden max-w-[420px] mx-auto">
            {/* Header Text */}
            <div className="mt-6 mb-1 text-center">
                <h2 className="text-[34px] leading-[1.1] font-bold text-black tracking-tight">
                    Find <span className="text-[#FF8878]">your</span>
                    <br />
                    <span className="text-[#FF8878]">best</span> match
                </h2>
            </div>

            {/* Central Graphic Container */}
            <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center mb-6 shrink-0">

                {/* 1. Outer Orbit Ring (Dashed) */}
                <div className="absolute w-[94%] h-[94%] border-[2px] border-dashed border-[#AAA0CF] rounded-full"></div>

                {/* 2. Inner Orbit Ring (Solid/Glow) */}
                <div className="absolute w-[70%] h-[70%] bg-[#F4F0FD] border border-purple-100 rounded-full"></div>

                {/* 3. Main Image - Center */}
                <div className="relative w-[41%] h-[41%] rounded-full overflow-hidden border-[5px] border-white shadow-xl z-20">
                    <img
                        src={centerImage}
                        className="w-full h-full object-cover"
                        alt="Couple"
                    />
                </div>

                {/* 4. Outer Satellites Container */}
                <div className="absolute w-[94%] h-[94%] inset-0 m-auto z-10 pointer-events-none">

                    {/* Top Right: Location Icon */}
                    <div className="absolute top-[12%] left-[82%] -translate-x-1/2 -translate-y-1/2 w-[42px] h-[42px] rounded-full bg-[#733FE0] flex items-center justify-center border-[3px] border-white shadow-md text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" /></svg>
                    </div>

                    {/* Right: Man Beard */}
                    <div className="absolute top-[67%] left-[97%] -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                        <img src={avatarRightBeard} className="w-full h-full object-cover" alt="User" />
                    </div>

                    {/* Bottom Right: Small Woman */}
                    <div className="absolute top-[91%] left-[78%] -translate-x-1/2 -translate-y-1/2 w-[40px] h-[40px] rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                        <img src={avatarBottomRightSmall} className="w-full h-full object-cover" alt="User" />
                    </div>

                    {/* Bottom Left: Chat Icon */}
                    <div className="absolute top-[85%] left-[15%] -translate-x-1/2 -translate-y-1/2 w-[44px] h-[44px] rounded-full bg-[#733FE0] flex items-center justify-center border-[3px] border-white shadow-md text-white">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" /></svg>
                    </div>

                    {/* Left: Man Denim */}
                    <div className="absolute top-1/2 left-[10px] -translate-x-1/2 -translate-y-1/2 w-[50px] h-[50px] rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                        <img src={avatarLeftDenim} className="w-full h-full object-cover" alt="User" />
                    </div>
                </div>

                {/* 5. Inner Satellites Container */}
                <div className="absolute w-[70%] h-[70%] inset-0 m-auto z-10 pointer-events-none">
                    {/* Top: Woman Red */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                        <img src={avatarTopRed} className="w-full h-full object-cover" alt="User" />
                    </div>

                    {/* Bottom: Woman Dark */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -translate-y-1/2 w-[54px] h-[54px] rounded-full border-2 border-white overflow-hidden shadow-md bg-white">
                        <img src={avatarBottomDark} className="w-full h-full object-cover" alt="User" />
                    </div>
                </div>

            </div>

            {/* Actions Section */}
            <div className="w-full flex flex-col pb-4">
                <button
                    onClick={handlePhoneLoginClick}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[17px] shadow-lg hover:bg-[#6533c9] active:scale-[0.98] transition-all mb-6"
                >
                    Login using phone number
                </button>

                {/* OR Divider */}
                <div className="relative flex items-center justify-center mb-6">
                    <div className="w-full h-[1px] bg-purple-100"></div>
                    <div className="absolute bg-white px-3">
                        <span className="text-[14px] font-bold text-black font-sans">OR</span>
                    </div>
                </div>

                {/* Social Logins */}
                <div className="flex flex-col items-center mb-8">
                    <p className="text-[17px] font-bold text-black mb-5">Login using</p>
                    <div className="flex space-x-5">
                        <button className="w-[52px] h-[52px] rounded-full border border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                        </button>
                        <button className="w-[52px] h-[52px] rounded-full border border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg width="26" height="26" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" /><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z" /><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" /><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" /></svg>
                        </button>
                        <button className="w-[52px] h-[52px] rounded-full border border-black flex items-center justify-center hover:bg-gray-50 transition-colors">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="black"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.1 2.48-1.34.03-1.77-.79-3.31-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-1.07 1.64.03 3.12.59 4.17 1.5-.09.06-2.49 1.45-2.46 4.34.03 3.46 3.01 4.63 3.05 4.65zM15.35 2.44c.66-.8 1.11-1.92.99-3.03-1.04.04-2.31.7-3.05 1.57-.67.77-1.26 1.92-1.08 3.01 1.16.09 2.34-.65 3.14-1.55z" /></svg>
                        </button>
                    </div>
                </div>

                <p className="text-[14px] text-black text-center font-normal">
                    Don't have an account <button className="text-[#A485E9] font-medium hover:underline">Sign Up?</button>
                </p>
            </div>
        </div>
    );
};

export default LoginScreen;
