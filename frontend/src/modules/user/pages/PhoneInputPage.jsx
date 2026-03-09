import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const countries = [
    { code: '+91', flag: 'https://flagcdn.com/w40/in.png', name: 'India' },
    { code: '+1', flag: 'https://flagcdn.com/w40/us.png', name: 'USA' },
    { code: '+44', flag: 'https://flagcdn.com/w40/gb.png', name: 'UK' },
    { code: '+61', flag: 'https://flagcdn.com/w40/au.png', name: 'Australia' },
    { code: '+81', flag: 'https://flagcdn.com/w40/jp.png', name: 'Japan' },
    { code: '+33', flag: 'https://flagcdn.com/w40/fr.png', name: 'France' },
    { code: '+49', flag: 'https://flagcdn.com/w40/de.png', name: 'Germany' },
    { code: '+86', flag: 'https://flagcdn.com/w40/cn.png', name: 'China' },
    { code: '+55', flag: 'https://flagcdn.com/w40/br.png', name: 'Brazil' },
];

const PhoneInputPage = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [showPicker, setShowPicker] = useState(false);
    const [countryCode, setCountryCode] = useState('+91');

    const selectedCountry = countries.find(c => c.code === countryCode) || countries[0];

    const handleContinue = () => {
        // Save to LocalStorage
        localStorage.setItem('onboarding_phone', JSON.stringify({ countryCode, phone }));
        navigate('/verify');
    };

    return (
        <div
            className="min-h-screen bg-white flex flex-col py-8 px-6 font-sans max-w-[420px] mx-auto shadow-2xl border-x border-gray-100 relative"
            onClick={() => setShowPicker(false)}
        >
            {/* Main Content Area - Top Weighted */}
            <div className="flex-1 flex flex-col items-center pt-20 w-full">
                {/* Title */}
                <h2 className="text-[28px] font-bold text-black mb-3 text-center font-sans tracking-tight">
                    Enter your number
                </h2>

                {/* Subtitle */}
                <p className="text-[15px] text-gray-500 text-center mb-12 leading-relaxed font-normal px-2">
                    Please enter your valid phone number.<br />
                    We will send you a 4-digit code to verify
                </p>

                {/* Input Container */}
                <div
                    className="w-full h-[60px] border-[1.5px] border-[#733FE0] rounded-full flex items-center px-4 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Country Selector Trigger */}
                    <div
                        onClick={() => setShowPicker(!showPicker)}
                        className="flex items-center cursor-pointer select-none"
                    >
                        {/* Dynamic Flag */}
                        <div className="w-6 h-4 overflow-hidden rounded-[2px] mr-2 flex-shrink-0 bg-gray-100">
                            <img
                                src={selectedCountry.flag}
                                className="w-full h-full object-cover"
                                alt={`${selectedCountry.name} Flag`}
                            />
                        </div>

                        {/* Code and Arrow */}
                        <span className="text-[16px] font-medium text-black ml-1 whitespace-nowrap">({countryCode})</span>
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" className={`ml-1 text-[#733FE0] transition-transform duration-200 ${showPicker ? 'rotate-180' : ''}`}>
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>

                    {/* Dropdown Menu */}
                    {showPicker && (
                        <div className="absolute top-[65px] left-0 w-[160px] bg-white shadow-xl rounded-xl border border-gray-100 z-50 max-h-[220px] overflow-y-auto py-2 scrollbar-thin">
                            {countries.map((country) => (
                                <div
                                    key={country.code}
                                    onClick={() => {
                                        setCountryCode(country.code);
                                        setShowPicker(false);
                                    }}
                                    className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors ${countryCode === country.code ? 'bg-purple-50' : ''}`}
                                >
                                    <div className="w-6 h-4 overflow-hidden rounded-[2px] mr-3 bg-gray-100 flex-shrink-0">
                                        <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
                                    </div>
                                    <span className="text-[15px] font-medium text-gray-700">{country.code}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Vertical Divider */}
                    <div className="h-[24px] w-[1px] bg-gray-300 mx-2"></div>

                    {/* Phone Input */}
                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val.length <= 10) setPhone(val);
                        }}
                        className="flex-1 bg-transparent border-none outline-none text-[16px] font-medium text-black tracking-wide w-full"
                        placeholder="Phone number"
                    />
                </div>
            </div>

            {/* Continue Button - Fixed at bottom */}
            <div className="w-full mb-4">
                <button
                    onClick={handleContinue}
                    className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all"
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default PhoneInputPage;
