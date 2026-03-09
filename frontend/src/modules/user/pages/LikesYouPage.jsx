import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import demoPhoto3 from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';
import demoPhoto4 from '../assets/9bd108315ddebf58571ec9fe25c0a6d5d63096ba.png';

import tickIcon from '../assets/icons/tick.png';

/* ─── Filter Popup Component ─── */
const FilterPopup = ({ onClose }) => {
    const [interest, setInterest] = useState('Female');
    const [distance, setDistance] = useState(40);
    const [ageRange, setAgeRange] = useState([20, 40]);
    const [activeTab, setActiveTab] = useState('basic');

    return (
        <div className="fixed inset-0 z-[110] flex flex-col justify-end" style={{ background: 'rgba(0,0,0,0.3)' }} onClick={onClose}>
            <div
                className="w-full flex flex-col relative"
                style={{
                    height: '83.37%',
                    background: '#FCFCFC',
                    borderRadius: '45px 45px 0px 0px',
                    padding: '30px 29px 40px',
                    overflowY: 'auto'
                }}
                onClick={e => e.stopPropagation()}
            >
                {/* Drag Handle */}
                <div
                    className="mx-auto mb-6"
                    style={{ width: '50px', height: '5px', background: '#E8E6EA', borderRadius: '10px' }}
                />

                {/* Header Tabs */}
                <div className="flex justify-center mb-8 shrink-0">
                    <div style={{
                        position: 'relative',
                        width: '341px',
                        height: '44px',
                        background: 'rgba(111, 59, 206, 0.1)',
                        borderRadius: '22px',
                        display: 'flex',
                        padding: '4px'
                    }}>
                        <button
                            onClick={() => setActiveTab('basic')}
                            style={{
                                flex: 1,
                                borderRadius: '20px',
                                background: activeTab === 'basic' ? '#6F3BCE' : 'transparent',
                                border: 'none',
                                color: activeTab === 'basic' ? '#FFF' : '#000',
                                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}
                        >
                            Basic Filter
                        </button>
                        <button
                            onClick={() => setActiveTab('advance')}
                            style={{
                                flex: 1,
                                borderRadius: '20px',
                                background: activeTab === 'advance' ? '#6F3BCE' : 'transparent',
                                border: 'none',
                                color: activeTab === 'advance' ? '#FFF' : '#000',
                                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px',
                                transition: 'all 0.3s ease',
                                height: '100%'
                            }}
                        >
                            Advance Filter
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto px-1 custom-scrollbar">
                    {/* Interested In */}
                    <div className="mb-8">
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#000', marginBottom: '16px' }}>Interested in</h3>
                        <div className="flex justify-between gap-3">
                            {['Male', 'Female', 'Both'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setInterest(type)}
                                    style={{
                                        flex: 1, height: '36.54px', borderRadius: '60px',
                                        background: interest === type ? '#6F3BCE' : '#FFF',
                                        border: interest === type ? 'none' : '1px solid rgba(111, 59, 206, 0.5)',
                                        color: interest === type ? '#FFF' : '#000',
                                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Location */}
                    <div className="mb-8">
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#000', marginBottom: '15px' }}>Location</h3>
                        <div style={{
                            height: '51.78px', background: '#F6F6F8', border: '1px solid rgba(111, 59, 206, 0.5)',
                            borderRadius: '60px', display: 'flex', alignItems: 'center', padding: '0 25px',
                            justifyContent: 'space-between'
                        }}>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: '#000', opacity: 0.9 }}>Mumbai,india</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 18l6-6-6-6" />
                            </svg>
                        </div>
                    </div>

                    {/* Distance Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#000' }}>Distance</h3>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', color: '#000' }}>{distance}km</span>
                        </div>
                        <div className="relative h-[6.65px] w-full bg-[#E8E6EA] rounded-[10px]">
                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#6F3BCE', borderRadius: '10px', width: '75%' }} />
                            <div style={{
                                position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)',
                                width: '30px', height: '30px', background: '#FFF',
                                border: '2px solid #6F3BCE', borderRadius: '50%',
                                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '16px', height: '16px', background: '#6F3BCE', borderRadius: '50%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Height Slider */}
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#000' }}>Height Range</h3>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', color: '#000' }}>6’ 2”</span>
                        </div>
                        <div className="relative h-[6.65px] w-full bg-[#E8E6EA] rounded-[10px]">
                            <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#6F3BCE', borderRadius: '10px', width: '75%' }} />
                            <div style={{
                                position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)',
                                width: '30px', height: '30px', background: '#FFF',
                                border: '2px solid #6F3BCE', borderRadius: '50%',
                                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '16px', height: '16px', background: '#6F3BCE', borderRadius: '50%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Age Slider */}
                    <div className="mb-10">
                        <div className="flex justify-between items-center mb-4">
                            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '18px', color: '#000' }}>Age Range</h3>
                            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px', color: '#000' }}>20-40</span>
                        </div>
                        <div className="relative h-[6.65px] w-full bg-[#E8E6EA] rounded-[10px]">
                            <div style={{ position: 'absolute', left: '20%', top: 0, height: '100%', background: '#6F3BCE', borderRadius: '10px', width: '55%' }} />
                            <div style={{
                                position: 'absolute', top: '50%', left: '20%', transform: 'translate(-50%, -50%)',
                                width: '30px', height: '30px', background: '#FFF',
                                border: '2px solid #6F3BCE', borderRadius: '50%',
                                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '16px', height: '16px', background: '#6F3BCE', borderRadius: '50%' }} />
                            </div>
                            <div style={{
                                position: 'absolute', top: '50%', left: '75%', transform: 'translate(-50%, -50%)',
                                width: '30px', height: '30px', background: '#FFF',
                                border: '2px solid #6F3BCE', borderRadius: '50%',
                                boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.25)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                                <div style={{ width: '16px', height: '16px', background: '#6F3BCE', borderRadius: '50%' }} />
                            </div>
                        </div>
                    </div>

                    {/* Advanced Section */}
                    <div className="flex flex-col gap-4 mb-6">
                        <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px', color: '#000', marginTop: '10px' }}>What are they looking for?</h3>

                        {[
                            { text: 'A long-term relationship', locked: false },
                            { text: 'Religious beliefs', locked: true },
                            { text: 'Education', locked: true },
                            { text: 'Drinking', locked: true },
                            { text: 'Smoking', locked: true }
                        ].map((item, idx) => (
                            <div key={idx} style={{
                                width: '100%', height: '54px', background: '#FFFFFF',
                                borderRadius: '35px', boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                                padding: '0 25px', border: '1px solid rgba(111, 59, 206, 0.08)'
                            }}>
                                <span style={{
                                    fontFamily: "'Inter', sans-serif", fontWeight: item.locked ? 400 : 500,
                                    fontSize: item.locked ? '18px' : '15px', color: '#000'
                                }}>
                                    {item.text}
                                </span>
                                {item.locked && (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                        <path d="M7 11V7a5 5 0 0110 0v4" />
                                    </svg>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Button */}
                <div className="pt-6 pb-2 flex justify-center w-full shrink-0">
                    <button
                        onClick={() => activeTab === 'advance' ? navigate('/premium') : onClose()}
                        className="active:scale-[0.98] transition-all"
                        style={{
                            width: '350px',
                            height: '64px',
                            background: '#6F3BCE',
                            borderRadius: '80px', border: 'none', color: '#FFF',
                            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                            letterSpacing: '0.01em', boxShadow: '0 8px 16px rgba(111,59,206,0.3)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}
                    >
                        {activeTab === 'advance' ? 'Unlock Premium' : 'Continue'}
                    </button>
                </div>
            </div>
        </div>
    );
};

const likesData = [
    { id: 1, name: 'Neha', age: 25, photo: demoPhoto, verified: true },
    { id: 2, name: 'Priya', age: 23, photo: demoPhoto2, verified: true },
    { id: 3, name: 'Marina', age: 24, photo: demoPhoto3, verified: true },
    { id: 4, name: 'Sana', age: 22, photo: demoPhoto4, verified: true },
    { id: 5, name: 'Ananya', age: 26, photo: demoPhoto, verified: true },
    { id: 6, name: 'Ishani', age: 25, photo: demoPhoto2, verified: true },
];

const LikeCard = ({ person }) => (
    <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '0.86', // Slightly taller than square to match the image
        borderRadius: '20px',
        overflow: 'hidden',
        boxShadow: 'inset 0px -60px 20px -10px rgba(0, 0, 0, 0.4)',
    }}>
        <img src={person.photo} alt={person.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

        {/* Name, Age, and Distance */}
        <div style={{
            position: 'absolute',
            bottom: '12px',
            left: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '2px'
        }}>
            <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                lineHeight: '22px', color: '#FFFFFF',
            }}>{person.name}, {person.age}</span>
            <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px',
                lineHeight: '18px', color: '#FFFFFF', opacity: 0.9
            }}>3.4 km</span>
        </div>

        {/* White Heart at Bottom Right */}
        <div style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
        }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
        </div>
    </div>
);

const LikesYouPage = () => {
    const navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className="h-[100dvh] flex flex-col max-w-[414px] mx-auto overflow-hidden" style={{ background: '#FCFCFC' }}>

            {/* Header */}
            <header style={{
                background: '#FCFCFC', boxShadow: '-2px 3px 4.9px rgba(0, 0, 0, 0.05)',
                borderRadius: '0px 0px 15px 15px', padding: '0 20px',
                height: '70.88px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 10, flexShrink: 0,
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{ position: 'absolute', left: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                    lineHeight: '22px', color: '#000', opacity: 0.9,
                }}>Likes</span>

                {/* Filter Icon at Right */}
                <button
                    onClick={() => setShowFilter(true)}
                    style={{
                        position: 'absolute', right: '20px',
                        background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                    }}
                >
                    <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
                        <path d="M1 5H19M4 11H16M7 17H13" stroke="#6F3BCE" strokeWidth="2.5" strokeLinecap="round" />
                        <circle cx="5" cy="5" r="2.5" fill="#6F3BCE" />
                        <circle cx="15" cy="11" r="2.5" fill="#6F3BCE" />
                        <circle cx="9" cy="17" r="2.5" fill="#6F3BCE" />
                    </svg>
                </button>
            </header>

            {/* Content Area */}
            <main className="flex-1 overflow-y-auto" style={{ padding: '20px 20px 100px' }}>
                <div style={{ marginBottom: '22px' }}>
                    <h2 style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '18px',
                        lineHeight: '22px', color: '#000', opacity: 0.8
                    }}>12 people like you</h2>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '12px',
                }}>
                    {likesData.map(person => (
                        <LikeCard key={person.id} person={person} />
                    ))}
                </div>
            </main>

            <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center', pointerEvents: 'none', zIndex: 100 }}>
                <div style={{ width: '100%', maxWidth: '414px', pointerEvents: 'auto' }}>
                    <BottomNavigation activeTab="likes" />
                </div>
            </div>

            {/* Filter Popup */}
            {showFilter && <FilterPopup onClose={() => setShowFilter(false)} />}
        </div>
    );
};

export default LikesYouPage;
