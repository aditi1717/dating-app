import React from 'react';
import { useNavigate } from 'react-router-dom';

const EnableLocationPage = () => {
    const navigate = useNavigate();

    const handleEnableLocation = () => {
        // Logic to request location permission could go here
        // For now, proceed to the next screen
        navigate('/interests');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between py-12 px-8 font-sans max-w-[420px] mx-auto">

            <div className="flex flex-col items-center w-full mt-6">
                {/* Icon Placeholder - The screenshot doesn't explicitly show a big icon at top, 
                   but there is a large white space or maybe a subtle illustration not visible in the crop?
                   The prompt says "exact same page". The top half is empty white space in the crop. 
                   I will leave it as white space or a subtle placeholder if implied. 
                   Actually, looking at the crop, it's just text centered in the middle/upper-middle.
                */}

                {/* Title */}
                <h2 className="text-[28px] font-bold text-black mb-3 text-center tracking-tight">
                    Enable location
                </h2>

                {/* Subtitle */}
                <p className="text-[15px] text-gray-500 text-center mb-16 leading-relaxed px-4 font-medium">
                    Find people nearby for better matches.<br />Find people nearby for better matches.
                </p>

                {/* "Why we need your location" Section */}
                <div className="w-full px-2">
                    <h3 className="text-[18px] font-bold text-black mb-6 text-center">
                        Why we need your location
                    </h3>

                    <div className="space-y-5">
                        {/* Item 1 */}
                        <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 rounded-full bg-[#733FE0] flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-[16px] text-[#733FE0] font-medium">Nearby matches</span>
                        </div>

                        {/* Item 2 */}
                        <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 rounded-full bg-[#733FE0] flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-[16px] text-[#733FE0] font-medium">Trusted profiles in your area</span>
                        </div>

                        {/* Item 3 */}
                        <div className="flex items-center space-x-4">
                            <div className="w-6 h-6 rounded-full bg-[#733FE0] flex items-center justify-center shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </div>
                            <span className="text-[16px] text-[#733FE0] font-medium">See who’s active around you</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enable Location Button */}
            <div className="w-full mb-4">
                <button
                    onClick={handleEnableLocation}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all"
                >
                    Enable Location
                </button>
            </div>

        </div>
    );
};

export default EnableLocationPage;
