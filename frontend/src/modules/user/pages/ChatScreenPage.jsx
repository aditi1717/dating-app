import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import demoPhoto from '../assets/6ee1ef9d2677e06049fb899a7658f4b9ac9c11dc.jpg';
import demoPhoto2 from '../assets/853e31e910922fe7f47f66de5c5206f78a610037.jpg';

// Chat Icons
import chatGalleryIcon from '../assets/icons/chat-gallery.png';
import chatRecordIcon from '../assets/icons/chat-record icon.png';
import chatSendIcon from '../assets/icons/chat-send.png';
import chatThumbIcon from '../assets/icons/chat-thumb.png';

/* ─── Dummy Chat Data ─── */
const DUMMY_MESSAGES = [
    { id: 1, type: 'date', text: '16 JUN 2026 AT 11:02' },
    { id: 2, type: 'received', text: 'Hi', shape: 'first' },
    { id: 3, type: 'received', text: 'I really liked your smile', shape: 'last' },
    { id: 4, type: 'date', text: '16 JUN 2026 AT 12:02' },
    { id: 5, type: 'sent', text: 'Hi', shape: 'first' },
    { id: 6, type: 'sent', text: 'How are you?', shape: 'follow' },
    { id: 7, type: 'sent', text: "Thank you ☺️ That's sweet of you", shape: 'last' },
    { id: 8, type: 'received', text: "I try 😄 What made you think that?", shape: 'first' },
    { id: 9, type: 'received', text: 'Your vibe feels positive', shape: 'last' },
    { id: 10, type: 'date', text: '16 JUN 2026 AT 12:02' },
    { id: 11, type: 'sent', text: 'Hi', shape: 'first' },
    { id: 12, type: 'sent', text: 'How are you?', shape: 'follow' },
    { id: 13, type: 'sent', text: "Thank you ☺️ That's sweet of you", shape: 'last' },
];

/* ─── Chat Bubble ─── */
const ChatBubble = ({ msg, photo }) => {
    if (msg.type === 'date') {
        return (
            <div style={{
                textAlign: 'center',
                padding: '24px 0 12px',
                fontFamily: "'Roboto', sans-serif",
                fontWeight: 500,
                fontSize: '13px',
                lineHeight: '16px',
                letterSpacing: '0.01em',
                color: '#797C7B',
            }}>
                {msg.text}
            </div>
        );
    }

    const isSent = msg.type === 'sent';

    /* 
       Border Radii to match the image:
       The "tail" is a sharper corner (5px).
       Received: Top-Left is always the tail.
       Sent: Top-Right is always the tail.
    */
    let borderRadius;
    if (isSent) {
        borderRadius = '25px 5px 25px 25px';
    } else {
        borderRadius = '5px 25px 25px 25px';
    }

    return (
        <div style={{
            display: 'flex',
            flexDirection: isSent ? 'row-reverse' : 'row',
            alignItems: 'flex-start',
            gap: '8px',
            padding: '1px 20px',
            marginBottom: msg.shape === 'last' || msg.shape === 'single' ? '12px' : '0px',
        }}>
            {/* Avatar only for received first messages */}
            {!isSent ? (
                <div style={{ width: '32px', flexShrink: 0 }}>
                    {msg.shape === 'first' && (
                        <img src={photo} alt="" style={{
                            width: '32px', height: '32px', borderRadius: '50%',
                            objectFit: 'cover',
                        }} />
                    )}
                </div>
            ) : null}

            <div style={{
                maxWidth: '75%',
                background: isSent ? '#6F3BCE' : '#F3F3F3',
                borderRadius: borderRadius,
                padding: '12px 16px',
            }}>
                <p style={{
                    fontFamily: "'Roboto', sans-serif",
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '18px',
                    letterSpacing: '0.02em',
                    color: isSent ? '#FFFFFF' : '#303030',
                    margin: 0,
                }}>{msg.text}</p>
            </div>
        </div>
    );
};

/* ─── Empty Chat State ─── */
const EmptyChatState = () => (
    <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '16px',
    }}>
        <div className="flex flex-col items-center">
            <div style={{
                width: '118.35px', height: '29.4px', background: '#D9D9D9',
                opacity: 0.2, borderRadius: '14.7px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <span style={{
                    fontFamily: "'Roboto', sans-serif", fontWeight: 500, fontSize: '14px',
                    lineHeight: '16px', letterSpacing: '0.01em', color: '#000',
                }}>View Profile</span>
            </div>
        </div>
        <span style={{
            fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: '16px',
            lineHeight: '116.39%', letterSpacing: '0.01em', color: '#000',
            opacity: 0.5, textAlign: 'center',
        }}>Your match expire in 12 hrs</span>
    </div>
);

