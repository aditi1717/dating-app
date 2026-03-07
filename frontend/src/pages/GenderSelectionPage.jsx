import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenderSelectionPage = () => {
    const navigate = useNavigate();
    const [userGender, setUserGender] = useState(null);
    const [interestedIn, setInterestedIn] = useState([]);

    const toggleInterest = (gender) => {
        if (interestedIn.includes(gender)) {
            setInterestedIn(interestedIn.filter(g => g !== gender));
        } else {
            setInterestedIn([...interestedIn, gender]);
        }
    };

    const handleContinue = () => {
        localStorage.setItem('onboarding_gender', JSON.stringify({ userGender, interestedIn }));
        navigate('/add-photos');
    };

    // Reusable Gender Button Component
    const GenderButton = ({ label, isSelected, onClick }) => (
        <button
            onClick={onClick}
            className={`flex-1 flex items-center px-4 h-[58px] rounded-[29px] transition-all relative ${isSelected
                ? 'bg-[#F4F0FD] border-[1.5px] border-[#733FE0]'
                : 'bg-[#F4F0FD] border-[1.5px] border-transparent'
                }`}
        >
            {/* Icon Circle */}
            <div className="w-[34px] h-[34px] rounded-full bg-[#733FE0] flex items-center justify-center shrinkage-0 z-10">
                {label === 'Male' ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM14 22H13V15H15V8H9V15H11V22H10C8.34 22 7 20.66 7 19V9C7 7.9 7.9 7 9 7H15C16.1 7 17 7.9 17 9V19C17 20.66 15.66 22 14 22Z" />
                    </svg>
                ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM17 9V12C17 14.22 15.5 16.1 13.5 16.73V19H16V21H13.5V23H10.5V21H8V19H10.5V16.73C8.5 16.1 7 14.22 7 12V9H17Z" />
                    </svg>
                )}
            </div>

            <span className="flex-1 text-center text-[16px] font-bold text-black pl-2">
                {label}
            </span>
        </button>
    );

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between py-8 px-6 font-sans max-w-[420px] mx-auto">

            <div className="w-full mt-6 flex flex-col">

                {/* Header Section */}
                <div className="text-center mb-12">
                    <h2 className="text-[28px] font-bold text-black mb-2 font-sans tracking-tight">
                        Tell us who you are
                    </h2>
                    <p className="text-[15px] text-gray-400 font-medium">
                        This helps personalize your matches
                    </p>
                </div>

                {/* Section 1: Your Gender */}
                <div className="mb-10 w-full px-1">
                    <h3 className="text-[17px] font-bold text-black mb-1">Your Gender</h3>
                    <p className="text-[13px] text-black font-medium mb-5">Select the options that best describe you</p>
                    <div className="flex space-x-4">
                        <GenderButton
                            label="Male"
                            isSelected={userGender === 'Male'}
                            onClick={() => setUserGender('Male')}
                        />
                        <GenderButton
                            label="Female"
                            isSelected={userGender === 'Female'}
                            onClick={() => setUserGender('Female')}
                        />
                    </div>
                </div>

                {/* Section 2: Interest */}
                <div className="mb-8 w-full px-1">
                    <h3 className="text-[17px] font-bold text-black mb-1">Who are you interested in?</h3>
                    <p className="text-[13px] text-black font-medium mb-5">Select one or more</p>
                    <div className="flex space-x-4">
                        <GenderButton
                            label="Male"
                            isSelected={interestedIn.includes('Male')}
                            onClick={() => toggleInterest('Male')}
                        />
                        <GenderButton
                            label="Female"
                            isSelected={interestedIn.includes('Female')}
                            onClick={() => toggleInterest('Female')}
                        />
                    </div>
                </div>

            </div>

            {/* Continue Button */}
            <div className="w-full mb-4">
                <button
                    onClick={handleContinue}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default GenderSelectionPage;
