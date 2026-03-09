import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsOfServicePage = () => {
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
                    Terms of Service
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
                    Terms of Service
                </h2>

                <div className="flex flex-col gap-6" style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '15px',
                    lineHeight: '1.4',
                    color: '#000000'
                }}>
                    <p style={{ fontWeight: 600, fontSize: '18px' }}>
                        Welcome to AMORO.
                    </p>
                    <p>
                        Before you start making meaningful connections, please take a moment to read these Terms of Service (“Terms”). By creating an account or using AMORO, you agree to these Terms.
                        We’ve tried to keep things simple and transparent — because respect starts here.
                    </p>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>1. Who Can Use AMORO</h3>
                        <p>To use AMORO, you must:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Be at least 18 years old<br />
                            • Provide accurate and truthful information<br />
                            • Not be prohibited from using dating services under applicable laws
                        </p>
                        <p style={{ marginTop: '8px' }}>By using AMORO, you confirm that you meet these requirements.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>2. Your Account</h3>
                        <p>When you create an account:</p>
                        <p style={{ marginTop: '4px' }}>
                            • You are responsible for maintaining account security<br />
                            • You are responsible for activities under your account<br />
                            • You agree not to share your login credentials
                        </p>
                        <p style={{ marginTop: '8px' }}>If you believe someone has accessed your account without permission, please contact us immediately.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>3. Community Guidelines</h3>
                        <p>AMORO is built for respectful and genuine connections.</p>
                        <p style={{ marginTop: '8px' }}>You agree NOT to:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Harass, threaten, or abuse other users<br />
                            • Share explicit or illegal content<br />
                            • Create fake profiles<br />
                            • Scam, mislead, or impersonate someone<br />
                            • Use the app for commercial promotion
                        </p>
                        <p style={{ marginTop: '8px' }}>We reserve the right to remove accounts that violate these rules.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>4. Your Content</h3>
                        <p>You own the content you upload (photos, messages, profile details).</p>
                        <p style={{ marginTop: '8px' }}>However, by posting content on AMORO, you grant us a limited license to:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Display your content within the app<br />
                            • Use it to operate and improve the service
                        </p>
                        <p style={{ marginTop: '8px' }}>We do not claim ownership of your content.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>5. Matches & Interactions</h3>
                        <p>AMORO does not guarantee:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Matches<br />
                            • Responses<br />
                            • Relationship outcomes
                        </p>
                        <p style={{ marginTop: '8px' }}>We provide the platform — connections are created by users.</p>
                        <p style={{ marginTop: '8px' }}>Always use your judgment and prioritize safety when meeting someone offline.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>6. Safety Disclaimer</h3>
                        <p>While we work hard to maintain a safe environment:</p>
                        <p style={{ marginTop: '4px' }}>
                            • We do not conduct criminal background checks on all users<br />
                            • We are not responsible for user behavior outside the app
                        </p>
                        <p style={{ marginTop: '8px' }}>Your safety matters — please follow in-app safety tips.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>7. Payments & Premium Features</h3>
                        <p>If you purchase premium features:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Payments are processed securely<br />
                            • Subscriptions may auto-renew unless cancelled<br />
                            • Refund policies depend on applicable laws
                        </p>
                        <p style={{ marginTop: '8px' }}>You can manage subscriptions through your app store account.</p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>8. Termination</h3>
                        <p>You may delete your account anytime.</p>
                        <p style={{ marginTop: '8px' }}>We may suspend or terminate accounts that:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Violate these Terms<br />
                            • Pose safety risks<br />
                            • Engage in fraudulent activity
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>9. Limitation of Liability</h3>
                        <p>AMORO is provided “as is.”</p>
                        <p style={{ marginTop: '8px' }}>We are not liable for:</p>
                        <p style={{ marginTop: '4px' }}>
                            • Indirect or consequential damages<br />
                            • User disputes<br />
                            • Loss resulting from interactions with other users
                        </p>
                    </div>

                    <div>
                        <h3 style={{ fontWeight: 700, marginBottom: '8px' }}>10. Changes to These Terms</h3>
                        <p>We may update these Terms from time to time.</p>
                        <p style={{ marginTop: '8px' }}>If we make significant changes, we will notify you within the app.</p>
                        <p style={{ marginTop: '8px' }}>Continued use of AMORO means you accept the updated Terms.</p>
                    </div>

                    <div style={{ marginTop: '20px', borderTop: '1px solid #EEE', paddingTop: '20px' }}>
                        <p style={{ fontWeight: 600, color: '#6F3BCE' }}>💛 Thanks for being part of AMORO.</p>
                        <p style={{ marginTop: '8px' }}>
                            We’re here to help you build meaningful connections — safely, respectfully, and transparently.
                            If you have questions, reach out to us anytime.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default TermsOfServicePage;
