import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Photos
import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import demoPhoto3 from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';
import demoPhoto4 from '../assets/9bd108315ddebf58571ec9fe25c0a6d5d63096ba.png';

import tickIcon from '../assets/icons/tick.png';

const s = (obj) => obj; // style shorthand

/* ─── Photo Slot ─── */
const PhotoSlot = ({ photo, hasPlus, label }) => (
    <div style={{ position: 'relative', width: '103.67px', height: '103.67px' }}>
        <div style={{
            width: '103.67px', height: '103.67px', borderRadius: '20px', overflow: 'hidden',
            background: 'rgba(249, 253, 252, 0.7)', border: photo ? '1px solid #9068DC' : '1px solid rgba(144,104,220,0.2)',
            backdropFilter: 'blur(5.5px)', boxShadow: photo ? '4px 4px 11px rgba(144, 104, 220, 0.25)' : 'none',
        }}>
            {photo && <img src={photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        {/* Plus button */}
        {hasPlus && (
            <div style={{
                position: 'absolute', bottom: '-5px', right: '-5px',
                width: '35.05px', height: '35.05px', borderRadius: '80px',
                background: '#6F3BCE', border: '2px solid #F6FBF3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <svg width="17.53" height="17.53" viewBox="0 0 24 24" fill="none" stroke="#F5F5F5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </div>
        )}
        {/* Label */}
        {label && (
            <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px',
                textAlign: 'center', color: '#000', opacity: 0.5, marginTop: '4px',
            }}>{label}</p>
        )}
    </div>
);

/* ─── Detail Row ─── */
const DetailRow = ({ label, value }) => (
    <div style={{
        width: '100%', height: '53.79px', background: '#FFFFFF',
        boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)',
        borderRadius: '40.98px', display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', padding: '0 20px',
    }}>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: '#000' }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '14px', color: '#000', opacity: 0.7 }}>{value}</span>
            <div style={{
                width: '29.49px', height: '28.95px', background: 'rgba(111, 59, 206, 0.1)',
                borderRadius: '14.74px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#6F3BCE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3,1 7,5 3,9" />
                </svg>
            </div>
        </div>
    </div>
);

/* ─── Prompt Card ─── */
const PromptCard = ({ question, answer, bgColor }) => (
    <div style={{
        width: '100%', background: bgColor || '#FFFFFF',
        boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)',
        borderRadius: '10px', padding: '16px 20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    }}>
        <div>
            <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: '15px', lineHeight: '18px', color: '#000' }}>{question}</p>
            {answer && <p style={{ fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: '12px', lineHeight: '14px', color: '#000', opacity: 0.7, marginTop: '4px' }}>{answer}</p>}
        </div>
        <div style={{
            width: '66.95px', height: '33.62px', background: '#6F3BCE',
            borderRadius: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
        }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="3,1 7,5 3,9" />
            </svg>
            <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '10px', lineHeight: '150%', color: '#fff' }}>Edit</span>
        </div>
    </div>
);

/* ─── Interest Pill ─── */
const InterestPill = ({ label, icon, active }) => (
    <div style={{
        height: '29.17px', borderRadius: '24.5px', padding: '4px 14px',
        background: active ? '#6F3BCE' : '#F9F7FF',
        display: 'inline-flex', alignItems: 'center', gap: '6px',
    }}>
        {icon && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={active ? '#fff' : '#000'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                {icon}
            </svg>
        )}
        <span style={{
            fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '14px', lineHeight: '150%',
            color: active ? '#fff' : '#000', opacity: active ? 1 : 0.9,
        }}>{label}</span>
    </div>
);