/* ─── Settings Popup Component ─── */
const SettingsPopup = ({ onClose }) => (
    <div
        onClick={onClose}
        style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.1)', zIndex: 1000,
        }}
    >
        <div
            onClick={(e) => e.stopPropagation()}
            style={{
                position: 'absolute', width: '217.51px', height: '125.22px',
                left: '174.67px', top: '31.63px',
                background: '#FFFFFF', borderRadius: '9px',
                padding: '6px', display: 'flex', flexDirection: 'column', gap: '6px',
                boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            }}
        >
            {/* Unmatch Button */}
            <button style={{
                width: '204.58px', height: '52.65px', background: '#F6F6F8',
                borderRadius: '4px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '16px',
                    lineHeight: '100%', color: '#6F3BCE', textAlign: 'center',
                }}>Unmatch</span>
            </button>

            {/* Report Button */}
            <button style={{
                width: '204.58px', height: '52.65px', background: '#F6F6F8',
                borderRadius: '4px', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
                <span style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: '16px',
                    lineHeight: '100%', color: '#6F3BCE', textAlign: 'center',
                }}>Report</span>
            </button>
        </div>
    </div>
);

/* ─── Chat Screen Page ─── */
const ChatScreenPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [messageText, setMessageText] = useState('');
    const [showSettings, setShowSettings] = useState(false);

    const chatData = location.state || {};
    const chatName = chatData.name || 'Anil';
    const chatPhoto = chatData.photo || demoPhoto2;
    const hasMessages = chatData.hasMessages !== false;

    const messages = hasMessages ? DUMMY_MESSAGES : [];

    const handleSend = () => {
        if (messageText.trim()) {
            setMessageText('');
        }
    };

    return (
        <div className="h-[100dvh] flex flex-col max-w-[414px] mx-auto relative overflow-hidden" style={{ background: '#FCFCFC' }}>

            {showSettings && <SettingsPopup onClose={() => setShowSettings(false)} />}

            {/* Header */}
            <header style={{
                width: '100%', height: '91.79px',
                background: 'rgba(252, 252, 252, 1)',
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                display: 'flex', alignItems: 'center', padding: '0 20px',
                position: 'relative', zIndex: 10, flexShrink: 0,
            }}>
                <button
                    onClick={() => navigate('/chats')}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', marginRight: '12px' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#303030" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="15,18 9,12 15,6" />
                    </svg>
                </button>

                <img src={chatPhoto} alt={chatName} style={{
                    width: '48px', height: '48px', borderRadius: '50%',
                    objectFit: 'cover',
                }} />

                <div style={{ marginLeft: '12px', flex: 1 }}>
                    <h1 style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: '20px',
                        lineHeight: '24px', letterSpacing: '0.05em', color: '#303030',
                        margin: 0
                    }}>{chatName}</h1>
                </div>

                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: '63.37px', height: '26.34px',
                    background: '#6F3BCE', borderRadius: '16.16px',
                    marginRight: '12px'
                }}>
                    <span style={{
                        fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: '15px',
                        lineHeight: '18px', letterSpacing: '0.05em', color: '#FFFFFF',
                    }}>11:00</span>
                </div>

                <button
                    onClick={() => setShowSettings(true)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#303030">
                        <circle cx="12" cy="5" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="12" cy="19" r="2" />
                    </svg>
                </button>
            </header>

            {/* Messages Area */}
            <main className="flex-1 overflow-y-auto" style={{ padding: '10px 0' }}>
                {messages.length === 0 ? (
                    <EmptyChatState />
                ) : (
                    messages.map(msg => (
                        <ChatBubble key={msg.id} msg={msg} photo={chatPhoto} />
                    ))
                )}
            </main>

            {/* Input Bar */}
            <footer style={{
                width: '100%', padding: '10px 16px 30px',
                display: 'flex', alignItems: 'center', gap: '10px',
                flexShrink: 0, background: '#FCFCFC',
            }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <img src={chatGalleryIcon} alt="gallery" style={{ width: '32px', height: '32px' }} />
                </button>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <img src={chatRecordIcon} alt="record" style={{ width: '22px', height: '22px' }} />
                </button>

                <div style={{
                    flex: 1, height: '40px', background: '#F3F3F3',
                    borderRadius: '20px', display: 'flex', alignItems: 'center',
                    padding: '0 16px',
                }}>
                    <input
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Aa"
                        style={{
                            width: '100%', background: 'transparent', border: 'none', outline: 'none',
                            fontFamily: "'Roboto', sans-serif", fontWeight: 400, fontSize: '16px',
                            color: '#303030',
                        }}
                    />
                </div>

                <button onClick={handleSend} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <img src={chatSendIcon} alt="send" style={{ width: '32px', height: '32px' }} />
                </button>

                <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                    <img src={chatThumbIcon} alt="thumb" style={{ width: '32px', height: '32px' }} />
                </button>
            </footer>
        </div>
    );
};

export default ChatScreenPage;
