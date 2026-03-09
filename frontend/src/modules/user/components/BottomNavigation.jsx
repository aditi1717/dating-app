import React from 'react';
import { useNavigate } from 'react-router-dom';

// Icons
import profileIcon from '../assets/icons/profile.png';
import coupleIcon from '../assets/icons/couple.png';
import heartIcon from '../assets/icons/heart.png';
import messageIcon from '../assets/icons/message.png';

const BottomNavigation = ({ activeTab = 'people' }) => {
    const navigate = useNavigate();

    const NavItem = ({ name, icon, tabName, isActive, onClick }) => (
        <div
            onClick={onClick}
            className="flex flex-col items-center justify-end space-y-1 cursor-pointer w-16 h-14"
        >
            <img
                src={icon}
                alt={name}
                className={`object-contain transition-all duration-200 ${isActive
                    ? 'w-8 h-8 opacity-100 grayscale-0'
                    : 'w-6 h-6 opacity-40 grayscale hover:opacity-70'
                    }`}
            />
            <span className={`text-[11px] font-bold tracking-wide transition-colors duration-200 ${isActive ? 'text-[#733FE0]' : 'text-gray-400'
                }`}>
                {name}
            </span>
        </div>
    );

    return (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white pt-3 pb-6 px-6 border-t border-gray-50 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] flex justify-between items-end z-50">
            <NavItem
                name="Profile"
                icon={profileIcon}
                isActive={activeTab === 'profile'}
                onClick={() => navigate('/profile')}
            />
            <NavItem
                name="People"
                icon={coupleIcon}
                isActive={activeTab === 'people'}
                onClick={() => navigate('/discovery')}
            />
            <NavItem
                name="Likes"
                icon={heartIcon}
                isActive={activeTab === 'likes'}
                onClick={() => navigate('/likes')}
            />
            <NavItem
                name="Chats"
                icon={messageIcon}
                isActive={activeTab === 'chats'}
                onClick={() => navigate('/chats')}
            />
        </div>
    );
};

export default BottomNavigation;
