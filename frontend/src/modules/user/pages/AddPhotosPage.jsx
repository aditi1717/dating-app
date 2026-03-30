import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';

const AddPhotosPage = () => {
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([null, null, null, null, null, null]);
    const fileInputRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);

    const handlePhotoClick = (index) => {
        setActiveIndex(index);
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                const newPhotos = [...photos];
                newPhotos[activeIndex] = reader.result;
                setPhotos(newPhotos);
            };
            reader.readAsDataURL(file);
        }
    };

    const uploadedCount = photos.filter(p => p !== null).length;
    const canContinue = uploadedCount >= 5;

    const handleContinue = () => {
        if (!canContinue) return;
        const validPhotos = photos.filter(p => p !== null);

        // Avoid storing large base64 image payloads in localStorage.
        // This key is only used as onboarding progress metadata right now.
        localStorage.setItem('onboarding_photos', JSON.stringify({
            count: validPhotos.length,
            hasPhotos: validPhotos.length > 0,
            completedAt: Date.now(),
        }));
        navigate('/enable-location');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-12 px-6 font-sans max-w-md mx-auto shadow-2xl border-x border-gray-100">

            <div className="w-full flex flex-col items-center">
                {/* Title */}
                <h2 className="text-[28px] font-bold text-black mb-2 text-center font-sans tracking-tight">
                    Add your Photos
                </h2>
                <p className="text-[15px] text-gray-500 text-center mb-10 font-bold">
                    Your first impression matters.
                </p>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                {/* Photos Grid — 6 boxes */}
                <div className="grid grid-cols-2 gap-4 mb-12 w-full">
                    {photos.map((photo, idx) => (
                        <div
                            key={idx}
                            onClick={() => handlePhotoClick(idx)}
                            className="relative flex aspect-square w-full cursor-pointer items-center justify-center overflow-hidden rounded-[20px] transition-all hover:opacity-90 shadow-sm"
                        >
                            {photo ? (
                                <img
                                    src={photo}
                                    className="w-full h-full object-cover"
                                    alt={`Photo ${idx + 1}`}
                                />
                            ) : (
                                <>
                                    {/* Same blurred background for ALL empty slots */}
                                    <img
                                        src={demoPhoto}
                                        className="absolute inset-0 h-full w-full object-cover scale-x-[-1]"
                                        alt=""
                                    />
                                    <div className="absolute inset-0 rounded-[20px] bg-[rgba(249,253,252,0.7)] backdrop-blur-[5.5px]" />
                                    {/* Plus icon */}
                                    <div className="relative z-10 flex h-[49px] w-[49px] items-center justify-center rounded-full border-2 border-[#F6FBF3] bg-[#6F3BCE] shadow-sm">
                                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" aria-hidden="true">
                                            <path
                                                d="M12.5 5.5V19.5M5.5 12.5H19.5"
                                                stroke="#F5F5F5"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                            />
                                        </svg>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="mt-auto w-full flex flex-col items-center">
                <button
                    onClick={handleContinue}
                    disabled={!canContinue}
                    className={`w-full text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg active:scale-[0.98] transition-all mb-4 ${
                        canContinue
                            ? 'bg-[#733FE0] shadow-purple-100 hover:bg-[#6533c9]'
                            : 'bg-[#C4AFF0] cursor-not-allowed'
                    }`}
                >
                    Continue
                </button>
                <p className="text-[13px] text-black font-medium">
                    {canContinue
                        ? `${uploadedCount} photos added ✓`
                        : `Minimum 5 photos required (${uploadedCount}/5 added)`
                    }
                </p>
            </div>
        </div>
    );
};

export default AddPhotosPage;
