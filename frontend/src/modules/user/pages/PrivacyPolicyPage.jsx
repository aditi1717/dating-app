import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicyPage = () => {
    const navigate = useNavigate();

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
                justifyContent: 'space-between',
                padding: '0 20px',
                zIndex: 10,
                flexShrink: 0
            }}>
                <button
                    onClick={() => navigate(-1)}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: '10px',
                        cursor: 'pointer'
                    }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>

                <h1 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '18px',
                    color: '#000',
                    opacity: 0.9
                }}>
                    Privacy Policy
                </h1>

                <button style={{
                    width: '79px',
                    height: '32px',
                    background: '#FF7C67',
                    borderRadius: '16px',
                    border: 'none',
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 500,
                    fontSize: '11px',
                    color: '#FFFFFF',
                    cursor: 'pointer'
                }}>
                    Download
                </button>
            </header>

            <main className="flex-1 overflow-y-auto px-6 pt-8 pb-10">
                <h2 style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 600,
                    fontSize: '36px',
                    lineHeight: '44px',
                    color: '#000000',
                    marginBottom: '20px'
                }}>
                    Privacy
                </h2>

                <div className="flex flex-col gap-6">
                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '20px',
                        lineHeight: '24px',
                        color: '#000000'
                    }}>
                        Do you live in India? Please review our India Privacy Addendum, which supplements this Privacy Policy in accordance with applicable local laws.
                    </p>

                    <p style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: '15px',
                        lineHeight: '18px',
                        color: '#000000'
                    }}>
                        Residents of the European Union or United Kingdom, please see our International Data Protection Notice, which forms part of this Privacy Policy.
                    </p>

                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 400,
                        fontSize: '15px',
                        lineHeight: '18px',
                        color: '#000000'
                    }}>
                        Hey there! Welcome to AMORO’s Privacy Policy. We know reading a privacy policy might not be your favorite way to spend time — but your trust means everything to us. At AMORO, we’re building more than just a dating app. We’re building real connections. And that starts with being clear about how we collect, use, and protect your information. This Privacy Policy explains: <br /><br />
                        • What information we collect<br />
                        • How we use it<br />
                        • When we share it<br />
                        • And the choices you have <br /><br />
                        We’ve tried to keep this as simple and transparent as possible. No complicated language. No hidden surprises. Because when it comes to your personal information, you deserve clarity and control.
                    </div>

                    <div style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 700,
                        fontSize: '15px',
                        lineHeight: '18px',
                        color: '#000000'
                    }}>
                        Information We Collect <br />
                        When you use AMORO, we may collect: <br />
                        • Information you provide (like your profile details, photos, preferences) <br />
                        • Messages and interactions within the app<br />
                        • Location data to show relevant matches<br />
                        • Device and usage information to improve performance and safety <br /><br />
                        We only collect what helps us create better, safer matches. <br /><br />

                        How We Use Your Information <br />
                        We use your information to: <br />
                        • Show you compatible matches<br />
                        • Improve your experience<br />
                        • Keep the platform safe<br />
                        • Prevent fraud and fake accounts<br />
                        • Comply with legal obligations <br /><br />
                        Your data helps us make AMORO smarter — and safer. <br /><br />

                        Your Choices & Control <br />
                        You’re always in control. You can: <br />
                        • Edit your profile anytime<br />
                        • Adjust privacy settings<br />
                        • Turn off activity status<br />
                        • Request your data<br />
                        • Delete your account permanently <br /><br />
                        No pressure. No hidden settings. <br /><br />

                        Our Commitment <br />
                        We do not sell your personal data.<br />
                        We protect your information with industry-standard security measures.<br />
                        And we continuously work to improve your safety. <br /><br />
                        Because AMORO isn’t just about matching.<br />
                        It’s about trust.
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicyPage;
