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
import EditProfilePage from '../pages/EditProfilePage';
import PremiumPage from '../pages/PremiumPage';
import ChatListPage from '../pages/ChatListPage';
import ChatScreenPage from '../pages/ChatScreenPage';
import LikesYouPage from '../pages/LikesYouPage';
import SettingsPage from '../pages/SettingsPage';
import MeasurementUnitsPage from '../pages/MeasurementUnitsPage';
import PrivacyPolicyPage from '../pages/PrivacyPolicyPage';
import TermsOfServicePage from '../pages/TermsOfServicePage';

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
            <Route path="/profile" element={<ProfilePreviewPage />} />
            <Route path="/profile-preview" element={<ProfilePreviewPage />} />
            <Route path="/discovery" element={<DiscoveryPage />} />
            <Route path="/profile-detail" element={<ProfileDetailPage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/premium" element={<PremiumPage />} />
            <Route path="/chats" element={<ChatListPage />} />
            <Route path="/chat" element={<ChatScreenPage />} />
            <Route path="/likes" element={<LikesYouPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/measurement-units" element={<MeasurementUnitsPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms-of-service" element={<TermsOfServicePage />} />
        </Routes>
    );
};

export default AppRoutes;
