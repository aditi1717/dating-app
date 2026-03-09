import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Importing a local asset for the demo "uploaded" photo - keeping this as default first photo for demo
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';

const AddPhotosPage = () => {
    const navigate = useNavigate();
    // Default 5 slots + 1 already uploaded demo, total 6 visuals. 
    // Grid handles 6 items? Screenshot showed 2 columns.
    // Screenshot showed 1st item as Image, then next items as "Add" placeholders.
    // Let's model state:
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

    const handleContinue = () => {
        // Filter out nulls if needed, or save all. 
        // Screenshot said "Minimum 5 photos required".
        const validPhotos = photos.filter(p => p !== null);
        // For dev/demo, allowing fewer, but in real app would validate length.

        localStorage.setItem('onboarding_photos', JSON.stringify(validPhotos));
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

                {/* Photos Grid */}
                <div className="grid grid-cols-2 gap-4 mb-12 w-full">
                    {photos.map((photo, idx) => (
                        <div
                            key={idx}
                            onClick={() => handlePhotoClick(idx)}
                            className="w-full aspect-square rounded-[20px] overflow-hidden flex items-center justify-center relative cursor-pointer hover:opacity-90 transition-all shadow-sm"
                            style={!photo ? {
                                background: 'rgba(249, 253, 252, 0.7)', // #F9FDFCB2
                                backdropFilter: 'blur(11px)',
                                WebkitBackdropFilter: 'blur(11px)',
                                border: '1px solid rgba(255, 255, 255, 0.4)'
                            } : {}}
                        >
                            {photo ? (
                                <img
                                    src={photo}
                                    className="w-full h-full object-cover"
                                    alt={`Slot ${idx}`}
                                />
                            ) : (
                                <div className="w-[38px] h-[38px] bg-[#733FE0] rounded-full flex items-center justify-center shadow-sm">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-auto w-full flex flex-col items-center">
                <button
                    onClick={handleContinue}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all mb-4"
                >
                    Continue
                </button>
                <p className="text-[13px] text-black font-medium">Add at least one photo</p>
            </div>
        </div>
    );
};

export default AddPhotosPage;
