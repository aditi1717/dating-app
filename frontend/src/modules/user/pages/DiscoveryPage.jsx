import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// Photos
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import demoPhoto3 from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';
import demoPhoto4 from '../assets/9bd108315ddebf58571ec9fe25c0a6d5d63096ba.png';
import demoPhoto5 from '../assets/a4e07912a9df7e2f14bba65dd13433a5d9fc0f9b.png';

// Icons
import profileIcon from '../assets/icons/profile.png';
import coupleIcon from '../assets/icons/couple.png';
import heartIcon from '../assets/icons/heart.png';
import messageIcon from '../assets/icons/message.png';
import crossIcon from '../assets/icons/cross.png';
import heightIcon from '../assets/icons/height.png';
import religionIcon from '../assets/icons/religion.png';
import drinkIcon from '../assets/icons/drink.png';
import smokeIcon from '../assets/icons/cigratee.png';
import studyIcon from '../assets/icons/study.png';
import chatIcon from '../assets/icons/chat.png';
import tickIcon from '../assets/icons/tick.png';
import BottomNavigation from '../components/BottomNavigation';

/* ─── Dummy Profiles ─── */
const PROFILES = [
    {
        id: 1,
        name: 'Anna Mcconaughey',
        age: 25,
        verified: true,
        isNew: true,
        job: 'Interior Designer at Company',
        photo: demoPhoto,
        photos: [demoPhoto, demoPhoto2, demoPhoto3],
        instagram: '@anrocks10',
        about: "Looking for someone to appreciate my puns and share pizza with. If you can't handle my cheesy jokes, you're not the one for me.",
        lookingFor: 'A long-term relationship',
        basics: { height: "5'8\"", religion: 'Hindu', drinks: 'Yes', smokes: 'No', education: 'Graduate' },
        interests: ['Photography', 'Travelling', 'Art & Crafts'],
        prompts: [
            { text: "I'll never forget the time I", answer: '12 PM' },
            { text: 'My favorite way to do nothing is', answer: 'Nothing' },
            { text: 'The last note I wrote on my phone says', answer: 'Bubble' },
        ],
        willMatch: false,
    },
    {
        id: 2,
        name: 'Priya Sharma',
        age: 23,
        verified: true,
        isNew: false,
        job: 'Software Engineer at Google',
        photo: demoPhoto4,
        photos: [demoPhoto4, demoPhoto5],
        instagram: '@priya.codes',
        about: 'Coffee addict, code lover, and weekend hiker. Looking for someone to debug life with me. 🚀',
        lookingFor: 'Something casual',
        basics: { height: "5'4\"", religion: 'Sikh', drinks: 'No', smokes: 'No', education: 'Post Graduate' },
        interests: ['Coding', 'Hiking', 'Music'],
        prompts: [
            { text: 'My ideal Sunday looks like', answer: 'Brunch & Netflix' },
            { text: 'The key to my heart is', answer: 'Good food' },
        ],
        willMatch: true, // ← This profile will trigger a match!
    },
    {
        id: 3,
        name: 'Meera Patel',
        age: 27,
        verified: false,
        isNew: true,
        job: 'Architect at Foster+Partners',
        photo: demoPhoto5,
        photos: [demoPhoto5, demoPhoto],
        instagram: '@meera.builds',
        about: "I design buildings by day and binge Netflix by night. Let's build something beautiful together 🏗️",
        lookingFor: 'A long-term relationship',
        basics: { height: "5'6\"", religion: 'Hindu', drinks: 'Yes', smokes: 'No', education: 'Graduate' },
        interests: ['Architecture', 'Travel', 'Yoga'],
        prompts: [
            { text: 'A life goal of mine is', answer: 'Build my own house' },
            { text: "I'm weirdly attracted to", answer: 'Good handwriting' },
        ],
        willMatch: false,
    },
    {
        id: 4,
        name: 'Riya Kapoor',
        age: 24,
        verified: true,
        isNew: false,
        job: 'Marketing Manager at Zomato',
        photo: demoPhoto2,
        photos: [demoPhoto2, demoPhoto3],
        instagram: '@riyakapooor',
        about: 'Foodie at heart 🍕 Dog mom 🐶 Always up for spontaneous road trips.',
        lookingFor: 'New friends',
        basics: { height: "5'5\"", religion: 'Christian', drinks: 'Yes', smokes: 'No', education: 'Graduate' },
        interests: ['Food', 'Dogs', 'Road Trips'],
        prompts: [
            { text: 'The way to my heart is', answer: 'Biryani' },
            { text: 'Together we could', answer: 'Road trip!' },
        ],
        willMatch: false,
    },
    {
        id: 5,
        name: 'Ananya Singh',
        age: 22,
        verified: true,
        isNew: true,
        job: 'Fashion Designer at H&M',
        photo: demoPhoto3,
        photos: [demoPhoto3, demoPhoto4],
        instagram: '@ananya.styles',
        about: 'Creating outfits that make heads turn 👗 Love music festivals and brunch dates.',
        lookingFor: 'A long-term relationship',
        basics: { height: "5'7\"", religion: 'Hindu', drinks: 'Occasionally', smokes: 'No', education: 'Graduate' },
        interests: ['Fashion', 'Music', 'Brunches'],
        prompts: [
            { text: 'My most controversial opinion is', answer: 'Pineapple on pizza' },
            { text: 'I geek out on', answer: 'Fabric textures' },
        ],
        willMatch: false,
    },
];

