import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import checkMarkIcon from '../assets/icons/tick.png'; // Using existing tick icon for checkmark

const SettingsPage = () => {
    const navigate = useNavigate();
    const [isPaused, setIsPaused] = useState(true);
    const [showActiveStatus, setShowActiveStatus] = useState(false);

    const SectionHeader = ({ title }) => (
        <div style={{ padding: '24px 15px 12px', opacity: 0.7 }}>
            <h2 style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 500,
                fontSize: '15px',
                color: '#000',
                textAlign: 'left'
            }}>
                {title}
            </h2>
        </div>
    );

    const SettingRow = ({ label, value, subtext, showArrow, showCheck, badge, onClick, children }) => (
        <div className="mb-4" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <div style={{
                width: '385px',
                maxWidth: '92vw',
                minHeight: subtext ? '66.88px' : '53.79px',
                background: '#FFFFFF',
                borderRadius: '14px',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.04)',
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 15px'
            }}>
                <div style={{ textAlign: 'left', flex: 1 }}>
                    <div className="flex items-center gap-2">
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#000'
                        }}>
                            {label}
                        </span>
                        {badge && (
                            <div style={{
                                padding: '4px 12px',
                                background: '#FF7C67',
                                borderRadius: '10.7px',
                                color: '#FFF',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 500,
                                fontSize: '12px'
                            }}>
                                {badge}
                            </div>
                        )}
                    </div>
                    {subtext && (
                        <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '10px',
                            color: '#000',
                            opacity: 0.3,
                            marginTop: '4px'
                        }}>
                            {subtext}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-3">
                    {value && (
                        <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: '14px',
                            color: '#000',
                            opacity: 0.7
                        }}>
                            {value}
                        </span>
                    )}
                    {showCheck && <img src={checkMarkIcon} alt="check" style={{ width: '18px', height: '18px' }} />}
                    {showArrow && (
                        <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
                            <path d="M10 7L15 12L10 17" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    )}
                    {children}
                </div>
            </div>
        </div>
    );

    const Toggle = ({ active, onToggle }) => (
        <button
            onClick={(e) => {
                e.stopPropagation();
                onToggle();
            }}
            style={{
                width: '49.67px',
                height: '26.46px',
                background: active ? '#6F3BCE' : '#E9E9E9',
                borderRadius: '13.2px',
                position: 'relative',
                transition: 'all 0.3s ease',
                border: 'none',
                cursor: 'pointer'
            }}
        >
            <div style={{
                width: '26.46px',
                height: '26.46px',
                background: active ? '#F5F2FD' : '#939393',
                borderRadius: '13.2px',
                position: 'absolute',
                top: 0,
                left: active ? '23.2px' : '0px',
                transition: 'all 0.3s ease'
            }} />
        </button>
    );

    return (
        <div className="h-screen bg-[#FCFCFC] flex flex-col max-w-[414px] mx-auto overflow-hidden">
            {/* Header */}
            <header style={{
                height: '70.88px',
                background: '#FCFCFC',
                boxShadow: '-2px 3px 4.9px rgba(0, 0, 0, 0.05)',
                borderRadius: '0px 0px 15px 15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 20px',
                zIndex: 10,
                flexShrink: 0
            }}>
                <div style={{ width: '45px' }} /> {/* Spacer */}
                <h1 style={{
                    flex: 1,
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    textAlign: 'center',
                    color: '#000',
                    opacity: 0.9
                }}>
                    Settings
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        width: '45px',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '18px',
                        color: '#000',
                        opacity: 0.9,
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer'
                    }}
                >
                    Done
                </button>
            </header>

            <main className="flex-1 overflow-y-auto pb-10">
                <SectionHeader title="Profile" />
                <SettingRow label="Pause">
                    <Toggle active={isPaused} onToggle={() => setIsPaused(!isPaused)} />
                </SettingRow>
                <p style={{
                    padding: '0 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    color: '#000',
                    opacity: 0.3,
                    lineHeight: '1.4',
                    textAlign: 'left',
                    marginTop: '-10px',
                    marginBottom: '20px'
                }}>
                    Pausing prevents your profile from being shown to new people. <br />
                    You can still chat with your current matches.
                </p>

                <SettingRow label="Show Last Active Status">
                    <Toggle active={showActiveStatus} onToggle={() => setShowActiveStatus(!showActiveStatus)} />
                </SettingRow>
                <p style={{
                    padding: '0 20px',
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '10px',
                    color: '#000',
                    opacity: 0.3,
                    lineHeight: '1.4',
                    textAlign: 'left',
                    marginTop: '-10px',
                    marginBottom: '20px'
                }}>
                    People viewing your profile can see your last active status, and you can see theirs. <br />
                    Your matches won't be shown your last active status.
                </p>

                <SectionHeader title="Phone & Email" />
                <SettingRow label="Phone Number" value="+91 12345 23456" showCheck />
                <SettingRow label="Email" value="abc...@gmail.com" showArrow />

                <SectionHeader title="Subscription" />
                <SettingRow
                    label="Complete profile to become a member"
                    subtext="You’re not currently subscribed."
                    showArrow
                />
                <SettingRow label="Subscribe to" badge="AMORO" showArrow />

                <SectionHeader title="Language & region" />
                <SettingRow label="App language" subtext="English (United Kingdom)" showArrow />
                <SettingRow
                    label="Unit of measurement"
                    subtext="Kilometres, Feet"
                    showArrow
                    onClick={() => navigate('/measurement-units')}
                />

                <SectionHeader title="Legal" />
                <SettingRow
                    label="Privacy Policy"
                    showArrow
                    onClick={() => navigate('/privacy-policy')}
                />
                <SettingRow
                    label="Terms of service"
                    showArrow
                    onClick={() => navigate('/terms-of-service')}
                />
                <SettingRow label="Privacy Preferences" showArrow />

                <SectionHeader title="Community" />
                <SettingRow label="Safe Dating Tips" showArrow />
                <SettingRow label="Member Principles" showArrow />

                <div className="mt-10 mb-20 px-4 flex flex-col gap-4">
                    <button style={{
                        width: '100%',
                        height: '53.79px',
                        background: '#F3F3F3',
                        borderRadius: '14px',
                        border: 'none',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#000',
                        cursor: 'pointer'
                    }}>
                        Log out
                    </button>
                    <button style={{
                        width: '100%',
                        height: '53.79px',
                        background: '#F3F3F3',
                        borderRadius: '14px',
                        border: 'none',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500,
                        fontSize: '16px',
                        color: '#000',
                        cursor: 'pointer'
                    }}>
                        Delete account
                    </button>
                </div>
            </main>
        </div>
    );
};

export default SettingsPage;
