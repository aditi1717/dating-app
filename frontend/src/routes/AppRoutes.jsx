import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from '../pages/SplashScreen';
import LoginScreen from '../pages/LoginScreen';
import PhoneInputPage from '../pages/PhoneInputPage';
import VerifyOTPPage from '../pages/VerifyOTPPage';
import ProfileDetailsPage from '../pages/ProfileDetailsPage';
import GenderSelectionPage from '../pages/GenderSelectionPage';
import AddPhotosPage from '../pages/AddPhotosPage';
import EnableLocationPage from '../pages/EnableLocationPage';
import InterestsPage from '../pages/InterestsPage';
import RelationshipGoalsPage from '../pages/RelationshipGoalsPage';
import ProfilePreviewPage from '../pages/ProfilePreviewPage';
import DiscoveryPage from '../pages/DiscoveryPage';
import ProfileDetailPage from '../pages/ProfileDetailPage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<SplashScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/phone-input" element={<PhoneInputPage />} />
            <Route path="/verify" element={<VerifyOTPPage />} />
            <Route path="/profile-details" element={<ProfileDetailsPage />} />
            <Route path="/gender-select" element={<GenderSelectionPage />} />
            <Route path="/add-photos" element={<AddPhotosPage />} />
            <Route path="/enable-location" element={<EnableLocationPage />} />
            <Route path="/interests" element={<InterestsPage />} />
            <Route path="/relationship-goals" element={<RelationshipGoalsPage />} />
            <Route path="/profile-preview" element={<ProfilePreviewPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/profile-detail" element={<ProfileDetailPage />} />
        </Routes>
    );
};

export default AppRoutes;
