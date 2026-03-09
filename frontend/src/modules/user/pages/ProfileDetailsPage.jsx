import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

const ProfileDetailsPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [dob, setDob] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const calendarRef = useRef(null);

    // Calendar State
    const [currentDate, setCurrentDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 18))); // Start 18 years ago

    const handleContinue = () => {
        if (!name || !dob) {
            alert("Please enter your name and date of birth");
            return;
        }
        localStorage.setItem('onboarding_profile', JSON.stringify({ name: name.trim(), dob }));
        navigate('/gender-select');
    };

    // Close calendar on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (calendarRef.current && !calendarRef.current.contains(event.target)) {
                setShowCalendar(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Calendar Logic
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const handleDateClick = (day) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        // Format YYYY-MM-DD
        const formatted = selectedDate.toISOString().split('T')[0];
        setDob(formatted);
        setShowCalendar(false);
    };

    const changeMonth = (offset) => {
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        // 18+ Constraint check for navigation could be added here, 
        // but for now we just allow navigation and disable days
        setCurrentDate(newDate);
    };

    const renderCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const totalDays = daysInMonth(year, month);
        const startDay = firstDayOfMonth(year, month);

        const days = [];
        // Empty cells for alignment
        for (let i = 0; i < startDay; i++) {
            days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
        }

        const today = new Date();
        const maxAllowedDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());

        for (let day = 1; day <= totalDays; day++) {
            const dateToCheck = new Date(year, month, day);
            const isAllowed = dateToCheck <= maxAllowedDate;
            const isSelected = dob && new Date(dob).getDate() === day && new Date(dob).getMonth() === month && new Date(dob).getFullYear() === year;

            days.push(
                <button
                    key={day}
                    onClick={() => isAllowed && handleDateClick(day)}
                    disabled={!isAllowed}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-[14px] font-medium transition-all
                        ${isSelected ? 'bg-[#733FE0] text-white shadow-md' : 'text-gray-700 hover:bg-purple-50'}
                        ${!isAllowed ? 'opacity-30 cursor-not-allowed hover:bg-transparent' : 'cursor-pointer'}
                    `}
                >
                    {day}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-between py-8 px-6 font-sans max-w-[420px] mx-auto shadow-2xl border-x border-gray-100">

            <div className="w-full mt-6 flex flex-col items-center">
                {/* Title */}
                <h2 className="text-[28px] font-bold text-black mb-2 text-center font-sans tracking-tight">
                    Profile Details
                </h2>

                {/* Subtitle */}
                <p className="text-[15px] text-gray-400 text-center mb-14 font-medium">
                    Fill up the following details
                </p>

                {/* Form Fields */}
                <div className="w-full">

                    {/* Name Field */}
                    <div className="mb-6">
                        <label className="text-[15px] font-bold text-[#6F3BCE] mb-3 block ml-1">
                            First name
                        </label>
                        <div className="w-full h-[58px] border-[1.5px] border-[#733FE0] rounded-[29px] flex items-center px-6 shadow-sm bg-white">
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="w-full bg-transparent border-none outline-none text-[16px] font-medium text-black placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* DOB Field */}
                    <div className="relative mb-6" ref={calendarRef}>
                        <div
                            onClick={() => setShowCalendar(!showCalendar)}
                            className={`w-full h-[58px] border-[1.5px] ${showCalendar ? 'border-[#733FE0]' : 'border-[#C4C4C4]'} rounded-[29px] flex items-center px-6 justify-between shadow-sm bg-white cursor-pointer hover:border-[#733FE0] transition-colors`}
                        >
                            <span className={`text-[16px] font-bold ${dob ? 'text-black' : 'text-gray-400'} select-none`}>
                                {dob || 'DOB'}
                            </span>
                            <div className="text-[#6F3BCE]">
                                <Calendar size={22} className="text-[#8e8e93]" />
                            </div>
                        </div>

                        {/* Custom Calendar Dropdown */}
                        {showCalendar && (
                            <div className="absolute top-[65px] left-0 w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <button
                                        onClick={() => changeMonth(-1)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <ChevronLeft size={20} className="text-gray-600" />
                                    </button>
                                    <span className="text-[16px] font-bold text-black">
                                        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                                    </span>
                                    <button
                                        onClick={() => changeMonth(1)}
                                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        <ChevronRight size={20} className="text-gray-600" />
                                    </button>
                                </div>

                                {/* Days Header */}
                                <div className="grid grid-cols-7 mb-2 text-center">
                                    {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                                        <span key={d} className="text-[13px] font-bold text-gray-400">{d}</span>
                                    ))}
                                </div>

                                {/* Days Grid */}
                                <div className="grid grid-cols-7 gap-y-1 justify-items-center">
                                    {renderCalendarDays()}
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>

            {/* Continue Button */}
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

export default ProfileDetailsPage;
