import React from 'react';
import { useNavigate } from 'react-router-dom';
import BottomNavigation from '../components/BottomNavigation';

import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';
import demoPhoto3 from '../assets/2d480a64955b32a3f343496aa510b7c06b62c97c.png';
import demoPhoto4 from '../assets/9bd108315ddebf58571ec9fe25c0a6d5d63096ba.png';

/* ─── Dummy Match Avatars ─── */
const matchAvatars = [
    { id: 0, name: 'Likes you', photo: demoPhoto, isLikesYou: true, count: '10+' },
    { id: 1, name: 'Adil', photo: demoPhoto2 },
    { id: 2, name: 'Marina', photo: demoPhoto3 },
    { id: 3, name: 'Dean', photo: demoPhoto4 },
    { id: 4, name: 'Max', photo: demoPhoto },
];

/* ─── Dummy Chat Data ─── */
const chats = [
    { id: 1, name: 'Alex Linderson', message: 'How are you today?', time: '2 min ago', photo: demoPhoto, unread: 1, bold: true },
    { id: 2, name: 'Sabila Sayma', message: 'How are you today?', time: '2 min ago', photo: demoPhoto2, unread: 2, bold: true },
    { id: 3, name: 'John Abraham', message: 'How are you today?', time: '2 min ago', photo: demoPhoto3 },
    { id: 4, name: 'Priya Sharma', message: 'How are you today?', time: '2 min ago', photo: demoPhoto4 },
    { id: 5, name: 'Rahul Verma', message: 'How are you today?', time: '2 min ago', photo: demoPhoto },
    { id: 6, name: 'Neha Gupta', message: 'How are you today?', time: '2 min ago', photo: demoPhoto2 },
    { id: 7, name: 'Arjun Patel', message: 'How are you today?', time: '2 min ago', photo: demoPhoto3, online: true },
    { id: 8, name: 'Meera Joshi', message: 'How are you today?', time: '2 min ago', photo: demoPhoto4, online: true },
];

/* ─── Match Avatar Component ─── */
const MatchAvatar = ({ match, onClick }) => (
    <div onClick={onClick} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', flexShrink: 0, cursor: 'pointer' }}>
        <div style={{ position: 'relative', width: '66.61px', height: '68.78px' }}>
            {match.isLikesYou ? (
                <>
                    <div style={{
                        width: '66.61px', height: '68.78px', borderRadius: '23px', overflow: 'hidden',
                    }}>
                        <img src={match.photo} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '22px', filter: 'blur(2px)' }} />
                    </div>
                    <div style={{
                        position: 'absolute', inset: 0, borderRadius: '23px',
                        background: 'linear-gradient(180deg, rgba(111, 59, 206, 0.84) 0%, rgba(255, 124, 103, 0.84) 100%)',
                        backdropFilter: 'blur(2px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <span style={{
                            fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '18px',
                            lineHeight: '22px', color: '#FFFFFF', textAlign: 'center',
                        }}>{match.count}</span>
                    </div>
                </>
            ) : (
                <div style={{
                    width: '66.61px', height: '68.78px',
                    border: '1.1px solid #6F3BCE', borderRadius: '24px',
                    padding: '3.18px', boxSizing: 'border-box',
                }}>
                    <img src={match.photo} alt={match.name} style={{
                        width: '60.25px', height: '62.3px', borderRadius: '22px', objectFit: 'cover',
                    }} />
                </div>
            )}
        </div>
        <span style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '12px',
            lineHeight: '14px', color: '#000', textAlign: 'center', width: '50px',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{match.name}</span>
    </div>
);

/* ─── Chat Item Component ─── */
const ChatItem = ({ chat, onClick }) => (
    <div onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '8px 20px', cursor: 'pointer',
    }}>
        {/* Avatar */}
        <div style={{ position: 'relative', flexShrink: 0 }}>
            <img src={chat.photo} alt={chat.name} style={{
                width: '63.66px', height: '64.43px', borderRadius: '15px', objectFit: 'cover',
            }} />
            {chat.online && (
                <div style={{
                    position: 'absolute', bottom: '0px', right: '0px',
                    width: '9.06px', height: '9.06px', borderRadius: '50%',
                    background: '#0FE16D', border: '1.5px solid #fff',
                }} />
            )}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '20px',
                lineHeight: '20px', color: '#000E08',
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{chat.name}</p>
            <p style={{
                fontFamily: "'Inter', sans-serif", fontWeight: chat.bold ? 700 : 450,
                fontSize: '12px', lineHeight: '12px', color: '#797C7B', marginTop: '6px',
            }}>{chat.message}</p>
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px', flexShrink: 0 }}>
            <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 450, fontSize: '12px',
                lineHeight: '12px', color: '#797C7B', textAlign: 'right',
            }}>{chat.time}</span>
            {chat.unread && (
                <div style={{
                    width: '16.18px', height: '16.18px', borderRadius: '9.44px',
                    background: '#6F3BCE', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '8px',
                        lineHeight: '12px', color: '#FFFFFF', textAlign: 'right',
                    }}>{chat.unread}</span>
                </div>
            )}
        </div>
    </div>
);

/* ─── Chat List Page ─── */
const ChatListPage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-[100dvh] flex flex-col max-w-[414px] mx-auto" style={{ background: '#FCFCFC' }}>

            {/* Header */}
            <header style={{
                background: '#FCFCFC', boxShadow: '-2px 3px 4.9px rgba(0, 0, 0, 0.05)',
                borderRadius: '0px 0px 15px 15px', padding: '0 16px',
                height: '70.88px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', zIndex: 10, flexShrink: 0,
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '18px',
                    lineHeight: '22px', color: '#000', opacity: 0.9,
                }}>Chats</span>

                {/* Filter icon */}
                <button style={{
                    position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: '4px',
                }}>
                    <svg width="16" height="18" viewBox="0 0 16 18" fill="#6F3BCE">
                        <path d="M0 3h16M3 9h10M6 15h4" stroke="#6F3BCE" strokeWidth="2" strokeLinecap="round" fill="none" />
                    </svg>
                </button>
            </header>

            {/* Scrollable content */}
            <main className="flex-1 overflow-y-auto" style={{ paddingBottom: '90px' }}>

                {/* Your Matches Section */}
                <div style={{ padding: '18px 20px 0' }}>
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px',
                        lineHeight: '14px', color: '#000',
                    }}>Your Matches (16)</p>
                </div>

                {/* Horizontal match avatars */}
                <div style={{
                    display: 'flex', gap: '12px', padding: '14px 20px',
                    overflowX: 'auto', scrollbarWidth: 'none',
                }}>
                    {matchAvatars.map(m => (
                        <MatchAvatar
                            key={m.id}
                            match={m}
                            onClick={() => m.isLikesYou ? navigate('/likes') : null}
                        />
                    ))}
                </div>

                {/* Chats label */}
                <div style={{ padding: '8px 20px' }}>
                    <p style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '15px',
                        lineHeight: '14px', color: '#000',
                    }}>Chats</p>
                </div>

                {/* Chat list */}
                <div>
                    {chats.map((chat, idx) => (
                        <ChatItem
                            key={chat.id}
                            chat={chat}
                            onClick={() => navigate('/chat', { state: { name: chat.name, photo: chat.photo, hasMessages: idx > 0 } })}
                        />
                    ))}
                </div>
            </main>

            <BottomNavigation activeTab="chats" />
        </div>
    );
};

export default ChatListPage;
