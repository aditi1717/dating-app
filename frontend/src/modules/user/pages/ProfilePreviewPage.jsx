import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import tickIcon from '../assets/icons/tick.png';
import tickProfileIcon from '../assets/icons/tick-profile.png';
import settingIcon from '../assets/icons/setting.png';
import pencilIcon from '../assets/icons/pencil.png';
import textIcon from '../assets/icons/text.png';
import thumbIcon from '../assets/icons/thumb.png';
import crossIcon from '../assets/icons/cross.png';
import BottomNavigation from '../components/BottomNavigation';

/* ─── Premium Purchase Popup ─── */
const PremiumPopup = ({ type, onClose }) => {
    const isComments = type === 'comments';
    const [selectedPlan, setSelectedPlan] = useState('right'); // right = popular

    const plans = isComments
        ? [
            { id: 'left', count: '1', label: 'Comment', price: '199.00' },
            { id: 'right', count: '5', label: 'Comments', price: '399.00' },
        ]
        : [
            { id: 'left', count: '1', label: 'Boost', price: '199.00' },
            { id: 'right', count: '5', label: 'Boosts', price: '399.00' },
        ];

    return (
        /* Overlay - Figma: bg #000, opacity 0.5 */
        <div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={onClose}
        >
            {/* Popup Box - Figma: 363.62×373.92, bg #FFF, blur, radius 28px */}
            <div
                className="relative"
                style={{
                    width: '363.62px',
                    maxWidth: '92vw',
                    background: '#FFFFFF',
                    backdropFilter: 'blur(15px)',
                    borderRadius: '28px',
                    padding: '20px 20px 24px',
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close button - Figma: 33.59×33.59, bg #F7EBFE, radius 19.55px */}
                <button
                    onClick={onClose}
                    className="absolute flex items-center justify-center"
                    style={{
                        width: '33.59px',
                        height: '33.59px',
                        right: '14px',
                        top: '14px',
                        background: '#F7EBFE',
                        borderRadius: '19.55px',
                        border: 'none',
                    }}
                >
                    <img src={crossIcon} alt="close" className="w-[16px] h-[16px] object-contain" />
                </button>

                {/* Content */}
                <div className="flex flex-col items-center">
                    {/* Icon circle - Figma: 45.4×45.4, radius 32px */}
                    <div
                        className="flex items-center justify-center"
                        style={{
                            width: '45.4px',
                            height: '45.4px',
                            background: isComments ? '#F0D3FF' : '#FFDDD8',
                            opacity: 0.5,
                            borderRadius: '32px',
                        }}
                    >
                        <img
                            src={isComments ? textIcon : thumbIcon}
                            alt={type}
                            className="w-[34px] h-[34px] object-contain"
                        />
                    </div>

                    {/* Title - Figma: Inter 600 22px, color #000 */}
                    <h2
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '22px',
                            lineHeight: '27px',
                            letterSpacing: '0.01em',
                            color: '#000000',
                            marginTop: '14px',
                            textAlign: 'center',
                        }}
                    >
                        {isComments ? 'Comments' : 'Boost'}
                    </h2>

                    {/* Description - Figma: Inter 500 13px, color #000 op 0.5 */}
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '13px',
                            lineHeight: '140%',
                            letterSpacing: '0.01em',
                            color: '#000000',
                            opacity: 0.5,
                            textAlign: 'center',
                            marginTop: '6px',
                            maxWidth: '339px',
                        }}
                    >
                        {isComments
                            ? 'Sending Comments are the best way to express yourself on Amoro'
                            : 'Boost makes your profile 20x more visible for 3 days. More than 80% people get matched quickly.'}
                    </p>

                    {/* Pricing Cards */}
                    <div className="flex gap-3 mt-5 w-full justify-center">
                        {plans.map((plan) => {
                            const isSelected = selectedPlan === plan.id;
                            return (
                                <button
                                    key={plan.id}
                                    onClick={() => setSelectedPlan(plan.id)}
                                    className="flex flex-col items-center justify-center"
                                    style={{
                                        width: '118.98px',
                                        height: '122.36px',
                                        background: isSelected ? '#FF7C67' : '#FFFFFF',
                                        border: isSelected
                                            ? 'none'
                                            : '1px solid rgba(0, 0, 0, 0.74)',
                                        borderRadius: '18px',
                                        cursor: 'pointer',
                                        transition: 'all 0.2s ease',
                                    }}
                                >
                                    {/* Count - Figma: Inter 700 16px */}
                                    <span
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            lineHeight: '100%',
                                            color: isSelected ? '#FFFFFF' : '#000000',
                                        }}
                                    >
                                        {plan.count}
                                    </span>

                                    {/* Label - Figma: Inter 500 16px */}
                                    <span
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 500,
                                            fontSize: '16px',
                                            lineHeight: '100%',
                                            color: isSelected ? '#FFFFFF' : '#000000',
                                            marginTop: '10px',
                                        }}
                                    >
                                        {plan.label}
                                    </span>

                                    {/* Price - Figma: Inter 500 15px */}
                                    <span
                                        className="flex items-center gap-0.5"
                                        style={{
                                            fontFamily: "'Inter', sans-serif",
                                            fontWeight: 500,
                                            fontSize: '15px',
                                            lineHeight: '100%',
                                            color: isSelected ? '#FFFFFF' : '#000000',
                                            opacity: isSelected ? 1 : 0.8,
                                            marginTop: '16px',
                                        }}
                                    >
                                        ₹{plan.price}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Continue button - Figma: 300.54×46.69, bg #6F3BCE, radius 80px */}
                    <button
                        className="active:scale-[0.97] transition-transform mt-5"
                        style={{
                            width: '300.54px',
                            maxWidth: '100%',
                            height: '46.69px',
                            background: '#6F3BCE',
                            boxShadow: '3px 8px 4.8px rgba(0, 0, 0, 0.1)',
                            borderRadius: '80px',
                            border: 'none',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '16px',
                            lineHeight: '19px',
                            letterSpacing: '0.01em',
                            color: '#FFFFFF',
                            cursor: 'pointer',
                        }}
                    >
                        {isComments ? 'Get Comments Now' : 'Get Boost Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ─── Main Profile Page ─── */
const ProfilePreviewPage = () => {
    const [popup, setPopup] = useState(null); // 'comments' | 'boost' | null
    const navigate = useNavigate();

    return (
        <div
            className="h-[100dvh] flex flex-col max-w-[414px] mx-auto overflow-hidden"
            style={{ background: '#FCFCFC' }}
        >
            {/* Header Bar - Figma: 70.88px, bg #FCFCFC, shadow, radius bottom 15px */}
            <header
                className="relative flex items-center justify-center px-4 shrink-0"
                style={{
                    height: '70.88px',
                    background: '#FCFCFC',
                    boxShadow: '-2px 3px 4.9px rgba(0, 0, 0, 0.05)',
                    borderRadius: '0px 0px 15px 15px',
                }}
            >
                <h1
                    className="text-center"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '18px',
                        lineHeight: '22px',
                        color: '#000000',
                        opacity: 0.9,
                    }}
                >
                    Profile
                </h1>
                <button
                    className="absolute right-4 top-1/2 -translate-y-1/2"
                    onClick={() => navigate('/settings')}
                >
                    <img src={settingIcon} alt="settings" className="w-[30px] h-[30px] object-contain" />
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-[25px] pt-8 pb-28">
                {/* Avatar Section */}
                <section className="flex flex-col items-center">
                    <div className="relative">
                        <div
                            className="rounded-full flex items-center justify-center"
                            style={{
                                width: '97.68px',
                                height: '97.68px',
                                border: '3px solid #6F3BCE',
                            }}
                        >
                            <div
                                className="rounded-full overflow-hidden"
                                style={{
                                    width: '93.93px',
                                    height: '93.93px',
                                    border: '1.5px solid #FFFFFF',
                                    boxShadow: '2px 2px 15px rgba(49, 40, 86, 0.15)',
                                }}
                            >
                                <img src={demoPhoto} alt="Profile" className="w-full h-full rounded-full object-cover" />
                            </div>
                        </div>

                        {/* Pencil icon - Figma: 30.51px circle, bg #6F3BCE */}
                        <button
                            onClick={() => navigate('/edit-profile')}
                            className="absolute flex items-center justify-center"
                            style={{
                                width: '30.51px',
                                height: '30.51px',
                                right: '-8px',
                                top: '5px',
                                background: '#6F3BCE',
                                borderRadius: '22.31px',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            <img src={pencilIcon} alt="edit" className="w-[18.85px] h-[18.85px] object-contain" />
                        </button>

                        {/* 86% Badge - Figma: 27.96×13.47, bg #6F3BCE, radius 5px */}
                        <span
                            className="absolute left-1/2 -translate-x-1/2 text-white text-center"
                            style={{
                                bottom: '-6px',
                                width: '27.96px',
                                height: '13.47px',
                                background: '#6F3BCE',
                                borderRadius: '5px',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: '8px',
                                lineHeight: '13.47px',
                            }}
                        >
                            86%
                        </span>
                    </div>

                    {/* Name - Figma: Lexend 600 18px */}
                    <div className="mt-5 flex items-center gap-1.5">
                        <h2
                            style={{
                                fontFamily: "'Lexend', sans-serif",
                                fontWeight: 600,
                                fontSize: '18px',
                                lineHeight: '22px',
                                color: '#000000',
                            }}
                        >
                            Avanti,24
                        </h2>
                        <img src={tickIcon} alt="verified" className="w-[16.54px] h-[14.9px] object-contain" />
                    </div>

                    {/* Get your account verified - Figma: Inter 400 10px */}
                    <p
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: '10px',
                            lineHeight: '12px',
                            letterSpacing: '0.01em',
                            color: '#000000',
                            marginTop: '4px',
                        }}
                    >
                        Get your account verified
                    </p>

                    {/* Divider + Unlock Premium */}
                    <div className="w-full flex items-center gap-3 mt-5">
                        <div className="flex-1 h-[1px] bg-black/10" />
                        <button
                            onClick={() => navigate('/premium')}
                            className="flex items-center gap-1.5 shrink-0"
                            style={{
                                height: '35.79px',
                                padding: '0 16px',
                                background: 'rgba(255, 124, 103, 0.05)',
                                borderRadius: '17.9px',
                                border: 'none',
                            }}
                        >
                            <span
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '17px',
                                    lineHeight: '21px',
                                    letterSpacing: '0.01em',
                                    color: '#000000',
                                }}
                            >
                                Unlock All{' '}
                                <span style={{ color: '#FF7C67' }}>Premium</span>
                            </span>
                            <img src={tickProfileIcon} alt="premium" className="w-[25.14px] h-[27.3px] object-contain" />
                            <span
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '17px',
                                    lineHeight: '21px',
                                    letterSpacing: '0.01em',
                                    color: '#000000',
                                }}
                            >
                                Features
                            </span>
                        </button>
                        <div className="flex-1 h-[1px] bg-black/10" />
                    </div>
                </section>

                {/* Quick Action Cards - Figma: 173×79.02, radius 20px */}
                <section className="mt-6 mb-6 flex gap-3">
                    {/* Comments Card */}
                    <button
                        onClick={() => setPopup('comments')}
                        className="flex-1 relative overflow-hidden text-left"
                        style={{
                            height: '79.02px',
                            background: '#F7EBFE',
                            borderRadius: '20px',
                            border: 'none',
                            padding: '0 14px',
                        }}
                    >
                        <div
                            className="absolute"
                            style={{
                                width: '160.19px',
                                height: '141.3px',
                                right: '-40px',
                                bottom: '-60px',
                                background: '#F0D3FF',
                                opacity: 0.3,
                                borderRadius: '50%',
                            }}
                        />
                        <div className="relative z-10 flex items-center gap-3">
                            <div
                                className="flex items-center justify-center shrink-0"
                                style={{
                                    width: '45.4px',
                                    height: '45.4px',
                                    background: '#F0D3FF',
                                    borderRadius: '32px',
                                }}
                            >
                                <img src={textIcon} alt="comments" className="w-[34px] h-[34px] object-contain" />
                            </div>
                            <div>
                                <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, fontSize: '15px', lineHeight: '100%', color: '#000000' }}>
                                    Comments
                                </p>
                                <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 300, fontSize: '12px', lineHeight: '100%', color: '#000000', opacity: 0.5, marginTop: '6px' }}>
                                    Get now
                                </p>
                            </div>
                        </div>
                    </button>

                    {/* Boost Card */}
                    <button
                        onClick={() => setPopup('boost')}
                        className="flex-1 relative overflow-hidden text-left"
                        style={{
                            height: '79.02px',
                            background: '#FCF5F4',
                            borderRadius: '20px',
                            border: 'none',
                            padding: '0 14px',
                        }}
                    >
                        <div
                            className="absolute"
                            style={{
                                width: '160.19px',
                                height: '141.3px',
                                right: '-40px',
                                bottom: '-60px',
                                background: '#FFDDD8',
                                opacity: 0.3,
                                borderRadius: '50%',
                            }}
                        />
                        <div className="relative z-10 flex items-center gap-3">
                            <div
                                className="flex items-center justify-center shrink-0"
                                style={{
                                    width: '45.4px',
                                    height: '45.4px',
                                    background: '#FFDDD8',
                                    borderRadius: '32px',
                                }}
                            >
                                <img src={thumbIcon} alt="boost" className="w-[34px] h-[34px] object-contain" />
                            </div>
                            <div>
                                <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 600, fontSize: '15px', lineHeight: '100%', color: '#000000' }}>
                                    Boost
                                </p>
                                <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 300, fontSize: '12px', lineHeight: '100%', color: '#000000', opacity: 0.5, marginTop: '6px' }}>
                                    Get now
                                </p>
                            </div>
                        </div>
                    </button>
                </section>

                {/* Our Premium Offer */}
                <section>
                    <h3
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 600,
                            fontSize: '20px',
                            lineHeight: '100%',
                            color: '#000000',
                        }}
                    >
                        Our Premium offer
                    </h3>

                    {/* Premium Card - Figma: bg #6F3BCE, radius 20px */}
                    <div
                        className="relative overflow-hidden mt-3"
                        style={{
                            background: '#6F3BCE',
                            borderRadius: '20px',
                            padding: '24px 20px 28px',
                        }}
                    >
                        {/* Decorative ellipse bottom-left - Figma: opacity 0.1, border 12px white */}
                        <div
                            className="absolute"
                            style={{
                                width: '162.8px',
                                height: '119.56px',
                                left: '-30px',
                                bottom: '-20px',
                                opacity: 0.1,
                                border: '12px solid #FFFFFF',
                                borderRadius: '50%',
                            }}
                        />
                        {/* Decorative ellipse top-right - Figma: opacity 0.1, border 10px, rotate 25.33deg */}
                        <div
                            className="absolute"
                            style={{
                                width: '82.8px',
                                height: '114.59px',
                                right: '-15px',
                                top: '-30px',
                                opacity: 0.1,
                                border: '10px solid #FFFFFF',
                                borderRadius: '50%',
                                transform: 'rotate(25.33deg)',
                            }}
                        />

                        <div className="relative z-10 flex flex-col items-center gap-5">
                            {/* PREMIUM pill - Figma: rgba(217,217,217,0.3), radius 18.28px */}
                            <div
                                className="flex items-center justify-center"
                                style={{
                                    width: '141px',
                                    height: '36.55px',
                                    background: 'rgba(217, 217, 217, 0.3)',
                                    borderRadius: '18.28px',
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontWeight: 600,
                                        fontSize: '20px',
                                        lineHeight: '24px',
                                        letterSpacing: '0.01em',
                                        color: '#FFFFFF',
                                    }}
                                >
                                    PREMIUM
                                </span>
                            </div>

                            <p
                                style={{
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                    letterSpacing: '0.01em',
                                    color: '#FFFFFF',
                                    textAlign: 'center',
                                }}
                            >
                                see the list of what included
                            </p>

                            {/* Upgrade button - Figma: 240.14×46.69, bg #FFF, shadow, radius 80px */}
                            <button
                                onClick={() => navigate('/premium')}
                                className="active:scale-[0.97] transition-transform"
                                style={{
                                    width: '240.14px',
                                    height: '46.69px',
                                    background: '#FFFFFF',
                                    boxShadow: '3px 8px 4.8px rgba(0, 0, 0, 0.15)',
                                    borderRadius: '80px',
                                    border: 'none',
                                    fontFamily: "'Inter', sans-serif",
                                    fontWeight: 600,
                                    fontSize: '16px',
                                    lineHeight: '19px',
                                    letterSpacing: '0.01em',
                                    color: '#000000',
                                    cursor: 'pointer',
                                }}
                            >
                                Upgrade
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            <BottomNavigation activeTab="profile" />

            {/* Popup Modal */}
            {popup && <PremiumPopup type={popup} onClose={() => setPopup(null)} />}
        </div>
    );
};

export default ProfilePreviewPage;