/* ─── Interest Icons ─── */
const interestIconMap = {
    Photography: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
    Travelling: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>,
    'Art & Crafts': <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
    default: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>,
};

/* ─── LocalStorage helpers ─── */
const getStored = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const setStored = (k, v) => localStorage.setItem(k, JSON.stringify(v));

/* ─── Match Popup (Figma: it's a match) ─── */
const MatchPopup = ({ profile, myPhoto, onClose }) => (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center" style={{ background: '#FCFCFC', maxWidth: '414px', margin: '0 auto' }}>

        {/* Photos area with floating hearts */}
        <div style={{ position: 'relative', width: '280px', height: '340px', filter: 'drop-shadow(0px 20px 20px rgba(0, 0, 0, 0.12))' }}>

            {/* Image 1 - top right, rotated 16.41deg */}
            <div style={{
                position: 'absolute', width: '140px', height: '210px',
                right: '0px', top: '0px',
                borderRadius: '16px', overflow: 'hidden',
                transform: 'rotate(16.41deg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
                <img src={myPhoto} alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Image 2 - bottom left, rotated -11.91deg */}
            <div style={{
                position: 'absolute', width: '140px', height: '210px',
                left: '0px', top: '100px',
                borderRadius: '16px', overflow: 'hidden',
                transform: 'rotate(-11.91deg)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            }}>
                <img src={profile.photo} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Floating Heart 1 - top center, rotated 10.47deg */}
            <div style={{
                position: 'absolute', width: '50px', height: '50px',
                right: '-5px', top: '-20px',
                filter: 'drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.15))',
                transform: 'rotate(10.47deg)',
            }}>
                <div style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: '#FFFFFF', backdropFilter: 'blur(25px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF7C67" stroke="none" style={{ filter: 'drop-shadow(0px 3px 3px rgba(226, 87, 87, 0.25))' }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>

            {/* Floating Heart 2 - bottom left, rotated -9.24deg */}
            <div style={{
                position: 'absolute', width: '50px', height: '50px',
                left: '-10px', bottom: '10px',
                filter: 'drop-shadow(0px 10px 8px rgba(0, 0, 0, 0.15))',
                transform: 'rotate(-9.24deg)',
            }}>
                <div style={{
                    width: '50px', height: '50px', borderRadius: '50%',
                    background: '#FFFFFF', backdropFilter: 'blur(25px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="#FF7C67" stroke="none" style={{ filter: 'drop-shadow(0px 3px 3px rgba(226, 87, 87, 0.25))' }}>
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                </div>
            </div>
        </div>

        {/* Title - Figma: Inter 600 33px, gradient text */}
        <h1 style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '33px',
            lineHeight: '100%', textAlign: 'center',
            marginTop: '20px',
            background: 'linear-gradient(90deg, #755ED7 0%, #9168DC 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
        }}>
            It's a match, {profile.name.split(' ')[0]}!
        </h1>

        {/* Subtitle - Figma: Inter 500 16px, line-height 140% */}
        <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '16px',
            lineHeight: '140%', textAlign: 'center', letterSpacing: '0.01em',
            color: '#000000', marginTop: '7px', padding: '0 40px',
        }}>
            Start a conversation now with each other
        </p>

        {/* Say hello button - Figma: 350×65, bg #6F3BCE, radius 80px */}
        <button
            onClick={onClose}
            className="active:scale-[0.97] transition-transform"
            style={{
                width: '350px', height: '65px',
                background: 'linear-gradient(0deg, #6F3BCE, #6F3BCE), #3BA2E4',
                borderRadius: '80px', border: 'none', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                lineHeight: '22px', textAlign: 'center', letterSpacing: '0.01em',
                color: '#FFFFFF', marginTop: '28px',
            }}
        >
            Say hello
        </button>

        {/* Keep swiping button - Figma: 350×65, gradient bg at 0.1, gradient text */}
        <button
            onClick={onClose}
            className="active:scale-[0.97] transition-transform"
            style={{
                width: '350px', height: '65px', position: 'relative',
                borderRadius: '80px', border: 'none', cursor: 'pointer',
                marginTop: '19px', overflow: 'hidden',
                background: 'transparent',
            }}
        >
            {/* Gradient bg at 0.1 opacity */}
            <div style={{
                position: 'absolute', inset: 0, borderRadius: '80px',
                background: 'linear-gradient(90deg, #755ED7 0%, #9168DC 100%)',
                opacity: 0.1,
            }} />
            {/* Gradient text */}
            <span style={{
                position: 'relative', zIndex: 1,
                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                lineHeight: '22px', textAlign: 'center', letterSpacing: '0.01em',
                background: 'linear-gradient(90deg, #755ED7 0%, #9168DC 100%)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
            }}>
                Keep swiping
            </span>
        </button>
    </div>
);

