import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RelationshipGoalsPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const canContinue = Boolean(selected);

    const handleNext = () => {
        if (!canContinue) return;
        localStorage.setItem('onboarding_goals', selected);
        navigate('/discovery');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-6 px-6 font-sans max-w-[420px] mx-auto">


            <div className="w-full flex flex-col items-center flex-1 mt-4">
                {/* Title */}
                <h2 className="text-[30px] font-bold text-black mb-3 text-center font-sans tracking-tight leading-tight">
                    What are you Looking for?
                </h2>

                {/* Subtitle */}
                <p className="text-[14px] text-gray-500 text-center mb-12 leading-relaxed font-medium px-4">
                    All good if it changes. There’s something for everyone.
                </p>

                {/* Options */}
                <div className="w-full space-y-5">

                    {/* Option 1: Long-term */}
                    <button
                        onClick={() => setSelected('Long-term Partner')}
                        className={`w-full flex items-center px-6 h-[72px] rounded-[36px] transition-all relative ${selected === 'Long-term Partner'
                            ? 'bg-white border-[1.5px] border-[#733FE0] shadow-sm'
                            : 'bg-white border-transparent shadow-md hover:shadow-lg'
                            }`}
                    >
                        <div className="text-[24px] mr-5">
                            {/* Heart Icon SVG */}
                            <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF4D6D" stroke="none">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <span className="text-[15px] font-bold text-black">
                            Long-term Partner
                        </span>
                    </button>

                    {/* Option 2: Just casual */}
                    <button
                        onClick={() => setSelected('Just casual')}
                        className={`w-full flex items-center px-6 h-[72px] rounded-[36px] transition-all relative ${selected === 'Just casual'
                            ? 'bg-white border-[1.5px] border-[#733FE0] shadow-sm'
                            : 'bg-white border-transparent shadow-md hover:shadow-lg'
                            }`}
                    >
                        <div className="text-[24px] mr-5 flex items-center justify-center">
                            <span className="text-[28px] leading-none">🎉</span>
                        </div>
                        <span className="text-[15px] font-bold text-black">
                            Just casual
                        </span>
                    </button>

                </div>

                {/* Next Button */}
                <div className="mt-auto w-full mb-6">
                    <button
                        onClick={handleNext}
                        disabled={!canContinue}
                        className={`w-full h-[58px] rounded-[30px] text-[16px] font-bold text-white shadow-lg transition-all ${
                            canContinue
                                ? 'bg-[#733FE0] shadow-purple-100 active:scale-[0.98]'
                                : 'cursor-not-allowed bg-[#C4AFF0] shadow-none'
                        }`}
                    >
                        Next
                    </button>
                </div>

            </div>
        </div>
    );
};

export default RelationshipGoalsPage;
