import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import demoPhoto3 from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';

// Reusing icons from assets or SVGs where needed
import crossIcon from '../assets/icons/cross.png';
import heightIcon from '../assets/icons/height.png';
import religionIcon from '../assets/icons/religion.png';
import drinkIcon from '../assets/icons/drink.png';
import smokeIcon from '../assets/icons/cigratee.png';
import studyIcon from '../assets/icons/study.png';
import heartPng from '../assets/icons/heart.png';
import chatIcon from '../assets/icons/chat.png';

const ProfileDetailPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="min-h-screen bg-white font-sans pb-10 max-w-md mx-auto shadow-2xl border-x border-gray-100">
            {/* Top Bar with Back Button and Filter Icon */}
            <header className="pt-2 pb-2 flex justify-between items-center px-4 sticky top-0 bg-white z-50">
                <button onClick={handleBack} className="p-2 -ml-2 text-black">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button className="text-[#733FE0] p-2">
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="8" cy="7" r="1.5" fill="currentColor" stroke="none" />
                        <line x1="8" y1="11" x2="8" y2="19" />
                        <line x1="16" y1="5" x2="16" y2="15" />
                        <circle cx="16" cy="19" r="1.5" fill="currentColor" stroke="none" />
                    </svg>
                </button>
            </header>

            <div className="px-2">
                {/* Header Info */}
                <div className="flex flex-col mb-4 px-2">
                    <div className="flex items-center space-x-2 mb-1">
                        <h2 className="text-[22px] font-bold text-black tracking-tight" onClick={handleBack}>Anna Mcconaughey, 25</h2>
                        <div className="w-5 h-5 rounded-full bg-[#4094F7] flex items-center justify-center shrink-0">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="4">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                        </div>
                        <span className="bg-[#FF7D7D] text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full ml-auto">
                            New
                        </span>
                    </div>

                    <div className="flex items-center text-black/80 text-[13px] font-medium space-x-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="black" stroke="none">
                            <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                        </svg>
                        <span>Interiar Designer at Company</span>
                    </div>
                </div>

                {/* Main Photo Section */}
                <div className="w-full relative rounded-[20px] overflow-hidden mb-5">
                    <img src={demoPhoto} alt="Main" className="w-full h-[380px] object-cover" />

                    {/* Insta Badge */}
                    <div className="absolute top-[40%] left-0 bg-gradient-to-r from-[#D62976] to-[#FA7E1E] text-white text-[12px] font-bold px-3 py-1.5 rounded-r-full shadow-md z-10">
                        @anrocks10
                    </div>

                    {/* Action Buttons Overlay */}
                    <div className="absolute bottom-5 inset-x-0 px-8 flex justify-between items-center z-20">
                        <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform" onClick={handleBack}>
                            <img src={crossIcon} alt="Reject" className="w-8 h-8 object-contain" />
                        </button>
                        <button className="w-16 h-16 bg-[#F9F7FF] rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform">
                            <svg width="34" height="34" viewBox="0 0 24 24" fill="#FE7C69" stroke="none">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Details Section */}
                <div className="px-2 space-y-4">
                    {/* About Me */}
                    <section>
                        <h3 className="text-[16px] font-bold text-black mb-1.5">About me</h3>
                        <p className="text-[#333333] text-[13px] leading-relaxed font-sans">
                            Looking for someone to appreciate my puns and share pizza with. If you can't handle my cheesy jokes, you're not the one for me. Let's see if we can find the perfect slice together
                        </p>
                    </section>

                    {/* Looking For */}
                    <section>
                        <h3 className="text-[16px] font-bold text-black mb-2">I'm looking for</h3>
                        <div className="inline-flex items-center px-3 text-[13px] py-2 rounded-full bg-[#F9F7FF] border border-[#6F3BCE42] shadow-sm">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="#FF4458" className="mr-2.5">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                            <span className="text-black font-medium text-[14px]">A long-term relationship</span>
                        </div>
                    </section>

                    {/* Basics */}
                    <section>
                        <h3 className="text-[16px] font-bold text-black mb-2">Basics</h3>
                        <div className="flex flex-col gap-2.5">
                            {/* Row 1 */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <img src={heightIcon} className="w-3.5 h-3.5 mr-2 object-contain" alt="Height" />
                                    <span className="text-[12px] font-medium text-black">5'8"</span>
                                </div>
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <img src={religionIcon} className="w-3.5 h-3.5 mr-2 object-contain" alt="Religion" />
                                    <span className="text-[12px] font-medium text-black">Hindu</span>
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <img src={drinkIcon} className="w-3.5 h-3.5 mr-2 object-contain" alt="Drink" />
                                    <span className="text-[12px] font-medium text-black">Yes</span>
                                </div>
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <img src={smokeIcon} className="w-3.5 h-3.5 mr-2 object-contain" alt="Smoke" />
                                    <span className="text-[12px] font-medium text-black">No</span>
                                </div>
                            </div>
                            {/* Row 3 */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <img src={studyIcon} className="w-3.5 h-3.5 mr-2 object-contain" alt="Study" />
                                    <span className="text-[12px] font-medium text-black">Graduate</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Interests */}
                    <section>
                        <h3 className="text-[16px] font-bold text-black mb-2">My interests</h3>
                        <div className="flex flex-col gap-2.5">
                            {/* Row 1 */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <span className="mr-2 flex items-center justify-center text-black">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                                    </span>
                                    <span className="text-[12px] font-medium text-black">Photography</span>
                                </div>
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <span className="mr-2 flex items-center justify-center text-black">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>
                                    </span>
                                    <span className="text-[12px] font-medium text-black">Travelling</span>
                                </div>
                            </div>
                            {/* Row 2 */}
                            <div className="flex items-center gap-2.5">
                                <div className="flex items-center px-3 py-1.5 rounded-full border border-[#6F3BCE42] bg-[#F9F7FF] shadow-sm">
                                    <span className="mr-2 flex items-center justify-center text-black">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>
                                    </span>
                                    <span className="text-[12px] font-medium text-black">Art & Crafts</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Prompt Cards Section */}
                    <div className="space-y-4 mt-3">
                        {/* Card 1 */}
                        <div>
                            <div className="w-full rounded-[20px] overflow-hidden mb-2">
                                <img src={demoPhoto} alt="Prompt 1" className="w-full h-[320px] object-cover" />
                            </div>
                            <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-[13px] font-bold text-black">I' ll never forget the time I</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">12 PM</p>
                                </div>
                                <div className="w-8 h-8 bg-[#7445E5]/10 rounded-full flex items-center justify-center">
                                    <img src={chatIcon} className="w-4 h-4 object-contain" alt="Chat" />
                                </div>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div>
                            <div className="w-full rounded-[20px] overflow-hidden mb-2">
                                <img src={demoPhoto2} alt="Prompt 2" className="w-full h-[320px] object-cover" />
                            </div>
                            <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-[13px] font-bold text-black">Best travel story?</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">08 PM</p>
                                </div>
                                <div className="w-8 h-8 bg-[#7445E5]/10 rounded-full flex items-center justify-center">
                                    <img src={chatIcon} className="w-4 h-4 object-contain" alt="Chat" />
                                </div>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div>
                            <div className="w-full rounded-[20px] overflow-hidden mb-2">
                                <img src={demoPhoto3} alt="Prompt 3" className="w-full h-[320px] object-cover" />
                            </div>
                            <div className="bg-white rounded-[16px] p-3 shadow-sm border border-gray-100 flex justify-between items-center">
                                <div>
                                    <p className="text-[13px] font-bold text-black">My secret talent is...</p>
                                    <p className="text-[11px] text-gray-500 mt-0.5">10 AM</p>
                                </div>
                                <div className="w-8 h-8 bg-[#7445E5]/10 rounded-full flex items-center justify-center">
                                    <img src={chatIcon} className="w-4 h-4 object-contain" alt="Chat" />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProfileDetailPage;
