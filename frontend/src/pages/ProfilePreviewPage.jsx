import React from 'react';
import { useNavigate } from 'react-router-dom';
// Reusing the same demo photo for the preview
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';

const ProfilePreviewPage = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: 'Photos',
            subtitle: '5 Photos added',
            btnText: 'Add more',
            icon: demoPhoto
        },
        {
            title: 'Interests',
            subtitle: 'Travel, music, Fitness',
            btnText: 'Add intreretes', // Matching screenshot typo
            icon: demoPhoto
        },
        {
            title: 'Basics',
            subtitle: 'Gender , Relationship Goals',
            btnText: 'Edit',
            icon: demoPhoto
        },
    ];

    return (
        <div className="min-h-screen bg-[#FBFBFB] flex flex-col items-center py-6 px-4 font-sans max-w-[420px] mx-auto shadow-2xl border-x border-gray-100">

            {/* Header */}
            <div className="w-full flex flex-col items-center mb-6">
                <h2 className="text-[28px] font-bold text-black mb-1 text-center font-sans tracking-tight">
                    Review your profile
                </h2>
                <p className="text-[13px] text-gray-500 text-center font-medium">
                    Make a great first impression
                </p>
            </div>

            {/* Profile Card */}
            <div className="relative w-full aspect-[4/3] rounded-[30px] overflow-hidden shadow-lg mb-6">
                <img
                    src={demoPhoto}
                    className="w-full h-full object-cover"
                    alt="Profile"
                    style={{ objectPosition: 'center top' }}
                />

                {/* Edit Icon */}
                <div className="absolute top-5 right-5 w-10 h-10 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center border border-white/40 shadow-sm cursor-pointer hover:bg-white/50 transition-colors">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                    </svg>
                </div>

                {/* Text Overlay */}
                <div className="absolute bottom-0 inset-x-0 h-2/3 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-6 flex flex-col justify-end">
                    <h3 className="text-white text-[24px] font-bold leading-tight mb-1">Jessica Parker, 23</h3>
                    <p className="text-white/90 text-[13px] font-medium">Professional model</p>
                </div>
            </div>

            {/* Profile Strength Card */}
            <div className="w-full bg-white rounded-[25px] p-5 shadow-sm mb-5">
                <div className="flex justify-between items-center mb-3">
                    <span className="text-[#733FE0] text-[14px] font-bold">Profile Strength: 80%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-200 rounded-full mb-6 relative">
                    <div className="absolute top-0 left-0 h-full bg-[#733FE0] rounded-full" style={{ width: '80%' }}></div>
                </div>

                <div className="space-y-3 pl-1">
                    {/* Item 1 */}
                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-[#4BCE97] rounded-full flex items-center justify-center">
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                                <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-[14px] font-bold text-black">Photos added</span>
                    </div>
                    {/* Item 2 */}
                    <div className="flex items-center space-x-3">
                        <div className="w-5 h-5 bg-[#454545] rounded-full flex items-center justify-center">
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                                <path d="M5 1V9M1 5H9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </div>
                        <span className="text-[14px] font-bold text-black">Add interests</span>
                    </div>
                </div>
            </div>

            {/* Info Sections List */}
            <div className="w-full space-y-3 mb-8">
                {sections.map((sec, idx) => (
                    <div key={idx} className="bg-white rounded-[20px] p-2 pr-3 pl-3 flex items-center justify-between shadow-sm h-[70px]">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
                                <img src={sec.icon} className="w-full h-full object-cover" alt="" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[15px] font-bold text-black leading-tight mb-0.5">{sec.title}</span>
                                <span className="text-[11px] font-medium text-gray-500">{sec.subtitle}</span>
                            </div>
                        </div>
                        <button className="bg-[#733FE0] text-white text-[11px] font-bold h-[32px] pl-4 pr-3 rounded-full flex items-center space-x-1 hover:bg-[#6025d8] transition-colors">
                            <span>{sec.btnText}</span>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>

            {/* Activate Action */}
            <div className="mt-auto w-full flex flex-col items-center">
                <button
                    onClick={() => navigate('/discovery')}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[17px] shadow-lg shadow-purple-200 active:scale-[0.98] transition-all mb-4"
                >
                    Activate Profile
                </button>
                <p className="text-[12px] text-gray-400 font-medium">You can always edit later</p>
            </div>
        </div>
    );
};

export default ProfilePreviewPage;
