import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

/* ─── Pricing Card ─── */
const PricingCard = ({ plan, price, label, isSelected, onClick }) => (
    <div
        onClick={onClick}
        style={{
            width: '128.67px', height: '132.32px', position: 'relative',
            background: '#FFFFFF', border: isSelected ? '2px solid #FF7C67' : '1px solid rgba(111, 59, 206, 0.15)',
            borderRadius: isSelected ? '20px' : '18px', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            overflow: 'hidden',
        }}
    >
        <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '16px',
            lineHeight: '100%', textAlign: 'center', color: '#000',
        }}>{plan}</span>

        <div style={{ display: 'flex', alignItems: 'center', marginTop: '24px', gap: '2px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '12px', color: '#000', opacity: 0.8 }}>₹</span>
            <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px',
                textAlign: 'center', color: '#000', opacity: 0.8,
            }}>{price}</span>
        </div>

        {label && (
            <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                height: '32.44px', background: '#FF7C67',
                borderRadius: '0px 0px 18px 18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '14px',
                    color: '#FFFFFF',
                }}>{label}</span>
            </div>
        )}
    </div>
);

/* ─── Feature Row ─── */
const FeatureRow = ({ text, isLast }) => (
    <div>
        <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 0',
        }}>
            <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px',
                lineHeight: '12px', letterSpacing: '0.01em', color: '#000',
            }}>{text}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M5 12l5 5L20 7" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        </div>
        {!isLast && (
            <div style={{ width: '100%', height: '1px', background: '#000', opacity: 0.1 }} />
        )}
    </div>
);

/* ─── Premium Page ─── */
const PremiumPage = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState('month');

    const features = [
        'Get exclusive photo insight',
        'Unlimited likes per day',
        'See who liked your profile',
        'Priority in discovery feed',
        'Advanced filters & preferences',
        'Read receipts for messages',
        'Profile boost once a week',
    ];

    return (
        <div
            className="h-[100dvh] flex flex-col max-w-[414px] mx-auto"
            style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
            }}
        >
            {/* Close Button - fixed at top right */}
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute', right: '20px', top: '20px',
                    width: '39.1px', height: '39.1px', background: '#F7EBFE',
                    borderRadius: '19.55px', border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    zIndex: 10,
                }}
            >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6F3BCE" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            </button>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto" style={{ WebkitOverflowScrolling: 'touch' }}>
                <div className="flex flex-col items-center" style={{ paddingBottom: '32px' }}>

                    {/* Title */}
                    <h1 style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '25px',
                        lineHeight: '30px', textAlign: 'center', letterSpacing: '0.01em',
                        color: '#000', marginTop: '100px',
                    }}>
                        Premium Access
                    </h1>

                    {/* Description */}
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px',
                        lineHeight: '140%', textAlign: 'center', letterSpacing: '0.01em',
                        color: '#000', opacity: 0.5, marginTop: '8px',
                        maxWidth: '274px', padding: '0 20px',
                    }}>
                        Upgrade to premium and quickly find new people in your area and chat without having to match first!
                    </p>

                    {/* Pricing Cards */}
                    <div style={{
                        display: 'flex', gap: '12px', marginTop: '48px',
                        justifyContent: 'center', padding: '0 16px',
                    }}>
                        <PricingCard
                            plan="1 WEEK"
                            price="399"
                            isSelected={selectedPlan === 'week'}
                            onClick={() => setSelectedPlan('week')}
                        />
                        <PricingCard
                            plan="1 MONTH"
                            price="599"
                            label="POPULAR"
                            isSelected={selectedPlan === 'month'}
                            onClick={() => setSelectedPlan('month')}
                        />
                        <PricingCard
                            plan="3 MONTHS"
                            price="999"
                            label="Save 40%"
                            isSelected={selectedPlan === '3months'}
                            onClick={() => setSelectedPlan('3months')}
                        />
                    </div>

                    {/* ─── What's Included Card ─── */}
                    {/* Figma: 377.87×348.21, border 1px #6F3BCE, radius 50px 50px 20px 20px */}
                    <div style={{
                        width: '377.87px', maxWidth: 'calc(100% - 32px)',
                        marginTop: '32px',
                        border: '1px solid #6F3BCE',
                        borderRadius: '50px 50px 20px 20px',
                        overflow: 'hidden', background: '#FFFFFF',
                    }}>
                        {/* Purple gradient header - Figma: radius 30px 30px 0 0 */}
                        <div style={{
                            width: '100%', height: '56px',
                            background: 'linear-gradient(90deg, #755ED7 0%, #9168DC 100%)',
                            borderRadius: '50px 50px 0px 0px',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                            padding: '0 36px',
                        }}>
                            <span style={{
                                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                                lineHeight: '18px', letterSpacing: '0.01em', color: '#FFFFFF',
                            }}>What's included</span>
                            <span style={{
                                fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: '15px',
                                lineHeight: '18px', letterSpacing: '0.01em', color: '#FFFFFF',
                            }}>Pro</span>
                        </div>

                        {/* Feature rows on white background */}
                        <div style={{ padding: '4px 36px 16px' }}>
                            {features.map((f, i) => (
                                <FeatureRow key={i} text={f} isLast={i === features.length - 1} />
                            ))}
                        </div>
                    </div>

                    {/* Subscribe Button */}
                    <button
                        className="active:scale-[0.97] transition-transform"
                        style={{
                            width: '350.81px', maxWidth: 'calc(100% - 32px)', height: '46.69px',
                            background: '#6F3BCE',
                            boxShadow: '3px 8px 4.8px rgba(0, 0, 0, 0.15)',
                            borderRadius: '80px', border: 'none', cursor: 'pointer',
                            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px',
                            lineHeight: '19px', textAlign: 'center', letterSpacing: '0.01em',
                            color: '#FFFFFF', marginTop: '24px',
                        }}
                        onClick={() => navigate(-1)}
                    >
                        SUBSCRIBE NOW
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PremiumPage;