/* ─── Pill Component ─── */
const Pill = ({ icon, children }) => (
    <div className="flex items-center" style={{ background: '#F9F7FF', border: '1px solid rgba(111, 59, 206, 0.26)', borderRadius: '24.5px', padding: '5px 16px', height: '34.83px' }}>
        {icon && <span className="mr-2 flex items-center justify-center">{icon}</span>}
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '140%', letterSpacing: '0.01em', color: '#000000' }}>{children}</span>
    </div>
);

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
                    height: '83.37%', // Approx 747/896
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

/* ─── Main Discovery Page ─── */
const DiscoveryPage = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(() => getStored('disc_idx', 0));
    const [likes, setLikes] = useState(() => getStored('disc_likes', []));
    const [rejects, setRejects] = useState(() => getStored('disc_rejects', []));
    const [matches, setMatches] = useState(() => getStored('disc_matches', []));
    const [showMatch, setShowMatch] = useState(null);
    const [showIncomplete, setShowIncomplete] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    // Profile completion check (set 'profile_complete' = true in localStorage when user fills details)
    const isProfileComplete = getStored('profile_complete', false);

    // Swipe state
    const [dragOffset, setDragOffset] = useState(0);
    const [isExiting, setIsExiting] = useState(false);
    const [exitDir, setExitDir] = useState(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const curX = useRef(0);

    // Persist
    useEffect(() => { setStored('disc_idx', currentIndex); }, [currentIndex]);
    useEffect(() => { setStored('disc_likes', likes); }, [likes]);
    useEffect(() => { setStored('disc_rejects', rejects); }, [rejects]);
    useEffect(() => { setStored('disc_matches', matches); }, [matches]);

    const profile = PROFILES[currentIndex];
    const isFinished = currentIndex >= PROFILES.length;

    const goNext = () => {
        setDragOffset(0);
        setIsExiting(false);
        setExitDir(null);
        setCurrentIndex(prev => prev + 1);
    };

    const handleLike = () => {
        if (!profile) return;
        if (!isProfileComplete) { setShowIncomplete(true); return; }
        const newLikes = [...likes, { id: profile.id, name: profile.name, likedAt: new Date().toISOString() }];
        setLikes(newLikes);

        if (profile.willMatch) {
            const newMatches = [...matches, { id: profile.id, name: profile.name, photo: profile.photo, matchedAt: new Date().toISOString() }];
            setMatches(newMatches);
            setShowMatch(profile);
        }

        setIsExiting(true);
        setExitDir('right');
        setTimeout(goNext, 350);
    };

    const handleReject = () => {
        if (!profile) return;
        if (!isProfileComplete) { setShowIncomplete(true); return; }
        const newRejects = [...rejects, { id: profile.id, name: profile.name, rejectedAt: new Date().toISOString() }];
        setRejects(newRejects);

        setIsExiting(true);
        setExitDir('left');
        setTimeout(goNext, 350);
    };

    const handleReset = () => {
        setCurrentIndex(0); setLikes([]); setRejects([]); setMatches([]);
        localStorage.removeItem('disc_idx'); localStorage.removeItem('disc_likes');
        localStorage.removeItem('disc_rejects'); localStorage.removeItem('disc_matches');
    };

    // Touch/Mouse handlers
    const onStart = (x) => { if (isExiting) return; isDragging.current = true; startX.current = x; curX.current = x; };
    const onMove = (x) => { if (!isDragging.current || isExiting) return; curX.current = x; setDragOffset(curX.current - startX.current); };
    const onEnd = () => {
        if (!isDragging.current || isExiting) return;
        isDragging.current = false;
        const diff = curX.current - startX.current;
        if (!isProfileComplete && (diff > 60 || diff < -60)) {
            setDragOffset(0);
            setShowIncomplete(true);
            return;
        }
        if (diff > 100) handleLike();
        else if (diff < -100) handleReject();
        else setDragOffset(0);
    };

    const cardStyle = isExiting
        ? { transform: `translateX(${exitDir === 'right' ? '120%' : '-120%'}) rotate(${exitDir === 'right' ? '12deg' : '-12deg'})`, opacity: 0, transition: 'transform 0.35s ease, opacity 0.35s ease' }
        : { transform: `translateX(${dragOffset}px) rotate(${dragOffset * 0.04}deg)`, transition: isDragging.current ? 'none' : 'transform 0.3s ease' };

    const swipeHint = dragOffset > 60 ? 'like' : dragOffset < -60 ? 'nope' : null;

    return (
        <div className={`h-[100dvh] flex flex-col font-sans overflow-hidden max-w-[414px] mx-auto ${showFilter ? 'overflow-hidden' : ''}`} style={{ background: '#FCFCFC' }}>
            {/* Header */}
            <header className="pt-4 pb-2 flex justify-end items-center px-4 shrink-0" style={{ background: '#FCFCFC' }}>
                <button
                    className="p-2 active:scale-95 transition-transform"
                    onClick={() => setShowFilter(true)}
                >
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="none" stroke="#6F3BCE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="5" cy="4" r="1.5" fill="#6F3BCE" stroke="none" />
                        <line x1="5" y1="7" x2="5" y2="16" />
                        <line x1="11" y1="2" x2="11" y2="11" />
                        <circle cx="11" cy="14" r="1.5" fill="#6F3BCE" stroke="none" />
                    </svg>
                </button>
            </header>

            <main className="flex-1 overflow-y-auto pb-24 scrollbar-hide px-[15.53px]">
                {isFinished ? (
                    <div className="flex flex-col items-center justify-center h-full text-center gap-4 pt-20">
                        <div className="w-20 h-20 rounded-full bg-[#F7EBFE] flex items-center justify-center">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="#6F3BCE" stroke="none">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                            </svg>
                        </div>
                        <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '22px', color: '#000' }}>You've seen everyone!</h2>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px', color: '#888', maxWidth: '250px' }}>
                            Liked <b style={{ color: '#6F3BCE' }}>{likes.length}</b> · Passed <b style={{ color: '#FF7C67' }}>{rejects.length}</b> · Matches <b style={{ color: '#6F3BCE' }}>{matches.length}</b>
                        </p>
                        <button onClick={handleReset} className="mt-4 active:scale-95 transition-all" style={{ padding: '12px 32px', background: '#6F3BCE', color: '#fff', borderRadius: '80px', border: 'none', fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', boxShadow: '0 4px 16px rgba(111,59,206,0.3)', cursor: 'pointer' }}>
                            Start Over
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Name & Info */}
                        <div className="flex flex-col mb-3 mt-2">
                            <div className="flex items-center space-x-2 mb-1">
                                <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '25px', lineHeight: '30px', letterSpacing: '0.01em', color: '#000' }}>
                                    {profile.name}, {profile.age}
                                </h2>
                                {profile.verified && <img src={tickIcon} className="w-[22.1px] h-[19.84px] object-contain shrink-0" alt="Verified" />}
                                {profile.isNew && (
                                    <span className="ml-auto shrink-0" style={{ background: '#FF7C67', borderRadius: '12px', padding: '2px 10px', fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', lineHeight: '12px', color: '#FFF' }}>New</span>
                                )}
                            </div>
                            <div className="flex items-center space-x-1.5">
                                <svg width="13.52" height="13.52" viewBox="0 0 24 24" fill="black" stroke="none">
                                    <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" />
                                </svg>
                                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', lineHeight: '12px', letterSpacing: '0.01em', color: '#000' }}>{profile.job}</span>
                            </div>
                        </div>

                        {/* Swipeable Image */}
                        <div className="w-full relative mb-6"
                            style={cardStyle}
                            onTouchStart={e => onStart(e.touches[0].clientX)}
                            onTouchMove={e => onMove(e.touches[0].clientX)}
                            onTouchEnd={onEnd}
                            onMouseDown={e => onStart(e.clientX)}
                            onMouseMove={e => { if (isDragging.current) onMove(e.clientX); }}
                            onMouseUp={onEnd}
                            onMouseLeave={() => { if (isDragging.current) onEnd(); }}
                        >
                            <div className="w-full overflow-hidden select-none" style={{ borderRadius: '10px' }}>
                                <img src={profile.photo} className="w-full object-cover pointer-events-none" style={{ height: '480px' }} alt={profile.name} draggable={false} />

                                {/* Swipe hint labels */}
                                {swipeHint === 'like' && (
                                    <div className="absolute top-6 left-6 z-30 px-4 py-2 rounded-xl border-[3px] border-green-500 bg-green-500/10 backdrop-blur-sm" style={{ transform: 'rotate(-15deg)' }}>
                                        <span className="text-green-500 text-[24px] font-extrabold tracking-wide">LIKE</span>
                                    </div>
                                )}
                                {swipeHint === 'nope' && (
                                    <div className="absolute top-6 right-6 z-30 px-4 py-2 rounded-xl border-[3px] border-red-400 bg-red-400/10 backdrop-blur-sm" style={{ transform: 'rotate(15deg)' }}>
                                        <span className="text-red-400 text-[24px] font-extrabold tracking-wide">NOPE</span>
                                    </div>
                                )}

                                {/* Insta badge */}
                                {profile.instagram && (
                                    <div className="absolute top-[60%] left-0 bg-gradient-to-r from-[#D62976] to-[#FA7E1E] text-white text-[12px] font-bold px-3 py-1.5 rounded-r-full shadow-md z-10">
                                        {profile.instagram}
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons ON image */}
                            <div className="absolute bottom-[10px] left-0 right-0 flex justify-between px-2 z-20">
                                <button onClick={handleReject} className="flex items-center justify-center active:scale-90 transition-transform"
                                    style={{ width: '65px', height: '65px', background: '#FFFFFF', backdropFilter: 'blur(25px)', borderRadius: '50%', border: 'none', filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25))' }}>
                                    <img src={crossIcon} alt="Reject" style={{ width: '34.47px', height: '35.62px', objectFit: 'contain', filter: 'drop-shadow(0px 4px 4px rgba(148, 91, 239, 0.25))' }} />
                                </button>
                                <button onClick={handleLike} className="flex items-center justify-center active:scale-90 transition-transform"
                                    style={{ width: '65px', height: '65px', background: '#FFFFFF', backdropFilter: 'blur(25px)', borderRadius: '50%', border: 'none', filter: 'drop-shadow(4px 4px 10px rgba(0, 0, 0, 0.25))' }}>
                                    <svg width="30" height="30" viewBox="0 0 24 24" fill="#FE7C69" stroke="none" style={{ filter: 'drop-shadow(0px 4px 4px rgba(244, 20, 20, 0.25))' }}>
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Details Card */}
                        <div className="w-full mt-4" style={{ background: '#FFFFFF', boxShadow: '0px 4px 6.3px rgba(0, 0, 0, 0.1)', borderRadius: '10px', padding: '24px 20px' }}>
                            {/* About Me */}
                            <section>
                                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '100%', color: '#000', marginBottom: '12px' }}>About me</h3>
                                <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px', lineHeight: '140%', letterSpacing: '0.01em', color: '#000', opacity: 0.7 }}>
                                    {profile.about}
                                </p>
                            </section>

                            {/* My Interests */}
                            <section className="mt-8">
                                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '100%', color: '#000', marginBottom: '12px' }}>My interests</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {profile.interests.map(i => (
                                        <Pill key={i} icon={<span className="text-black">{interestIconMap[i] || interestIconMap.default}</span>}>{i}</Pill>
                                    ))}
                                </div>
                            </section>

                            {/* Basics */}
                            <section className="mt-8">
                                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '100%', color: '#000', marginBottom: '12px' }}>Basics</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    <Pill icon={<img src={heightIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.basics.height}</Pill>
                                    <Pill icon={<img src={religionIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.basics.religion}</Pill>
                                    <Pill icon={<img src={drinkIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.basics.drinks}</Pill>
                                    <Pill icon={<img src={smokeIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.basics.smokes}</Pill>
                                    <Pill icon={<img src={studyIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.basics.education}</Pill>
                                </div>
                            </section>

                            {/* Looking For */}
                            <section className="mt-8">
                                <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px', lineHeight: '100%', color: '#000', marginBottom: '12px' }}>I'm looking for</h3>
                                <Pill icon={<img src={heartIcon} className="w-5 h-5 object-contain" alt="" />}>{profile.lookingFor}</Pill>
                            </section>
                        </div>

                        {/* Prompt Cards */}
                        <div className="space-y-6 mt-6">
                            {profile.prompts.map((p, i) => (
                                <div key={i}>
                                    <div className="w-full overflow-hidden" style={{ borderRadius: '10px' }}>
                                        <img src={profile.photos[i % profile.photos.length]} alt="" className="w-full object-cover" style={{ height: '416.67px' }} />
                                    </div>
                                    <div className="flex justify-between items-center mt-2" style={{ background: '#FFFFFF', boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)', borderRadius: '10px', padding: '14px 20px' }}>
                                        <div>
                                            <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '18px', lineHeight: '22px', color: '#000' }}>{p.text}</p>
                                            <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: '18px', lineHeight: '21px', color: '#000', marginTop: '4px' }}>{p.answer}</p>
                                        </div>
                                        <div className="flex items-center justify-center shrink-0" style={{ width: '42.79px', height: '42.79px', background: 'rgba(111, 59, 206, 0.1)', borderRadius: '21.4px' }}>
                                            <img src={chatIcon} className="object-contain" style={{ width: '29.65px', height: '27.74px' }} alt="Chat" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Recommend */}
                        <button className="w-full mt-8 mb-4 active:scale-[0.98] transition-transform" style={{ height: '59px', background: 'rgba(111, 59, 206, 0.1)', borderRadius: '29.5px', border: 'none', fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '18px', color: '#6F3BCE', cursor: 'pointer' }}>
                            Recommend to a friend
                        </button>
                    </>
                )}
            </main>

            <BottomNavigation activeTab="people" />

            {/* Match Popup */}
            {showMatch && <MatchPopup profile={showMatch} myPhoto={demoPhoto} onClose={() => setShowMatch(null)} />}

            {/* Filter Popup */}
            {showFilter && <FilterPopup onClose={() => setShowFilter(false)} />}

            {/* Incomplete Profile Overlay - Figma: rgba(0,0,0,0.56), blur 25px */}
            {showIncomplete && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center"
                    style={{ background: 'rgba(0, 0, 0, 0.56)', backdropFilter: 'blur(25px)' }}
                    onClick={() => setShowIncomplete(false)}
                >
                    <div
                        className="flex flex-col items-center"
                        style={{
                            width: '340px', maxWidth: '90vw', background: '#FFFFFF',
                            borderRadius: '24px', padding: '32px 24px',
                            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Warning icon */}
                        <div style={{
                            width: '64px', height: '64px', borderRadius: '50%',
                            background: 'rgba(111, 59, 206, 0.1)', display: 'flex',
                            alignItems: 'center', justifyContent: 'center', marginBottom: '16px',
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6F3BCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>

                        <h3 style={{
                            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px',
                            lineHeight: '24px', color: '#000', textAlign: 'center', marginBottom: '8px',
                        }}>Complete Your Profile</h3>

                        <p style={{
                            fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '14px',
                            lineHeight: '140%', color: '#000', opacity: 0.6, textAlign: 'center',
                            marginBottom: '24px',
                        }}>Please complete your profile details before you can like or pass on profiles.</p>

                        <button
                            onClick={() => { setShowIncomplete(false); navigate('/edit-profile'); }}
                            className="active:scale-[0.97] transition-transform"
                            style={{
                                width: '100%', height: '52px', background: '#6F3BCE',
                                borderRadius: '80px', border: 'none', cursor: 'pointer',
                                fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px',
                                color: '#FFFFFF',
                            }}
                        >
                            Complete Profile
                        </button>

                        <button
                            onClick={() => setShowIncomplete(false)}
                            style={{
                                marginTop: '12px', background: 'none', border: 'none',
                                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px',
                                color: '#000', opacity: 0.5, cursor: 'pointer',
                            }}
                        >
                            Later
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DiscoveryPage;