/* ─── Main Edit Profile Page ─── */
const EditProfilePage = () => {
    const navigate = useNavigate();
    const [bio, setBio] = useState('');

    return (
        <div className="h-[100dvh] flex flex-col font-sans overflow-hidden max-w-[414px] mx-auto" style={{ background: '#FCFCFC' }}>

            {/* Header - Figma: shadow, radius 0 0 15px 15px */}
            <header style={{
                background: '#FCFCFC', boxShadow: '-2px 3px 4.9px rgba(0, 0, 0, 0.05)',
                borderRadius: '0px 0px 15px 15px', padding: '0 16px',
                height: '70.88px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 10, flexShrink: 0,
            }}>
                {/* Back arrow */}
                <button onClick={() => navigate(-1)} style={{ position: 'absolute', left: '16px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>
                <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px', lineHeight: '22px', color: '#000', opacity: 0.9 }}>Edit</span>
            </header>

            {/* Scrollable Content */}
            <main className="flex-1 overflow-y-auto pb-8 scrollbar-hide" style={{ padding: '0 14.58px' }}>

                {/* Profile Photos Section */}
                <div style={{
                    background: '#FFFFFF', boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)',
                    borderRadius: '10px', padding: '14px 18px 20px', marginTop: '18px',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                        <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '15px', color: '#000' }}>Profile Photos</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px', color: '#6F3BCE', opacity: 0.9, cursor: 'pointer' }}>Done</span>
                    </div>

                    {/* Photo Grid 3×2 */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 103.67px)', gap: '14px', justifyContent: 'center' }}>
                        <PhotoSlot photo={demoPhoto} hasPlus={false} />
                        <PhotoSlot photo={demoPhoto2} hasPlus={false} />
                        <PhotoSlot photo={demoPhoto3} hasPlus={true} label="Add Photo" />
                        <PhotoSlot photo={demoPhoto4} hasPlus={false} />
                        <PhotoSlot photo={null} hasPlus={true} />
                        <PhotoSlot photo={null} hasPlus={true} />
                    </div>
                </div>

                {/* At least 4 photos */}
                <p style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px',
                    color: '#000', opacity: 0.5, marginTop: '8px', paddingLeft: '18px',
                }}>At least 4 photos are mandatory</p>

                {/* Profile Strength */}
                <div style={{ marginTop: '20px' }}>
                    <p style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '15px', color: '#000', marginBottom: '10px' }}>Profile Strength: 80%</p>
                    {/* Progress bar */}
                    <div style={{ width: '100%', height: '6.59px', background: '#E8E6EA', borderRadius: '10px', position: 'relative' }}>
                        <div style={{ width: '80%', height: '6.59px', background: '#6F3BCE', borderRadius: '10px' }} />
                    </div>
                    {/* Checklist */}
                    <div style={{ marginTop: '14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={tickIcon} alt="" style={{ width: '20px', height: '19.83px' }} />
                            <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '140%', letterSpacing: '0.01em', color: '#000' }}>Photos added</span>
                            <span style={{ marginLeft: 'auto', fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '16px', color: '#000' }}>2 Questions answered</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <img src={tickIcon} alt="" style={{ width: '20px', height: '19.83px' }} />
                            <span style={{ fontFamily: "'Lexend', sans-serif", fontWeight: 500, fontSize: '16px', lineHeight: '140%', letterSpacing: '0.01em', color: '#000' }}>Add interests</span>
                        </div>
                    </div>
                </div>

                {/* Basic Info - Bio */}
                <div style={{ marginTop: '24px' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#000', marginBottom: '10px' }}>Basic info</p>
                    <div style={{
                        background: '#F6F6F8', border: '1px solid rgba(144, 104, 220, 0.08)',
                        borderRadius: '20px', padding: '16px', position: 'relative', minHeight: '96.63px',
                    }}>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value.slice(0, 250))}
                            placeholder="Write something that shows who you really are..."
                            maxLength={250}
                            style={{
                                width: '100%', height: '60px', background: 'transparent', border: 'none', outline: 'none', resize: 'none',
                                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '13px', color: '#000',
                            }}
                        />
                        <span style={{
                            position: 'absolute', bottom: '10px', right: '14px',
                            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '10px', color: '#000',
                        }}>{bio.length}/250</span>
                    </div>
                </div>

                {/* Questions */}
                <div style={{ marginTop: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#000' }}>Questions</span>
                        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '10px', color: '#000', opacity: 0.5, letterSpacing: '-0.03em' }}>( 2 Answers Mandatory )</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <PromptCard question="My favorite way to do nothing is" answer="Nothing" />
                        <PromptCard question="I'll never forget the time I" answer="12 PM" />
                        <PromptCard question="The last note I wrote on my phone says" bgColor="#EBEBEB" />
                    </div>
                </div>

                {/* My Interests */}
                <div style={{ marginTop: '24px' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#000', marginBottom: '10px' }}>My interests</p>
                    <div style={{
                        background: '#FFFFFF', boxShadow: '0px 3px 4px rgba(71, 53, 226, 0.04)',
                        borderRadius: '10px', padding: '14px 14px',
                    }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            <InterestPill label="Art & Crafts" icon={<><circle cx="13.5" cy="6.5" r="2" /><circle cx="6.5" cy="12.5" r="2" /></>} active={false} />
                            <InterestPill label="Travelling" icon={<path d="m8 3 4 8 5-5 5 15H2L8 3z" />} active={false} />
                            <InterestPill label="Photography" icon={<><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></>} active={false} />
                            <InterestPill label="Music" icon={<><circle cx="12" cy="12" r="3" /><path d="M19 21V5l-7 3" /></>} active={true} />
                        </div>
                    </div>
                </div>

                {/* Details */}
                <div style={{ marginTop: '24px' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '16px', color: '#000', marginBottom: '12px' }}>Details</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <DetailRow label="Education" value="Graduate" />
                        <DetailRow label="Religious beliefs" value="Hindu" />
                        <DetailRow label="Height" value="5.6 Feet" />
                        <DetailRow label="My Languages" value="English" />
                        <DetailRow label="Dating intentions" value="Long-term" />
                    </div>
                </div>

                {/* Habits */}
                <div style={{ marginTop: '24px' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '15px', color: '#000', marginBottom: '12px' }}>Habits</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <DetailRow label="Drinking" value="No" />
                        <DetailRow label="Smoking" value="No" />
                    </div>
                </div>

                {/* Save Changes Button - Figma: 350×64, bg #6F3BCE, radius 80px */}
                <button
                    className="active:scale-[0.97] transition-transform"
                    style={{
                        width: '100%', maxWidth: '350px', height: '64px', margin: '32px auto 16px', display: 'block',
                        background: 'linear-gradient(0deg, #6F3BCE, #6F3BCE), #3BA2E4',
                        borderRadius: '80px', border: 'none', cursor: 'pointer',
                        fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                        lineHeight: '22px', textAlign: 'center', letterSpacing: '0.01em',
                        color: '#FFFFFF',
                    }}
                    onClick={() => { localStorage.setItem('profile_complete', JSON.stringify(true)); navigate(-1); }}
                >
                    Save Changes
                </button>

            </main>
        </div>
    );
};

export default EditProfilePage;
