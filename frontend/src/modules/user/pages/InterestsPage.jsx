import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InterestsPage = () => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState([]);

    // SVG Icons for pixel perfect match
    const icons = {
        camera: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>,
        cooking: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h18c0 4-4 8-9 8s-9-4-9-8z" /><path d="M6 10V6" /><path d="M11 10V4" /><path d="M18 10V6" /></svg>,
        games: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" /></svg>,
        music: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>,
        travel: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z" /></svg>,
        shopping: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>,
        mic: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" y1="19" x2="12" y2="23" /><line x1="8" y1="23" x2="16" y2="23" /></svg>,
        art: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13.5" cy="6.5" r=".5" /><circle cx="17.5" cy="10.5" r=".5" /><circle cx="8.5" cy="7.5" r=".5" /><circle cx="6.5" cy="12.5" r=".5" /><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" /></svg>,
        swim: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22c3-4 7-4 10 0" /><path d="M12 22c3-4 7-4 10 0" /><path d="M2 17c3-4 7-4 10 0" /><path d="M12 17c3-4 7-4 10 0" /><path d="M2 12c3-4 7-4 10 0" /><path d="M12 12c3-4 7-4 10 0" /></svg>,
        drink: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 22h8" /><path d="M7 10h10" /><path d="M12 15v7" /><path d="M12 15a5 5 0 0 0 5-5c0-2-.5-4-2-8H9c-1.5 4-2 6-2 8a5 5 0 0 0 5 5Z" /></svg>,
        extreme: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12v6" /><path d="m20.2 6.8-5.3 4.2" /><path d="m3.8 6.8 5.3 4.2" /><path d="M2 12h20" /><path d="M12 2a10 10 0 0 1 10 10" /><path d="M12 2A10 10 0 0 0 2 12" /></svg>, // Parachuteish
        fitness: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.4 14.4 9.6 9.6" /><path d="M18.65 10.15c.85-.85.85-2.22 0-3.07l-1.06-1.06c-.85-.85-2.22-.85-3.07 0L12 8.52" /><path d="M10.8 5.4 12 6.6" /><path d="M10.8 5.4 6 10.2" /><path d="M12 6.6l4.2 4.2" /><path d="M8.52 12l2.48-2.48" /><path d="M5.35 13.85c-.85.85-.85 2.22 0 3.07l1.06 1.06c.85.85 2.22.85 3.07 0L12 15.48" /></svg>,
    };

    const interests = [
        { name: 'Photography', icon: icons.camera },
        { name: 'Cooking', icon: icons.cooking },
        { name: 'Video Games', icon: icons.games },
        { name: 'Music', icon: icons.music },
        { name: 'Travelling', icon: icons.travel },
        { name: 'Shopping', icon: icons.shopping },
        { name: 'Speeches', icon: icons.mic },
        { name: 'Art & Crafts', icon: icons.art },
        { name: 'Swimming', icon: icons.swim },
        { name: 'Drinking', icon: icons.drink },
        { name: 'Extreme Sports', icon: icons.extreme },
        { name: 'Fitness', icon: icons.fitness },
    ];

    const toggleInterest = (name) => {
        if (selected.includes(name)) {
            setSelected(selected.filter(i => i !== name));
        } else {
            setSelected([...selected, name]);
        }
    };

    const handleContinue = () => {
        localStorage.setItem('onboarding_interests', JSON.stringify(selected));
        navigate('/relationship-goals');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-6 px-4 font-sans max-w-[420px] mx-auto">
            {/* Header Spacer if needed or just remove */}


            <div className="w-full flex flex-col items-center flex-1 mt-4">
                {/* Titles */}
                <h2 className="text-[32px] font-bold text-black mb-2 text-center font-sans tracking-tight">
                    Likes, Interests
                </h2>
                <p className="text-[14px] text-gray-500 text-center mb-10 font-medium">
                    Share your likes & passion with others
                </p>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-4 w-full mb-8">
                    {interests.map((interest) => {
                        const isSelected = selected.includes(interest.name);
                        return (
                            <button
                                key={interest.name}
                                onClick={() => toggleInterest(interest.name)}
                                className={`flex items-center space-x-3 h-[52px] px-4 rounded-[26px] transition-all shadow-sm border ${isSelected
                                    ? 'border-[#733FE0] bg-[#F9F7FF]'
                                    : 'border-transparent bg-[#F9F7FF] shadow-md' // Slightly elevated white look as per screenshot
                                    }`}
                            >
                                <span className={`${isSelected ? 'text-[#733FE0]' : 'text-black'}`}>
                                    {interest.icon}
                                </span>
                                <span className={`text-[13px] font-bold truncate ${isSelected ? 'text-black' : 'text-black'}`}>
                                    {interest.name}
                                </span>
                            </button>
                        );
                    })}
                </div>

                {/* Footer */}
                <div className="mt-auto w-full flex flex-col items-center pb-4">

                    <button
                        onClick={handleContinue}
                        className="w-full bg-[#733FE0] text-white font-bold h-[58px] rounded-[30px] text-[16px] shadow-lg shadow-purple-100 active:scale-[0.98] transition-all"
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InterestsPage;
